# M1 — Machine-readable acceptance criteria

> Sumber: `docs/brief.md` §13 (checklist M1) + aturan tetap di `REASONIX.md`.
> Satu baris = satu kriteria, dengan ID stabil `c1`, `c2`, … Dipakai untuk menandai
> selesainya tiap langkah beserta buktinya.
> Status per sesi 1: **belum dimulai** (menunggu izin install paket).

## Scope M1

Setup fondasi: Astro + TypeScript strict + Tailwind v4 + token + font self-hosted +
config bertipe + unit test + layout dasar + workflow deploy, sampai **live URL bekerja**.
Belum ada desain visual (itu M2) dan belum ada studi kasus (M3).

## Acceptance criteria

- accept [c1]: `npm run build` selesai tanpa error dan menghasilkan `dist/index.html` + `dist/404.html`; `npx astro check` tanpa error TypeScript.
- accept [c2]: `npx vitest run` hijau, mencakup minimal: unit test builder pesan WhatsApp (termasuk kasus field opsional kosong & karakter khusus), format harga rupiah/range/`Minta estimasi` saat `SHOW_PRICES=false`, dan validasi zod seluruh file di `src/config/*`.
- accept [c3]: `src/styles/tokens.css` memuat seluruh token brief §3 (warna, skala tipe `clamp()`, spasi, radius, border, shadow, easing, durasi `--dur-1…6`) dan dipakai lewat `@theme` Tailwind v4 — tidak ada nilai warna/durasi hardcoded di komponen.
- accept [c4]: font Geist Variable, Instrument Serif italic, dan Geist Mono Variable tersedia self-hosted via `@fontsource` dengan `font-display: swap` dan fallback metric-matched; tidak ada permintaan ke domain font pihak ketiga di build output.
- accept [c5]: `src/config/*` lengkap bertipe (site, flags, availability, nav, capabilities, works, services, addons, maintenance, terms, faq, process, briefForm, analytics) dengan `SHOW_PRICES`, `SHOW_AVAILABILITY`, dan durasi garansi `30–60 hari` sebagai satu sumber; tidak ada data pribadi/harga yang hardcoded di komponen.
- accept [c6]: `BaseLayout.astro` memiliki `lang="id"`, `<title>` + meta description unik per halaman, canonical, `og:*`, skip link `Lewati ke konten`, landmark `header`/`main`/`footer`, dan gambar OG belum dibuat (M6) namun slotnya siap.
- accept [c7]: seluruh `href`/`src`/rute internal melewati helper `withBase()` sehingga bekerja di bawah `base: '/Portofolio-Bima-Abiyasa'`; build tidak memuat tautan internal yang mengarah ke root domain.
- accept [c8]: `.github/workflows/ci.yml` (check, build, vitest) dan `.github/workflows/deploy.yml` (upload-pages-artifact + deploy-pages, `permissions: pages: write, id-token: write`) ada; tidak ada secret di repo.
- accept [c9]: setelah push dan Pages disetel ke GitHub Actions, https://zevilent.github.io/Portofolio-Bima-Abiyasa/ merespons HTTP 200 dengan judul halaman yang benar.
- accept [c10]: `robots.txt` mengizinkan crawling dan menunjuk sitemap pada URL subpath yang benar; halaman 404 kustom ada dan dapat diakses.
