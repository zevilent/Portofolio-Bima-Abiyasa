/**
 * scripts/check-budget.ts — fails the build when the initial payload drifts past the
 * budgets in docs/brief.md §8.5. Run by CI on every push.
 *
 * What counts as "initial": everything a visitor downloads before interacting, i.e. the
 * scripts referenced by dist/index.html (and the chunks they statically import), plus the
 * HTML itself and its stylesheets. The lazily imported WebGL chunk is excluded on purpose:
 * it is fetched from an idle callback, so it is not on the critical path.
 */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { gzipSync } from 'node:zlib';

const DIST = join(process.cwd(), 'dist');
const ASTRO = join(DIST, '_astro');

const BUDGETS = {
  html: 20_000,
  css: 30_000,
  js: 120_000,
  total: 200_000,
} as const;

function gzipSize(path: string): number {
  return gzipSync(readFileSync(path)).length;
}

function collectInitialJs(): { files: string[]; bytes: number } {
  const entryScripts = new Set<string>();

  for (const page of readdirSync(DIST)) {
    if (!page.endsWith('.html')) continue;
    const html = readFileSync(join(DIST, page), 'utf8');
    for (const match of html.matchAll(/<script[^>]+src="([^"]+)"/g)) {
      const src = match[1];
      if (!src) continue;
      const name = src.split('/').pop();
      if (name) entryScripts.add(name);
    }
  }

  // Follow one level of static imports: those chunks load with the entry.
  const seen = new Set(entryScripts);
  let grew = true;
  while (grew) {
    grew = false;
    for (const name of [...seen]) {
      const path = join(ASTRO, name);
      if (!statSafe(path)) continue;
      const source = readFileSync(path, 'utf8');
      for (const match of source.matchAll(/from"\.\/([A-Za-z0-9_.-]+\.js)"/g)) {
        const dep = match[1];
        if (dep && !seen.has(dep)) {
          seen.add(dep);
          grew = true;
        }
      }
    }
  }

  const files = [...seen].filter((name) => statSafe(join(ASTRO, name)));
  const bytes = files.reduce((sum, name) => sum + gzipSize(join(ASTRO, name)), 0);
  return { files, bytes };
}

function statSafe(path: string): boolean {
  try {
    return statSync(path).isFile();
  } catch {
    return false;
  }
}

const html = readdirSync(DIST)
  .filter((file) => file.endsWith('.html'))
  .map((file) => ({ file, bytes: gzipSize(join(DIST, file)) }));
const worstHtml = html.sort((a, b) => b.bytes - a.bytes)[0] ?? { file: '-', bytes: 0 };

const cssFiles = readdirSync(ASTRO).filter((file) => file.endsWith('.css'));
const cssBytes = cssFiles.reduce((sum, file) => sum + gzipSize(join(ASTRO, file)), 0);

const { files, bytes: jsBytes } = collectInitialJs();
const total = worstHtml.bytes + cssBytes + jsBytes;

const lines = [
  `html (largest page) : ${worstHtml.bytes.toLocaleString('en-US')} B  (${worstHtml.file})`,
  `css                 : ${cssBytes.toLocaleString('en-US')} B  (${cssFiles.length} file)`,
  `initial js          : ${jsBytes.toLocaleString('en-US')} B  (${files.length} chunk)`,
  `total initial       : ${total.toLocaleString('en-US')} B`,
];

const failures: string[] = [];
if (worstHtml.bytes > BUDGETS.html) failures.push(`html ${worstHtml.bytes} > ${BUDGETS.html}`);
if (cssBytes > BUDGETS.css) failures.push(`css ${cssBytes} > ${BUDGETS.css}`);
if (jsBytes > BUDGETS.js) failures.push(`js ${jsBytes} > ${BUDGETS.js}`);
if (total > BUDGETS.total) failures.push(`total ${total} > ${BUDGETS.total}`);

process.stdout.write(`${lines.join('\n')}\n`);
process.stdout.write(`budgets             : html ${BUDGETS.html} / css ${BUDGETS.css} / js ${BUDGETS.js} / total ${BUDGETS.total}\n`);

if (failures.length > 0) {
  process.stderr.write(`\nBUDGET EXCEEDED:\n${failures.map((f) => `  - ${f}`).join('\n')}\n`);
  process.exitCode = 1;
} else {
  process.stdout.write('OK: everything inside budget.\n');
}
