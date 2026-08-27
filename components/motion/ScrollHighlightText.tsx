'use client';

import { useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { useIsomorphicLayoutEffect, useReducedMotion } from '@/lib/hooks';

type Props = {
  text: string;
  className?: string;
  /** words that stay in the primary colour throughout */
  accent?: string[];
  as?: 'p' | 'h2' | 'div';
};

/* Scroll-linked reading: words resolve from the muted tone to full ink
   as the block travels the viewport. Scrubbed, so the rate of reveal is
   the reader's own scroll rate — the text is read, not watched.

   Both ends of the tween are legible colours rather than opacities, so
   the copy never drops below contrast, and reduced motion simply gets
   the resolved state. */
export default function ScrollHighlightText({
  text,
  className = '',
  accent = [],
  as = 'p',
}: Props) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduced = useReducedMotion();

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;

    const ctx = gsap.context(() => {
      const words = el.querySelectorAll<HTMLElement>('[data-word]:not([data-accent])');
      gsap.fromTo(
        words,
        { color: 'rgb(var(--rgb-text-muted))' },
        {
          color: 'rgb(var(--rgb-text))',
          ease: 'none',
          stagger: 0.3,
          scrollTrigger: {
            trigger: el,
            start: 'top 80%',
            end: 'bottom 58%',
            scrub: 0.55,
          },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, [reduced]);

  const Comp = as;
  const accentSet = new Set(accent.map((a) => a.toLowerCase()));

  return (
    <Comp ref={ref as React.Ref<HTMLParagraphElement>} className={className}>
      {text.split(' ').map((word, i) => {
        const key = word.replace(/[^a-z]/gi, '').toLowerCase();
        const isAccent = accentSet.has(key);
        return (
          <span
            key={`${word}-${i}`}
            data-word
            data-accent={isAccent ? '' : undefined}
            className={`inline-block ${isAccent ? 'text-primary' : ''}`}
          >
            {word}
            {' '}
          </span>
        );
      })}
    </Comp>
  );
}
