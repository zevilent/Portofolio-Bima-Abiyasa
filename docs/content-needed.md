# docs/content-needed.md — yang perlu Bima sediakan atau verifikasi

> Satu daftar, satu sumber kebenaran. Setiap baris punya **status**: `OPEN` (belum ada),
> `DRAFT` (saya isi dari sumber nyata, wajib Anda verifikasi), `DONE` (sudah Anda berikan).
> Aturan yang saya pegang: **kalau belum ada datanya, saya hilangkan bagian itu dari UI —
> saya tidak mengarang.** Tidak ada metrik, tahun, nama klien, testimoni, atau hasil yang diciptakan.
>
> Update terakhir: sesi 1 (sebelum M1).

## A. Sudah terjawab di sesi 1

| # | Item | Keputusan | Status |
|---|---|---|---|
| A1 | Foto profil `public/images/bima.jpg` | Desain dulu tanpa foto; slot disiapkan dan aktif otomatis saat file ada | `DONE` |
| A2 | Durasi garansi bug | **30–60 hari** (dipakai konsisten di 5 tempat, dijaga unit test) | `DONE` |
| A3 | Sumber Price List PDF | Di-generate dari data harga (`scripts/generate-price-list.ts`), CI cek sinkron | `DONE` |

## B. Perlu keputusan Anda (proposal di `docs/brief.md` §14)

| # | Pertanyaan | Proposal saya | Blokir milestone |
|---|---|---|---|
| B1 | Setuju **P1**: harga tetap di home (tanpa halaman `/harga`) untuk v1? | Ya, evaluasi ulang di akhir M4 | M4 |
| B2 | **P2** tambah halaman `/privasi` singkat (agar cookie consent bar jujur)? | Ya, ~150 kata | M6 |
| B3 | **P3** tanpa baris statistik/counter (tidak ada angka nyata dari Anda) | Tanpa stats row | M5 |
| B4 | **P4** label tahun disembunyikan sampai Anda beri tahun asli | Sembunyikan | M3 |
| B5 | **P5** saya draft studi kasus dari situs live dengan `draft: true` | Ya, Anda verifikasi sebelum M6 | M3 |
| B6 | **P6** pemetaan layanan → studi kasus (Niaga One muncul 2×) | Pakai usulan §5.5 | M4 |
| B7 | **P7** izin pakai daftar marquee §5.3 (21 item) | Pakai daftar itu | M2 |
| B8 | **P8** rentang budget di form (5 opsi, mulai `< Rp5 juta`) | Pakai usulan §5.9 | M5 |

## C. Hal yang hanya Anda bisa lakukan (GitHub)

| # | Item | Kenapa | Blokir |
|---|---|---|---|
| C1 | Buat repo publik `zevilent.github.io` di akun `zevilent` | Deploy GitHub Pages tidak bisa saya lakukan | M1 |
| C2 | Settings → Pages → Source = **GitHub Actions** | Workflow `deploy.yml` butuh ini | M1 |
| C3 | Setelah M1: cek https://zevilent.github.io/ terbuka | Bukti live URL benar-benar jalan | M1 |
| C4 | Konfirmasi apakah repo portofolio ini memang `zevilent.github.io` (bukan repo terpisah + `base`) | Menentukan `site`/`base` Astro | M1 |
| C5 | Kalau mau custom domain nanti: beli domain + akses DNS | Saya tulis langkahnya di `docs/custom-domain.md` | nanti |

## D. Fakta proyek (tidak boleh saya karang) — blokir M3

| # | Slug | Yang dibutuhkan | Status |
|---|---|---|---|
| D1 | `hikari-tutor` | **Tahun** proyek, **peran** Anda di proyek ini, **stack** yang benar-benar dipakai (saya draft dari situs live, Anda koreksi), hasil nyata (opsional) | `OPEN` |
| D2 | `phoenix-signal` | idem | `OPEN` |
| D3 | `niaga-one` | idem | `OPEN` |
| D4 | `teras-kinara-residence` | **URL GitHub Pages** untuk demo konsep (sampai ada, label `Segera`), tahun, peran, stack | `OPEN` |
| D5 | Semua | Apakah ada **klien/perusahaan** yang boleh disebut namanya? Kalau tidak, saya tulis tanpa menyebut klien | `OPEN` |
| D6 | Semua | Apakah ada **hasil nyata** yang boleh dipublikasikan (angka traffic, konversi, dsb)? Kalau tidak, bagian `Hasil` dihapus dari halaman | `OPEN` |
| D7 | Semua | Untuk section "Dibangun dengan AI agent": **apa yang Anda koreksi/perbaiki sendiri** dari hasil agent di tiap proyek | `OPEN` |
| D8 | `hikari-tutor` | Target pengguna & fitur utama (untuk `Masalahnya` / `Fitur utama` tanpa mengarang) | `OPEN` |
| D9 | `phoenix-signal` | Apakah data signal diambil dari penyedia pihak ketiga? (kalau ya, sebutkan mana — kalau tidak, saya tulis netral) | `OPEN` |

