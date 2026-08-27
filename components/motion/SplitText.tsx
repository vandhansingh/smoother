'use client';

import { motion } from 'framer-motion';
import { EASE_PREMIUM, stagger as staggerTokens, viewport } from '@/lib/motion';

type Split = 'word' | 'char' | 'line';

type Props = {
  text: string | string[];
  by?: Split;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div';
  className?: string;
  lineClassName?: string;
  delay?: number;
  stagger?: number;
  duration?: number;
  animate?: boolean;
  once?: boolean;
  amount?: number;
};

/* ============================================================
   SPLIT TEXT
   Split happens in JSX rather than by mutating the DOM after
   hydration, so the server markup and the client markup match
   and the accessible string stays intact via aria-label.
   Each unit rises out of its own overflow mask — the line
   physically enters the layout rather than fading in place.
   ============================================================ */

export default function SplitText({
  text,
  by = 'word',
  as = 'span',
  className = '',
  lineClassName = '',
  delay = 0,
  stagger,
  duration = 0.72,
  animate = true,
  once = true,
  amount = viewport.amount,
}: Props) {
  const lines = Array.isArray(text) ? text : [text];
  const label = lines.join(' ');

  const step =
    stagger ??
    (by === 'char'
      ? staggerTokens.chars
      : by === 'word'
        ? staggerTokens.words
        : staggerTokens.lines);

  const Comp = motion[as] as typeof motion.span;

  let index = 0;

  return (
    <Comp
      className={className}
      aria-label={label}
      initial={animate ? 'hidden' : false}
      whileInView={animate ? 'show' : undefined}
      viewport={{ once, amount }}
    >
      {lines.map((line, li) => {
        const units =
          by === 'line' ? [line] : by === 'word' ? line.split(' ') : Array.from(line);

        return (
          <span
            key={li}
            aria-hidden
            className={`block overflow-hidden pb-[0.06em] ${lineClassName}`}
          >
            {units.map((unit, ui) => {
              const i = index++;
              return (
                <motion.span
                  key={`${li}-${ui}`}
                  className="inline-block whitespace-pre will-transform"
                  variants={{
                    hidden: { y: '110%', opacity: 0 },
                    show: {
                      y: '0%',
                      opacity: 1,
                      transition: {
                        duration,
                        delay: delay + i * step,
                        ease: EASE_PREMIUM as unknown as number[],
                      },
                    },
                  }}
                >
                  {unit}
                  {by === 'word' && ui < units.length - 1 ? ' ' : ''}
                </motion.span>
              );
            })}
          </span>
        );
      })}
    </Comp>
  );
}
