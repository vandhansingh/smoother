import { chromium } from 'playwright';
const base = process.env.BASE_URL;
const [out, w, h] = [process.argv[2], Number(process.argv[3]), Number(process.argv[4])];
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const p = await b.newPage({ viewport: { width: w, height: h } });
await p.goto(base, { waitUntil: 'networkidle' });
await p.waitForTimeout(1500);
// walk so every whileInView has fired, then return to the top
await p.evaluate(async () => {
  const step = window.innerHeight * 0.6;
  for (let y = 0; y < document.body.scrollHeight; y += step) {
    window.__lenis ? window.__lenis.scrollTo(y, { immediate: true }) : window.scrollTo(0, y);
    await new Promise(r => setTimeout(r, 130));
  }
  window.__lenis ? window.__lenis.scrollTo(0, { immediate: true }) : window.scrollTo(0, 0);
  await new Promise(r => setTimeout(r, 600));
});
await p.screenshot({ path: out, fullPage: true });
await b.close();
console.log('done');
