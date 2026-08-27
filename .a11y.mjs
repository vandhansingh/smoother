import { chromium } from 'playwright';
const base = process.env.BASE_URL || 'http://localhost:3000/';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto(base, { waitUntil: 'networkidle' });
await p.waitForTimeout(1500);

// heading outline
const heads = await p.evaluate(() =>
  Array.from(document.querySelectorAll('h1,h2,h3,h4')).map(h => `${h.tagName} ${h.textContent.trim().slice(0,48)}`)
);
console.log('--- headings ---');
heads.forEach(h => console.log('  ', h));

// contrast of visible text against its painted background
const srgb = (c) => { c /= 255; return c <= 0.03928 ? c/12.92 : Math.pow((c+0.055)/1.055, 2.4); };
const lum = ([r,g,b]) => 0.2126*srgb(r)+0.7152*srgb(g)+0.0722*srgb(b);
const samples = await p.evaluate(() => {
  const parse = (s) => (s.match(/[\d.]+/g) || []).slice(0,3).map(Number);
  const bgOf = (el) => {
    let n = el;
    while (n && n !== document.documentElement) {
      const c = getComputedStyle(n).backgroundColor;
      const a = (c.match(/[\d.]+/g) || [])[3];
      if (c && c !== 'rgba(0, 0, 0, 0)' && (a === undefined || Number(a) > 0.85)) return parse(c);
      n = n.parentElement;
    }
    return [255,255,255];
  };
  const out = [];
  document.querySelectorAll('p,li,span,a,dd,dt,h1,h2,h3,blockquote,button').forEach(el => {
    if (el.children.length) return;
    const t = (el.textContent||'').trim();
    if (!t) return;
    const cs = getComputedStyle(el);
    const r = el.getBoundingClientRect();
    if (!r.width || !r.height) return;
    if (parseFloat(cs.opacity) < 0.9) return;
    out.push({ t: t.slice(0,32), fg: parse(cs.color), bg: bgOf(el), size: parseFloat(cs.fontSize), weight: cs.fontWeight });
  });
  return out;
});
const bad = [];
for (const s of samples) {
  const l1 = lum(s.fg), l2 = lum(s.bg);
  const ratio = (Math.max(l1,l2)+0.05)/(Math.min(l1,l2)+0.05);
  const large = s.size >= 24 || (s.size >= 18.66 && Number(s.weight) >= 700);
  const min = large ? 3 : 4.5;
  if (ratio < min) bad.push({ ...s, ratio: ratio.toFixed(2), min });
}
console.log('--- contrast failures:', bad.length, '---');
const seen = new Set();
bad.forEach(x => { const k = x.t + x.fg.join(); if (seen.has(k)) return; seen.add(k); console.log('  ', JSON.stringify(x.t), 'fg', x.fg.join(','), 'bg', x.bg.join(','), 'ratio', x.ratio, 'need', x.min, 'size', x.size); });
await b.close();
