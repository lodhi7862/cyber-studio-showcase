import { useRef } from 'react';
import { useParticles } from '@/hooks/useParticles';

interface ParticleFieldProps {
  className?: string;
}

export function ParticleField({ className = '' }: ParticleFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useParticles(canvasRef, {
    count: 80,
    colors: ['#00f5ff', '#9945ff', '#00f5ff80'],
    minSize: 1,
    maxSize: 3,
    speed: 0.3,
  });

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none z-0 ${className}`}
      style={{ opacity: 0.6 }}
    />
  );
}
