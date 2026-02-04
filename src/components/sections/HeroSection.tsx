import { motion } from 'framer-motion';
import { useMultiLineTyping } from '@/hooks/useTypingAnimation';
import { useParallax } from '@/hooks/useMousePosition';
import { profile } from '@/data/profile';
import { Button } from '@/components/ui/button';
import { ArrowDown, Github, Mail } from 'lucide-react';
import { HeroOrb } from '@/components/animations/HeroOrb';

const heroLines = [
  '> Hello World',
  `> I'm ${profile.shortName}`,
  '> AI & Full Stack Developer',
];

export function HeroSection() {
  const { displayedLines, currentText, isComplete } = useMultiLineTyping(heroLines, {
    speed: 60,
    lineDelay: 400,
  });
  const parallax = useParallax(15);

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Parallax background elements */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ transform: `translate(${parallax.x}px, ${parallax.y}px)` }}
      >
        {/* Floating geometric shapes */}
        <motion.div
          className="absolute top-20 left-20 w-32 h-32 border border-primary/20 rotate-45"
          animate={{ rotate: [45, 90, 45] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute bottom-40 right-20 w-24 h-24 border border-secondary/20 rounded-full"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute top-1/3 right-1/4 w-16 h-16 border border-primary/10"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        />
      </motion.div>

      {/* Hero Orb Centerpiece */}
      <div className="absolute inset-0 z-0 opacity-60">
        <HeroOrb />
      </div>

      {/* Main content */}
      <div className="container mx-auto px-6 z-10">
        <div className="max-w-4xl mx-auto">
          {/* Terminal window */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="glass rounded-2xl p-8 md:p-12 border-neon-cyan mb-8"
          >
            {/* Terminal header */}
            <div className="flex items-center gap-2 mb-6 pb-4 border-b border-border/50">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="ml-4 text-sm text-muted-foreground font-mono">
                ~/faisal-portfolio
              </span>
            </div>

            {/* Typing animation content */}
            <div className="font-mono text-xl md:text-3xl lg:text-4xl space-y-2">
              {displayedLines.map((line, index) => (
                <motion.p
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={
                    index === 0
                      ? 'text-primary'
                      : index === 1
                        ? 'text-foreground'
                        : 'text-secondary'
                  }
                >
                  {line}
                </motion.p>
              ))}
              {currentText && (
                <p className="text-muted-foreground">
                  {currentText}
                  <span className="cursor-blink text-primary">▋</span>
                </p>
              )}
              {isComplete && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-muted-foreground"
                >
                  <span className="cursor-blink text-primary">▋</span>
                </motion.p>
              )}
            </div>
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 2.5 }}
            className="text-lg md:text-xl text-muted-foreground text-center mb-8"
          >
            {profile.tagline}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 2.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button
              size="lg"
              onClick={scrollToProjects}
              className="glass-hover px-8 py-6 text-lg font-medium group border border-primary/50 bg-primary/10 hover:bg-primary/20 text-primary"
            >
              View Projects
              <motion.span
                className="ml-2"
                animate={{ y: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowDown className="w-5 h-5" />
              </motion.span>
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={scrollToContact}
              className="glass-hover px-8 py-6 text-lg font-medium border-secondary/50 text-secondary hover:bg-secondary/10"
            >
              <Mail className="w-5 h-5 mr-2" />
              Contact Me
            </Button>
            <Button
              size="lg"
              variant="ghost"
              asChild
              className="px-8 py-6 text-lg font-medium hover:bg-muted"
            >
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="w-5 h-5 mr-2" />
                GitHub
              </a>
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-muted-foreground"
        >
          <ArrowDown className="w-6 h-6" />
        </motion.div>
      </motion.div>
    </section>
  );
}
