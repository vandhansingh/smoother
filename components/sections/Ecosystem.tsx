'use client';

import { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Layers, Radio, LineChart, Check } from 'lucide-react';
import { Flip, gsap } from '@/lib/gsap';
import { useIsomorphicLayoutEffect, useReducedMotion } from '@/lib/hooks';
import FadeUp from '@/components/motion/FadeUp';
import SplitText from '@/components/motion/SplitText';
import { EASE_PREMIUM } from '@/lib/motion';

const pillars = [
  {
    id: 'creative',
    index: '01',
    title: 'Creative',
    Icon: Layers,
    line: 'One master, every derivative — sized, translated and on brand.',
    detail: [
      'Template systems with enforced brand rules',
      'Automatic resizing across 40+ placements',
      'Locale and legal variants in a single pass',
    ],
  },
  {
    id: 'media',
    index: '02',
    title: 'Media',
    Icon: Radio,
    line: 'One plan, every channel — budgets that move while you sleep.',
    detail: [
      'Unified budget across paid social, video and retail',
      'Pacing rules that reallocate hourly',
      'Native launch to each platform, no re-uploads',
    ],
  },
  {
    id: 'intelligence',
    index: '03',
    title: 'Intelligence',
    Icon: LineChart,
    line: 'One record of truth — creative attributes tied to real outcomes.',
    detail: [
      'Attribute-level lift on every asset shipped',
      'Incrementality tests without a separate stack',
      'Findings routed straight back into templates',
    ],
  },
];

export default function Ecosystem() {
  const [active, setActive] = useState(0);
  const container = useRef<HTMLDivElement>(null);
  const flipState = useRef<ReturnType<typeof Flip.getState> | null>(null);
  const reduced = useReducedMotion();

  const select = (i: number) => {
    if (i === active) return;
    if (container.current && !reduced) {
      flipState.current = Flip.getState(container.current.querySelectorAll('[data-flip]'));
    }
    setActive(i);
  };

  useIsomorphicLayoutEffect(() => {
    if (!flipState.current) return;
    Flip.from(flipState.current, {
      duration: 0.62,
      ease: 'power3.out',
      nested: true,
      absolute: false,
    });
    flipState.current = null;
  }, [active]);

  useIsomorphicLayoutEffect(() => {
    if (reduced || !container.current) return;
    const ctx = gsap.context(() => {
      gsap.from('[data-flip]', {
        opacity: 0,
        y: 40,
        scale: 0.97,
        duration: 0.62,
        stagger: 0.055,
        ease: 'power3.out',
        scrollTrigger: { trigger: container.current, start: 'top 82%', once: true },
      });
    }, container);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section id="ecosystem" className="relative overflow-hidden bg-bg-secondary py-section">
      <div className="shell">
        <div className="grid items-end gap-x-8 gap-y-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <FadeUp>
              <p className="eyebrow flex items-center gap-3">
                <span className="h-px w-8 bg-primary" />
                The platform
              </p>
            </FadeUp>
            <SplitText
              as="h2"
              by="line"
              text={['Three motions.', 'One continuous loop.']}
              className="mt-6 text-section font-medium"
              stagger={0.09}
            />
          </div>
          <FadeUp delay={0.1} className="lg:col-span-4 lg:col-start-9">
            <p className="font-text text-lead text-muted">
              Most stacks hand work between tools and lose the context on every pass. Signalarc
              keeps one object model from brief to result — the loop never breaks.
            </p>
          </FadeUp>
        </div>

        {/* the loop, drawn */}
        <div aria-hidden className="relative mt-14 hidden h-16 lg:block">
          <svg viewBox="0 0 1200 64" preserveAspectRatio="none" className="h-full w-full text-line">
            <motion.path
              d="M292 64 C 292 16, 430 10, 600 10 C 770 10, 1058 16, 1058 64"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 1.2, ease: EASE_PREMIUM as unknown as number[] }}
            />
            <motion.circle
              r="4"
              className="fill-primary"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.9, duration: 0.3 }}
              cx="600"
              cy="6"
            />
          </svg>
          <span className="absolute left-1/2 top-4 -translate-x-1/2 bg-bg-secondary px-4 text-[0.6875rem] uppercase tracking-[0.16em] text-muted">
            Every result re-enters the brief
          </span>
        </div>

        {/* pillars — Flip handles the layout change so the cards travel
            to their new size rather than snapping */}
        <div
          ref={container}
          className="mt-10 grid gap-3 lg:mt-0 lg:grid-flow-col lg:auto-cols-fr"
        >
          {pillars.map((p, i) => {
            const isActive = i === active;
            return (
              <button
                key={p.id}
                data-flip
                type="button"
                onClick={() => select(i)}
                onFocus={() => select(i)}
                aria-expanded={isActive}
                className={[
                  'group relative flex flex-col justify-between overflow-hidden rounded-lg border p-6 text-left transition-colors duration-medium ease-premium sm:p-8',
                  isActive
                    ? 'border-ink/15 bg-surface shadow-soft lg:col-span-2'
                    : 'border-line bg-transparent hover:bg-surface/60',
                ].join(' ')}
                style={{ minHeight: 'clamp(15rem, 22vw, 19rem)' }}
              >
                <span className="flex items-start justify-between gap-6">
                  <span className="flex items-center gap-3">
                    <span
                      className={[
                        'flex h-9 w-9 items-center justify-center rounded-sm transition-colors duration-medium ease-premium',
                        isActive ? 'bg-primary text-bg' : 'bg-bg text-ink/60',
                      ].join(' ')}
                    >
                      <p.Icon className="h-4 w-4" strokeWidth={1.75} />
                    </span>
                    <span className="text-[0.6875rem] uppercase tracking-[0.16em] text-muted">
                      {p.index}
                    </span>
                  </span>
                </span>

                <span className="mt-10 block">
                  <span className="block text-[clamp(1.75rem,2.6vw,2.5rem)] font-medium leading-[1.05] tracking-[-0.035em]">
                    {p.title}
                  </span>
                  <span className="mt-3 block max-w-[34ch] font-text text-[0.9375rem] leading-relaxed text-muted">
                    {p.line}
                  </span>

                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.span
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0, transition: { duration: 0.2 } }}
                        transition={{ duration: 0.42, ease: EASE_PREMIUM as unknown as number[] }}
                        className="block overflow-hidden"
                      >
                        <span className="mt-6 flex flex-col gap-2.5 border-t border-line pt-5">
                          {p.detail.map((d, di) => (
                            <motion.span
                              key={d}
                              initial={{ opacity: 0, x: -8 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{
                                duration: 0.34,
                                delay: 0.1 + di * 0.05,
                                ease: EASE_PREMIUM as unknown as number[],
                              }}
                              className="flex items-start gap-2.5 text-[0.875rem] text-ink/80"
                            >
                              <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-secondary" strokeWidth={2.25} />
                              {d}
                            </motion.span>
                          ))}
                        </span>
                      </motion.span>
                    )}
                  </AnimatePresence>
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
