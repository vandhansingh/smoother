'use client';

import { motion } from 'framer-motion';
import Counter from '@/components/motion/Counter';
import FadeUp from '@/components/motion/FadeUp';
import SplitText from '@/components/motion/SplitText';
import { EASE_PREMIUM } from '@/lib/motion';

const stats = [
  {
    value: 62,
    suffix: '%',
    prefix: '+',
    label: 'median lift in incremental ROAS',
    note: 'Across 41 enterprise accounts, twelve months post-rollout.',
    span: 'lg:col-span-7',
    size: 'text-[clamp(4rem,9vw,8.5rem)]',
  },
  {
    value: 11,
    suffix: ' days',
    label: 'to first measured lift',
    note: 'From kickoff to a result the finance team accepts.',
    span: 'lg:col-span-5',
    size: 'text-[clamp(3.25rem,6vw,6rem)]',
  },
  {
    value: 208,
    suffix: 'k',
    label: 'production hours returned each year',
    note: 'Time previously spent on resizing, relinking and re-exporting.',
    span: 'lg:col-span-5',
    size: 'text-[clamp(3.25rem,6vw,6rem)]',
  },
  {
    value: 4.18,
    decimals: 2,
    suffix: '×',
    label: 'blended return on ad spend',
    note: 'Measured against a held-out control, not a platform-reported figure.',
    span: 'lg:col-span-7',
    size: 'text-[clamp(4rem,9vw,8.5rem)]',
  },
];

export default function Stats() {
  return (
    <section id="results" className="on-dark relative overflow-hidden bg-surface-alt py-section text-ink">
      {/* one quiet ground mark, echoing the closed loop from the story above */}
      <div aria-hidden className="pointer-events-none absolute -right-40 top-1/2 -z-0 hidden -translate-y-1/2 lg:block">
        <svg viewBox="0 0 500 500" className="w-[38rem] text-bg/[0.04]">
          <circle cx="250" cy="250" r="248" fill="none" stroke="currentColor" strokeWidth="1" />
          <circle cx="250" cy="250" r="176" fill="currentColor" />
        </svg>
      </div>

      <div className="shell relative">
        <div className="grid items-end gap-x-10 gap-y-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <FadeUp>
              <p className="eyebrow flex items-center gap-3">
                <span className="h-px w-8 bg-primary" />
                What it adds up to
              </p>
            </FadeUp>
            <SplitText
              as="h2"
              by="line"
              text={['Numbers a CFO', 'will sign off on.']}
              className="mt-6 text-section font-medium"
              stagger={0.09}
            />
          </div>
          <FadeUp delay={0.1} className="lg:col-span-4 lg:col-start-9">
            <p className="font-text text-lead text-muted">
              Every figure below is measured against a held-out control and reconciled to finance,
              because a lift you cannot defend is not a lift.
            </p>
          </FadeUp>
        </div>

        <div className="mt-[clamp(3.5rem,7vw,6rem)] grid gap-px overflow-hidden rounded-lg border border-line bg-line lg:grid-cols-12">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 34 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.55,
                delay: (i % 2) * 0.07,
                ease: EASE_PREMIUM as unknown as number[],
              }}
              className={`flex flex-col justify-between gap-8 bg-surface-alt p-7 sm:p-10 ${s.span}`}
            >
              <Counter
                value={s.value}
                decimals={s.decimals ?? 0}
                prefix={s.prefix}
                suffix={s.suffix}
                duration={1.6}
                className={`block font-medium leading-[0.86] tracking-[-0.05em] ${s.size} ${
                  i % 3 === 0 ? 'text-primary' : 'text-ink'
                }`}
              />
              <div>
                <p className="max-w-[26ch] text-[1.0625rem] font-medium leading-snug tracking-[-0.02em]">
                  {s.label}
                </p>
                <p className="mt-2.5 max-w-[38ch] font-text text-[0.875rem] leading-relaxed text-muted">
                  {s.note}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
