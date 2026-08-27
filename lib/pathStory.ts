/* ============================================================
   PATH STORY GEOMETRY
   Four formations for the same twenty-four objects. Nothing is
   added or removed between chapters — the set of assets you start
   with is the set that ends up on the ring. That is the whole
   argument of the section, expressed as geometry.
   ============================================================ */

export const COUNT = 24;
export const STAGE_W = 1000;
export const STAGE_H = 560;

export type Placement = { x: number; y: number; scale: number; rotation: number };

/** 0 Creative — a master grid. */
function creative(i: number): Placement {
  const col = i % 6;
  const row = Math.floor(i / 6);
  return {
    x: 222 + col * 112,
    y: 112 + row * 112,
    scale: 0.92,
    rotation: 0,
  };
}

/** 1 Media — the grid fans out into five channel lanes, and the lanes
    are deliberately uneven: they carry the same 8/5/4/4/3 split as the
    allocation panel, so the formation reads as budget share rather than
    as a second, smaller grid. */
const LANE_SIZES = [8, 5, 4, 4, 3];
const LANE_Y = [96, 188, 280, 372, 464];
const LANE_START: number[] = [];
for (let l = 0, acc = 0; l < LANE_SIZES.length; l++) {
  LANE_START.push(acc);
  acc += LANE_SIZES[l];
}

function media(i: number): Placement {
  let lane = 0;
  while (lane < LANE_SIZES.length - 1 && i >= LANE_START[lane] + LANE_SIZES[lane]) lane++;
  const slot = i - LANE_START[lane];
  return {
    x: 302 + slot * 74,
    y: LANE_Y[lane],
    scale: 0.46,
    rotation: 0,
  };
}

/** 2 Intelligence — the lanes collapse onto a measured curve. */
function intelligence(i: number): Placement {
  const t = i / (COUNT - 1);
  return {
    x: 110 + t * 800,
    y: 468 - Math.pow(t, 1.35) * 380 + Math.sin(t * 7.2) * 14,
    scale: 0.34,
    rotation: 0,
  };
}

/** 3 System — the curve bends back on itself and closes. */
function system(i: number): Placement {
  const angle = (-Math.PI / 2) + (i / COUNT) * Math.PI * 2;
  const r = 212;
  return {
    x: 500 + Math.cos(angle) * r,
    y: 280 + Math.sin(angle) * r * 0.92,
    scale: 0.4,
    rotation: (angle * 180) / Math.PI + 90,
  };
}

const formations = [creative, media, intelligence, system];

export const placement = (state: number, i: number): Placement =>
  formations[Math.max(0, Math.min(formations.length - 1, state))](i);

/** Smooth-step so a formation settles instead of arriving at speed. */
const smooth = (t: number) => t * t * (3 - 2 * t);

/** Continuous position at any point along the whole story. */
export function placementAt(progress: number, i: number): Placement {
  const span = formations.length - 1;
  const p = Math.max(0, Math.min(0.99999, progress)) * span;
  const from = Math.floor(p);
  const to = Math.min(from + 1, span);
  // Each object lags its neighbours slightly, so formations arrive as a
  // wave rather than a block — the 30ms stagger idea, applied to space.
  const lag = (i / COUNT) * 0.1;
  const local = smooth(Math.max(0, Math.min(1, (p - from - lag) / (1 - lag))));

  const a = formations[from](i);
  const b = formations[to](i);

  return {
    x: a.x + (b.x - a.x) * local,
    y: a.y + (b.y - a.y) * local,
    scale: a.scale + (b.scale - a.scale) * local,
    rotation: a.rotation + (b.rotation - a.rotation) * local,
  };
}

/** The spine that travels with them: frame → fan → curve → loop. */
export const spines = [
  'M228 68 H772 C790.8 68 806 83.2 806 102 V458 C806 476.8 790.8 492 772 492 H228 C209.2 492 194 476.8 194 458 V102 C194 83.2 209.2 68 228 68 Z',
  'M286 78 C 214 88, 214 218, 250 280 C 214 342, 214 472, 286 482',
  'M112 462 C 312 428, 428 322, 574 246 C 728 166, 824 106, 916 62',
  'M500 85 C617 85 712 172 712 280 C712 388 617 475 500 475 C383 475 288 388 288 280 C288 172 383 85 500 85 Z',
];

/** Object tone: the same three brand families the asset tiles use,
    plus a neutral that inverts with the background as the story moves
    into the dark chapters. Roughly a third of the set stays neutral so
    the accents keep their weight. */
export const tone = (i: number): 'primary' | 'accent' | 'secondary' | 'neutral' => {
  if (i % 7 === 0) return 'accent';
  if (i % 3 === 0) return 'primary';
  if (i % 4 === 1) return 'secondary';
  return 'neutral';
};
