'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { useIsMobile, useReducedMotion } from '@/lib/hooks';

type Props = {
  children: (progress: number, index: number) => React.ReactNode;
  /** number of narrative steps; scroll distance scales with it */
  steps: number;
  /** viewport heights of scroll per step */
  perStep?: number;
  className?: string;
  id?: string;
  /** on mobile / reduced motion the section un-pins and stacks */
  fallback?: React.ReactNode;
};

/* Pinned storytelling driver. Exposes a 0–1 progress value and the
   active step index so the section can render a continuous
   transformation instead of a slideshow of cross-fades.

   Pinning is switched off below 900px and under prefers-reduced-motion;
   in those cases the caller renders a stacked composition instead. */
export default function PinnedSection({
  children,
  steps,
  perStep = 1,
  className = '',
  id,
  fallback,
}: Props) {
  const wrapper = useRef<HTMLDivElement>(null);
  const pinned = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [index, setIndex] = useState(0);
  const isMobile = useIsMobile();
  const reduced = useReducedMotion();
  const disabled = isMobile || reduced;

  useEffect(() => {
    if (disabled || !wrapper.current || !pinned.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: wrapper.current,
        start: 'top top',
        end: () => `+=${window.innerHeight * perStep * steps}`,
        pin: pinned.current,
        pinSpacing: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const p = self.progress;
          setProgress(p);
          setIndex(Math.min(steps - 1, Math.floor(p * steps)));
        },
      });
    }, wrapper);

    return () => ctx.revert();
  }, [disabled, steps, perStep]);

  if (disabled && fallback) {
    return (
      <section id={id} className={className}>
        {fallback}
      </section>
    );
  }

  return (
    <section id={id} ref={wrapper} className={className}>
      <div ref={pinned} className="relative min-h-[100svh] overflow-hidden">
        {children(progress, index)}
      </div>
    </section>
  );
}
