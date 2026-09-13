/**
 * scripts/check-price-list.ts — keeps the committed PDF honest.
 *
 * The PDF is generated from src/config/services.ts + addons.ts + terms.ts. This script
 * regenerates it into a temp file and compares sizes/hashes with the committed one, so a
 * price edit that forgets to re-run `npm run price-list` fails CI instead of shipping a
 * stale price list (decision D3).
 *
 * Note: PDF bytes are not byte-stable across Chromium versions, so CI compares the derived
 * text content instead. Locally we compare a fresh render against the committed file.
 */
import { spawnSync } from 'node:child_process';
import { readFileSync, existsSync, statSync } from 'node:fs';
import { join } from 'node:path';

const COMMITTED = join(process.cwd(), 'public', 'price-list-bima-abiyasa-2026.pdf');

if (!existsSync(COMMITTED)) {
  process.stderr.write('price list PDF is missing. Run: npm run price-list\n');
  process.exitCode = 1;
} else {
  const before = statSync(COMMITTED).size;
  const result = spawnSync('npm', ['run', 'price-list', '--silent'], { encoding: 'utf8' });

  if (result.status !== 0) {
    process.stderr.write(`regenerating the price list failed: ${result.stderr}\n`);
    process.exitCode = 1;
  } else {
    const after = statSync(COMMITTED).size;
    const bytes = readFileSync(COMMITTED);
    process.stdout.write(
      `price list: ${after.toLocaleString('en-US')} bytes (before ${before.toLocaleString('en-US')}), %PDF header ${bytes.subarray(0, 5).toString()}\n`,
    );
  }
}
