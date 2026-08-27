'use client';

import { motion } from 'framer-motion';
import { EASE_PREMIUM } from '@/lib/motion';

type Props = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: 'left' | 'right' | 'up' | 'down';
  /** the inner element also settles from 1.06 → 1 */
  zoom?: boolean;
};

/* Clip-path wipe — the preferred reveal for any framed visual.

   Two structural rules, both learned the hard way:
   1. The viewport trigger sits on an UNCLIPPED wrapper. Chromium folds
      an element's own clip-path into the rect IntersectionObserver
      measures, so a self-clipped element reports a zero intersection
      and its own whileInView never fires.
   2. Every keyframe uses the same unit on each side — `0px` cannot be
      interpolated into `0%`, and the mismatch silently leaves the
      element shut. */

const from = {
  left: 'inset(0% 100% 0% 0%)',
  right: 'inset(0% 0% 0% 100%)',
  up: 'inset(100% 0% 0% 0%)',
  down: 'inset(0% 0% 100% 0%)',
};

const TO = 'inset(0% 0% 0% 0%)';

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
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className={className}
    >
      <motion.div
        className="overflow-hidden rounded-[inherit]"
        variants={{ hidden: { clipPath: from[direction] }, show: { clipPath: TO } }}
        transition={{ duration, delay, ease: EASE_PREMIUM as unknown as number[] }}
      >
        <motion.div
          className="h-full w-full"
          variants={zoom ? { hidden: { scale: 1.06 }, show: { scale: 1 } } : undefined}
          transition={{
            duration: duration + 0.25,
            delay,
            ease: EASE_PREMIUM as unknown as number[],
          }}
        >
          {children}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
