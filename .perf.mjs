import { chromium } from 'playwright';
const base = process.env.BASE_URL;
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
const errs = [];
p.on('pageerror', e => errs.push('PAGEERROR ' + e.message.slice(0, 200)));
p.on('console', m => { if (m.type() === 'error' && !m.text().includes('favicon')) errs.push('CONSOLE ' + m.text().slice(0, 200)); });
await p.goto(base, { waitUntil: 'networkidle' });
await p.waitForTimeout(1500);

const env = await p.evaluate(() => ({
  lenis: !!window.__lenis,
  gsapTickerListeners: (window.gsap && 'n/a') || 'n/a',
  scrollTriggers: window.ScrollTrigger ? 'exposed' : 'not exposed',
}));
console.log('env:', JSON.stringify(env));

// frame timing during a scripted scroll through the pinned section
const frames = await p.evaluate(async () => {
  const times = [];
  let last = performance.now();
  let running = true;
  const tick = (t) => { times.push(t - last); last = t; if (running) requestAnimationFrame(tick); };
  requestAnimationFrame(tick);
  const story = document.querySelector('#story');
  const start = window.scrollY + story.getBoundingClientRect().top;
  for (let i = 0; i < 90; i++) {
    window.__lenis ? window.__lenis.scrollTo(start + i * 45, { immediate: true }) : window.scrollTo(0, start + i * 45);
    await new Promise(r => requestAnimationFrame(r));
  }
  running = false;
  await new Promise(r => setTimeout(r, 100));
  return times.slice(5);
});
const sorted = [...frames].sort((a, b) => a - b);
const pct = (q) => sorted[Math.floor(sorted.length * q)].toFixed(1);
console.log(`frames n=${frames.length} median=${pct(0.5)}ms p90=${pct(0.9)}ms p99=${pct(0.99)}ms max=${Math.max(...frames).toFixed(1)}ms`);
console.log('errors:', errs.length);
errs.slice(0, 6).forEach(e => console.log('  ', e));
await b.close();
