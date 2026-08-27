'use client';

import { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import MagneticButton from '@/components/motion/MagneticButton';
import RevealText from '@/components/motion/RevealText';
import FadeUp from '@/components/motion/FadeUp';
import MorphShape from '@/components/motion/MorphShape';
import { useIsMobile, useReducedMotion } from '@/lib/hooks';
import { EASE_PREMIUM } from '@/lib/motion';

const mark = [
  'M100 20c44 0 80 36 80 80s-36 80-80 80-80-36-80-80 36-80 80-80Z',
  'M104 16c46 4 76 40 76 88s-38 76-86 76-78-36-78-84 42-84 88-80Z',
  'M96 22c48-4 84 28 84 78s-32 80-82 80-78-34-78-82 28-72 76-76Z',
];

const reassurance = ['Live in 11 days', 'No creative migration', 'Your data stays yours'];

export default function FinalCTA() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const isMobile = useIsMobile();
  const active = !reduced && !isMobile;

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] });
  const smooth = useSpring(scrollYProgress, { stiffness: 200, damping: 42, mass: 0.4 });
  const scale = useTransform(smooth, [0, 1], active ? [0.82, 1.04] : [1, 1]);
  const rotate = useTransform(smooth, [0, 1], active ? [-10, 6] : [0, 0]);

  return (
    <section
      id="cta"
      ref={ref}
      className="on-dark relative flex min-h-[92svh] items-center overflow-hidden bg-surface-alt py-section text-ink"
    >
      {/* The clay form grows as the section is entered — the palette
          moment the page has been holding back for. It sits in the open
          right half rather than bleeding off a corner, so it reads as a
          mark rather than a crop. */}
      <motion.div
        aria-hidden
        style={{ scale, rotate }}
        className="pointer-events-none absolute right-[3%] top-[12%] hidden w-[clamp(16rem,30vw,29rem)] md:block"
      >
        <MorphShape
          paths={mark}
          viewBox="0 0 200 200"
          className="w-full text-primary/[0.22]"
          duration={7}
          mode="loop"
        />
        <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full text-accent/25" aria-hidden>
          <circle cx="100" cy="100" r="96" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <circle cx="100" cy="100" r="70" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1.5 5" />
        </svg>
      </motion.div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            'radial-gradient(circle at center, rgb(243 239 231 / 0.09) 1px, transparent 1px)',
          backgroundSize: '38px 38px',
          maskImage: 'radial-gradient(90% 70% at 12% 50%, black 0%, transparent 72%)',
          WebkitMaskImage: 'radial-gradient(90% 70% at 12% 50%, black 0%, transparent 72%)',
        }}
      />

      <div className="shell relative w-full">
        <FadeUp>
          <p className="eyebrow flex items-center gap-3">
            <span className="h-px w-8 bg-primary" />
            Start the loop
          </p>
        </FadeUp>

        <RevealText
          as="h2"
          lines={['Bring us one', 'campaign.', 'Keep the rest.']}
          className="mt-9 max-w-[16ch] text-[clamp(3rem,7.4vw,8rem)] font-medium leading-[0.92] tracking-[-0.045em]"
          lineClassName="[&:nth-child(3)]:text-primary"
          stagger={0.085}
          duration={0.9}
        />

        <FadeUp delay={0.1}>
          <p className="mt-9 max-w-[46ch] font-text text-lead text-muted">
            We run a single programme end to end — production, activation, measurement — and you
            keep every asset and every finding, whatever you decide afterwards.
          </p>
        </FadeUp>

        <FadeUp delay={0.14}>
          <div className="mt-11 flex flex-wrap items-center gap-3">
            <MagneticButton
              href="#cta"
              className="group inline-flex items-center rounded-pill bg-primary px-7 py-4 text-[1rem] font-medium text-bg transition-colors duration-medium ease-premium hover:bg-bg hover:text-surface-alt"
              data-cursor
            >
              Book a demo
              <ArrowUpRight className="h-4 w-4 transition-transform duration-[200ms] ease-premium group-hover:translate-x-[4px] group-hover:-translate-y-[3px]" />
            </MagneticButton>

            <MagneticButton
              href="#footer"
              strength={5}
              className="group inline-flex items-center rounded-pill border border-line px-7 py-4 text-[1rem] font-medium text-ink transition-colors duration-medium ease-premium hover:border-ink/40"
              data-cursor
            >
              Talk to sales
              <ArrowUpRight className="h-4 w-4 transition-transform duration-[200ms] ease-premium group-hover:translate-x-[4px] group-hover:-translate-y-[3px]" />
            </MagneticButton>
          </div>
        </FadeUp>

        <motion.ul
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
          variants={{ show: { transition: { staggerChildren: 0.05, delayChildren: 0.2 } } }}
          className="mt-12 flex flex-wrap gap-x-8 gap-y-3 border-t border-line pt-7"
        >
          {reassurance.map((r) => (
            <motion.li
              key={r}
              variants={{
                hidden: { opacity: 0, y: 12 },
                show: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.4, ease: EASE_PREMIUM as unknown as number[] },
                },
              }}
              className="flex items-center gap-2.5 text-[0.875rem] text-muted"
            >
              <span className="h-1 w-1 rounded-pill bg-accent" />
              {r}
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
