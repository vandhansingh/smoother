'use client';

import { motion, type HTMLMotionProps } from 'framer-motion';
import { container, fadeUp, cardIn, viewport } from '@/lib/motion';

type Props = HTMLMotionProps<'div'> & {
  gap?: number;
  delay?: number;
  amount?: number;
};

/** Parent for staggered children. Pair with <Stagger.Item>. */
function Stagger({ children, gap = 0.05, delay = 0, amount = viewport.amount, ...rest }: Props) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
      variants={container(gap, delay)}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

function Item({ children, variant = 'fade', ...rest }: HTMLMotionProps<'div'> & { variant?: 'fade' | 'card' }) {
  return (
    <motion.div variants={variant === 'card' ? cardIn : fadeUp} {...rest}>
      {children}
    </motion.div>
  );
}

Stagger.Item = Item;
export default Stagger;
