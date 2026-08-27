'use client';

import { useEffect, useLayoutEffect, useState } from 'react';

/** Live-updating prefers-reduced-motion. Returns false during SSR. */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  return reduced;
}

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(query);
    setMatches(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setMatches(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, [query]);

  return matches;
}

/** Below 900px we recompose rather than scale: pinning and heavy
    scroll choreography are switched off entirely. */
export function useIsMobile(): boolean {
  return useMediaQuery('(max-width: 899px)');
}

/** True once the component has mounted — for anything that must not
    run during hydration. */
export function useMounted(): boolean {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}

/** Coarse pointer (touch) — disables cursor and magnetic effects. */
export function useHasFinePointer(): boolean {
  return useMediaQuery('(hover: hover) and (pointer: fine)');
}

/** useLayoutEffect on the client, useEffect on the server — avoids the
    SSR warning while still running before paint in the browser. */
export const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;
