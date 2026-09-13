# REASONIX.md — aturan tetap proyek portofolio Bima Abiyasa

> Baca file ini dulu di setiap sesi baru, lalu `docs/brief.md` dan `docs/content-needed.md`.
> `docs/prompt.md` = brief asli dari Bima. Kalau ada konflik, `docs/prompt.md` menang.
> Dokumen ini pendek dan stabil. Detail ada di brief, bukan di sini.

## Proyek

Portofolio pribadi **Bima Abiyasa — AI Agentic Full Stack Website Developer** (Bogor, Indonesia).
Konsep: **"The Agentic Studio"** — studio privat seorang engineer yang mengarahkan tim AI agent:
tenang, presisi, mewah, kuat tanpa berteriak. *Luxury watchmaking meets mission control.*
Bukan tema hacker, bukan tema robot. Sasarannya: klien Indonesia percaya dalam 10 detik, lalu
menghubungi WhatsApp dengan brief singkat yang rapi.

## Tech (tetap, jangan diganti tanpa izin)

- Astro + TypeScript + Tailwind CSS, **static export**. Tanpa database, tanpa server, tanpa secret.
- Deploy GitHub Pages **project site**: repo `zevilent/Portofolio-Bima-Abiyasa`, live di
  https://zevilent.github.io/Portofolio-Bima-Abiyasa/ → **wajib** `site: 'https://zevilent.github.io'`
  + `base: '/Portofolio-Bima-Abiyasa'`. Semua `href`/`src`/rute internal lewat helper `withBase()`
  (satu tempat) — jangan pernah menulis path absolut ke root. Pindah ke URL bersih/custom domain = ubah satu baris.
- Studi kasus = Astro Content Collections (satu file Markdown per proyek, schema zod bertipe).
- Navigasi = Astro View Transitions (`ClientRouter`).
- Library motion/3D **hanya**: GSAP (core + ScrollTrigger + SplitText), Lenis, Three.js.
  Library animasi/UI lain: **tanya dulu**.
- Semua data pribadi, harga, layanan, link, feature flag, ID analytics tinggal di `src/config/*`
  bertipe — **tidak pernah hardcode di komponen**. Tambah proyek = tambah satu file `.md`.

## Konsep visual & token

- Obsidian `#0A0A0B` + undertone hangat. Teks ivory hangat `#F2EEE6` (jangan pernah `#FFFFFF`).
- Gold champagne `#C8A96C` (aksen utama, dipakai hemat) · ember `#FF5A24` **hanya untuk status "live"**
  (dot ketersediaan, step agent aktif, label kursor). Gold ≤ ~2% piksel; ember maksimal sekali per viewport.
- Font: **Geist Variable** (display/UI), **Instrument Serif italic** (satu kata aksen per headline),
  **Geist Mono Variable** (label, angka, metadata, terminal). Self-hosted via `@fontsource`, `font-display: swap`.
- Tekstur: film grain statis 3.5%, hairline 1px ivory 8%, grid arsitek 12 kolom, glow gold mengikuti kursor
  di dalam card. Tanpa `backdrop-filter`, tanpa gradient ungu/biru, tanpa glassmorphism, tanpa blob 3D,
  tanpa emoji, tanpa skill bar persentase, tanpa foto stok.
- Easing & durasi **hanya** dari skala di brief §3.4 (`--ease-luxe`, `--dur-1…6`). Tidak ada durasi ad-hoc.

## Aturan motion

1. Hanya animasikan `transform`, `opacity`, shader uniform (pengecualian terdokumentasi: accordion
   `grid-template-rows` dan transisi warna hairline).
2. Tanpa preloader/intro. Tanpa scroll-jacking: anchor, tombol back, dan browser find harus tetap jalan.
3. GSAP context, Lenis, dan WebGL **wajib** dibersihkan & di-init ulang di setiap navigasi
   (`astro:before-swap` + `pagehide`), tanpa listener ganda atau memory leak. Ini area paling rawan.
4. `prefers-reduced-motion`: tanpa smooth scroll, tanpa pinning, tanpa parallax, tanpa cursor custom,
   tanpa typing, WebGL frame statis — **semua konten tetap terbaca**.
5. Mobile (<768px): tanpa cursor custom, tanpa magnetic, tanpa reveal hover-only; versi ringan untuk
   pinning dan WebGL.
6. Situs **harus berguna tanpa JavaScript**: konten terlihat, link berfungsi. LCP = headline HTML, bukan WebGL.

## Aturan kejujuran (tidak bisa dinegosiasikan)

