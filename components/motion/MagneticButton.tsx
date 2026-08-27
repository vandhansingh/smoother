'use client';

import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useHasFinePointer, useReducedMotion } from '@/lib/hooks';
import { springs } from '@/lib/motion';

type Props = {
  children: React.ReactNode;
  className?: string;
  /** max travel toward the cursor — never above 8px */
  strength?: number;
  href?: string;
  onClick?: () => void;
  as?: 'button' | 'a' | 'div';
  ariaLabel?: string;
  type?: 'button' | 'submit';
  target?: string;
  rel?: string;
  /** data-* passthrough (e.g. data-cursor) */
  [key: `data-${string}`]: string | boolean | undefined;
};

/* Magnetic pull, capped at 7px. Response is spring-driven so the
   button is already moving inside ~100ms and settles without bounce. */
export default function MagneticButton({
  children,
  className = '',
  strength = 6,
  href,
  onClick,
  as,
  ariaLabel,
  type = 'button',
  ...rest
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const fine = useHasFinePointer();
  const active = !reduced && fine;

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, springs.magnetic);
  const y = useSpring(my, springs.magnetic);

  // The label trails the frame slightly — a small depth cue.
  const labelX = useTransform(x, (v) => v * 0.45);
  const labelY = useTransform(y, (v) => v * 0.45);

  const handleMove = (e: React.MouseEvent) => {
    if (!active || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    const cap = Math.min(strength, 7);
    mx.set(Math.max(-cap, Math.min(cap, (dx / rect.width) * cap * 2)));
    my.set(Math.max(-cap, Math.min(cap, (dy / rect.height) * cap * 2)));
  };

  const reset = () => {
    mx.set(0);
    my.set(0);
  };

  const Tag = (as ?? (href ? 'a' : 'button')) as 'button';
  const MotionTag = motion[Tag] as typeof motion.button;

  return (
    <MotionTag
      ref={ref as React.Ref<HTMLButtonElement>}
      className={className}
      style={{ x, y }}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      onBlur={reset}
      onClick={onClick}
      aria-label={ariaLabel}
      {...rest}
      {...(href ? { href } : { type })}
    >
      <motion.span className="pointer-events-none flex items-center gap-2" style={{ x: labelX, y: labelY }}>
        {children}
      </motion.span>
    </MotionTag>
  );
}
