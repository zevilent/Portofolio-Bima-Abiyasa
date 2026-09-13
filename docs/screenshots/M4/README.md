# M4 — screenshot & hasil pemeriksaan

Diambil otomatis oleh `tests/e2e/m4-sections.spec.ts`.

| File | Isi |
|---|---|
| `desktop-1440-layanan.png` / `mobile-390-layanan.png` | Bento layanan (Website + Web Application) |
| `desktop-1440-proses.png` / `mobile-390-proses.png` | Section proses AI agent (diagram orkestrasi di desktop) |
| `desktop-1440-harga.png` / `mobile-390-harga.png` | Harga: tab, kartu paket, add-on, perawatan |
| `desktop-1440-ketentuan.png` / `mobile-390-ketentuan.png` | Ketentuan (accordion) + FAQ |

## Pemeriksaan yang lulus

- 11 test khusus M4: harga persis dari config, 18 add-on, 3 plan perawatan, tab harga
  benar-benar menyembunyikan panel lain, 7 ketentuan + 4 FAQ, accordion satu-per-satu
- axe: **0 violation** di home dengan seluruh section M4 terpasang
- `npm run budget`: html 10,2 KB · css 12,0 KB · js 58,5 KB gzip (batas 120 KB) — lulus
- `npm run price-list:check`: PDF 78.837 byte, dibuat dari config yang sama dengan halaman
- Total suite: **90 lulus / 3 skip** di desktop 1440, mobile 390, dan reduced motion
- 79 unit test · `astro check` 0 error (60 file)

## Batasan yang saya laporkan sendiri

Saya tidak bisa membuka gambar, jadi penilaian komposisi ada di tangan Anda. Yang khusus
ingin saya tahu pendapatnya: apakah grid bento terasa seimbang (tile "Company Profile"
melebar 2 kolom, "Sistem kompleks" selebar baris), dan apakah section proses dengan
diagram di kiri terasa seperti "control room" atau malah kosong.
