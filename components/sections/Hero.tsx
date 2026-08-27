'use client';

import { motion } from 'framer-motion';
import { ArrowDown, ArrowUpRight, Play } from 'lucide-react';
import SplitText from '@/components/motion/SplitText';
import MagneticButton from '@/components/motion/MagneticButton';
import HeroVisual from './HeroVisual';
import { EASE_PREMIUM, heroBeats } from '@/lib/motion';

const proof = [
  { value: '$4.2B', label: 'media optimised each year' },
  { value: '26', label: 'markets, one workspace' },
  { value: '11 days', label: 'average time to first lift' },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden pb-[clamp(5rem,10vw,9rem)] pt-[calc(var(--header-height)+clamp(2.5rem,6vw,5.5rem))]">
      {/* ambient ground: a single arc and a quiet dot field */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.1, delay: heroBeats.background, ease: EASE_PREMIUM as unknown as number[] }}
      >
        <div
          className="absolute inset-0 opacity-[0.55]"
          style={{
            backgroundImage:
              'radial-gradient(circle at center, rgb(var(--rgb-border)) 1px, transparent 1px)',
            backgroundSize: '34px 34px',
            maskImage: 'radial-gradient(120% 90% at 20% 0%, black 0%, transparent 68%)',
            WebkitMaskImage: 'radial-gradient(120% 90% at 20% 0%, black 0%, transparent 68%)',
          }}
        />
        <svg
          viewBox="0 0 1600 800"
          preserveAspectRatio="xMidYMid slice"
          className="absolute inset-0 h-full w-full text-line"
        >
          <motion.path
            d="M-40 700 C 300 700, 420 180, 820 180 C 1180 180, 1240 470, 1660 430"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2.1, delay: 0.35, ease: EASE_PREMIUM as unknown as number[] }}
          />
        </svg>
      </motion.div>

      <div className="shell">
        <div className="grid items-center gap-x-8 gap-y-[clamp(4rem,9vw,6rem)] lg:grid-cols-12">
          {/* ---------- copy ---------- */}
          <div className="min-w-0 lg:col-span-7">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: heroBeats.eyebrow, ease: EASE_PREMIUM as unknown as number[] }}
              className="eyebrow flex items-center gap-3"
            >
              <span className="h-px w-8 bg-primary" />
              Creative intelligence platform
            </motion.p>

            <SplitText
              as="h1"
              by="line"
              text={['Make the work.', 'Move the market.', 'Know why it moved.']}
              className="mt-6 text-[clamp(2.75rem,5.2vw,5rem)] font-medium leading-[0.94] tracking-[-0.045em]"
              lineClassName="[&:nth-child(3)]:text-primary"
              delay={heroBeats.headline}
              stagger={0.13}
              duration={0.9}
            />

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: heroBeats.description, ease: EASE_PREMIUM as unknown as number[] }}
              className="mt-8 max-w-[46ch] text-lead font-text text-muted"
            >
              Signalarc joins creative production, media activation and performance
              intelligence into one continuous system — so the ten-thousandth variant is
              measurably smarter than the first.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: heroBeats.ctas, ease: EASE_PREMIUM as unknown as number[] }}
              className="mt-10 flex flex-wrap items-center gap-3"
            >
              <MagneticButton
                href="#cta"
                className="group inline-flex items-center rounded-pill bg-ink px-6 py-3.5 text-[0.9375rem] font-medium text-bg transition-colors duration-medium ease-premium hover:bg-primary"
                data-cursor
              >
                Book a demo
                <ArrowUpRight className="h-4 w-4 transition-transform duration-[200ms] ease-premium group-hover:translate-x-[4px] group-hover:-translate-y-[3px]" />
              </MagneticButton>

              <MagneticButton
                href="#ecosystem"
                strength={5}
                className="group inline-flex items-center rounded-pill border border-line bg-transparent px-6 py-3.5 text-[0.9375rem] font-medium text-ink transition-colors duration-medium ease-premium hover:border-ink/35 hover:bg-surface"
                data-cursor
              >
                <span className="flex h-5 w-5 items-center justify-center rounded-pill bg-ink/8 transition-colors duration-medium group-hover:bg-primary group-hover:text-bg">
                  <Play className="h-2.5 w-2.5 fill-current" />
                </span>
                Take the tour
              </MagneticButton>
            </motion.div>
          </div>

          {/* ---------- visual ---------- */}
          <div className="min-w-0 lg:col-span-5 lg:col-start-8">
            <HeroVisual />
          </div>
        </div>

        {/* ---------- proof strip ---------- */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: heroBeats.ambient, ease: EASE_PREMIUM as unknown as number[] }}
          className="mt-[clamp(5rem,10vw,8rem)] flex flex-col gap-6 border-t border-line pt-7 sm:flex-row sm:items-center sm:justify-between"
        >
          <dl className="grid grid-cols-1 gap-5 xs:grid-cols-3 sm:gap-10">
            {proof.map((p) => (
              <div key={p.value} className="flex items-baseline gap-2.5 sm:flex-col sm:gap-1">
                <dt className="text-[1.375rem] font-medium tracking-[-0.03em]">{p.value}</dt>
                <dd className="text-[0.8125rem] text-muted">{p.label}</dd>
              </div>
            ))}
          </dl>

          <a
            href="#intro"
            className="group hidden shrink-0 items-center gap-2.5 text-[0.75rem] uppercase tracking-[0.14em] text-muted transition-colors duration-fast hover:text-ink sm:flex"
          >
            Scroll
            <span className="flex h-8 w-8 items-center justify-center rounded-pill border border-line transition-colors duration-medium ease-premium group-hover:border-ink/30">
              <motion.span
                animate={{ y: [0, 3, 0] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                className="ambient-float"
              >
                <ArrowDown className="h-3.5 w-3.5" />
              </motion.span>
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
