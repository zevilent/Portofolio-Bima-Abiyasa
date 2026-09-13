# M1 — Machine-readable acceptance criteria

> Sumber: `docs/brief.md` §13 (checklist M1) + aturan tetap di `REASONIX.md`.
> Satu baris = satu kriteria, dengan ID stabil `c1`, `c2`, … Dipakai untuk menandai
> selesainya tiap langkah beserta buktinya.
> **Status: c1–c8 dan c10 terpenuhi; c9 menunggu push + setelan Pages oleh Bima.**

## Scope M1

Setup fondasi: Astro + TypeScript strict + Tailwind v4 + token + font self-hosted +
config bertipe + unit test + layout dasar + workflow deploy, sampai **live URL bekerja**.
Belum ada desain visual (itu M2) dan belum ada studi kasus (M3).

## Acceptance criteria

- accept [c1]: `npm run build` selesai tanpa error dan menghasilkan `dist/index.html` + `dist/404.html`; `npx astro check` tanpa error TypeScript.
- accept [c2]: `npx vitest run` hijau, mencakup minimal: unit test builder pesan WhatsApp (termasuk kasus field opsional kosong & karakter khusus), format harga rupiah/range/`Minta estimasi` saat `SHOW_PRICES=false`, dan validasi seluruh file di `src/config/*`.
- accept [c3]: `src/styles/tokens.css` memuat seluruh token brief §3 (warna, skala tipe `clamp()`, spasi, radius, border, shadow, easing, durasi `--dur-1…6`) dan dipakai lewat `@theme` Tailwind v4 — tidak ada nilai warna/durasi hardcoded di komponen.
- accept [c4]: font Geist Variable, Instrument Serif italic, dan Geist Mono Variable tersedia self-hosted via `@fontsource` dengan `font-display: swap` dan fallback metric-matched; tidak ada permintaan ke domain font pihak ketiga di build output.
- accept [c5]: `src/config/*` lengkap bertipe (site, flags, availability, nav, capabilities, works, services, addons, maintenance, terms, faq, process, briefForm, analytics, motion) dengan `SHOW_PRICES`, `SHOW_AVAILABILITY`, dan durasi garansi `30–60 hari` sebagai satu sumber; tidak ada data pribadi/harga yang hardcoded di komponen.
- accept [c6]: `BaseLayout.astro` memiliki `lang="id"`, `<title>` + meta description unik per halaman, canonical, `og:*`, skip link `Lewati ke konten`, landmark `header`/`main`/`footer`, dan gambar OG belum dibuat (M6) namun slotnya siap.
- accept [c7]: seluruh `href`/`src`/rute internal melewati helper `withBase()` sehingga bekerja di bawah `base: '/Portofolio-Bima-Abiyasa'`; build tidak memuat tautan internal yang mengarah ke root domain.
- accept [c8]: `.github/workflows/ci.yml` (check, build, vitest) dan `.github/workflows/deploy.yml` (upload-pages-artifact + deploy-pages, `permissions: pages: write, id-token: write`) ada; tidak ada secret di repo.
- accept [c9]: setelah push dan Pages disetel ke GitHub Actions, https://zevilent.github.io/Portofolio-Bima-Abiyasa/ merespons HTTP 200 dengan judul halaman yang benar.
- accept [c10]: `robots.txt` mengizinkan crawling dan menunjuk sitemap pada URL subpath yang benar; halaman 404 kustom ada dan dapat diakses.

## Catatan sesi 1 (keputusan teknis saat implementasi)

| # | Keputusan | Alasan |
|---|---|---|
| N1 | **TypeScript 6.0.3**, bukan 7.0.2 | `@astrojs/check` (yang dipakai `astro check`) mendukung TS ^5 \|\| ^6. Disetujui Bima di sesi 2. `astro check` melaporkan 27 file, 0 error. |
| N2 | `ASTRO_TELEMETRY_DISABLED=1` dipakai saat build lokal; CI tidak butuh karena tidak menulis ke home | Telemetry Astro menulis ke `~/Library/Preferences/astro/` di luar workspace. |
| N3 | `--color-text-muted` dikoreksi `#7E7A72` → `#86827A` | Uji kontras menemukan 4.41:1 di atas `surface-1` (gagal AA). Sekarang 5.0:1. Brief §2.1 ikut diperbarui. |
| N4 | Font di-`copy` dari `@fontsource` ke `public/fonts/` (3 file, 80 KB) | Self-host penuh dengan `@font-face` sendiri: kontrol `unicode-range`, preload hanya font display, tanpa request ke CDN mana pun. |
| N5 | Playwright, axe, Lighthouse CI ditunda ke M6 (Playwright di M3) | Disetujui Bima: M1 tidak butuh browser, dan unduhan browser besar. |
| N6 | `satori` (dev-only) membawa `fflate` versi rentan (GHSA-px8p-9vwx-vf98, moderate) | Hanya saat build, tidak ikut ke situs. `overrides` dicoba dan tidak menyelesaikan; ditangani di M6. Dilaporkan, bukan disembunyikan. |

## Gate M1 (belum selesai)

- [x] `astro check` 0 error · `vitest run` 78 test hijau · `astro build` sukses
- [x] `dist/` berisi index.html, 404.html, sitemap, robots.txt, manifest, favicon, 3 font
- [ ] Push ke `origin` (izin Bima)
- [ ] Pages → Source = GitHub Actions (Bima)
- [ ] Cek https://zevilent.github.io/Portofolio-Bima-Abiyasa/ = HTTP 200
