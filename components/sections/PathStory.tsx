'use client';

import { useRef, useState } from 'react';
import { gsap } from '@/lib/gsap';
import { useIsMobile, useIsomorphicLayoutEffect, useReducedMotion } from '@/lib/hooks';
import { COUNT, STAGE_H, STAGE_W, placement, placementAt, spines, tone } from '@/lib/pathStory';
import FadeUp from '@/components/motion/FadeUp';
import SplitText from '@/components/motion/SplitText';

/* ============================================================
   PATH STORYTELLING — the section the whole page is built around
   Twenty-four objects hold their identity across four formations:
   a master grid, five channel lanes, a performance curve, and a
   closed loop. Nothing cross-fades and nothing is swapped out —
   the same objects travel, so the argument stays legible.

   Below 900px (and under prefers-reduced-motion) the pin is
   dropped entirely and the four chapters are read as a stack.
   ============================================================ */

const chapters = [
  {
    tag: 'Creative',
    title: 'It starts as one idea.',
    body: 'A master, a set of rules, and every derivative the market needs. Nothing is redrawn, and nothing drifts off brand.',
    metric: '1 master · 208 derivatives',
  },
  {
    tag: 'Media',
    title: 'It goes out as many.',
    body: 'The set routes itself into channels — each variant landing where the evidence says it has the best chance.',
    metric: '14 channels · 1 budget',
  },
  {
    tag: 'Intelligence',
    title: 'It comes back as evidence.',
    body: 'Results resolve to the choices behind them: the hook, the crop, the first frame — not just the placement it ran in.',
    metric: '62% lift over baseline',
  },
  {
    tag: 'The loop',
    title: 'And then it closes.',
    body: 'Findings are written back into the template that produced them, so the next brief starts where the last one finished.',
    metric: 'Every result re-enters the brief',
  },
];

const backgrounds = ['#f3efe7', '#e7e1d4', '#2e4a40', '#161310'];

function Objects({
  refs,
  state,
}: {
  refs?: React.MutableRefObject<(SVGGElement | null)[]>;
  state?: number;
}) {
  return (
    <>
      {Array.from({ length: COUNT }).map((_, i) => {
        const t = tone(i);
        const p = state !== undefined ? placement(state, i) : placement(0, i);
        return (
          <g
            key={i}
            ref={refs ? (el) => { refs.current[i] = el; } : undefined}
            transform={`translate(${p.x} ${p.y}) rotate(${p.rotation}) scale(${p.scale})`}
          >
            <rect
              x={-24}
              y={-24}
              width={48}
              height={48}
              rx={8}
              style={{
                fill:
                  t === 'primary'
                    ? 'rgb(var(--rgb-primary))'
                    : t === 'accent'
                      ? 'rgb(var(--rgb-accent))'
                      : t === 'secondary'
                        ? 'rgb(var(--rgb-obj-alt))'
                        : 'rgb(var(--rgb-obj) / 0.88)',
              }}
            />
          </g>
        );
      })}
    </>
  );
}

function Chapter({
  chapter,
  index,
  className = '',
  innerRef,
}: {
  chapter: (typeof chapters)[number];
  index: number;
  className?: string;
  innerRef?: (el: HTMLDivElement | null) => void;
}) {
  return (
    <div ref={innerRef} className={`text-ink ${className}`}>
      <span className="eyebrow flex items-center gap-3">
        <span className="flex h-5 w-5 items-center justify-center rounded-pill bg-primary-dark text-[0.625rem] font-semibold text-bg">
          {index + 1}
        </span>
        {chapter.tag}
      </span>
      <h3 className="mt-5 text-[clamp(2rem,3.4vw,3.25rem)] font-medium leading-[1.02] tracking-[-0.04em]">
        {chapter.title}
      </h3>
      <p className="mt-5 max-w-[38ch] font-text text-lead text-muted">{chapter.body}</p>
      <p className="mt-7 inline-flex items-center gap-2.5 rounded-pill border border-line px-4 py-2 text-[0.75rem] tracking-[0.02em] text-muted">
        <span className="h-1.5 w-1.5 rounded-pill bg-accent" />
        {chapter.metric}
      </p>
    </div>
  );
}

