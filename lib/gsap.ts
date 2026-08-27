'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flip } from 'gsap/Flip';
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin';

/* Registered once, on the client only. ScrollTrigger drives the pinned
   storytelling and every scrub-linked transform; Flip handles layout
   transitions where an element changes parent or grid position. */
if (typeof window !== 'undefined' && !(gsap as unknown as { _sa?: boolean })._sa) {
  gsap.registerPlugin(ScrollTrigger, Flip, MorphSVGPlugin);
  gsap.defaults({ ease: 'power3.out', duration: 0.6 });
  ScrollTrigger.config({ ignoreMobileResize: true });
  (gsap as unknown as { _sa?: boolean })._sa = true;
}

export { gsap, ScrollTrigger, Flip, MorphSVGPlugin };
