'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import FadeUp from '@/components/motion/FadeUp';
import SplitText from '@/components/motion/SplitText';
import Parallax from '@/components/motion/Parallax';
import FloatingElement from '@/components/motion/FloatingElement';
import TiltCard from '@/components/motion/TiltCard';
import MediaFlow from '@/components/ui/MediaFlow';
import { EASE_PREMIUM } from '@/lib/motion';

const facts = [
  { k: 'Reallocation window', v: 'Hourly' },
  { k: 'Channels under one budget', v: '14' },
  { k: 'Manual re-uploads', v: 'None' },
];

export default function Media() {
  return (
    <section id="media" className="relative overflow-hidden bg-surface py-section">
      {/* a single quiet ground shape keeps the section from reading flat */}
      <Parallax speed={0.16} className="pointer-events-none absolute -left-40 top-1/4 -z-10 hidden w-[34rem] lg:block">
        <svg viewBox="0 0 400 400" className="w-full text-bg-secondary" aria-hidden>
          <circle cx="200" cy="200" r="200" fill="currentColor" />
        </svg>
      </Parallax>

      <div className="shell">
        <div className="grid gap-x-10 gap-y-[clamp(4rem,7vw,6rem)] lg:grid-cols-12 lg:items-center">
          {/* ---------- visual ---------- */}
          <div className="order-2 lg:order-1 lg:col-span-6">
            <Parallax speed={0.26}>
              <div className="group relative">
                <TiltCard max={3.5}>
                  <MediaFlow tone="dark" className="shadow-panel" />
                </TiltCard>

                <FloatingElement
                  amplitude={9}
                  rotate={0.6}
                  duration={7}
                  className="absolute -right-3 -top-9 z-10 sm:-right-8"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.62, delay: 0.15, ease: EASE_PREMIUM as unknown as number[] }}
                    className="w-[11rem] rounded-md border border-line bg-surface p-3.5 shadow-lift"
                  >
                    <span className="block text-[0.625rem] uppercase tracking-[0.14em] text-muted">
                      Pacing
                    </span>
                    <span className="mt-2 flex h-9 items-end gap-[3px]" aria-hidden>
                      {[42, 55, 48, 62, 58, 71, 66, 80, 74, 91].map((h, i) => (
                        <motion.span
                          key={i}
                          className={`flex-1 rounded-[1px] ${i > 6 ? 'bg-accent' : 'bg-line'}`}
                          initial={{ height: 0 }}
                          whileInView={{ height: `${h}%` }}
                          viewport={{ once: true, amount: 0.5 }}
                          transition={{
                            duration: 0.5,
                            delay: 0.3 + i * 0.035,
                            ease: EASE_PREMIUM as unknown as number[],
                          }}
                        />
                      ))}
                    </span>
                    <span className="mt-2.5 block text-[0.6875rem] leading-snug text-muted">
                      On plan · 97% delivery
                    </span>
                  </motion.div>
                </FloatingElement>
              </div>
            </Parallax>
          </div>

          {/* ---------- copy ---------- */}
          <div className="order-1 lg:order-2 lg:col-span-5 lg:col-start-8">
            <FadeUp>
              <p className="eyebrow flex items-center gap-3">
                <span className="flex h-5 w-5 items-center justify-center rounded-pill bg-primary text-[0.5625rem] font-semibold text-bg">
                  2
                </span>
                Media
              </p>
            </FadeUp>

            <SplitText
              as="h2"
              by="line"
              text={['One budget that', 'keeps moving', 'toward the work', 'that works.']}
              className="mt-6 text-[clamp(2.5rem,4.6vw,4.25rem)] font-medium leading-[0.98] tracking-[-0.04em]"
              stagger={0.07}
              duration={0.78}
            />

            <FadeUp delay={0.06}>
              <p className="mt-7 max-w-[42ch] font-text text-lead text-muted">
                Channels stop being separate plans with separate reports. Signalarc activates
                natively on each one, then paces the whole budget against a single objective.
              </p>
            </FadeUp>

            <dl className="mt-11 flex flex-col">
              {facts.map((f, i) => (
                <motion.div
                  key={f.k}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{
                    duration: 0.44,
                    delay: i * 0.055,
                    ease: EASE_PREMIUM as unknown as number[],
                  }}
                  className="flex items-baseline justify-between gap-6 border-t border-line py-4 last:border-b"
                >
                  <dt className="font-text text-[0.9375rem] text-muted">{f.k}</dt>
                  <dd className="text-[1.0625rem] font-medium tracking-[-0.02em]">{f.v}</dd>
                </motion.div>
              ))}
            </dl>

            <FadeUp delay={0.1}>
              <a
                href="#cta"
                className="group mt-9 inline-flex items-center gap-2 text-[0.9375rem] font-medium text-ink"
              >
                <span className="relative">
                  See activation in practice
                  <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-primary transition-transform duration-[260ms] ease-premium group-hover:scale-x-100" />
                </span>
                <ArrowUpRight className="h-4 w-4 transition-transform duration-[200ms] ease-premium group-hover:translate-x-[4px] group-hover:-translate-y-[3px]" />
              </a>
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  );
}
