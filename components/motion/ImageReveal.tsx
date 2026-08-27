'use client';

import { motion } from 'framer-motion';
import { EASE_PREMIUM, viewport } from '@/lib/motion';

type Props = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: 'left' | 'right' | 'up' | 'down';
  /** the inner element also settles from 1.06 → 1 */
  zoom?: boolean;
};

const from = {
  left: 'inset(0 100% 0 0)',
  right: 'inset(0 0 0 100%)',
  up: 'inset(100% 0 0 0)',
  down: 'inset(0 0 100% 0)',
};

/** Clip-path wipe — the preferred reveal for any framed visual. */
export default function ImageReveal({
  children,
  className = '',
  delay = 0,
  duration = 0.62,
  direction = 'left',
  zoom = true,
}: Props) {
  return (
    <motion.div
      className={`overflow-hidden ${className}`}
      initial={{ clipPath: from[direction] }}
      whileInView={{ clipPath: 'inset(0 0% 0 0%)' }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration, delay, ease: EASE_PREMIUM as unknown as number[] }}
    >
      <motion.div
        className="h-full w-full"
        initial={zoom ? { scale: 1.06 } : false}
        whileInView={zoom ? { scale: 1 } : undefined}
        viewport={{ once: true, amount: viewport.amount }}
        transition={{
          duration: duration + 0.25,
          delay,
          ease: EASE_PREMIUM as unknown as number[],
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
