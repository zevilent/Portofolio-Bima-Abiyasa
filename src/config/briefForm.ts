/**
 * Brief form configuration (brief §5.9). Options are derived from real packages and
 * real price ranges — no invented budget tiers, no lead-qualification theatre.
 */

import { BRIEF_LIMITS } from '@/lib/whatsapp';

export const budgetRanges: string[] = [
  '< Rp5 juta',
  'Rp5–15 juta',
  'Rp15–35 juta',
  'Rp35–75 juta',
  '> Rp75 juta',
  'Belum ada anggaran tetap',
];

export const timelines: string[] = [
  'Secepatnya',
  '1–3 bulan',
  '3–6 bulan',
  'Masih eksplorasi',
];

export const briefCopy = {
  eyebrow: '08 / KONSULTASI',
  heading: 'Let\u2019s turn your',
  headingAccent: 'idea',
  headingRest: 'into a product.',
  intro:
    'Ceritakan proyeknya dalam tiga langkah. Pesan WhatsApp terbentuk otomatis — tidak ada data yang dikirim ke server mana pun.',
  steps: {
    type: 'Jenis proyek',
    budget: 'Rentang budget',
    detail: 'Target mulai dan detail',
  },
  fields: {
    name: 'Nama',
    description: 'Ceritakan singkat',
    contact: 'Email atau WhatsApp (opsional)',
  },
  hints: {
    description: `Minimal ${BRIEF_LIMITS.descriptionMin} karakter, maksimal ${BRIEF_LIMITS.descriptionMax}.`,
  },
  submit: 'Kirim lewat WhatsApp',
  copy: 'Salin pesan',
  copied: 'Tersalin',
  success: 'WhatsApp terbuka di tab baru.',
  successFallback: 'Kalau tidak terbuka, klik tautan ini.',
} as const;

/** Hidden honeypot field name — a filled field means a bot, and the submit is ignored. */
export const HONEYPOT_FIELD = 'website';
