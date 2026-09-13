---
# ⚠️ DRAFT CONTENT — ditulis dari pemindaian situs live, belum diverifikasi Bima.
name: Niaga One
category: Web Application
status: live
url: 'https://niaga-one.vercel.app'
concept: false
year: null
role: null
order: 3
draft: true

summary: >-
  Aplikasi web untuk toko: persediaan barang, penjualan, kas, dan laporan dalam satu
  ruang kerja yang bersih dan responsif.

stack:
  - name: Aplikasi klien dengan bundel ringkas
    why: 'Situs mengirim dua berkas skrip (app.js dan ui.js) lalu merender antarmuka di browser.'
  - name: Halaman masuk & kode pendaftaran
    why: 'Akses lewat email dan kata sandi, ditambah pendaftaran memakai kode khusus.'
  - name: Mode demo
    why: 'Ada tombol "Demo testing" sehingga calon pengguna bisa mencoba tanpa data nyata.'

problem: >-
  Toko kecil biasanya mencatat stok di buku dan uang di kepala. Akibatnya stok tidak cocok
  dengan catatan, dan laporan harian harus disusun ulang setiap kali dibutuhkan.

solution: >-
  Satu ruang kerja toko yang mencatat persediaan, pergerakan barang, pembayaran, dan
  laporan di tempat yang sama, bisa dibuka dari desktop maupun ponsel.

features:
  - title: Persediaan & pergerakan barang
    body: 'Barang masuk dan keluar tercatat sebagai pergerakan, bukan sekadar angka akhir.'
  - title: Kas, pembayaran & tagihan
    body: 'Aliran uang dicatat per transaksi sehingga saldo bisa ditelusuri.'
  - title: Laporan kegiatan toko
    body: 'Ringkasan aktivitas toko disajikan sebagai laporan, bukan catatan mentah.'
  - title: Ruang kerja yang bersih
    body: 'Antarmuka disusun agar pengguna baru tahu harus mulai dari mana.'
  - title: Responsif
    body: 'Dipakai dari desktop maupun ponsel, karena pemilik toko sering berpindah tempat.'
  - title: Pendaftaran dengan kode khusus
    body: 'Akses dibuka lewat kode pendaftaran, cocok untuk onboarding bertahap.'

agentWork:
  checked: []
  agent: []

# Tidak ada blok `results`: belum ada angka nyata dari Bima.
---

## Ringkasan

Niaga One adalah aplikasi web untuk operasional toko: stok, transaksi, dan keuangan. Situs
yang tayang adalah aplikasi itu sendiri — halaman depan menjelaskan fungsinya, lalu
pengguna masuk ke ruang kerja lewat email atau kode pendaftaran, dan tersedia mode demo.

## Masalahnya

(draft) Pencatatan manual membuat dua hal sulit dijawab cepat: berapa stok yang benar-benar
ada, dan ke mana uang hari ini pergi. Keduanya baru terasa masalah saat sudah terjadi.

## Solusinya

(draft) Persediaan, transaksi, dan kas dicatat dalam satu alur sehingga laporan terbentuk
dari data yang sudah masuk, bukan dari rekap ulang.

## Catatan verifikasi

Yang saya butuh dari Bima: tahun pengerjaan, peran, nama stack yang benar (saya hanya bisa
memastikan bundelnya ringan dan dirender di browser), dan isi section *Dibangun dengan AI
agent*. Sekaligus: apakah "Niaga One" sudah dipakai klien nyata atau masih internal —
bagian Hasil hanya bisa diisi kalau ada faktanya.
