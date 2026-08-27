'use client';

import { ArrowUpRight } from 'lucide-react';
import FadeUp from '@/components/motion/FadeUp';
import SplitText from '@/components/motion/SplitText';
import Parallax from '@/components/motion/Parallax';
import VariantWall from '@/components/ui/VariantWall';
import { EASE_PREMIUM } from '@/lib/motion';
import { motion } from 'framer-motion';

const points = [
  {
    n: '01',
    title: 'Templates that hold their shape',
    body: 'Layout, type scale and clear-space rules travel with the master. Resizing cannot break them.',
  },
  {
    n: '02',
    title: 'Localisation as a pass, not a project',
    body: 'Copy decks, legal lines and currency formats resolve per market on export.',
  },
  {
    n: '03',
    title: 'Every derivative keeps its lineage',
    body: 'A variant knows which master it came from, so its result can be read back into the source.',
  },
];

export default function Creative() {
  return (
    <section id="creative" className="relative overflow-hidden py-section">
      <div className="shell">
        <div className="grid gap-x-10 gap-y-[clamp(4rem,7vw,6rem)] lg:grid-cols-12">
          {/* ---------- copy ---------- */}
          <div className="lg:col-span-5">
            <FadeUp>
              <p className="eyebrow flex items-center gap-3">
                <span className="flex h-5 w-5 items-center justify-center rounded-pill bg-primary-dark text-[0.625rem] font-semibold text-bg">
                  1
                </span>
                Creative
              </p>
            </FadeUp>

            <SplitText
              as="h2"
              by="line"
              text={['Ship the two', 'hundredth variant', 'as carefully as', 'the first.']}
              className="mt-6 text-[clamp(2.5rem,4.6vw,4.25rem)] font-medium leading-[0.98] tracking-[-0.04em]"
              stagger={0.07}
              duration={0.78}
            />

            <FadeUp delay={0.06}>
              <p className="mt-7 max-w-[42ch] font-text text-lead text-muted">
                Production stops being a bottleneck when the system understands the design, not just
                the file. Signalarc treats a campaign as one object with many faces.
              </p>
            </FadeUp>

            <ul className="mt-12 flex flex-col">
              {points.map((p, i) => (
                <motion.li
                  key={p.n}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{
                    duration: 0.46,
                    delay: i * 0.055,
                    ease: EASE_PREMIUM as unknown as number[],
                  }}
                  className="group grid grid-cols-[2.5rem_1fr] gap-x-4 border-t border-line py-6 last:border-b"
                >
                  <span className="pt-1 text-[0.6875rem] uppercase tracking-[0.14em] text-muted transition-colors duration-medium group-hover:text-primary">
                    {p.n}
                  </span>
                  <span>
                    <span className="block text-[1.0625rem] font-medium tracking-[-0.02em]">
                      {p.title}
                    </span>
                    <span className="mt-1.5 block max-w-[46ch] font-text text-[0.9375rem] leading-relaxed text-muted">
                      {p.body}
                    </span>
                  </span>
                </motion.li>
              ))}
            </ul>

            <FadeUp delay={0.1}>
              <a
                href="#cta"
                className="group mt-9 inline-flex items-center gap-2 text-[0.9375rem] font-medium text-ink"
              >
                <span className="relative">
                  See how production runs
                  <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-primary transition-transform duration-[260ms] ease-premium group-hover:scale-x-100" />
                </span>
                <ArrowUpRight className="h-4 w-4 transition-transform duration-[200ms] ease-premium group-hover:translate-x-[4px] group-hover:-translate-y-[3px]" />
              </a>
            </FadeUp>
          </div>

          {/* ---------- visual ---------- */}
          <div className="lg:col-span-6 lg:col-start-7">
            <Parallax speed={0.22} className="lg:pt-16">
              <VariantWall />
            </Parallax>
          </div>
        </div>
      </div>
    </section>
  );
}
