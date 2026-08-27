'use client';

import { motion } from 'framer-motion';
import ScrollHighlightText from '@/components/motion/ScrollHighlightText';
import Marquee from '@/components/motion/Marquee';
import FadeUp from '@/components/motion/FadeUp';
import { EASE_PREMIUM } from '@/lib/motion';

const capabilities = [
  'Creative automation',
  'Dynamic templating',
  'Localisation at scale',
  'Budget pacing',
  'Channel activation',
  'Creative analytics',
  'Incrementality testing',
  'Asset governance',
  'Audience routing',
  'Brand guardrails',
];

export default function IntroStatement() {
  return (
    <section id="intro" className="relative overflow-hidden py-section">
      <div className="shell">
        <div className="grid gap-x-8 gap-y-10 lg:grid-cols-12">
          <FadeUp className="lg:col-span-3">
            <p className="eyebrow flex items-center gap-3">
              <span className="h-px w-8 bg-primary" />
              The gap
            </p>
          </FadeUp>

          <div className="lg:col-span-9">
            <ScrollHighlightText
              as="h2"
              text="Creative teams now ship more work in a week than they used to ship in a quarter. The measurement never caught up. Most of that output disappears into channels that report on spend, not on craft — so the next brief starts from instinct instead of evidence."
              accent={['craft', 'evidence']}
              className="max-w-[26ch] text-[clamp(1.75rem,3.6vw,3.25rem)] font-medium leading-[1.14] tracking-[-0.035em] sm:max-w-[24ch]"
            />

            <FadeUp delay={0.08} className="mt-10 grid gap-8 sm:grid-cols-2 lg:max-w-3xl">
              <p className="font-text text-lead text-muted">
                Signalarc was built to close that gap. Production, activation and analysis run on
                one graph, so every asset carries its own performance history from the moment it is
                made.
              </p>
              <p className="font-text text-lead text-muted">
                The result is not a faster dashboard. It is a shorter distance between an idea and
                the proof that it worked.
              </p>
            </FadeUp>
          </div>
        </div>
      </div>

      {/* capability marquee — one of only two on the page */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7, ease: EASE_PREMIUM as unknown as number[] }}
        className="mt-[clamp(4rem,8vw,7rem)] border-y border-line py-5"
      >
        <Marquee speed={44} className="[mask-image:linear-gradient(90deg,transparent,black_7%,black_93%,transparent)]">
          {capabilities.map((c) => (
            <span key={c} className="flex items-center gap-8 whitespace-nowrap pr-8">
              <span className="text-[0.9375rem] tracking-[-0.01em] text-muted">{c}</span>
              <span className="h-1 w-1 rounded-pill bg-primary/60" />
            </span>
          ))}
        </Marquee>
      </motion.div>
    </section>
  );
}
