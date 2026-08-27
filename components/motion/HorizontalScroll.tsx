'use client';

import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { useIsMobile, useReducedMotion } from '@/lib/hooks';

type Props = {
  children: React.ReactNode;
  className?: string;
  trackClassName?: string;
};

/* Vertical scroll translated into horizontal travel. Below 900px and
   under reduced motion this degrades to a normal swipeable rail —
   never a hijacked scroll on a touch device. */
export default function HorizontalScroll({ children, className = '', trackClassName = '' }: Props) {
  const wrapper = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const reduced = useReducedMotion();
  const disabled = isMobile || reduced;

  useEffect(() => {
    if (disabled || !wrapper.current || !track.current) return;

    const ctx = gsap.context(() => {
      const distance = () => track.current!.scrollWidth - window.innerWidth + 96;

      gsap.to(track.current, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: wrapper.current,
          start: 'top top',
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      });
    }, wrapper);

    return () => ctx.revert();
  }, [disabled]);

  if (disabled) {
    return (
      <div className={`no-scrollbar overflow-x-auto ${className}`}>
        <div className={`flex ${trackClassName}`}>{children}</div>
      </div>
    );
  }

  return (
    <div ref={wrapper} className={`overflow-hidden ${className}`}>
      <div ref={track} className={`flex will-transform ${trackClassName}`}>
        {children}
      </div>
    </div>
  );
}
