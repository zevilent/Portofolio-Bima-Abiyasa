/**
 * Navigation (brief §5.1, §5.10). Hash links are resolved through withBase()
 * at render time, so they survive the /Portofolio-Bima-Abiyasa/ base.
 */
export type NavItem = { label: string; href: string };

export const primaryNav: NavItem[] = [
  { label: 'Karya', href: '#karya' },
  { label: 'Layanan', href: '#layanan' },
  { label: 'Proses', href: '#proses' },
  { label: 'Harga', href: '#harga' },
  { label: 'FAQ', href: '#faq' },
];

export const ctaNav: NavItem = { label: 'Konsultasi', href: '#konsultasi' };

export const sectionIds = {
  karya: 'karya',
  layanan: 'layanan',
  proses: 'proses',
  harga: 'harga',
  ketentuan: 'ketentuan',
  faq: 'faq',
  konsultasi: 'konsultasi',
} as const;