## E. Data bisnis & copy — blokir M4/M5

| # | Item | Catatan | Status |
|---|---|---|---|
| E1 | Konfirmasi ulang **semua harga** di §5.5 & §5.7 brief (saya memakai persis data prompt Anda) | Satu angka salah = PDF salah juga | `DRAFT` (dari prompt) |
| E2 | Nomor WhatsApp `+6285155402545` dan email `bima.abiyasa16@gmail.com` final? | Dipakai di wa.me + JSON-LD | `DRAFT` (dari prompt) |
| E3 | Link Instagram `instagram.com/zevilents.ventus` — sengaja `zevilents` (dengan s), beda dari GitHub `zevilent`? | Saya pakai apa adanya; ingin dipastikan bukan salah ketik | `OPEN` |
| E4 | Teks pill ketersediaan: `Menerima proyek baru` — atau angka slot nyata (mis. `Menerima proyek baru · 2 slot`)? Hanya jika benar | Klaim harus benar | `OPEN` |
| E5 | Apakah ingin ada janji waktu respons (mis. "dibalas dalam X jam")? **Butuh angka nyata** | Kalau tidak ada, tidak ditampilkan | `OPEN` |
| E6 | Isi halaman `/privasi` (kalau B2 disetujui): cukup saya tulis 150 kata? | Menyangkut legal, Anda yang setujui | `OPEN` |
| E7 | Detail kontak yang dicantumkan di PDF price list (nama, WhatsApp, email, situs) | PDF di-generate, isinya dari config | `OPEN` |
| E8 | Nama file PDF `price-list-bima-abiyasa-2026.pdf` — tahun 2026 atau 2025? | Ikut tanggal hari ini | `OPEN` |

## F. Analytics & legal — blokir M6

| # | Item | Perilaku kalau kosong | Status |
|---|---|---|---|
| F1 | GA4 Measurement ID (`G-XXXXXXX`) | Tidak dimuat sama sekali (ada unit test) | `OPEN` |
| F2 | Meta Pixel ID | Tidak dimuat sama sekali | `OPEN` |
| F3 | Teks consent bar Bahasa Indonesia (§5.13) menyetujui? | Pakai draft saya | `DRAFT` |
| F4 | Apakah perlu halaman privasi (B2) — tanpa itu, consent bar hanya menaut ke FAQ | Pakai anchor FAQ | `OPEN` |

## G. Aset

| # | Item | Status |
|---|---|---|
| G1 | `public/images/bima.jpg` (opsional, kapan pun) — slot otomatis aktif, tanpa placeholder | `OPEN` |
| G2 | Logo/monogram: saya pakai tipografi "BA" (mono, kotak hairline gold). Kalau punya logo sendiri, kirim | `OPEN` |
| G3 | Screenshot & video preview 4 proyek: saya ambil otomatis via `scripts/capture.ts` — **butuh izin Anda sebelum dijalankan** | `OPEN` |
| G4 | Font: Geist + Instrument Serif + Geist Mono (self-hosted, `@fontsource`, sudah saya cek tersedia) | `DONE` |
| G5 | Isi section "Yang saya koreksi" di README (Anda isi sendiri setelah M6) | `OPEN` |

## H. Izin yang akan saya minta saat dibutuhkan (aturan Anda §13.6)

1. **Install paket** (M1): `astro`, `tailwindcss`, `gsap`, `lenis`, `three`, `@fontsource/*`, `vitest`, `@playwright/test`, `@axe-core/playwright`, `@lhci/cli`, `satori`, `@resvg/resvg-js`. Termasuk unduhan browser Playwright (± ratusan MB, sekali di mesin Anda).
2. **`scripts/capture.ts`** (M3): membuka 3 situs eksternal Anda + 1 URL konsep, mengambil screenshot desktop/mobile dan merekam video scroll, lalu transcode dengan ffmpeg (sudah tersedia di `/opt/homebrew/bin/ffmpeg`).
3. **Push ke GitHub** (M1 dan setiap akhir milestone).
4. **Menghapus file** — saya tidak akan melakukannya tanpa bertanya.

## I. Kalau Anda tidak memberi apa pun dari daftar ini

Situs tetap bisa dibangun dan tetap jujur:
kartu proyek tampil sebagai "plate" tipografis (nomor, nama, kategori, stack) tanpa tahun/klien/hasil,
section `Hasil` tidak muncul, tidak ada stats row, tombol PDF tetap ada (isinya dari data harga Anda),
dan analytics tidak dimuat sama sekali. Yang **tidak** akan terjadi: angka, tahun, klien, atau testimoni karangan.
