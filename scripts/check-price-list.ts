/**
 * scripts/check-price-list.ts — keeps the committed PDF honest.
 *
 * The PDF is generated from src/config/services.ts + addons.ts + terms.ts, so it cannot
 * disagree with the pricing section. This check exists for the other direction: if a price
 * changes and nobody re-runs `npm run price-list`, the committed file goes stale — and a
 * client downloading last year's numbers is worse than no PDF at all.
 *
 * Implementation note: Chromium's PDF output is not byte-stable across versions and CI runs
 * a different Chromium than a laptop, so comparing PDF bytes would produce false alarms.
 * Instead we compare the source of truth (a hash of the printed content) and assert the
 * committed file is a readable PDF of plausible size.
 */
import { createHash } from 'node:crypto';
import { readFileSync, statSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { websitePackages, webAppPackages, websiteInclusions, webAppIntro } from '../src/config/services.ts';
import { addons, maintenancePlans } from '../src/config/addons.ts';
import { priceNote, GUARANTEE_DAYS, terms } from '../src/config/terms.ts';
import { site } from '../src/config/site.ts';
import { formatPrice } from '../src/lib/format.ts';

const PDF = join(process.cwd(), 'public', 'price-list-bima-abiyasa-2026.pdf');
const STAMP = join(process.cwd(), 'public', 'price-list-bima-abiyasa-2026.source.json');

/** Everything the PDF is built from, in a stable order. */
function priceListSource(): string {
  return JSON.stringify({
    site: { name: site.name, title: site.title, liveUrl: site.liveUrl },
    inclusions: websiteInclusions,
    website: websitePackages.map((pkg) => [
      pkg.name,
      pkg.forWho,
      formatPrice(pkg.price),
      pkg.deliverables,
      pkg.revisions,
      pkg.timeline,
    ]),
    webApp: [webAppIntro, ...webAppPackages.map((pkg) => [pkg.name, pkg.forWho, formatPrice(pkg.price), pkg.deliverables])],
    addons: addons.map((addon) => [addon.label, formatPrice(addon.price)]),
    maintenance: maintenancePlans.map((plan) => [plan.name, formatPrice(plan.price), plan.includes]),
    guarantee: GUARANTEE_DAYS,
    terms: terms.map((term) => term.answer),
    priceNote,
  });
}

export function sourceHash(): string {
  return createHash('sha256').update(priceListSource()).digest('hex').slice(0, 16);
}

function main(): void {
  if (!existsSync(PDF)) {
    process.stderr.write('price list PDF is missing. Run: npm run price-list\n');
    process.exitCode = 1;
    return;
  }

  const bytes = readFileSync(PDF);
  const header = bytes.subarray(0, 5).toString();
  const { size } = statSync(PDF);

  if (header !== '%PDF-') {
    process.stderr.write(`price list is not a PDF (header: ${JSON.stringify(header)})\n`);
    process.exitCode = 1;
    return;
  }

  if (size < 20_000 || size > 400_000) {
    process.stderr.write(`price list size looks wrong: ${size} bytes\n`);
    process.exitCode = 1;
    return;
  }

  const expected = sourceHash();
  const recorded = existsSync(STAMP)
    ? (JSON.parse(readFileSync(STAMP, 'utf8')) as { hash?: string }).hash
    : undefined;

  process.stdout.write(`price list: ${size.toLocaleString('en-US')} bytes, ${header}, source hash ${expected}\n`);

  if (recorded !== expected) {
    process.stderr.write(
      [
        '',
        'The price list was built from different pricing data than the config currently holds.',
        `  recorded: ${recorded ?? '(no stamp)'}`,
        `  current : ${expected}`,
        'Run: npm run price-list',
        '',
      ].join('\n'),
    );
    process.exitCode = 1;
  }
}

main();
