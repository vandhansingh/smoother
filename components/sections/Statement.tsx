'use client';

import { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import RevealText from '@/components/motion/RevealText';
import FadeUp from '@/components/motion/FadeUp';
import MorphShape from '@/components/motion/MorphShape';
import { useIsMobile, useReducedMotion } from '@/lib/hooks';

const blob = [
  'M100 14c47 0 86 39 86 86s-39 86-86 86-86-39-86-86S53 14 100 14Z',
  'M108 10c50 6 78 44 78 96s-40 84-92 84-84-40-84-92 48-94 98-88Z',
  'M96 16c52-4 90 30 90 84s-34 86-88 86-84-36-84-88 30-78 82-82Z',
];

export default function Statement() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const isMobile = useIsMobile();
  const active = !reduced && !isMobile;

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const smooth = useSpring(scrollYProgress, { stiffness: 220, damping: 40, mass: 0.4 });

  // §31 — a single major visual responds directly to scroll progress.
  const scale = useTransform(smooth, [0, 0.5, 1], active ? [0.85, 1, 1.06] : [1, 1, 1]);
  const rotate = useTransform(smooth, [0, 0.5, 1], active ? [-3, 0, 2] : [0, 0, 0]);
  const y = useTransform(smooth, [0, 1], active ? [70, -70] : [0, 0]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[85svh] items-center overflow-hidden py-section"
    >
      <motion.div
        aria-hidden
        style={{ scale, rotate, y }}
        className="pointer-events-none absolute right-[-12%] top-1/2 -z-10 w-[clamp(20rem,44vw,44rem)] -translate-y-1/2"
      >
        <MorphShape
          paths={blob}
          viewBox="0 0 200 200"
          className="w-full text-primary/[0.09]"
          duration={6.5}
          mode="loop"
        />
      </motion.div>

      <div className="shell w-full">
        <FadeUp>
          <p className="eyebrow flex items-center gap-3">
            <span className="h-px w-8 bg-primary" />
            The point of all this
          </p>
        </FadeUp>

        <RevealText
          as="h2"
          lines={['The best', 'creative team', 'is the one', 'that remembers.']}
          className="mt-10 text-statement font-medium"
          lineClassName="[&:nth-child(4)]:text-primary"
          stagger={0.085}
          duration={0.92}
        />

        <FadeUp delay={0.12} className="mt-14 grid gap-8 sm:grid-cols-12">
          <p className="font-text text-lead text-muted sm:col-span-5 sm:col-start-7 lg:col-span-4 lg:col-start-9">
            Talent makes the first good ad. Memory makes the next two hundred. Signalarc is the
            memory.
          </p>
        </FadeUp>
      </div>
    </section>
  );
}
