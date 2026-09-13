---
# ⚠️ DRAFT CONTENT — setiap fakta di bawah ini saya tulis dari situs live-nya, belum dari Anda.
# Perlu diverifikasi: tahun, peran, stack, dan bagian "Yang saya koreksi".
# Selama `draft: true`, halaman ini TIDAK boleh dianggap final (gate CI di M6).
name: Hikari Tutor
category: Web Application
status: live
url: 'https://hikaritutor.web.id'
concept: false
year: null
role: null
order: 1
draft: true

summary: >-
  Aplikasi belajar Bahasa Jepang yang menggabungkan materi kursus sungguhan dengan
  pendamping AI, dari kana dan kosakata sampai latihan JLPT.

# Stack: ditandai draft karena saya hanya membuktikan keberadaannya, bukan perannya.
stack:
  - name: Vite
    why: 'Bundel bertanda tangan Vite (/assets/index-*.js plus preload helper) — perlu Anda konfirmasi.'
  - name: Supabase
    why: 'Terlihat dari modul supabaseAuthRest pada bundel; dipakai untuk autentikasi/data.'
  - name: PWA / service worker
    why: 'Terdaftar lewat workbox-window, sehingga aplikasi bisa dipasang di perangkat.'
  - name: Meta Pixel
    why: 'Skrip fbevents.js dimuat di halaman.'
  - name: Routing berbasis hash
    why: 'Alamat seperti /#/kotoba dipakai untuk membuka modul belajarnya.'

problem: >-
  Belajar sendiri biasanya berhenti di tengah jalan: materi tersebar di banyak sumber,
  tidak ada yang mengoreksi latihan, dan biaya les privat berhenti begitu sesi selesai.

solution: >-
  Satu aplikasi berisi jalur belajar lengkap — kana, kosakata, kanji, kaiwa, dan bank soal
  JLPT — ditambah AI Sensei yang mengoreksi kalimat, sehingga progres bisa dilanjutkan
  sendiri tanpa jadwal kelas.

features:
  - title: Materi terstruktur
    body: 'Jalur belajar bertingkat dari kana sampai persiapan JLPT, memakai materi seperti Minna no Nihongo, Genki, dan Sou Matome.'
  - title: AI Sensei
    body: 'Latihan menulis kalimat yang langsung mendapat koreksi dari pendamping AI.'
  - title: Latihan kanji
    body: 'Kanji dilatih dengan menulis, bukan hanya dibaca.'
  - title: Bank soal JLPT
    body: 'Pola soal JLPT dan JFT-Basic dilatih sebelum hari ujian.'
  - title: Kaiwa
    body: 'Latihan percakapan dengan beberapa kategori situasi.'
  - title: Bisa dipasang di perangkat
    body: 'Berjalan sebagai aplikasi web progresif, progres belajar ikut di perangkat mana pun.'

agentWork:
  checked: []
  agent: []

# Tidak ada blok `results`: belum ada angka nyata dari Bima, jadi bagian Hasil dihapus.
---

## Ringkasan

Nihongo Mastery — produk dari Hikari Tutor — adalah aplikasi belajar Bahasa Jepang
berbahasa Indonesia. Isinya menggabungkan materi kursus sungguhan dengan latihan yang
dikoreksi otomatis, sehingga orang bisa belajar tanpa jadwal kelas.

## Masalahnya

(draft) Belajar mandiri punya dua titik putus yang berulang: materi yang berhenti di
pertengahan jalan, dan tidak ada yang mengoreksi hasil latihan. Kursus privat menutup
keduanya, tetapi berhenti saat sesi selesai dan biayanya berulang.

## Solusinya

(draft) Satu jalur belajar utuh di dalam satu akun: kana, kosakata, kanji, kaiwa, dan bank
soal JLPT. AI Sensei menutup celah "tidak ada yang mengoreksi" dengan memberi catatan pada
kalimat yang ditulis pengguna.

## Catatan verifikasi

Yang saya butuh dari Bima: tahun pengerjaan, perannya di proyek ini (sendiri atau tim),
konfirmasi stack di atas (terutama Vite dan Supabase), dan isi bagian "Yang saya koreksi"
untuk section *Dibangun dengan AI agent*. Semua terdaftar di `docs/content-needed.md`.
