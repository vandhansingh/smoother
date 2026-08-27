'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import CreativeCanvas from '@/components/ui/CreativeCanvas';
import FloatingElement from '@/components/motion/FloatingElement';
import Parallax from '@/components/motion/Parallax';
import MorphShape from '@/components/motion/MorphShape';
import Counter from '@/components/motion/Counter';
import { EASE_PREMIUM, heroBeats } from '@/lib/motion';

/* ============================================================
   HERO VISUAL — seven layers, four parallax depths
   background 0.14 · middle 0.32 · primary 0.62 · foreground 0.95
   Every layer is original geometry or product surface; nothing here
   is decorative for its own sake — the composition is the product.
   ============================================================ */

const blob = [
  'M100 12c48 0 88 40 88 88s-40 88-88 88-88-40-88-88S52 12 100 12Z',
  'M100 8c52 8 92 34 84 92s-46 92-96 88-80-52-72-104S48 0 100 8Z',
  'M104 14c46-6 82 30 82 82 0 54-30 90-84 90-52 0-84-34-84-88 0-52 40-78 86-84Z',
];

const enter = (delay: number) => ({
  initial: { opacity: 0, y: 34, scale: 0.97 },
  animate: { opacity: 1, y: 0, scale: 1 },
  transition: { duration: 0.95, delay, ease: EASE_PREMIUM as unknown as number[] },
});

export default function HeroVisual() {
  return (
    <div className="relative isolate mx-auto w-full max-w-[36rem] lg:max-w-none">
      {/* layer 1 — background ring, slowest */}
      <Parallax speed={0.14} className="pointer-events-none absolute -right-16 -top-24 -z-10 hidden w-[30rem] sm:block">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotate: -8 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1.4, delay: heroBeats.visual, ease: EASE_PREMIUM as unknown as number[] }}
        >
          <svg viewBox="0 0 400 400" className="w-full text-accent/45" aria-hidden>
            <circle cx="200" cy="200" r="188" fill="none" stroke="currentColor" strokeWidth="1" />
            <circle cx="200" cy="200" r="132" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="2 7" />
          </svg>
        </motion.div>
      </Parallax>

      {/* layer 2 — morphing clay form, middle depth */}
      <Parallax speed={0.32} className="pointer-events-none absolute -left-20 top-24 -z-10 hidden w-56 lg:block">
        <FloatingElement amplitude={13} rotate={0.9} duration={8.5}>
          <motion.div
            initial={{ opacity: 0, scale: 0.86 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, delay: heroBeats.visual + 0.12, ease: EASE_PREMIUM as unknown as number[] }}
          >
            <MorphShape
              paths={blob}
              viewBox="0 0 200 200"
              className="w-full text-primary/[0.13]"
              duration={5.5}
              mode="loop"
            />
          </motion.div>
        </FloatingElement>
      </Parallax>

      {/* layer 3 — primary product surface */}
      <Parallax speed={0.62}>
        <motion.div {...enter(heroBeats.visual)} className="relative">
          <CreativeCanvas className="origin-bottom-left lg:rotate-[-0.6deg]" />
        </motion.div>
      </Parallax>

      {/* layer 4 — performance card, foreground */}
      <Parallax speed={0.95} className="absolute right-0 -top-9 z-20 sm:-right-6 lg:-right-8">
        <FloatingElement amplitude={9} rotate={0.6} duration={6.2} delay={0.4}>
          <motion.div
            {...enter(heroBeats.visual + 0.18)}
            className="w-[10.5rem] rounded-md border border-line bg-surface p-3.5 shadow-lift sm:w-[11.5rem]"
          >
            <span className="flex items-center gap-1.5 text-[0.625rem] uppercase tracking-[0.14em] text-muted">
              <Sparkles className="h-3 w-3 text-accent" />
              Live lift
            </span>
            <Counter
              value={38.4}
              decimals={1}
              prefix="+"
              suffix="%"
              className="mt-2 block text-[1.75rem] font-medium leading-none tracking-[-0.04em] text-primary"
            />
            <span className="mt-1.5 block text-[0.6875rem] leading-snug text-muted">
              CTR on winning variants
            </span>
            <div className="mt-3 flex h-6 items-end gap-1" aria-hidden>
              {[38, 52, 44, 61, 73, 68, 88].map((h, i) => (
                <motion.span
                  key={i}
                  className={`flex-1 rounded-[1px] ${i > 4 ? 'bg-primary' : 'bg-line'}`}
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  transition={{
                    duration: 0.5,
                    delay: heroBeats.visual + 0.4 + i * 0.045,
                    ease: EASE_PREMIUM as unknown as number[],
                  }}
                />
              ))}
            </div>
          </motion.div>
        </FloatingElement>
      </Parallax>

      {/* layer 5 — routing chip, foreground */}
      <Parallax speed={0.88} className="absolute -bottom-8 -left-2 z-20 sm:-left-8 lg:-left-16">
        <FloatingElement amplitude={8} rotate={0.7} duration={7.4} delay={1.1}>
          <motion.div
            {...enter(heroBeats.visual + 0.3)}
            className="flex items-center gap-3 rounded-pill border border-line bg-surface py-2 pl-2 pr-4 shadow-soft"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-pill bg-secondary text-bg">
              <ArrowUpRight className="h-3.5 w-3.5" />
            </span>
            <span className="text-[0.75rem] leading-tight">
              <strong className="font-medium">Budget rerouted</strong>
              <span className="block text-muted">TikTok · 14 min ago</span>
            </span>
          </motion.div>
        </FloatingElement>
      </Parallax>

      {/* layer 6 — locale ticker, quiet foreground detail */}
      <Parallax speed={0.75} className="absolute -bottom-14 right-4 z-10 hidden lg:block">
        <motion.div
          {...enter(heroBeats.visual + 0.42)}
          className="flex items-center gap-2 rounded-sm border border-line bg-bg-secondary/70 px-3 py-1.5 backdrop-blur-sm"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-pill bg-primary opacity-60" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-pill bg-primary" />
          </span>
          <span className="text-[0.6875rem] tracking-[0.04em] text-muted">
            26 markets syncing
          </span>
        </motion.div>
      </Parallax>
    </div>
  );
}
