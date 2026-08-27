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
        <div className={`mb-4 flex items-baseline justify-between border-b pb-3 ${dark ? 'border-white/10' : 'border-line'}`}>
          <span className={`text-[0.6875rem] uppercase tracking-[0.14em] ${dark ? 'text-bg/40' : 'text-muted'}`}>
            Allocation
          </span>
          <span className="text-[0.8125rem] font-medium tabular-nums">$1.21M / week</span>
        </div>

        {/* one plan, five routes: a spine with a tick into every channel */}
        <ul className="relative flex flex-col gap-3.5 sm:pl-6">
          <span
            aria-hidden
            className={`absolute bottom-3 left-0 top-3 hidden w-px sm:block ${dark ? 'bg-white/15' : 'bg-line'}`}
          />
          {channels.map((c, i) => (
            <motion.li
              key={c.name}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, delay: 0.1 + i * 0.05, ease: EASE_PREMIUM as unknown as number[] }}
              className="relative grid grid-cols-[minmax(0,7rem)_minmax(0,1fr)_auto] items-center gap-3 sm:gap-4"
            >
              <motion.span
                aria-hidden
                className={`absolute -left-6 top-1/2 hidden h-px sm:block ${dark ? 'bg-white/15' : 'bg-line'}`}
                initial={{ width: 0 }}
                whileInView={{ width: 16 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4, delay: 0.2 + i * 0.05, ease: EASE_PREMIUM as unknown as number[] }}
              />
              <span className="truncate text-[0.8125rem] font-medium">{c.name}</span>

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
