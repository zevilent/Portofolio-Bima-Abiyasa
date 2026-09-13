# M3 — screenshot & hasil pemeriksaan

Diambil otomatis oleh `tests/e2e/m3-works.spec.ts` (Playwright).

| File | Isi |
|---|---|
| `desktop-1440-karya.png` | Section Karya di 1440px (kartu stacking dengan poster asli) |
| `mobile-390-karya.png` | Section Karya di 390px (daftar, tanpa pinning) |
| `desktop-1440-case-study.png` | Halaman studi kasus Hikari Tutor, 1440px |
| `mobile-390-case-study.png` | Halaman studi kasus Hikari Tutor, 390px |

Aset proyek sendiri ada di `src/assets/karya/<slug>/` (desktop+mobile AVIF/WebP, preview MP4/WebM),
diambil oleh `npm run capture` dari 4 situs: hikaritutor.web.id, phoenixsignal.app,
niaga-one.vercel.app, dan demo konsep Teras Kinara.

## Pemeriksaan yang lulus

- 4 kartu karya dengan poster asli; badge **Konsep** hanya pada Teras Kinara
- Setiap kartu menautkan ke `/karya/<slug>` (lewat `withBase()`, teruji)
- axe: **0 violation** di halaman karya maupun studi kasus
- 4 halaman studi kasus punya h1, tautan live site, dan tautan proyek berikutnya
- `npm run budget`: initial JS 58,5 KB gzip, CSS 9,8 KB, HTML 4,5 KB — semua di bawah anggaran
- 79 unit test lulus · `astro check` 0 error · build 6 halaman

## Yang BELUM bisa saya nilai (butuh mata Anda)

Selera visual: apakah kartu stacking terasa mewah atau justru berat, apakah poster situs
klien cocok dengan palet obsidian/gold, dan apakah badge Konsep cukup jelas tapi tidak
mengganggu. Saya juga **tidak bisa melihat gambar**, jadi penilaian komposisi ada di tangan Anda.

## Isi yang masih draft

Semua 4 studi kasus bertanda `draft: true` — fakta tentang tahun, peran, stack, dan hasil
belum Anda verifikasi. Daftar lengkapnya di `docs/content-needed.md` bagian D.
