'use client';

import { motion } from 'framer-motion';
import Panel from './Panel';
import { EASE_PREMIUM } from '@/lib/motion';

const channels = [
  { name: 'Meta', share: 34, spend: '$412k', pace: '+6%' },
  { name: 'TikTok', share: 22, spend: '$268k', pace: '+14%' },
  { name: 'YouTube', share: 18, spend: '$219k', pace: '-2%' },
  { name: 'Retail media', share: 15, spend: '$182k', pace: '+9%' },
  { name: 'CTV', share: 11, spend: '$134k', pace: '+3%' },
];

type Props = { className?: string; tone?: 'light' | 'dark' };

/* MEDIA — one plan, every channel.
   Budget bars grow from the plan node on entry, and the connective
   path is drawn rather than faded so the flow reads as a route. */
export default function MediaFlow({ className = '', tone = 'light' }: Props) {
  const dark = tone === 'dark';

  return (
    <Panel
      title="Activation plan — Q4 Global"
      meta="5 channels · 1 budget"
      tone={tone}
      className={className}
    >
      <div className="relative p-4 sm:p-5">
        {/* connective routing drawn behind the rows */}
        <svg
          aria-hidden
          viewBox="0 0 100 220"
          preserveAspectRatio="none"
          className={`pointer-events-none absolute left-6 top-16 hidden h-[calc(100%-6rem)] w-10 sm:block ${dark ? 'text-bg/25' : 'text-line'}`}
        >
          {channels.map((_, i) => (
            <motion.path
              key={i}
              d={`M4 4 C 4 ${20 + i * 22}, 40 ${18 + i * 42}, 96 ${20 + i * 44}`}
              stroke="currentColor"
              strokeWidth="1"
              fill="none"
              vectorEffect="non-scaling-stroke"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.7,
                delay: 0.18 + i * 0.05,
                ease: EASE_PREMIUM as unknown as number[],
              }}
            />
          ))}
        </svg>

        <div className={`mb-4 flex items-baseline justify-between border-b pb-3 ${dark ? 'border-white/10' : 'border-line'}`}>
          <span className={`text-[0.6875rem] uppercase tracking-[0.14em] ${dark ? 'text-bg/40' : 'text-muted'}`}>
            Allocation
          </span>
          <span className="text-[0.8125rem] font-medium tabular-nums">$1.21M / week</span>
        </div>

        <ul className="flex flex-col gap-3.5">
          {channels.map((c, i) => (
            <motion.li
              key={c.name}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, delay: 0.1 + i * 0.05, ease: EASE_PREMIUM as unknown as number[] }}
              className="grid grid-cols-[minmax(0,7rem)_minmax(0,1fr)_auto] items-center gap-3 sm:gap-4"
            >
              <span className="truncate text-[0.8125rem] font-medium sm:pl-8">{c.name}</span>

              <span className={`relative h-1.5 overflow-hidden rounded-pill ${dark ? 'bg-white/10' : 'bg-bg-secondary'}`}>
                <motion.span
                  className={`absolute inset-y-0 left-0 rounded-pill ${i === 1 ? 'bg-accent' : i === 0 ? 'bg-primary' : dark ? 'bg-bg/45' : 'bg-secondary'}`}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${c.share * 2.6}%` }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.8, delay: 0.24 + i * 0.06, ease: EASE_PREMIUM as unknown as number[] }}
                />
              </span>

              <span className="flex items-baseline gap-3">
                <span className="text-[0.8125rem] tabular-nums">{c.spend}</span>
                <span
                  className={[
                    'w-9 text-right text-[0.6875rem] font-medium tabular-nums',
                    c.pace.startsWith('-') ? 'text-primary' : dark ? 'text-accent' : 'text-secondary',
                  ].join(' ')}
                >
                  {c.pace}
                </span>
              </span>
            </motion.li>
          ))}
        </ul>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.5, ease: EASE_PREMIUM as unknown as number[] }}
          className={`mt-5 flex items-center gap-2.5 rounded-sm border px-3.5 py-3 ${dark ? 'border-white/10 bg-white/[0.04]' : 'border-line bg-bg-secondary/60'}`}
        >
          <span className="h-1.5 w-1.5 shrink-0 rounded-pill bg-accent" />
          <span className="text-[0.75rem] leading-snug">
            Shifted <strong className="font-medium">$46k</strong> from YouTube to TikTok — projected
            +4.1% incremental reach.
          </span>
        </motion.div>
      </div>
    </Panel>
  );
}
