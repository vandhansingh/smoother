'use client';

import { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform, useVelocity } from 'framer-motion';
import { useIsMobile, useReducedMotion } from '@/lib/hooks';

type Props = {
  children: React.ReactNode;
  className?: string;
  /** how far a hard scroll can skew/offset the element */
  intensity?: number;
  mode?: 'skew' | 'shift' | 'scale';
};

/* Velocity-based motion: a fast flick pushes the element slightly,
   a slow scroll barely touches it, and stopping lets a soft spring
   settle it back with a ~1.5px overshoot. */
export default function VelocityElement({
  children,
  className = '',
  intensity = 1,
  mode = 'skew',
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const isMobile = useIsMobile();
  const factor = reduced ? 0 : isMobile ? intensity * 0.4 : intensity;

  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smooth = useSpring(velocity, { stiffness: 150, damping: 22, mass: 0.9 });

  const skew = useTransform(smooth, [-2600, 0, 2600], [-2.6 * factor, 0, 2.6 * factor], {
    clamp: true,
  });
  const shift = useTransform(smooth, [-2600, 0, 2600], [26 * factor, 0, -26 * factor], {
    clamp: true,
  });
  const peakScale = 1 + 0.014 * factor;
  const scale = useTransform(smooth, [-2600, 0, 2600], [peakScale, 1, peakScale], {
    clamp: true,
  });

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        skewY: mode === 'skew' ? skew : undefined,
        y: mode === 'shift' ? shift : undefined,
        scale: mode === 'scale' ? scale : undefined,
      }}
    >
      {children}
    </motion.div>
  );
}
