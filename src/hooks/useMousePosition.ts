import { useState, useEffect, useCallback } from 'react';

interface MousePosition {
  x: number;
  y: number;
  normalizedX: number;
  normalizedY: number;
}

export function useMousePosition() {
  const [mousePosition, setMousePosition] = useState<MousePosition>({
    x: 0,
    y: 0,
    normalizedX: 0,
    normalizedY: 0,
  });

  const handleMouseMove = useCallback((event: MouseEvent) => {
    const { clientX, clientY } = event;
    setMousePosition({
      x: clientX,
      y: clientY,
      normalizedX: (clientX / window.innerWidth) * 2 - 1,
      normalizedY: (clientY / window.innerHeight) * 2 - 1,
    });
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  return mousePosition;
}

export function useParallax(intensity: number = 20) {
  const { normalizedX, normalizedY } = useMousePosition();

  return {
    x: normalizedX * intensity,
    y: normalizedY * intensity,
    style: {
      transform: `translate(${normalizedX * intensity}px, ${normalizedY * intensity}px)`,
    },
  };
}
