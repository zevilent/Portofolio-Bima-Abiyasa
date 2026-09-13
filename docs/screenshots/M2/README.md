# M2 — screenshots & hasil pemeriksaan

Diambil otomatis oleh `tests/e2e/m2-visual.spec.ts` (Playwright) dari build lokal
(`astro preview` di `http://127.0.0.1:4321/Portofolio-Bima-Abiyasa/`).

| File | Isi |
|---|---|
| `desktop-1440-hero.png` | Hero 1440px: headline split-text, subheadline, 2 CTA, terminal agent, medan partikel WebGL |
| `desktop-1440-marquee.png` | Band kapabilitas setelah scroll |
| `mobile-390-hero.png` | Hero 390px (tier WebGL `lite`) |
| `mobile-390-menu.png` | Overlay menu seluler terbuka |

Cara menjalankan ulang: `npx playwright test tests/e2e/m2-visual.spec.ts`

## Pemeriksaan yang lulus (bukan penilaian selera)

- `axe` (WCAG 2.1 AA): **0 violation** di desktop 1440, mobile 390, dan reduced-motion
- Tanpa JavaScript: `<h1>` dan tautan `Lihat Karya` tetap terlihat
- Reduced motion: tanpa kanvas WebGL, fallback SVG statis, terminal tampil penuh
- Navigasi home → 404 → home 2×: tepat 1 kanvas, tidak ada kanvas tertinggal
- Anggaran JS awal: **58,4 KB gzip** (target < 120 KB); chunk WebGL 131 KB gzip dimuat saat idle
- Unit test: 78 lulus · `astro check`: 0 error

## Batasan yang saya laporkan sendiri

Saya tidak bisa membuka file gambar di sesi ini, jadi **penilaian visual ada di tangan Bima**.
Yang belum saya nilai: keseimbangan komposisi hero, kepadatan partikel (terlalu ramai/terlalu tipis),
dan apakah aksen gold terasa "mahal" atau justru terlalu redup di layar nyata.
