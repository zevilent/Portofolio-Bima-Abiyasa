/**
 * The AI-agent workflow (brief §5.6) — the site's signature section.
 * Two columns per step: what Bima decides, what agents do. Never claim a step
 * that is not part of the real process (see REASONIX.md honesty rules).
 */

export type ProcessStep = {
  index: string;
  id: string;
  name: string;
  human: string[];
  agent: string[];
  output: string;
};

export const processSteps: ProcessStep[] = [
  {
    index: '01',
    id: 'discovery',
    name: 'Discovery',
    human: ['Tujuan bisnis dan ukuran sukses', 'Fitur yang benar-benar dipakai', 'Prioritas'],
    agent: [
      'Riset pola umum di industri Anda',
      'Merangkum kebutuhan dari brief',
      'Draft user flow',
    ],
    output: 'Ringkasan tujuan, pengguna, dan prioritas',
  },
  {
    index: '02',
    id: 'scope',
    name: 'Scope',
    human: ['Lingkup final', 'Timeline dan milestone', 'Harga yang disetujui'],
    agent: [
      'Draft proposal',
      'Memecah pekerjaan jadi task',
      'Checklist materi yang perlu Anda siapkan',
    ],
    output: 'Proposal: scope tertulis, timeline, milestone',
  },
  {
    index: '03',
    id: 'build',
    name: 'Build',
    human: ['Arah desain', 'Keputusan arsitektur', 'Review kode yang kritis'],
    agent: ['Implementasi UI dan backend', 'Struktur database', 'Dokumentasi'],
    output: 'Aplikasi berjalan, bisa ditinjau tiap milestone',
  },
  {
    index: '04',
    id: 'review',
    name: 'Review',
    human: ['Uji manual di perangkat nyata', 'Memutuskan kapan boleh rilis', 'Menolak hasil yang belum layak'],
    agent: [
      'Unit test dan e2e test',
      'Audit aksesibilitas',
      'Security check dependensi dan validasi input',
    ],
    output: 'Laporan hasil test dan daftar perbaikan',
  },
  {
    index: '05',
    id: 'launch',
    name: 'Launch',
    human: ['Handover source code dan akses', 'Mendampingi garansi bug 30–60 hari'],
    agent: [
      'Menyiapkan deployment dan CI',
      'Memantau error setelah rilis',
      'Dokumentasi handover',
    ],
    output: 'Situs live, source code dan akses diserahkan',
  },
];

export const processIntro =
  'Agent mempercepat pekerjaan. Scope tertulis, pengujian, pemeriksaan keamanan, dan review manusia tetap di saya.';

export const processClosing =
  'Agent membuat pekerjaan lebih cepat. Yang tidak saya delegasikan: scope tertulis, persetujuan desain, review manusia, dan keputusan rilis — setiap hasil agent melewati pengujian dan pemeriksaan keamanan sebelum masuk produksi.';

export const processColumnLabels = {
  human: 'Yang saya putuskan',
  agent: 'Yang dikerjakan agent',
  output: 'Output',
} as const;
