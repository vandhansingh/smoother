'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { useReducedMotion } from '@/lib/hooks';

type Props = {
  d: string;
  className?: string;
  viewBox?: string;
  stroke?: string;
  strokeWidth?: number;
  dashed?: boolean;
  /** tie the draw to scroll rather than to entering the viewport */
  scrub?: boolean;
  delay?: number;
  duration?: number;
  children?: React.ReactNode;
};

/* Stroke draw via dashoffset — no plugin needed, and the line reads as
   being written rather than faded in. Used for the connective paths
   that carry the eye between sections. */
export default function PathReveal({
  d,
  className = '',
  viewBox = '0 0 1000 400',
  stroke = 'currentColor',
  strokeWidth = 1.5,
  dashed = false,
  scrub = true,
  delay = 0,
  duration = 1.4,
  children,
}: Props) {
  const ref = useRef<SVGPathElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const length = el.getTotalLength();
    if (dashed) {
      el.style.strokeDasharray = '4 9';
      return;
    }

    if (reduced) {
      el.style.strokeDasharray = 'none';
      el.style.strokeDashoffset = '0';
      return;
    }

    el.style.strokeDasharray = `${length}`;
    el.style.strokeDashoffset = `${length}`;

    const ctx = gsap.context(() => {
      gsap.to(el, {
        strokeDashoffset: 0,
        ease: scrub ? 'none' : 'power2.out',
        duration,
        delay,
        scrollTrigger: {
          trigger: el.closest('svg') ?? el,
          start: scrub ? 'top 88%' : 'top 82%',
          end: scrub ? 'bottom 42%' : undefined,
          scrub: scrub ? 0.7 : false,
          once: !scrub,
        },
      });
    });

    return () => ctx.revert();
  }, [d, dashed, scrub, delay, duration, reduced]);

  return (
    <svg viewBox={viewBox} className={className} fill="none" aria-hidden focusable="false" preserveAspectRatio="none">
      <path
        ref={ref}
        d={d}
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
      {children}
    </svg>
  );
}
