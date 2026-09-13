/**
 * scripts/generate-price-list.ts — writes public/price-list-bima-abiyasa-2026.pdf.
 *
 * The PDF is generated from the SAME config that renders the pricing section, so the file a
 * client downloads cannot disagree with the page they are reading (decision D3). It is a
 * build artifact that happens to be committed, and CI re-generates it to prove they match.
 *
 *   npm run price-list
 */
import { chromium } from 'playwright';
import { mkdir, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { sourceHash } from './check-price-list.ts';
import { websitePackages, webAppPackages, websiteInclusions, webAppIntro } from '../src/config/services.ts';
import { addons, maintenancePlans } from '../src/config/addons.ts';
import { priceNote, GUARANTEE_DAYS } from '../src/config/terms.ts';
import { site } from '../src/config/site.ts';
import { formatPrice } from '../src/lib/format.ts';

const OUT = join(process.cwd(), 'public', 'price-list-bima-abiyasa-2026.pdf');
const YEAR = new Date().getFullYear();

const esc = (value: string): string =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const packageTable = (
  title: string,
  lead: string,
  packages: typeof websitePackages,
): string => `
  <h2>${esc(title)}</h2>
  <p class="lead">${esc(lead)}</p>
  <table>
    <thead><tr><th>Paket</th><th>Cocok untuk</th><th>Harga</th><th>Isi</th><th>Revisi &amp; waktu</th></tr></thead>
    <tbody>
      ${packages
        .map(
          (pkg) => `<tr>
        <td class="name">${esc(pkg.name)}</td>
        <td>${esc(pkg.forWho)}</td>
        <td class="price">${esc(formatPrice(pkg.price))}</td>
        <td><ul>${pkg.deliverables.map((item) => `<li>${esc(item)}</li>`).join('')}</ul></td>
        <td>${esc(pkg.revisions)}<br />${esc(pkg.timeline)}</td>
      </tr>`,
        )
        .join('')}
    </tbody>
  </table>
`;

const addonRows = addons
  .map(
    (addon) =>
      `<tr><td>${esc(addon.label)}</td><td class="price">${esc(formatPrice(addon.price))}</td></tr>`,
  )
  .join('');

const maintenanceRows = maintenancePlans
  .map(
    (plan) =>
      `<tr><td class="name">${esc(plan.name)}</td><td class="price">${esc(formatPrice(plan.price))}</td><td>${esc(plan.includes)}</td></tr>`,
  )
  .join('');

const html = `<!doctype html>
<html lang="id">
<head>
<meta charset="utf-8" />
<title>Price List ${esc(site.name)} ${YEAR}</title>
<style>
  @page { size: A4; margin: 16mm 14mm; }
  * { box-sizing: border-box; }
  body {
    margin: 0;
    font-family: 'Helvetica Neue', Arial, sans-serif;
    color: #111;
    font-size: 10.5px;
    line-height: 1.5;
  }
  .mono { font-family: 'SFMono-Regular', Menlo, monospace; letter-spacing: 0.08em; text-transform: uppercase; font-size: 8.5px; color: #6b6b6b; }
  header { border-bottom: 2px solid #111; padding-bottom: 10px; margin-bottom: 14px; }
  h1 { font-size: 20px; margin: 0 0 4px; letter-spacing: -0.01em; }
  h2 { font-size: 13px; margin: 16px 0 6px; padding-bottom: 4px; border-bottom: 1px solid #ddd; }
  .lead { margin: 0 0 8px; color: #444; }
  table { width: 100%; border-collapse: collapse; margin-bottom: 10px; }
  th { text-align: left; font-size: 8.5px; text-transform: uppercase; letter-spacing: 0.06em; color: #6b6b6b; border-bottom: 1px solid #ddd; padding: 4px 6px 4px 0; }
  td { vertical-align: top; padding: 5px 6px 5px 0; border-bottom: 1px solid #eee; }
  td.name { font-weight: 600; }
  td.price { white-space: nowrap; font-variant-numeric: tabular-nums; }
  ul { margin: 0; padding-left: 12px; }
  .two-col { display: flex; gap: 18px; }
  .two-col > div { flex: 1; }
  .note { margin-top: 12px; padding: 8px 10px; background: #f5f5f5; border-left: 2px solid #999; font-size: 9.5px; }
  footer { margin-top: 16px; border-top: 1px solid #ddd; padding-top: 8px; font-size: 9px; color: #555; }
  .avoid-break { break-inside: avoid; }
</style>
</head>
<body>
  <header>
    <p class="mono">Price list ${YEAR}</p>
    <h1>${esc(site.name)} — ${esc(site.title)}</h1>
    <p class="lead">${esc(site.oneLiner)}</p>
    <p class="mono">${esc(site.location)} · WhatsApp ${esc(site.contact.whatsappDisplay)} · ${esc(site.contact.email)}</p>
  </header>

  <section class="avoid-break">
    ${packageTable('Paket Website', `Semua paket website termasuk: ${websiteInclusions.join(', ').toLowerCase()}.`, websitePackages)}
  </section>

  <section class="avoid-break">
    ${packageTable('Web Application', webAppIntro, webAppPackages)}
  </section>

  <section class="avoid-break">
    <h2>Add-on</h2>
    <div class="two-col">
      <div><table><tbody>${addonRows}</tbody></table></div>
    </div>
  </section>

  <section class="avoid-break">
    <h2>Perawatan bulanan</h2>
    <table>
      <thead><tr><th>Plan</th><th>Harga</th><th>Cakupan</th></tr></thead>
      <tbody>${maintenanceRows}</tbody>
    </table>
  </section>

  <section class="avoid-break">
    <h2>Ketentuan</h2>
    <ul>
      <li>Pembayaran 40% saat mulai, 30% setelah fitur utama disetujui, 30% sebelum handover.</li>
      <li>Harga mencakup jasa development sesuai scope dan jumlah revisi yang disepakati.</li>
      <li>Perubahan di luar scope dibuatkan estimasi biaya dan timeline baru.</li>
      <li>Garansi bug berlaku ${esc(GUARANTEE_DAYS)} untuk fungsi yang tercantum di scope, bukan fitur baru.</li>
      <li>Source code dan akses produksi diserahkan setelah pembayaran lunas.</li>
      <li>Timeline dimulai setelah materi, akses, dan keputusan yang dibutuhkan tersedia.</li>
    </ul>
    <p class="note">${esc(priceNote)}</p>
    <p class="note">Belum termasuk: domain, hosting, server, database managed, lisensi premium, biaya API/AI, payment gateway, WhatsApp provider, email provider, konten, foto, copywriting, dan pajak jika berlaku. Jasa development saja; domain, hosting, server, lisensi dan utilitas pihak ketiga tidak termasuk.</p>
  </section>

  <footer>
    <p>Dokumen ini dibuat otomatis dari data harga di situs, sehingga angka di sini selalu sama dengan yang tertera di ${esc(site.liveUrl)}</p>
  </footer>
</body>
</html>`;

async function main(): Promise<void> {
  await mkdir(join(process.cwd(), 'public'), { recursive: true });
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: 'load' });
  const pdf = await page.pdf({
    format: 'A4',
    printBackground: true,
    margin: { top: '16mm', bottom: '16mm', left: '14mm', right: '14mm' },
  });
  await browser.close();
  await writeFile(OUT, pdf);

  // The stamp records WHICH pricing data produced this file, so the CI check can tell
  // "stale because prices changed" from "different Chromium version" (banner sizes vary).
  await writeFile(
    join(process.cwd(), 'public', 'price-list-bima-abiyasa-2026.source.json'),
    `${JSON.stringify({ hash: sourceHash(), generatedAt: new Date().toISOString(), year: YEAR }, null, 2)}\n`,
  );

  process.stdout.write(`wrote ${OUT} (${pdf.length.toLocaleString('en-US')} bytes)\n`);

  if (!existsSync(OUT)) {
    process.stderr.write('PDF was not written\n');
    process.exitCode = 1;
  }
}

main().catch((error: unknown) => {
  process.stderr.write(`price list failed: ${String(error)}\n`);
  process.exitCode = 1;
});
