import { chromium } from 'playwright';
import fs from 'node:fs';
const base = process.env.BASE_URL || 'http://localhost:3000/';
const out = process.argv[2];
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const p = await b.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
await p.goto(base, { waitUntil: 'networkidle' });
await p.waitForTimeout(1800);
fs.mkdirSync(out, { recursive: true });
await p.screenshot({ path: `${out}/00-hero.png` });
for (const id of (process.argv[3] || '').split(',').filter(Boolean)) {
  await p.evaluate((id) => { const el = document.querySelector('#' + id); if (el) window.scrollTo(0, window.scrollY + el.getBoundingClientRect().top); }, id);
  await p.waitForTimeout(700);
  await p.screenshot({ path: `${out}/${id}.png` });
}
// anything left invisible?
const hidden = await p.evaluate(() => {
  const bad = [];
  document.querySelectorAll('h1,h2,h3,p,li,dd,dt,a,blockquote').forEach(el => {
    const cs = getComputedStyle(el);
    const r = el.getBoundingClientRect();
    if (r.width === 0 && r.height === 0) return;
    if (parseFloat(cs.opacity) < 0.15 || cs.visibility === 'hidden') bad.push({ t: (el.textContent||'').trim().slice(0,40), op: cs.opacity, v: cs.visibility });
  });
  return bad.slice(0, 12);
});
console.log('low-opacity text nodes:', hidden.length);
hidden.forEach(x => console.log('  ', JSON.stringify(x.t), x.op, x.v));
await b.close();
