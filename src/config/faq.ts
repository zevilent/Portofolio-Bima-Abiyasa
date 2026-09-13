/**
 * FAQ (brief §5.8). Answers must match terms.ts exactly — they share GUARANTEE_DAYS
 * and feed the FAQPage JSON-LD 1:1 in M6.
 */

import { GUARANTEE_DAYS } from './terms';

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
  category: 'umum' | 'ketentuan';
};

export const faq: FaqItem[] = [
  {
    id: 'pakai-ai',
    category: 'umum',
    question: 'Apakah pakai AI berarti hasilnya asal jadi?',
    answer:
      'Tidak. Agent mempercepat bagian yang berulang, tapi setiap hasil lewat scope tertulis, pengujian, pemeriksaan keamanan, dan review saya sebelum masuk produksi. Yang Anda setujui adalah scope dan hasil akhir — bukan klaim soal AI.',
  },
  {
    id: 'source-code',
    category: 'umum',
    question: 'Siapa yang memegang source code?',
    answer: 'Anda. Source code dan akses produksi diserahkan setelah pembayaran lunas.',
  },
  {
    id: 'durasi',
    category: 'umum',
    question: 'Berapa lama proyek selesai?',
    answer:
      'Website: 7–12 hari kerja (Landing Page), 2–4 minggu (Company Profile), 4–7 minggu (Corporate). Web application: timeline dan milestone ditulis di proposal setelah scope disetujui. Timeline dimulai setelah materi, akses, dan keputusan yang dibutuhkan tersedia.',
  },
  {
    id: 'maintenance',
    category: 'umum',
    question: 'Apakah bisa maintenance setelah launch?',
    answer: `Bisa. Garansi bug ${GUARANTEE_DAYS} menutup fungsi yang tercantum di scope; setelahnya ada tiga plan maintenance bulanan: Basic Rp1 juta, Business Rp2,5 juta, Priority Rp5 juta.`,
  },
];
