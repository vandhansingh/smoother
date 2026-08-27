'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useHasFinePointer, useReducedMotion } from '@/lib/hooks';

/* ============================================================
   CURSOR
   The native cursor is never hidden. A small ring only appears
   over elements that opt in with data-cursor, and it carries a
   short label where one is useful. No glowing blob, no trail.
   ============================================================ */

export default function Cursor() {
  const fine = useHasFinePointer();
  const reduced = useReducedMotion();
  const [label, setLabel] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);

  const mx = useMotionValue(-100);
  const my = useMotionValue(-100);
  const x = useSpring(mx, { stiffness: 520, damping: 38, mass: 0.4 });
  const y = useSpring(my, { stiffness: 520, damping: 38, mass: 0.4 });

  useEffect(() => {
    if (!fine || reduced) return;

    const onMove = (e: PointerEvent) => {
      mx.set(e.clientX);
      my.set(e.clientY);

      const target = (e.target as HTMLElement)?.closest?.('[data-cursor]') as HTMLElement | null;
      if (target) {
        setVisible(true);
        setLabel(target.dataset.cursorLabel ?? null);
      } else {
        setVisible(false);
        setLabel(null);
      }
    };

    const onLeave = () => setVisible(false);

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerleave', onLeave);
    return () => {
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
    };
  }, [fine, reduced, mx, my]);

  if (!fine || reduced) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[80] hidden md:block"
      style={{ x, y, translate: '-50% -50%' }}
    >
      <motion.div
        className="flex items-center justify-center rounded-pill border border-ink/25 bg-ink/[0.04] backdrop-blur-[2px]"
        animate={{
          width: label ? 96 : visible ? 40 : 12,
          height: label ? 40 : visible ? 40 : 12,
          opacity: visible ? 1 : 0,
        }}
        transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
      >
        {label && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="whitespace-nowrap text-[10px] font-medium uppercase tracking-[0.14em] text-ink"
          >
            {label}
          </motion.span>
        )}
      </motion.div>
    </motion.div>
  );
}
