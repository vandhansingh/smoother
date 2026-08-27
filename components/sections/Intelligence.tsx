'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight, CornerUpLeft } from 'lucide-react';
import FadeUp from '@/components/motion/FadeUp';
import SplitText from '@/components/motion/SplitText';
import Parallax from '@/components/motion/Parallax';
import ScaleReveal from '@/components/motion/ScaleReveal';
import IntelligenceBoard from '@/components/ui/IntelligenceBoard';
import { EASE_PREMIUM } from '@/lib/motion';

export default function Intelligence() {
  return (
    <section id="intelligence" className="relative overflow-hidden py-section">
      <div className="shell">
        <div className="grid gap-x-10 gap-y-[clamp(4rem,7vw,6rem)] lg:grid-cols-12 lg:items-start">
          {/* ---------- copy ---------- */}
          <div className="lg:col-span-5">
            <FadeUp>
              <p className="eyebrow flex items-center gap-3">
                <span className="flex h-5 w-5 items-center justify-center rounded-pill bg-primary-dark text-[0.625rem] font-semibold text-bg">
                  3
                </span>
                Intelligence
              </p>
            </FadeUp>

            <SplitText
              as="h2"
              by="line"
              text={['Not which ad won.', 'Which decision', 'made it win.']}
              className="mt-6 text-[clamp(2.5rem,4.6vw,4.25rem)] font-medium leading-[0.98] tracking-[-0.04em]"
              stagger={0.075}
              duration={0.78}
            />

            <FadeUp delay={0.06}>
              <p className="mt-7 max-w-[42ch] font-text text-lead text-muted">
                Because every asset carries its own lineage, results resolve down to the choices
                that made them: the hook, the crop, the first frame, the colour of the pack shot.
              </p>
            </FadeUp>

            {/* the loop closing — the same gesture as the platform diagram */}
            <FadeUp delay={0.1}>
              <div className="mt-11 rounded-lg border border-line bg-bg-secondary/60 p-6 sm:p-7">
                <span className="flex items-center gap-2.5 text-[0.6875rem] uppercase tracking-[0.14em] text-muted">
                  <CornerUpLeft className="h-3.5 w-3.5 text-primary" strokeWidth={2} />
                  And then it goes back
                </span>
                <p className="mt-4 font-text text-[1.0625rem] leading-relaxed">
                  Findings are written into the template that produced them. The next brief starts
                  with everything the last one learned — which is the only version of
                  &ldquo;always-on&rdquo; that actually compounds.
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {['Hook length', 'First-frame product', 'Palette', 'Caption density'].map((t, i) => (
                    <motion.span
                      key={t}
                      initial={{ opacity: 0, y: 8 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.5 }}
                      transition={{
                        duration: 0.34,
                        delay: 0.14 + i * 0.045,
                        ease: EASE_PREMIUM as unknown as number[],
                      }}
                      className="rounded-pill border border-line bg-surface px-3 py-1.5 text-[0.75rem] text-muted"
                    >
                      {t}
                    </motion.span>
                  ))}
                </div>
              </div>
            </FadeUp>

            <FadeUp delay={0.12}>
              <a
                href="#cta"
                className="group mt-9 inline-flex items-center gap-2 text-[0.9375rem] font-medium text-ink"
              >
                <span className="relative">
                  See what the model reads
                  <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-primary transition-transform duration-[260ms] ease-premium group-hover:scale-x-100" />
                </span>
                <ArrowUpRight className="h-4 w-4 transition-transform duration-[200ms] ease-premium group-hover:translate-x-[4px] group-hover:-translate-y-[3px]" />
              </a>
            </FadeUp>
          </div>

          {/* ---------- visual ---------- */}
          <div className="lg:col-span-6 lg:col-start-7">
            <Parallax speed={0.24} className="lg:pt-10">
              <ScaleReveal>
                <IntelligenceBoard />
              </ScaleReveal>
            </Parallax>
          </div>
        </div>
      </div>
    </section>
  );
}
