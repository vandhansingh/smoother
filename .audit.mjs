import { chromium } from 'playwright';
const base = process.env.BASE_URL || 'http://localhost:3000/';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
for (const [w, h] of [[1600,900],[1440,900],[1280,800],[1024,768],[900,900],[820,1180],[768,1024],[640,900],[480,900],[390,844],[375,812]]) {
  const p = await b.newPage({ viewport: { width: w, height: h } });
  await p.goto(base, { waitUntil: 'networkidle' });
  await p.waitForTimeout(1500);
  // walk the page so lazy/whileInView content lays out
  await p.evaluate(async () => {
    const step = window.innerHeight * 0.8;
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.__lenis ? window.__lenis.scrollTo(y, { immediate: true }) : window.scrollTo(0, y);
      await new Promise(r => setTimeout(r, 90));
    }
    window.__lenis ? window.__lenis.scrollTo(0, { immediate: true }) : window.scrollTo(0, 0);
    await new Promise(r => setTimeout(r, 200));
  });
  const res = await p.evaluate(() => {
    const vw = document.documentElement.clientWidth;
    const offenders = [];
    document.querySelectorAll('body *').forEach(el => {
      const r = el.getBoundingClientRect();
      if (r.width === 0 || r.height === 0) return;
      if (r.right > vw + 1.5 || r.left < -1.5) {
        const cs = getComputedStyle(el);
        if (cs.position === 'fixed') return;
        offenders.push({
          tag: el.tagName,
          cls: (el.className || '').toString().slice(0, 56),
          left: Math.round(r.left), right: Math.round(r.right),
        });
      }
    });
    return { vw, scrollW: document.documentElement.scrollWidth, bodyScrollW: document.body.scrollWidth, offenders: offenders.slice(0, 8), count: offenders.length };
  });
  console.log(`${w}x${h}  scrollW=${res.scrollW} vw=${res.vw} overflowingEls=${res.count}`);
  res.offenders.forEach(o => console.log('   ', o.tag, o.cls, `[${o.left} → ${o.right}]`));
  await p.close();
}
await b.close();
