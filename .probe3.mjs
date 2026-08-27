import { chromium } from 'playwright';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
p.on('console', m => { const t=m.text(); if (t.includes('IR-ENTER')) console.log('ENTER FIRED'); });
p.on('pageerror', e => console.log('PAGEERROR:', e.message.slice(0,300)));
await p.goto('http://localhost:3000/', { waitUntil: 'networkidle' });
await p.waitForTimeout(1200);
for (let i = 0; i < 70; i++) { await p.mouse.wheel(0, 600); await p.waitForTimeout(90); }
await p.waitForTimeout(1000);
console.log(await p.evaluate(() => Array.from(document.querySelectorAll('#work article a > div')).map(e => getComputedStyle(e).clipPath)));
await b.close();
