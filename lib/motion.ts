import type { Transition, Variants } from 'framer-motion';

/* ============================================================
   MOTION SYSTEM
   One source of truth for easings, durations, staggers and
   viewport thresholds. Timings are deliberately tighter than a
   typical "cinematic" SaaS site: interaction reads instantly,
   content arrives fast, only major transitions are allowed to
   take their time, and ambient motion is slow enough to ignore.
   ============================================================ */

/** Primary entrance curve — fast out of the gate, long soft landing. */
export const EASE_PREMIUM = [0.22, 1, 0.36, 1] as const;
/** For elements leaving or compressing. */
export const EASE_PREMIUM_IN = [0.62, 0, 0.2, 1] as const;
/** Near-linear with a touch of ease, for scrub-linked work. */
export const EASE_SCRUB = [0.4, 0, 0.6, 1] as const;

export const easings = {
  premium: EASE_PREMIUM,
  premiumIn: EASE_PREMIUM_IN,
  scrub: EASE_SCRUB,
  /** GSAP string equivalents */
  gsap: {
    entrance: 'power3.out',
    strong: 'power4.out',
    expo: 'expo.out',
    inOut: 'power2.inOut',
  },
} as const;

export const durations = {
  /** 80–220ms — hover, press, arrow nudge, focus */
  micro: 0.14,
  microFast: 0.09,
  microSlow: 0.22,
  /** 280–550ms — content entrances, card hovers, tab swaps */
  content: 0.42,
  contentFast: 0.3,
  contentSlow: 0.55,
  /** 600–1000ms — section transitions, hero visual, colour shifts */
  cinematic: 0.8,
  cinematicFast: 0.62,
  cinematicSlow: 1.0,
  /** ambient loops */
  ambient: 6.5,
} as const;

/** Fast stagger ladder: 0 / 30 / 50 / 70 / 90 / 110ms. */
export const stagger = {
  tight: 0.03,
  base: 0.05,
  loose: 0.07,
  cards: 0.055,
  /** typography: 25–45ms */
  words: 0.032,
  chars: 0.026,
  lines: 0.045,
} as const;

/** Entrances fire at 12–22% visibility and never replay. */
export const viewport = {
  once: true,
  amount: 0.18,
} as const;

export const viewportEarly = { once: true, amount: 0.12 } as const;
export const viewportLate = { once: true, amount: 0.22 } as const;

export const transition = (
  duration: number = durations.content,
  delay = 0,
  ease: readonly number[] = EASE_PREMIUM
): Transition => ({
  duration,
  delay,
  ease: ease as unknown as number[],
});

/* ---------- shared variants ---------- */

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: transition(durations.content) },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: transition(durations.contentSlow) },
};

export const scaleReveal: Variants = {
  hidden: { opacity: 0, scale: 0.965, y: 22 },
  show: { opacity: 1, scale: 1, y: 0, transition: transition(durations.cinematicFast) },
};

/** Card entrance from §22: opacity 0, y 40, scale 0.97. */
export const cardIn: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.97 },
  show: { opacity: 1, y: 0, scale: 1, transition: transition(durations.contentSlow) },
};

/** Line reveal — the line physically enters from below its own mask. */
export const lineIn: Variants = {
  hidden: { y: '105%', opacity: 0 },
  show: { y: '0%', opacity: 1, transition: transition(0.72) },
};

export const container = (childStagger: number = stagger.base, delay = 0): Variants => ({
  hidden: {},
  show: {
    transition: { staggerChildren: childStagger, delayChildren: delay },
  },
});

/* ---------- springs (used sparingly) ---------- */

export const springs = {
  /** magnetic buttons, cursor-following — perceived response 80–160ms */
  magnetic: { type: 'spring', stiffness: 340, damping: 26, mass: 0.5 } as const,
  /** tilt cards */
  tilt: { type: 'spring', stiffness: 220, damping: 24, mass: 0.6 } as const,
  /** velocity settling, allows ~1.5px overshoot */
  settle: { type: 'spring', stiffness: 150, damping: 20, mass: 0.9 } as const,
} as const;

/* ---------- hero page-load choreography (ms → s) ---------- */

export const heroBeats = {
  background: 0,
  logo: 0.06,
  nav: 0.1,
  eyebrow: 0.18,
  headline: 0.22,
  headlineStagger: 0.35,
  description: 0.48,
  ctas: 0.58,
  visual: 0.68,
  ambient: 0.9,
} as const;

/* ---------- helpers ---------- */

export const prefersReducedMotion = (): boolean =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Clamp helper for scroll/pointer math. */
export const clamp = (v: number, min: number, max: number) =>
  Math.min(max, Math.max(min, v));

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/** Mobile drops complex motion by ~55% (§37). */
export const MOBILE_MOTION_SCALE = 0.45;
