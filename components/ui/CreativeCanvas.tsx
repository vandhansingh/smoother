'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Panel from './Panel';
import AssetTile from './AssetTile';
import { EASE_PREMIUM, stagger } from '@/lib/motion';

const formats = ['1:1', '4:5', '9:16', '16:9'];
const locales = ['EN-US', 'DE', 'JP', 'BR', 'FR', 'ES', 'IT', 'KR'];

type Props = { className?: string; tone?: 'light' | 'dark'; compact?: boolean };

/* CREATIVE — one master, every derivative.
   The grid fills in on entry with a 55ms ladder; switching format
   re-lays the tiles rather than replacing them, so the eye keeps
   track of which asset is which. */
export default function CreativeCanvas({ className = '', tone = 'light', compact = false }: Props) {
  const [tab, setTab] = useState(0);
  const dark = tone === 'dark';
  const count = compact ? 6 : 8;

  return (
    <Panel
      title="Master — Autumn Launch"
      meta="8 formats · 26 locales"
      tabs={formats}
      activeTab={tab}
      onTabChange={setTab}
      tone={tone}
      className={className}
    >
      <div className="grid gap-4 p-4 sm:grid-cols-[minmax(0,1.05fr)_minmax(0,1.4fr)] sm:p-5">
        <div className="flex flex-col gap-3">
          <AssetTile
            variant={0}
            shape="arc"
            ratio={tab === 2 ? 'story' : tab === 3 ? 'landscape' : tab === 1 ? 'portrait' : 'square'}
            label="Master"
            className="w-full transition-[aspect-ratio] duration-slow ease-premium"
          />
          <div className="flex flex-wrap gap-1.5">
            {locales.slice(0, compact ? 4 : 6).map((l, i) => (
              <motion.span
                key={l}
                initial={{ opacity: 0, y: 6 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.3, delay: 0.2 + i * 0.03, ease: EASE_PREMIUM as unknown as number[] }}
                className={[
                  'rounded-xs px-1.5 py-1 text-[0.625rem] font-medium tracking-[0.06em]',
                  dark ? 'bg-white/10 text-bg/70' : 'bg-bg-secondary text-muted',
                ].join(' ')}
              >
                {l}
              </motion.span>
            ))}
          </div>
        </div>

        <div>
          <motion.div
            className="grid grid-cols-4 gap-2"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.35 }}
            variants={{ show: { transition: { staggerChildren: stagger.cards, delayChildren: 0.1 } } }}
          >
            {Array.from({ length: count }).map((_, i) => (
              <motion.div
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 14, scale: 0.94 },
                  show: {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: { duration: 0.42, ease: EASE_PREMIUM as unknown as number[] },
                  },
                }}
              >
                <AssetTile
                  variant={((i % 6) as 0 | 1 | 2 | 3 | 4 | 5)}
                  shape={i % 3 === 0 ? 'circle' : i % 3 === 1 ? 'square' : 'bar'}
                  ratio={tab === 2 ? 'story' : tab === 3 ? 'landscape' : tab === 1 ? 'portrait' : 'square'}
                  className="transition-[aspect-ratio] duration-slow ease-premium"
                />
              </motion.div>
            ))}
          </motion.div>

          <div className={`mt-4 flex items-center justify-between border-t pt-3 ${dark ? 'border-white/10' : 'border-line'}`}>
            <span className={`text-[0.6875rem] uppercase tracking-[0.14em] ${dark ? 'text-bg/40' : 'text-muted'}`}>
              Generated
            </span>
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.55, duration: 0.3 }}
              className="flex items-center gap-2 text-[0.75rem] font-medium"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-pill bg-secondary opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-pill bg-secondary" />
              </span>
              208 assets ready
            </motion.span>
          </div>
        </div>
      </div>
    </Panel>
  );
}
