import { useState, useEffect, useCallback } from 'react';

interface UseTypingAnimationOptions {
  text: string;
  speed?: number;
  delay?: number;
  onComplete?: () => void;
}

export function useTypingAnimation({
  text,
  speed = 50,
  delay = 0,
  onComplete,
}: UseTypingAnimationOptions) {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const startTyping = useCallback(() => {
    setDisplayedText('');
    setIsComplete(false);
    setIsTyping(true);
  }, []);

  useEffect(() => {
    if (!isTyping) return;

    let currentIndex = 0;
    const timeoutId = setTimeout(() => {
      const intervalId = setInterval(() => {
        if (currentIndex < text.length) {
          setDisplayedText(text.slice(0, currentIndex + 1));
          currentIndex++;
        } else {
          clearInterval(intervalId);
          setIsComplete(true);
          setIsTyping(false);
          onComplete?.();
        }
      }, speed);

      return () => clearInterval(intervalId);
    }, delay);

    return () => clearTimeout(timeoutId);
  }, [text, speed, delay, onComplete, isTyping]);

  useEffect(() => {
    startTyping();
  }, [text, startTyping]);

  return { displayedText, isComplete, isTyping, startTyping };
}

export function useMultiLineTyping(
  lines: string[],
  options: { speed?: number; lineDelay?: number } = {}
) {
  const { speed = 50, lineDelay = 500 } = options;
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentText, setCurrentText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (currentLineIndex >= lines.length) {
      setIsComplete(true);
      return;
    }

    const line = lines[currentLineIndex];
    let charIndex = 0;

    const typingInterval = setInterval(() => {
      if (charIndex < line.length) {
        setCurrentText(line.slice(0, charIndex + 1));
        charIndex++;
      } else {
        clearInterval(typingInterval);
        setTimeout(() => {
          setDisplayedLines((prev) => [...prev, line]);
          setCurrentText('');
          setCurrentLineIndex((prev) => prev + 1);
        }, lineDelay);
      }
    }, speed);

    return () => clearInterval(typingInterval);
  }, [currentLineIndex, lines, speed, lineDelay]);

  const reset = useCallback(() => {
    setCurrentLineIndex(0);
    setDisplayedLines([]);
    setCurrentText('');
    setIsComplete(false);
  }, []);

  return { displayedLines, currentText, isComplete, reset };
}
