'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger } from '@/lib/gsap';

/* ============================================================
   SMOOTH SCROLL — single shared RAF loop
   Lenis is driven by the GSAP ticker so there is exactly one
   animation loop on the page. Two competing loops is the usual
   source of scroll jank on sites like this.
   ============================================================ */

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      document.documentElement.style.scrollBehavior = 'auto';
      return;
    }

    const lenis = new Lenis({
      lerp: 0.085,
      smoothWheel: true,
      wheelMultiplier: 0.92,
      touchMultiplier: 1.6,
      syncTouch: false,
      autoRaf: false,
    });

    window.__lenis = lenis;

    // Lenis tells ScrollTrigger about every frame it produces…
    lenis.on('scroll', ScrollTrigger.update);

    // …and the GSAP ticker is the only thing calling requestAnimationFrame.
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // Anchor links route through Lenis so in-page jumps stay smooth.
    const onClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement)?.closest?.('a[href^="#"]');
      if (!anchor) return;
      const href = anchor.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target as HTMLElement, { offset: -96, duration: 1.05 });
    };
    document.addEventListener('click', onClick);

    // Fonts settle after first paint; pinned sections need fresh measurements.
    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh).catch(() => undefined);

    return () => {
      document.removeEventListener('click', onClick);
      gsap.ticker.remove(raf);
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);

  return <>{children}</>;
}
