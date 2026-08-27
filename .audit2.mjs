import { chromium } from 'playwright';
const base = process.env.BASE_URL || 'http://localhost:3000/';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
for (const [w, h] of [[375,812],[390,844],[480,900],[768,1024],[1024,768]]) {
  const p = await b.newPage({ viewport: { width: w, height: h } });
  await p.goto(base, { waitUntil: 'networkidle' });
  await p.waitForTimeout(1200);
  await p.evaluate(async () => {
    const step = window.innerHeight * 0.8;
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.__lenis ? window.__lenis.scrollTo(y, { immediate: true }) : window.scrollTo(0, y);
      await new Promise(r => setTimeout(r, 80));
    }
  });
  const res = await p.evaluate(() => {
    const vw = document.documentElement.clientWidth;
    const out = [];
    document.querySelectorAll('body *').forEach(el => {
      if (el.closest('[aria-hidden="true"], .marquee-track')) return;
      const cs = getComputedStyle(el);
      if (cs.position === 'fixed' || cs.pointerEvents === 'none') return;
      if (!el.textContent || !el.textContent.trim()) return;
      if (el.children.length > 0) return; // leaf text nodes only
      const r = el.getBoundingClientRect();
      if (r.width === 0) return;
      if (r.right > vw + 1 || r.left < -1) out.push({ t: el.textContent.trim().slice(0, 34), l: Math.round(r.left), rr: Math.round(r.right) });
    });
    return out.slice(0, 10);
  });
  console.log(`--- ${w}x${h}: ${res.length} text overflow`);
  res.forEach(o => console.log('   ', JSON.stringify(o.t), o.l, '→', o.rr));
  await p.close();
}
await b.close();
