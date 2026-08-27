'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import AssetTile from './AssetTile';
import { useIsMobile, useReducedMotion } from '@/lib/hooks';
import { EASE_PREMIUM, stagger } from '@/lib/motion';

/* CREATIVE, visualised: one master multiplying into a wall of
   derivatives. The wall is scroll-linked — it opens up as the section
   is read, so the multiplication happens at the reader's pace. */

const tiles = Array.from({ length: 24 }, (_, i) => ({
  variant: (i % 6) as 0 | 1 | 2 | 3 | 4 | 5,
  shape: (['circle', 'square', 'bar', 'arc'] as const)[i % 4],
}));

export default function VariantWall({ className = '' }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const isMobile = useIsMobile();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 85%', 'end 35%'],
  });

  const active = !reduced && !isMobile;
  const scale = useTransform(scrollYProgress, [0, 1], active ? [0.94, 1] : [1, 1]);
  const rotate = useTransform(scrollYProgress, [0, 1], active ? [-1.4, 0] : [0, 0]);

  return (
    <div ref={ref} className={`relative ${className}`}>
      <motion.div
        style={{ scale, rotate }}
        className="rounded-lg border border-line bg-surface p-3 shadow-panel sm:p-4"
      >
        <div className="mb-3 flex items-center justify-between px-1 pl-24 sm:pl-32">
          <span className="flex items-center gap-2.5">
            <span className="h-1.5 w-1.5 rounded-pill bg-primary" />
            <span className="text-[0.8125rem] font-medium">Autumn Launch — derivative set</span>
          </span>
          <span className="hidden text-[0.75rem] text-muted sm:block">24 of 208 shown</span>
        </div>

        <motion.div
          className="grid grid-cols-6 gap-1 sm:grid-cols-8"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          variants={{ show: { transition: { staggerChildren: stagger.tight, delayChildren: 0.08 } } }}
        >
          {tiles.map((t, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, scale: 0.82 },
                show: {
                  opacity: 1,
                  scale: 1,
                  transition: { duration: 0.4, ease: EASE_PREMIUM as unknown as number[] },
                },
              }}
              className="will-transform"
            >
              <AssetTile variant={t.variant} shape={t.shape} />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* the single master, held above the wall it produced */}
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.94 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: EASE_PREMIUM as unknown as number[] }}
        className="absolute -left-2 -top-9 z-10 w-24 sm:-left-8 sm:-top-10 sm:w-32"
      >
        <div className="rounded-md border border-line bg-surface p-2 shadow-lift">
          <AssetTile variant={0} shape="arc" label="Master" />
          <span className="mt-2 block px-0.5 pb-0.5 text-[0.625rem] uppercase tracking-[0.12em] text-muted">
            v1 · locked
          </span>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5, delay: 0.35, ease: EASE_PREMIUM as unknown as number[] }}
        className="absolute -bottom-6 right-2 z-10 flex items-center gap-2.5 rounded-pill border border-line bg-surface px-4 py-2.5 shadow-soft sm:-bottom-7 sm:right-6"
      >
        <span className="h-1.5 w-1.5 rounded-pill bg-secondary" />
        <span className="text-[0.75rem]">
          <strong className="font-medium">0</strong> brand violations
        </span>
      </motion.div>
    </div>
  );
}