export default function PathStory() {
  const wrapper = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const spine = useRef<SVGPathElement>(null);
  const objects = useRef<(SVGGElement | null)[]>([]);
  const chapterEls = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState(0);

  const reduced = useReducedMotion();
  const isMobile = useIsMobile();
  const disabled = reduced || isMobile;

  useIsomorphicLayoutEffect(() => {
    if (disabled || !wrapper.current || !stage.current) return;

    const ctx = gsap.context(() => {
      const render = (progress: number) => {
        for (let i = 0; i < COUNT; i++) {
          const el = objects.current[i];
          if (!el) continue;
          const p = placementAt(progress, i);
          el.setAttribute(
            'transform',
            `translate(${p.x.toFixed(2)} ${p.y.toFixed(2)}) rotate(${p.rotation.toFixed(2)}) scale(${p.scale.toFixed(3)})`
          );
        }
      };

      let last = -1;

      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: wrapper.current,
          start: 'top top',
          end: () => `+=${window.innerHeight * 3.4}`,
          pin: stage.current,
          pinSpacing: true,
          anticipatePin: 1,
          scrub: 0.65,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            render(self.progress);
            const idx = Math.min(3, Math.round(self.progress * 3));
            if (idx !== last) {
              last = idx;
              setActive(idx);
            }
          },
        },
      });

      // spine: frame → fan → curve → loop
      spines.slice(1).forEach((d, i) => {
        tl.to(spine.current, { morphSVG: d, duration: 1, ease: 'power2.inOut' }, i);
      });

      // Colour is part of the motion system, not a separate switch.
      // The ground crossfades slowly, but the ink/bone flip is a hard
      // cut at the midpoint of that crossfade: tweening the two would
      // walk the copy through a mid-grey that fails contrast against a
      // half-mixed ground, and a scrubbed timeline can be parked there
      // indefinitely.
      backgrounds.slice(1).forEach((bg, i) => {
        const dark = i >= 1;
        tl.to(wrapper.current, { backgroundColor: bg, duration: 0.18 }, i + 0.34);
        tl.set(
          wrapper.current,
          {
            '--rgb-text': dark ? '243 239 231' : '23 19 16',
            '--rgb-text-muted': dark ? '171 161 146' : '110 99 87',
            '--rgb-border': dark ? '68 60 51' : '220 212 196',
            '--rgb-obj': dark ? '243 239 231' : '23 19 16',
            '--rgb-obj-alt': dark ? '124 158 140' : '58 92 78',
            '--rgb-primary': dark ? '216 111 76' : '185 78 46',
            '--rgb-accent': dark ? '233 178 92' : '227 163 64',
          },
          i + 0.43
        );
      });

      // Chapters hand over to each other, and the handover is timed to
      // straddle the ground crossfade: the outgoing chapter is gone
      // before the colour starts moving and the incoming one arrives
      // after it has settled, so no copy is ever read against a
      // half-mixed background.
      chapterEls.current.forEach((el, i) => {
        if (!el) return;
        if (i > 0) {
          tl.fromTo(
            el,
            { autoAlpha: 0, y: 26 },
            { autoAlpha: 1, y: 0, duration: 0.3, ease: 'power2.out' },
            i - 0.48
          );
        }
        if (i < chapters.length - 1) {
          tl.to(el, { autoAlpha: 0, y: -26, duration: 0.26, ease: 'power2.in' }, i + 0.08);
        }
      });

      render(0);
    }, wrapper);

    return () => ctx.revert();
  }, [disabled]);

  /* ---------- stacked fallback ---------- */
  if (disabled) {
    return (
      <section id="story" className="relative overflow-hidden bg-bg-secondary py-section">
        <div className="shell">
          <FadeUp>
            <p className="eyebrow flex items-center gap-3">
              <span className="h-px w-8 bg-primary" />
              How the loop runs
            </p>
          </FadeUp>
          <SplitText
            as="h2"
            by="line"
            text={['One set of objects.', 'Four states.']}
            className="mt-6 text-section font-medium"
            stagger={0.09}
          />

          <div className="mt-16 flex flex-col gap-14">
            {chapters.map((c, i) => (
              <FadeUp key={c.tag} className="grid gap-8 sm:grid-cols-2 sm:items-center">
                <Chapter chapter={c} index={i} />
                <div
                  className="rounded-lg border border-line p-4"
                  style={{
                    backgroundColor: backgrounds[i],
                    ...((i >= 2
                      ? { '--rgb-obj': '243 239 231', '--rgb-obj-alt': '124 158 140' }
                      : { '--rgb-obj': '23 19 16', '--rgb-obj-alt': '58 92 78' }) as React.CSSProperties),
                  }}
                >
                  <svg viewBox={`0 0 ${STAGE_W} ${STAGE_H}`} className="w-full" aria-hidden>
                    <path
                      d={spines[i]}
                      fill="none"
                      stroke={i >= 2 ? 'rgb(243 239 231 / 0.28)' : 'rgb(23 19 16 / 0.18)'}
                      strokeWidth={2}
                      vectorEffect="non-scaling-stroke"
                    />
                    <Objects state={i} />
                  </svg>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>
    );
  }

  /* ---------- pinned stage ---------- */
  return (
    /* The ground and the object tokens live on the wrapper, not on the
       pinned element: ScrollTrigger owns the pinned element's inline
       style and rewrites it wholesale on every refresh, which silently
       drops any custom property set there. The wrapper is untouched, its
       background shows through the transparent stage, and the object
       tokens it scrubs (declared in globals.css) cascade down. */
    <section
      id="story"
      ref={wrapper}
      className="relative text-ink"
      style={{ backgroundColor: backgrounds[0] }}
    >
      <div
        ref={stage}
        className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden"
      >
        <div className="shell w-full py-[clamp(4rem,8vh,6rem)]">
          {/* progress rail */}
          <div className="mb-[clamp(2rem,5vh,3.5rem)] flex items-center gap-3 sm:gap-5">
            {chapters.map((c, i) => (
              <span key={c.tag} className="flex flex-1 flex-col gap-2.5">
                <span className="relative h-px w-full overflow-hidden bg-ink/15">
                  <span
                    className="absolute inset-y-0 left-0 bg-primary transition-transform duration-[520ms] ease-premium"
                    style={{
                      width: '100%',
                      transform: `scaleX(${i <= active ? 1 : 0})`,
                      transformOrigin: 'left',
                    }}
                  />
                </span>
                <span
                  className={[
                    'text-[0.6875rem] uppercase tracking-[0.14em] transition-colors duration-[420ms] ease-premium',
                    i === active ? 'text-ink' : 'text-muted',
                  ].join(' ')}
                >
                  {c.tag}
                </span>
              </span>
            ))}
          </div>

          <div className="grid items-center gap-x-10 gap-y-8 lg:grid-cols-12">
            {/* chapters, stacked in place */}
            <div className="relative min-h-[19rem] lg:col-span-4">
              {chapters.map((c, i) => (
                <Chapter
                  key={c.tag}
                  chapter={c}
                  index={i}
                  innerRef={(el) => { chapterEls.current[i] = el; }}
                  className={i === 0 ? 'relative' : 'absolute inset-x-0 top-0'}
                />
              ))}
            </div>

            {/* the stage */}
            <div className="lg:col-span-8 lg:col-start-5">
              <svg
                viewBox={`0 0 ${STAGE_W} ${STAGE_H}`}
                className="w-full"
                role="img"
                aria-label="Twenty-four campaign assets moving through four formations: a master grid, five channel lanes, a rising performance curve, and a closed loop."
              >
                <path
                  ref={spine}
                  d={spines[0]}
                  fill="none"
                  stroke="rgb(var(--rgb-obj) / 0.22)"
                  strokeWidth={2}
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                />
                <Objects refs={objects} />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
