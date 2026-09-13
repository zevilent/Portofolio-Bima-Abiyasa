/**
 * Terms (brief §5.8) — the single source for every commitment the site makes.
 * GUARANTEE_DAYS is the one value decided by Bima in session 1 ("30–60 hari", D2).
 * It must read identically in: services inclusions, terms accordion, FAQ answer,
 * maintenance copy, the price-list PDF, and JSON-LD. tests/unit/config.test.ts enforces it.
 */

export const GUARANTEE_DAYS = '30–60 hari' as const;

export type Term = {
  id: string;
  question: string;
  answer: string;
};

export const terms: Term[] = [
  {
    id: 'pembayaran',
    question: 'Bagaimana skema pembayaran?',
    answer: 'Pembayaran 40% saat mulai, 30% setelah fitur utama disetujui, 30% sebelum handover.',
  },
  {
    id: 'revisi',
    question: 'Berapa kali revisi yang saya dapat?',
    answer:
      'Sesuai paket: 2 revisi untuk Landing Page, 3 revisi untuk Company Profile dan Corporate. Harga mencakup jasa development sesuai scope dan jumlah revisi yang disepakati.',
  },
  {
    id: 'garansi',
    question: 'Apa yang dijamin setelah launch?',
    answer: `Garansi bug berlaku ${GUARANTEE_DAYS} untuk fungsi yang tercantum di scope — bukan untuk fitur baru.`,
  },
  {
    id: 'tidak-termasuk',
    question: 'Apa yang belum termasuk?',
    answer:
      'Domain, hosting, server, database managed, lisensi premium, biaya API/AI, payment gateway, WhatsApp provider, email provider, konten, foto, copywriting, dan pajak jika berlaku. Jasa development saja; domain, hosting, server, lisensi dan utilitas pihak ketiga tidak termasuk.',
  },
  {
    id: 'timeline-mulai',
    question: 'Kapan timeline mulai dihitung?',
    answer: 'Timeline dimulai setelah materi, akses, dan keputusan yang dibutuhkan tersedia.',
  },
  {
    id: 'source-code',
    question: 'Kapan source code saya terima?',
    answer: 'Source code dan akses produksi diserahkan setelah pembayaran lunas.',
  },
  {
    id: 'di-luar-scope',
    question: 'Bagaimana kalau saya ingin menambah fitur di tengah jalan?',
    answer:
      'Perubahan fitur atau konsep di luar scope dibuatkan estimasi biaya dan timeline baru sebelum dikerjakan.',
  },
];

export const priceNote =
  'Harga final tergantung jumlah halaman, desain, konten, fitur, integrasi, dan kesiapan materi. Perubahan di luar scope dibuatkan estimasi biaya dan timeline baru.';
