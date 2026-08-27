'use client';

import { ArrowUpRight } from 'lucide-react';
import FadeUp from '@/components/motion/FadeUp';
import SplitText from '@/components/motion/SplitText';
import ImageReveal from '@/components/motion/ImageReveal';
import Parallax from '@/components/motion/Parallax';
import CaseVisual from '@/components/ui/CaseVisual';

const cases = [
  {
    client: 'Kestrel Athletic',
    sector: 'Sportswear · 19 markets',
    title: 'A launch calendar that stopped needing a launch team.',
    body: 'Nine seasonal drops a year, each localised into nineteen markets, produced from a single master system instead of nineteen parallel briefs.',
    metrics: [
      { v: '4.6×', k: 'ROAS' },
      { v: '−71%', k: 'production hours' },
      { v: '19', k: 'markets, one master' },
    ],
  },
  {
    client: 'Marlowe & Sons',
    sector: 'Premium spirits · Global',
    title: 'Proof that the restrained cut outperformed the loud one.',
    body: 'A brand with strict craft guardrails needed evidence before it would let media reallocate. Attribute-level testing gave it in six weeks.',
    metrics: [
      { v: '+38%', k: 'CTR on winners' },
      { v: '6 wks', k: 'to signed-off proof' },
      { v: '0', k: 'brand exceptions' },
    ],
  },
  {
    client: 'Novabank',
    sector: 'Financial services · EU',
    title: 'Compliance stopped being the reason campaigns shipped late.',
    body: 'Legal lines, disclaimers and market-specific rules resolve at export, so the review queue reviews the idea rather than the paperwork.',
    metrics: [
      { v: '11 days', k: 'brief to live' },
      { v: '+24%', k: 'qualified applications' },
      { v: '100%', k: 'first-pass approvals' },
    ],
  },
];

export default function CaseStudies() {
  return (
    <section id="work" className="relative overflow-hidden py-section">
      <div className="shell">
        <div className="grid items-end gap-x-10 gap-y-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <FadeUp>
              <p className="eyebrow flex items-center gap-3">
                <span className="h-px w-8 bg-primary" />
                Selected work
              </p>
            </FadeUp>
            <SplitText
              as="h2"
              by="line"
              text={['Teams that stopped', 'guessing.']}
              className="mt-6 text-section font-medium"
              stagger={0.09}
            />
          </div>
          <FadeUp delay={0.1} className="lg:col-span-4 lg:col-start-9">
            <p className="font-text text-lead text-muted">
              Three programmes, three very different appetites for risk — the same loop underneath
              each of them.
            </p>
          </FadeUp>
        </div>

        <div className="mt-[clamp(4rem,8vw,7rem)] flex flex-col gap-[clamp(4rem,8vw,7.5rem)]">
          {cases.map((c, i) => {
            const flip = i % 2 === 1;
            return (
              <article
                key={c.client}
                className="group grid items-center gap-x-10 gap-y-8 lg:grid-cols-12"
              >
                {/* visual */}
                <div className={`lg:col-span-7 ${flip ? 'lg:order-2 lg:col-start-6' : ''}`}>
                  <Parallax speed={0.18}>
                    <a href="#cta" data-cursor data-cursor-label="Read case" className="block">
                      <ImageReveal
                        direction={flip ? 'right' : 'left'}
                        duration={0.7}
                        className="rounded-lg"
                      >
                        <div className="transition-transform duration-[420ms] ease-premium group-hover:scale-[1.028]">
                          <CaseVisual index={i} />
                        </div>
                      </ImageReveal>
                    </a>
                  </Parallax>
                </div>

                {/* text */}
                <div
                  className={[
                    'transition-transform duration-[420ms] ease-premium lg:col-span-4',
                    flip ? 'lg:order-1 lg:col-start-1 lg:group-hover:-translate-x-[5px]' : 'lg:col-start-9 lg:group-hover:translate-x-[5px]',
                  ].join(' ')}
                >
                  <FadeUp>
                    <p className="flex items-baseline gap-3">
                      <span className="text-[1.0625rem] font-medium tracking-[-0.02em]">
                        {c.client}
                      </span>
                      <span className="text-[0.75rem] text-muted">{c.sector}</span>
                    </p>

                    <h3 className="mt-5 text-[clamp(1.625rem,2.5vw,2.375rem)] font-medium leading-[1.08] tracking-[-0.035em]">
                      {c.title}
                    </h3>

                    <p className="mt-4 max-w-[42ch] font-text text-[0.9375rem] leading-relaxed text-muted">
                      {c.body}
                    </p>

                    <dl className="mt-8 grid grid-cols-3 gap-4 border-t border-line pt-5">
                      {c.metrics.map((m) => (
                        <div key={m.k}>
                          <dt className="sr-only">{m.k}</dt>
                          <dd>
                            <span className="block text-[1.375rem] font-medium tracking-[-0.03em]">
                              {m.v}
                            </span>
                            <span className="mt-1 block text-[0.6875rem] uppercase leading-tight tracking-[0.1em] text-muted">
                              {m.k}
                            </span>
                          </dd>
                        </div>
                      ))}
                    </dl>

                    <a
                      href="#cta"
                      className="mt-7 inline-flex items-center gap-2 text-[0.9375rem] font-medium"
                    >
                      <span className="relative">
                        Read the programme
                        <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-primary transition-transform duration-[260ms] ease-premium group-hover:scale-x-100" />
                      </span>
                      <ArrowUpRight className="h-4 w-4 transition-transform duration-[220ms] ease-premium group-hover:translate-x-[5px] group-hover:-translate-y-[4px]" />
                    </a>
                  </FadeUp>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
