'use client';

import { motion, type HTMLMotionProps } from 'framer-motion';
import { durations, EASE_PREMIUM, viewport } from '@/lib/motion';

type Props = HTMLMotionProps<'div'> & {
  delay?: number;
  duration?: number;
  amount?: number;
};

export default function FadeIn({
  children,
  delay = 0,
  duration = durations.contentSlow,
  amount = viewport.amount,
  ...rest
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount }}
      transition={{ duration, delay, ease: EASE_PREMIUM as unknown as number[] }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
