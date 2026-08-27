/**
 * Builds the single-file demo: the whole site as one self-contained HTML
 * document with no external requests at all.
 *
 *   STATIC_EXPORT=1 npm run build     # produces out/ — needed for the CSS
 *   node scripts/demo-artifact.mjs [outfile]
 *
 * The static export supplies the compiled Tailwind stylesheet and the
 * self-hosted font files. esbuild supplies a client-only bundle of the
 * same components, mounted rather than hydrated: the target host owns
 * <html>, <head> and <body>, so there is no server markup to hydrate
 * against and no mismatch to recover from.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import * as esbuild from 'esbuild';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(root, 'out');
const dest = process.argv[2] ?? path.join(OUT, 'signalarc-demo.html');

if (!fs.existsSync(OUT)) {
  console.error('out/ is missing — run `STATIC_EXPORT=1 npm run build` first.');
  process.exit(1);
}

/* ---- 1. the compiled stylesheet, with every font folded in ---- */
const cssDir = path.join(OUT, '_next/static/css');
const cssFile = fs.readdirSync(cssDir).find((f) => f.endsWith('.css'));
let css = fs.readFileSync(path.join(cssDir, cssFile), 'utf8');

let fontCount = 0;
css = css.replace(/url\(\/(_next\/static\/media\/[^)]+)\)/g, (_, rel) => {
  fontCount += 1;
  const data = fs.readFileSync(path.join(OUT, rel)).toString('base64');
  return `url(data:font/woff2;base64,${data})`;
});

/* ---- 2. the font-variable classes the export put on <html> ---- */
const html = fs.readFileSync(path.join(OUT, 'index.html'), 'utf8');
const htmlTag = html.match(/<html([^>]*)>/)[1];
const classes = (htmlTag.match(/class="([^"]*)"/)?.[1] ?? '').split(/\s+/).filter(Boolean);
const lang = htmlTag.match(/lang="([^"]*)"/)?.[1] ?? 'en';
/* The document title is the product name on its own: the marketing
   line the site ships with reads as an appended explainer wherever this
   file is listed rather than browsed. */
const title = 'Signalarc';

/* ---- 3. the client bundle ---- */
const bundle = await esbuild.build({
  entryPoints: [path.join(root, 'demo/entry.tsx')],
  bundle: true,
  minify: true,
  format: 'iife',
  target: 'es2020',
  jsx: 'automatic',
  define: { 'process.env.NODE_ENV': '"production"' },
  alias: { '@': root },
  write: false,
  outfile: 'bundle.js',
});
const js = bundle.outputFiles[0].text;

/* ---- 4. one document, no external references ---- */
const guard = (s) => s.replace(/<\/script/gi, '<\\/script');

const out = `<title>${title}</title>
<script>
  document.documentElement.lang = ${JSON.stringify(lang)};
  document.documentElement.classList.add(${classes.map((c) => JSON.stringify(c)).join(', ')});
</script>
<style>${css}</style>
<div id="signalarc"></div>
<script>${guard(js)}</script>
`;

fs.writeFileSync(dest, out);
console.log(
  `${path.relative(root, dest)} · ${(out.length / 1024 / 1024).toFixed(2)} MB · ` +
    `${fontCount} fonts inlined · ${(js.length / 1024).toFixed(0)} kB of script`
);
