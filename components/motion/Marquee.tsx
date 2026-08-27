'use client';

import { useRef } from 'react';
import { motion, useAnimationFrame, useMotionValue, useScroll, useSpring, useVelocity } from 'framer-motion';
import { useReducedMotion } from '@/lib/hooks';

type Props = {
  children: React.ReactNode;
  /** seconds for one full pass */
  speed?: number;
  reverse?: boolean;
  className?: string;
  /** scroll velocity nudges the track forward — §32 */
  velocityAware?: boolean;
};

/* One continuous track, duplicated twice for a seamless wrap.
   Position is driven by the shared GSAP/Framer frame loop rather than
   a CSS animation so scroll velocity can bias it. */
export default function Marquee({
  children,
  speed = 34,
  reverse = false,
  className = '',
  velocityAware = true,
}: Props) {
  const reduced = useReducedMotion();
  const x = useMotionValue(0);
  const trackRef = useRef<HTMLDivElement>(null);

  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(velocity, { stiffness: 380, damping: 52 });

  useAnimationFrame((_, delta) => {
    if (reduced || !trackRef.current) return;
    const width = trackRef.current.offsetWidth;
    if (!width) return;

    const base = (width / speed) * (delta / 1000) * (reverse ? 1 : -1);
    const boost = velocityAware
      ? Math.max(-2.4, Math.min(2.4, smoothVelocity.get() / 1600)) * (delta / 1000) * 60
      : 0;

    let next = x.get() + base - boost;
    if (next <= -width) next += width;
    if (next >= 0) next -= width;
    x.set(next);
  });

  return (
    <div className={`relative flex overflow-hidden ${className}`}>
      <motion.div className="marquee-track flex shrink-0" style={{ x }}>
        <div ref={trackRef} className="flex shrink-0 items-center">
          {children}
        </div>
        <div className="flex shrink-0 items-center" aria-hidden>
          {children}
        </div>
      </motion.div>
    </div>
  );
}
