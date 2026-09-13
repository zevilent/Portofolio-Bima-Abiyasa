/**
 * Website packages (brief §5.5, §7 of the original prompt — data used exactly as given).
 * Price values are integers in rupiah; display formatting happens in lib/format.ts.
 */

import type { PriceStyle } from '@/lib/format';

export type Package = {
  id: string;
  name: string;
  forWho: string;
  price: PriceStyle;
  deliverables: string[];
  revisions: string;
  timeline: string;
  popular?: boolean;
  /** Closest real project to show as an example (proposal P6). */
  exampleSlug?: string;
  exampleLabel?: string;
};

/** Every website package includes these — stated once, rendered under the group. */
export const websiteInclusions: string[] = [
  'Responsive design',
  'Source code',
  'Basic security',
  'Deployment assistance',
  `Garansi bug ${'30–60 hari'}`,
];

export const websitePackages: Package[] = [
  {
    id: 'landing-page',
    name: 'Landing Page',
    forWho: 'Untuk campaign dan validasi',
    price: { kind: 'from', amount: 3_900_000 },
    deliverables: [
      '1 halaman, hingga 10 section',
      'custom responsive design',
      'form lead dan WhatsApp',
      'analytics dan Meta Pixel',
      'SEO dasar dan speed setup',
    ],
    revisions: '2 revisi',
    timeline: '7–12 hari kerja',
    exampleSlug: 'teras-kinara-residence',
    exampleLabel: 'Lihat contoh: Teras Kinara Residence (konsep)',
  },
  {
    id: 'company-profile',
    name: 'Company Profile',
    forWho: 'Untuk bisnis yang berkembang',
    price: { kind: 'from', amount: 8_500_000 },
    deliverables: [
      'hingga 7 halaman',
      'UI custom sesuai brand',
      'admin panel / CMS',
      'blog, galeri, dan leads',
      'SEO teknis dan analytics',
    ],
    revisions: '3 revisi',
    timeline: '2–4 minggu',
    popular: true,
    exampleSlug: 'niaga-one',
    exampleLabel: 'Lihat pola: Niaga One',
  },
  {
    id: 'corporate',
    name: 'Corporate',
    forWho: 'Untuk kebutuhan lebih kompleks',
    price: { kind: 'from', amount: 15_000_000 },
    deliverables: [
      'hingga 12 halaman',
      'advanced UI dan interaction',
      'CMS dan multi-role admin',
      'katalog atau artikel',
      'basic third-party API',
    ],
    revisions: '3 revisi',
    timeline: '4–7 minggu',
    exampleSlug: 'phoenix-signal',
    exampleLabel: 'Lihat pola: Phoenix Signal',
  },
];

export const webAppIntro =
  'Sistem full-stack dengan autentikasi, database, dashboard, alur kerja bisnis, dan integrasi layanan.';

export const webAppPackages: Package[] = [
  {
    id: 'ecommerce',
    name: 'E-commerce Custom',
    forWho: 'Untuk penjualan online dengan alur sendiri',
    price: { kind: 'range', min: 18, max: 35, unit: 'juta' },
    deliverables: [
      'Katalog, cart, checkout',
      'admin produk dan pesanan',
      'payment dan ongkir dasar',
    ],
    revisions: 'Sesuai scope',
    timeline: 'Ditulis di proposal',
  },
  {
    id: 'membership-lms',
    name: 'Membership / LMS',
    forWho: 'Untuk kelas, komunitas, atau konten berlangganan',
    price: { kind: 'range', min: 25, max: 50, unit: 'juta' },
    deliverables: [
      'User dashboard dan membership',
      'materi, progress, akses',
      'subscription-ready',
    ],
    revisions: 'Sesuai scope',
    timeline: 'Ditulis di proposal',
    exampleSlug: 'hikari-tutor',
    exampleLabel: 'Lihat pola: Hikari Tutor',
  },
  {
    id: 'internal-dashboard',
    name: 'Internal Dashboard',
    forWho: 'Untuk operasional dan pelaporan internal',
    price: { kind: 'range', min: 30, max: 65, unit: 'juta' },
    deliverables: ['Multi-role dan permission', 'data, filter, laporan', 'import dan export'],
    revisions: 'Sesuai scope',
    timeline: 'Ditulis di proposal',
    exampleSlug: 'niaga-one',
    exampleLabel: 'Lihat pola: Niaga One',
  },
  {
    id: 'mvp-saas',
    name: 'MVP / SaaS',
    forWho: 'Untuk produk digital yang akan dikembangkan',
    price: { kind: 'range', min: 40, max: 120, unit: 'juta' },
    deliverables: [
      'Auth, billing, dashboard',
      'API dan automation',
      'architecture siap dikembangkan',
    ],
    revisions: 'Sesuai scope',
    timeline: 'Ditulis di proposal',
  },
  {
    id: 'sistem-kompleks',
    name: 'Sistem kompleks',
    forWho: 'Marketplace, CRM, ERP, multi-vendor',
    price: { kind: 'fromMillion', min: 75 },
    deliverables: ['Scope ditentukan bersama', 'Arsitektur dan modul bertahap', 'Milestone per fase'],
    revisions: 'Sesuai scope',
    timeline: 'Ditulis di proposal',
  },
];

export const allPackageIds = [...websitePackages, ...webAppPackages].map((pkg) => pkg.id);

/** Options for step 1 of the brief form (brief §5.9). */
export const briefProjectTypes: string[] = [
  ...websitePackages.map((pkg) => pkg.name),
  ...webAppPackages.map((pkg) => pkg.name),
  'Belum tahu, perlu diskusi',
];
