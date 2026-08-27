'use client';

import AssetTile from './AssetTile';

type Props = { index: number; className?: string };

/* Original abstract compositions rather than stock photography: a
   colour field, a drawn arc, and a few of the same asset objects that
   appear throughout the site — so a case study reads as an outcome of
   the product, not a decorated slide. */

const grounds = ['bg-primary', 'bg-secondary', 'bg-accent'];
const arcs = ['text-accent/70', 'text-accent/60', 'text-primary/70'];

export default function CaseVisual({ index, className = '' }: Props) {
  const ground = grounds[index % grounds.length];
  const arc = arcs[index % arcs.length];

  return (
    <div className={`relative aspect-[4/3] overflow-hidden rounded-lg ${ground} ${className}`}>
      <svg
        viewBox="0 0 400 300"
        className={`absolute inset-0 h-full w-full ${arc}`}
        aria-hidden
        preserveAspectRatio="xMidYMid slice"
      >
        <path
          d={
            index % 3 === 0
              ? 'M-20 250 C 90 250, 120 60, 240 60 C 340 60, 380 150, 430 130'
              : index % 3 === 1
                ? 'M-20 90 C 120 90, 150 250, 280 250 C 360 250, 400 190, 430 200'
                : 'M-20 170 C 100 170, 140 40, 250 40 C 350 40, 400 240, 430 240'
          }
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          vectorEffect="non-scaling-stroke"
        />
        <circle
          cx={index % 2 === 0 ? 320 : 90}
          cy={index % 2 === 0 ? 70 : 220}
          r="52"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="3 8"
        />
      </svg>

      <div className="absolute inset-0 flex flex-col justify-between p-5 sm:p-7">
        <span className="flex items-center gap-2.5 text-[0.625rem] uppercase tracking-[0.16em] text-bg/70">
          <span className="h-1.5 w-1.5 rounded-pill bg-bg/70" />
          Programme {String(index + 1).padStart(2, '0')}
        </span>

        <div className="grid w-full max-w-[13.5rem] grid-cols-4 gap-1.5 transition-transform duration-slow ease-premium group-hover:-translate-y-[6px] sm:max-w-[15rem]">
          {Array.from({ length: 8 }).map((_, i) => (
            <AssetTile
              key={i}
              variant={((index * 2 + i) % 6) as 0 | 1 | 2 | 3 | 4 | 5}
              shape={i % 3 === 0 ? 'circle' : i % 3 === 1 ? 'square' : 'bar'}
              className="shadow-soft ring-1 ring-inset ring-black/5"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
