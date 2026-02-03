import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { profile } from '@/data/profile';
import { FadeIn } from '@/components/animations/FadeIn';

const commands = [
  { cmd: 'whoami', label: 'About Me' },
  { cmd: 'cat education.txt', label: 'Education' },
  { cmd: 'cat experience.txt', label: 'Experience' },
  { cmd: 'ls certifications/', label: 'Certifications' },
];

export function AboutSection() {
  const [history, setHistory] = useState<{ command: string; output: string }[]>([]);
  const [currentInput, setCurrentInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [typingOutput, setTypingOutput] = useState('');
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const executeCommand = async (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    let output = '';

    if (trimmedCmd === 'whoami') {
      output = profile.terminalResponses.whoami;
    } else if (trimmedCmd === 'cat education.txt') {
      output = profile.terminalResponses.education;
    } else if (trimmedCmd === 'cat experience.txt') {
      output = profile.terminalResponses.experience;
    } else if (trimmedCmd === 'ls certifications/' || trimmedCmd === 'ls certifications') {
      output = profile.terminalResponses.certifications;
    } else if (trimmedCmd === 'help') {
      output = `> Available commands:
> whoami          - Display profile info
> cat education.txt  - Show education details
> cat experience.txt - Show work experience
> ls certifications/ - List certifications
> clear           - Clear terminal
> help            - Show this help`;
    } else if (trimmedCmd === 'clear') {
      setHistory([]);
      return;
    } else if (trimmedCmd === '') {
      return;
    } else {
      output = `> Command not found: ${cmd}
> Type 'help' for available commands`;
    }

    // Add command to history
    setHistory((prev) => [...prev, { command: cmd, output: '' }]);
    setIsTyping(true);

    // Typing animation for output
    for (let i = 0; i <= output.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 10));
      setTypingOutput(output.slice(0, i));
    }

    setHistory((prev) => {
      const newHistory = [...prev];
      newHistory[newHistory.length - 1].output = output;
      return newHistory;
    });
    setIsTyping(false);
    setTypingOutput('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isTyping) return;
    executeCommand(currentInput);
    setCurrentInput('');
  };

  const handleQuickCommand = (cmd: string) => {
    if (isTyping) return;
    executeCommand(cmd);
  };

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history, typingOutput]);

  return (
    <section id="about" className="relative py-24 md:py-32">
      <div className="container mx-auto px-6">
        {/* Section header */}
        <FadeIn className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-foreground">About</span>{' '}
            <span className="text-neon-cyan">Me</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explore my background through an interactive terminal experience
          </p>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="max-w-4xl mx-auto">
            {/* Quick commands */}
            <div className="flex flex-wrap gap-3 mb-6 justify-center">
              {commands.map((item) => (
                <motion.button
                  key={item.cmd}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleQuickCommand(item.cmd)}
                  className="px-4 py-2 glass rounded-lg text-sm font-mono border border-primary/30 hover:border-primary/60 hover:bg-primary/10 transition-all"
                  disabled={isTyping}
                >
                  <span className="text-primary">$</span>{' '}
                  <span className="text-muted-foreground">{item.label}</span>
                </motion.button>
              ))}
            </div>

            {/* Terminal window */}
            <div className="glass rounded-2xl overflow-hidden border border-border/50 relative crt-lines">
              {/* Terminal header */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-border/50 bg-muted/30">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="ml-4 text-sm text-muted-foreground font-mono">
                  faisal@portfolio:~
                </span>
              </div>

              {/* Terminal content */}
              <div
                ref={terminalRef}
                className="h-[400px] overflow-y-auto p-6 font-mono text-sm scrollbar-hide"
                onClick={() => inputRef.current?.focus()}
              >
                {/* Welcome message */}
                <div className="mb-6 text-muted-foreground">
                  <p className="text-primary mb-2">Welcome to Faisal's Terminal</p>
                  <p>Type 'help' for available commands or click the buttons above.</p>
                </div>

                {/* Command history */}
                <AnimatePresence>
                  {history.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mb-4"
                    >
                      <div className="flex items-center gap-2 text-foreground">
                        <span className="text-primary">$</span>
                        <span>{item.command}</span>
                      </div>
                      {item.output && (
                        <pre className="mt-2 text-muted-foreground whitespace-pre-wrap">
                          {item.output}
                        </pre>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>

                {/* Current typing output */}
                {isTyping && typingOutput && (
                  <pre className="text-muted-foreground whitespace-pre-wrap">
                    {typingOutput}
                    <span className="cursor-blink text-primary">▋</span>
                  </pre>
                )}

                {/* Input line */}
                {!isTyping && (
                  <form onSubmit={handleSubmit} className="flex items-center gap-2">
                    <span className="text-primary">$</span>
                    <input
                      ref={inputRef}
                      type="text"
                      value={currentInput}
                      onChange={(e) => setCurrentInput(e.target.value)}
                      className="flex-1 bg-transparent outline-none text-foreground caret-primary"
                      placeholder="Type a command..."
                      autoFocus
                    />
                    <span className="cursor-blink text-primary">▋</span>
                  </form>
                )}
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
