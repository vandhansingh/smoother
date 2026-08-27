# Signalarc

A single-page marketing site for a fictional creative-intelligence platform, built as a
motion and design study. Next.js App Router, TypeScript, Tailwind, Framer Motion, GSAP
(ScrollTrigger / Flip / MorphSVG) and Lenis.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm run start
npm run typecheck
```

## The idea

The product's argument is that creative production, media activation and performance
measurement should be one continuous loop rather than three tools that hand work between
each other. The site is built to *demonstrate* that rather than assert it: one set of
twenty-four objects travels through four formations — a master grid, five channel lanes, a
performance curve, and a closed ring — without anything being added, removed or
cross-faded. That section (`components/sections/PathStory.tsx`) is the spine of the page;
everything else is arranged around it.

## Motion architecture

One animation loop, four tools, each doing only what it is best at.

| Tool | Owns |
| --- | --- |
| Lenis | Smooth scrolling, driven by the GSAP ticker — never its own `requestAnimationFrame` |
| GSAP + ScrollTrigger | Pinned storytelling, scrubbed transforms, scroll-linked colour |
| GSAP Flip | Layout transitions where an element changes size or position (platform pillars) |
| GSAP MorphSVG | Shape continuity — the spine that travels with the objects |
| Framer Motion | Entrances, staggers, hover physics, magnetic buttons, counters |
| CSS | Hover and focus transitions, and every reduced-motion backstop |

`components/providers/SmoothScroll.tsx` wires Lenis into `gsap.ticker` with
`lagSmoothing(0)` so there is exactly one RAF driver on the page. Two competing loops is
the usual cause of scroll jank on sites like this.

`lib/motion.ts` holds every easing, duration, stagger and viewport threshold. Timings are
deliberately tighter than a typical "cinematic" site: micro-interactions 80–220ms, content
entrances 280–550ms, major transitions 600–1000ms, ambient loops 4–12s, and staggers on a
0 / 30 / 50 / 70ms ladder.

## Design tokens

Everything is driven by CSS custom properties in `app/globals.css` and surfaced through
`tailwind.config.ts`. The palette is a warm editorial set — bone, sand, clay, ochre, pine,
ink — distributed roughly 65% neutral ground, 18% secondary surfaces, 12% clay and 5%
accents. Dark passages opt in with the `.on-dark` class, which re-points the same tokens
(and lifts clay and ochre so large type still clears 3:1).

Because the tokens are channel triples (`--rgb-primary: 185 78 46`), GSAP can tween them
directly, which is how the pinned section changes its entire palette as you scroll through
it.

## Accessibility

- `prefers-reduced-motion` is honoured three ways: `MotionConfig reducedMotion="user"` for
  Framer, explicit checks in every GSAP effect, and a CSS backstop. Under reduced motion the
  pinned section un-pins and reads as a stack, ambient floats stop, and parallax is off.
- Every entrance resolves to a visible end state; nothing depends on animation to be read.
- Text contrast was measured against its painted background at every breakpoint; the muted
  tone and the small clay chips were adjusted until nothing sat under 4.5:1 (3:1 for large
  display type).
- Semantic landmarks, a skip link, visible focus rings, keyboard-reachable navigation, and
  `aria-label`s on the data visualisations.

## Two things worth knowing if you extend this

**Never put a viewport trigger on a self-clipped element.** Chromium folds an element's own
`clip-path` into the rectangle `IntersectionObserver` measures, so an element that starts at
`inset(0% 100% 0% 0%)` reports a zero intersection and its `whileInView` never fires.
`components/motion/ImageReveal.tsx` puts the trigger on an unclipped wrapper and drives the
clip through variants.

**Keep clip-path units identical on every side.** `inset(0 100% 0 0)` → `inset(0 0% 0 0%)`
mixes `px` and `%`; Framer cannot interpolate that and silently leaves the element shut.

## Structure

```
app/                 layout, tokens, page composition
components/motion/   reusable primitives (split text, parallax, reveals, magnetic, tilt…)
components/sections/ one file per section of the page
components/ui/       product mockups — variant wall, activation plan, performance board
components/layout/   header, footer, logo, cursor
lib/motion.ts        the motion system
lib/pathStory.ts     the four formations and the geometry that interpolates between them
```

Companies, metrics and testimonials on the page are invented for the study.

## Single-file demo

`npm run demo` produces `out/signalarc-demo.html` — the whole site as one
self-contained document with no external requests: the compiled stylesheet, every
font and a client-only bundle of the same components, all inlined.

It mounts rather than hydrates. The target is a host that owns `<html>`, `<head>`
and `<body>` itself, so there is no server markup to hydrate against and no
mismatch to recover from; `demo/entry.tsx` mirrors `app/layout.tsx` minus the
pieces that only exist server-side.