- **Dilarang mengarang**: metrik, nama klien, testimoni, tahun, hasil, jumlah pengalaman, jumlah test.
- Tanpa hype dan klaim kosong: tidak ada "revolusioner", "terbaik", "nomor 1", "passionate developer".
- Setiap klaim harus punya dasar: proyek nyata, langkah proses, atau angka yang Bima berikan.
- Data yang belum ada **dihilangkan dari UI**, bukan diisi placeholder. `draft: true` pada fakta hasil
  transkripsi/tebakan; tidak boleh terpublikasi sebelum Bima verifikasi.
- Tanpa stats row dan tanpa tombol "Download" ke file yang tidak ada. Harga di web, PDF, dan JSON-LD
  selalu dari satu sumber yang sama.

## Batas scope

Tidak dibuat: blog, CMS, backend, login, dark/light toggle, multi-language, sound effect, chatbot,
testimoni. Bahasa situs: **Bahasa Indonesia saja** (istilah teknis Inggris wajar). Copywriting final
ada di brief §5 — komponen mengambil teks dari config, bukan menulis teks baru.

## Target kualitas

- Lighthouse mobile: Performance ≥ 90 (home & studi kasus), Accessibility/Best Practices/SEO = 100.
- LCP < 2.5s, CLS < 0.05, INP < 200ms (slow 4G + Android mid-range).
- JS awal < 120 KB gzip (chunk WebGL lazy dikecualikan, dimuat saat idle) — dijaga gate CI.
- Aksesibilitas: landmark semantik, urutan heading benar, focus-visible jelas, dialog/accordion/tab/
  form/palette ramah keyboard, alt text Indonesia bermakna, axe = 0 violation.
- Layout benar di 360/390/768/1024/1440/1920. Chrome, Safari (macOS & iOS), Firefox, Edge terbaru.
- Test: Vitest (whatsapp builder, format harga, validasi config, kontras token, tanpa draft) +
  Playwright (navigasi, palette, menu mobile, tab harga, form, halaman studi kasus, reduced-motion,
  tanpa console error) + axe + Lighthouse CI + link checker.

## Alur kerja per milestone

M1 setup · M2 design slice (header/hero/marquee — kualitas visual ditentukan di sini, iterasi dengan Bima) ·
M3 Selected Works + studi kasus · M4 layanan/proses/harga/ketentuan · M5 CTA+form/palette/cursor/404 ·
M6 SEO/analytics/performa/QA/README.

Setiap milestone: implementasi → build + test → screenshot Playwright 390px & 1440px ke
`docs/screenshots/M#/` → review terhadap `docs/brief.md` (kalau saya tidak bisa melihat gambar,
minta Bima menilai) → **kritik diri jujur** (sebut apa yang masih generik/kurang halus, perbaiki dulu) →
cara preview lokal → update checklist → commit → **STOP, tunggu approval Bima**.

## Izin & batasan tindakan

- **Tanya dulu** sebelum: install paket, menjalankan `scripts/capture.ts` (membuka situs eksternal),
  push ke GitHub, menghapus file, perintah destruktif, atau memakai library di luar daftar.
- Repo ini adalah git repo milik Bima (`main`). Commit lokal boleh; push menunggu izin.
- Langkah yang hanya bisa dilakukan Bima (buat repo, aktifkan Pages, setelan, custom domain):
  berikan panduan klik-demi-klik, jangan diasumsikan selesai.
- Kerjaan sementara (scratch, probe, output generate) jangan ditinggal di repo.

## Catatan teknis penting (jangan diulang tanpa alasan)

- **Lifecycle motion**: `src/scripts/motion.ts` adalah satu-satunya pemilik Lenis, GSAP, dan
  urutan boot. Aturan yang sudah teruji: (1) halaman mengambil "ownership" dokumen lewat
  `astro:page-load`, (2) event duplikat untuk halaman yang sama **tidak** memicu teardown,
  (3) teardown tidak pernah dijalankan spekulatif, (4) snapshot daftar teardown sebelum
  dijalankan supaya pekerjaan yang baru didaftarkan di dalamnya tetap hidup.
- **Shader**: vertex shader wajib memakai `precision mediump float` yang sama dengan fragment
  shader, kalau tidak program gagal `VALIDATE_STATUS` dan kanvas kosong tanpa error JS.
- **Test yang menjaga**: `tests/e2e/webgl.spec.ts` (satu kanvas, event duplikat, navigasi
  bolak-balik, reduced motion) dan `tests/unit/*` (kontras AA, kejujuran data, format harga).
