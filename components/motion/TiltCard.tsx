'use client';

import { useRef } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useHasFinePointer, useReducedMotion } from '@/lib/hooks';
import { springs } from '@/lib/motion';

type Props = {
  children: React.ReactNode;
  className?: string;
  /** max rotation per axis — 3–5deg */
  max?: number;
  glare?: boolean;
};

/** Perspective tilt for selected product cards only. */
export default function TiltCard({ children, className = '', max = 4, glare = false }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const fine = useHasFinePointer();
  const active = !reduced && fine;

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const sx = useSpring(px, springs.tilt);
  const sy = useSpring(py, springs.tilt);

  const rotateY = useTransform(sx, [0, 1], [-max, max]);
  const rotateX = useTransform(sy, [0, 1], [max, -max]);
  const glareX = useTransform(sx, [0, 1], ['18%', '82%']);
  const glareY = useTransform(sy, [0, 1], ['8%', '82%']);
  const glareBg = useMotionTemplate`radial-gradient(420px circle at ${glareX} ${glareY}, rgb(255 255 255 / 0.22), transparent 62%)`;

  const onMove = (e: React.MouseEvent) => {
    if (!active || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  };

  const onLeave = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      className={`relative ${className}`}
      style={{
        rotateX: active ? rotateX : 0,
        rotateY: active ? rotateY : 0,
        transformPerspective: 1100,
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
      {glare && active && (
        <motion.span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-medium ease-premium [.group:hover_&]:opacity-100"
          style={{ background: glareBg }}
        />
      )}
    </motion.div>
  );
}
