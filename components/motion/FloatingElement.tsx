'use client';

import { motion } from 'framer-motion';
import { useReducedMotion } from '@/lib/hooks';

type Props = {
  children: React.ReactNode;
  className?: string;
  /** peak vertical travel, 8–14px */
  amplitude?: number;
  /** peak rotation, ~0.8deg */
  rotate?: number;
  duration?: number;
  delay?: number;
  style?: React.CSSProperties;
};

/* Ambient float. Slow enough to sit under the content rather than
   compete with it; disabled outright under prefers-reduced-motion. */
export default function FloatingElement({
  children,
  className = '',
  amplitude = 11,
  rotate = 0.8,
  duration = 6.5,
  delay = 0,
  style,
}: Props) {
  const reduced = useReducedMotion();

  if (reduced) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      className={`ambient-float ${className}`}
      style={style}
      animate={{
        y: [0, -amplitude, 0],
        rotate: [-rotate, rotate, -rotate],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
        times: [0, 0.5, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
