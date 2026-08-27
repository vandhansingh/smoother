'use client';

import { motion } from 'framer-motion';
import Panel from './Panel';
import Counter from '@/components/motion/Counter';
import { EASE_PREMIUM } from '@/lib/motion';

/* A plausible 14-week series rather than a decorative squiggle:
   a slow build, a dip at re-planning, then a sustained lift. */
const series = [28, 31, 30, 36, 41, 39, 46, 44, 52, 58, 55, 64, 71, 78];
const baseline = [28, 29, 30, 31, 31, 32, 33, 33, 34, 35, 35, 36, 37, 38];

const W = 320;
const H = 132;

const toPath = (values: number[]) => {
  const max = 84;
  const min = 22;
  const step = W / (values.length - 1);
  const pts = values.map((v, i) => [i * step, H - ((v - min) / (max - min)) * (H - 12) - 6]);

  // Catmull-Rom → cubic bezier for a smooth but honest curve.
  let d = `M ${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] ?? p2;
    const c1x = p1[0] + (p2[0] - p0[0]) / 6;
    const c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6;
    const c2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += ` C ${c1x.toFixed(1)} ${c1y.toFixed(1)}, ${c2x.toFixed(1)} ${c2y.toFixed(1)}, ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`;
  }
  return d;
};

const linePath = toPath(series);
const basePath = toPath(baseline);
const areaPath = `${linePath} L ${W} ${H} L 0 ${H} Z`;

const signals = [
  { label: 'Hook length under 2s', lift: '+31%', weight: 'Strong' },
  { label: 'Product in first frame', lift: '+18%', weight: 'Strong' },
  { label: 'Warm palette variants', lift: '+9%', weight: 'Moderate' },
];

type Props = { className?: string; tone?: 'light' | 'dark' };

/* INTELLIGENCE — what worked, and why.
   The line is drawn left to right, the baseline stays flat behind it,
   and the numbers count up as the curve lands. */
export default function IntelligenceBoard({ className = '', tone = 'light' }: Props) {
  const dark = tone === 'dark';

  return (
    <Panel
      title="Creative performance — rolling 14 weeks"
      meta="Incremental ROAS"
      tone={tone}
      className={className}
    >
      <div className="p-4 sm:p-5">
        <div className="mb-5 flex flex-wrap items-end gap-x-8 gap-y-3">
          <div>
            <span className={`block text-[0.6875rem] uppercase tracking-[0.14em] ${dark ? 'text-bg/40' : 'text-muted'}`}>
              Incremental ROAS
            </span>
            <Counter
              value={4.18}
              decimals={2}
              suffix="×"
              className="mt-1 block text-[2rem] font-medium leading-none tracking-[-0.04em]"
            />
          </div>
          <div>
            <span className={`block text-[0.6875rem] uppercase tracking-[0.14em] ${dark ? 'text-bg/40' : 'text-muted'}`}>
              vs. baseline
            </span>
            <Counter
              value={62}
              prefix="+"
              suffix="%"
              className="mt-1 block text-[2rem] font-medium leading-none tracking-[-0.04em] text-primary"
            />
          </div>
        </div>

        <div className="relative">
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="Incremental ROAS climbing steadily across fourteen weeks, well clear of a flat baseline.">
            <defs>
              <linearGradient id="sa-area" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgb(var(--rgb-primary))" stopOpacity="0.18" />
                <stop offset="100%" stopColor="rgb(var(--rgb-primary))" stopOpacity="0" />
              </linearGradient>
            </defs>

            {[0.25, 0.5, 0.75].map((g) => (
              <line
                key={g}
                x1="0"
                x2={W}
                y1={H * g}
                y2={H * g}
                stroke="currentColor"
                strokeWidth="1"
                className={dark ? 'text-white/[0.07]' : 'text-line/70'}
                vectorEffect="non-scaling-stroke"
              />
            ))}

            <motion.path
              d={basePath}
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeDasharray="3 5"
              className={dark ? 'text-bg/25' : 'text-muted/50'}
              vectorEffect="non-scaling-stroke"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.9, ease: 'linear' }}
            />

            <motion.path
              d={areaPath}
              fill="url(#sa-area)"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7, delay: 0.55, ease: EASE_PREMIUM as unknown as number[] }}
            />

            <motion.path
              d={linePath}
              fill="none"
              stroke="rgb(var(--rgb-primary))"
              strokeWidth="2"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 1.15, delay: 0.15, ease: EASE_PREMIUM as unknown as number[] }}
            />

            <motion.circle
              cx={W}
              cy={H - ((series[series.length - 1] - 22) / 62) * (H - 12) - 6}
              r="3.5"
              fill="rgb(var(--rgb-primary))"
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.34, delay: 1.15, ease: EASE_PREMIUM as unknown as number[] }}
              style={{ transformOrigin: `${W}px ${H - ((series[series.length - 1] - 22) / 62) * (H - 12) - 6}px` }}
            />
          </svg>
        </div>

        <div className={`mt-5 border-t pt-4 ${dark ? 'border-white/10' : 'border-line'}`}>
          <span className={`mb-3 block text-[0.6875rem] uppercase tracking-[0.14em] ${dark ? 'text-bg/40' : 'text-muted'}`}>
            Drivers detected
          </span>
          <ul className="flex flex-col gap-2.5">
            {signals.map((s, i) => (
              <motion.li
                key={s.label}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.36, delay: 0.9 + i * 0.06, ease: EASE_PREMIUM as unknown as number[] }}
                className="flex items-center justify-between gap-4 text-[0.8125rem]"
              >
                <span className="flex min-w-0 items-center gap-2.5">
                  <span className={`h-1 w-1 shrink-0 rounded-pill ${i === 0 ? 'bg-primary' : 'bg-accent'}`} />
                  <span className="truncate">{s.label}</span>
                </span>
                <span className="flex shrink-0 items-baseline gap-3">
                  <span className={`text-[0.6875rem] ${dark ? 'text-bg/40' : 'text-muted'}`}>{s.weight}</span>
                  <span className="font-medium tabular-nums text-primary">{s.lift}</span>
                </span>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </Panel>
  );
}
