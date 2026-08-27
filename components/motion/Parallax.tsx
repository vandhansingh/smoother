'use client';

import { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { useIsMobile, useReducedMotion } from '@/lib/hooks';
import { MOBILE_MOTION_SCALE } from '@/lib/motion';

type Props = {
  children: React.ReactNode;
  /** 0 = pinned to page, 1 = moves a full viewport. Layers use 0.12–1.0. */
  speed?: number;
  className?: string;
  axis?: 'y' | 'x';
  /** rotation range in degrees across the scroll window */
  rotate?: number;
  scale?: [number, number];
};

/* Multi-layer parallax. Depth reads as: background 0.12–0.18,
   middle 0.28–0.4, primary 0.55–0.7, foreground 0.9–1.0.
   Values are intentionally small — the point is depth, not motion
   sickness. */
export default function Parallax({
  children,
  speed = 0.3,
  className = '',
  axis = 'y',
  rotate = 0,
  scale,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const isMobile = useIsMobile();
  const factor = reduced ? 0 : isMobile ? speed * MOBILE_MOTION_SCALE : speed;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const smooth = useSpring(scrollYProgress, { stiffness: 260, damping: 40, mass: 0.4 });

  const distance = 110 * factor;
  const offset = useTransform(smooth, [0, 1], [distance, -distance]);
  const rotation = useTransform(smooth, [0, 1], [-rotate * factor, rotate * factor]);
  const scaleV = useTransform(
    smooth,
    [0, 1],
    scale ? [scale[0], scale[1]] : [1, 1]
  );

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        [axis === 'y' ? 'y' : 'x']: offset,
        rotate: rotate ? rotation : undefined,
        scale: scale ? scaleV : undefined,
      }}
    >
      {children}
    </motion.div>
  );
}
