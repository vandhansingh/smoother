import { chromium } from 'playwright';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto('http://localhost:3000/', { waitUntil: 'networkidle' });
await p.waitForTimeout(1500);
// slow, natural scroll through the whole page
for (let i = 0; i < 60; i++) {
  await p.mouse.wheel(0, 700);
  await p.waitForTimeout(120);
}
await p.waitForTimeout(1200);
const r = await p.evaluate(() => Array.from(document.querySelectorAll('#work .overflow-hidden.rounded-lg')).map(e => getComputedStyle(e).clipPath));
console.log(r);
await b.close();
