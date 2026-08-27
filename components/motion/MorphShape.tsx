'use client';

import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { useReducedMotion } from '@/lib/hooks';

type Props = {
  /** two or more path `d` strings; the shape travels through them in order */
  paths: string[];
  className?: string;
  viewBox?: string;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  /** 'scrub' ties the morph to scroll, 'loop' runs it ambiently */
  mode?: 'scrub' | 'loop' | 'manual';
  /** 0–1 progress when mode is 'manual' */
  progress?: number;
  duration?: number;
  trigger?: string;
};

/* Abstract SVG object that travels between forms rather than cutting
   between them — the continuity device behind the path storytelling. */
export default function MorphShape({
  paths,
  className = '',
  viewBox = '0 0 200 200',
  fill = 'currentColor',
  stroke,
  strokeWidth = 1.25,
  mode = 'loop',
  progress,
  duration = 2.4,
  trigger,
}: Props) {
  const pathRef = useRef<SVGPathElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = pathRef.current;
    if (!el || reduced || paths.length < 2 || mode === 'manual') return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        repeat: mode === 'loop' ? -1 : 0,
        yoyo: mode === 'loop',
        defaults: { ease: mode === 'scrub' ? 'none' : 'power1.inOut', duration },
        ...(mode === 'scrub'
          ? {
              scrollTrigger: {
                trigger: trigger ?? el,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 0.8,
              },
            }
          : {}),
      });

      paths.slice(1).forEach((d) => {
        tl.to(el, { morphSVG: d });
      });
    });

    return () => ctx.revert();
  }, [paths, mode, duration, reduced, trigger]);

  useEffect(() => {
    const el = pathRef.current;
    if (!el || mode !== 'manual' || progress === undefined || paths.length < 2) return;
    const span = paths.length - 1;
    const scaled = Math.max(0, Math.min(0.9999, progress)) * span;
    const i = Math.floor(scaled);
    gsap.to(el, {
      morphSVG: paths[Math.min(i + 1, paths.length - 1)],
      duration: 0.4,
      ease: 'power2.out',
      overwrite: true,
    });
  }, [progress, mode, paths]);

  useEffect(() => () => ScrollTrigger.refresh(), []);

  return (
    <svg viewBox={viewBox} className={className} aria-hidden focusable="false">
      <path
        ref={pathRef}
        d={paths[0]}
        fill={stroke ? 'none' : fill}
        stroke={stroke}
        strokeWidth={stroke ? strokeWidth : undefined}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
