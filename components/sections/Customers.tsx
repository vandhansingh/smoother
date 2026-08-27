'use client';

import { motion } from 'framer-motion';
import FadeUp from '@/components/motion/FadeUp';
import SplitText from '@/components/motion/SplitText';
import Marquee from '@/components/motion/Marquee';
import { EASE_PREMIUM } from '@/lib/motion';

/* Wordmarks are set in the site's own type rather than borrowed from
   real brands — the companies here are illustrative. */
const customers = [
  'Kestrel Athletic',
  'Marlowe & Sons',
  'Novabank',
  'Halden Interiors',
  'Corva Mobility',
  'Fieldnote',
  'Aster Health',
  'Brightsea Retail',
  'Perrin Group',
  'Understory',
];

export default function Customers() {
  return (
    <section id="customers" className="relative overflow-hidden bg-bg-secondary py-section-sm">
      <div className="shell">
        <div className="grid gap-x-10 gap-y-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <FadeUp>
              <p className="eyebrow flex items-center gap-3">
                <span className="h-px w-8 bg-primary" />
                In production with
              </p>
            </FadeUp>
            <SplitText
              as="h2"
              by="line"
              text={['Built for teams', 'that ship weekly.']}
              className="mt-6 text-[clamp(2rem,3.4vw,3.25rem)] font-medium leading-[1.02] tracking-[-0.04em]"
              stagger={0.08}
            />
          </div>

          <FadeUp delay={0.08} className="lg:col-span-6 lg:col-start-7">
            <figure className="border-l-2 border-primary pl-6 sm:pl-8">
              <blockquote className="font-text text-[clamp(1.125rem,1.7vw,1.4375rem)] leading-[1.45] tracking-[-0.015em]">
                &ldquo;We used to argue about which creative worked. Now the argument is about what
                to try next — which is a much better argument to be having.&rdquo;
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3 text-[0.875rem]">
                <span className="flex h-9 w-9 items-center justify-center rounded-pill bg-secondary text-[0.75rem] font-medium text-bg">
                  IR
                </span>
                <span>
                  <span className="block font-medium">Ines Roth</span>
                  <span className="block text-muted">VP Brand Performance, Kestrel Athletic</span>
                </span>
              </figcaption>
            </figure>
          </FadeUp>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: EASE_PREMIUM as unknown as number[] }}
        className="mt-[clamp(3.5rem,7vw,6rem)] border-y border-line py-7"
      >
        <Marquee
          speed={52}
          reverse
          className="[mask-image:linear-gradient(90deg,transparent,black_6%,black_94%,transparent)]"
        >
          {customers.map((c) => (
            <span key={c} className="flex items-center gap-10 whitespace-nowrap pr-10">
              <span className="text-[clamp(1.125rem,2vw,1.625rem)] font-medium tracking-[-0.03em] text-ink/45 transition-colors duration-medium hover:text-ink">
                {c}
              </span>
              <span className="h-1 w-1 rounded-pill bg-ink/20" />
            </span>
          ))}
        </Marquee>
      </motion.div>
    </section>
  );
}
