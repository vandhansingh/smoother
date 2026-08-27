'use client';

import { motion, type HTMLMotionProps } from 'framer-motion';
import { durations, EASE_PREMIUM, viewport } from '@/lib/motion';

type Props = HTMLMotionProps<'div'> & {
  delay?: number;
  distance?: number;
  duration?: number;
  amount?: number;
  once?: boolean;
  as?: 'div' | 'section' | 'li' | 'span' | 'p' | 'header' | 'footer' | 'article';
};

/** The workhorse entrance: 26px rise + fade, 420ms, premium curve. */
export default function FadeUp({
  children,
  delay = 0,
  distance = 26,
  duration = durations.content,
  amount = viewport.amount,
  once = true,
  as = 'div',
  ...rest
}: Props) {
  const Comp = motion[as] as typeof motion.div;
  return (
    <Comp
      initial={{ opacity: 0, y: distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration, delay, ease: EASE_PREMIUM as unknown as number[] }}
      {...rest}
    >
      {children}
    </Comp>
  );
}
