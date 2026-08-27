'use client';

import { motion, type HTMLMotionProps } from 'framer-motion';
import { durations, EASE_PREMIUM, viewport } from '@/lib/motion';

type Props = HTMLMotionProps<'div'> & { delay?: number; from?: number };

/** Scale reveal for framed visuals — 0.96 → 1 with a short rise. */
export default function ScaleReveal({ children, delay = 0, from = 0.96, ...rest }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: from, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, amount: viewport.amount }}
      transition={{
        duration: durations.cinematicFast,
        delay,
        ease: EASE_PREMIUM as unknown as number[],
      }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
