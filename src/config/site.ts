/**
 * Identity + contact data. Single source for every personal detail on the site
 * (brief §5.13, §11). Never hardcode these inside components.
 */

export const site = {
  name: 'Bima Abiyasa',
  initials: 'BA',
  title: 'AI Agentic Full Stack Website Developer',
  tagline: 'Build smarter. Ship faster.',
  oneLiner:
    'Website dan web application modern yang dibangun end-to-end: interface, backend, database, automation, hingga integrasi AI.',
  location: 'Bogor, Indonesia',
  locationShort: 'Bogor, ID',
  workMode: 'Bekerja remote dengan klien di seluruh Indonesia.',
  services: ['Custom website', 'Web application', 'AI integration', 'Business automation'],
  contact: {
    whatsapp: '+6285155402545',
    whatsappDisplay: '+62 851-5540-2545',
    email: 'bima.abiyasa16@gmail.com',
  },
  socials: {
    instagram: 'https://www.instagram.com/zevilents.ventus',
    linkedin: 'https://www.linkedin.com/in/bima-abiyasa/',
    github: 'https://github.com/zevilent',
  },
  repoUrl: 'https://github.com/zevilent/Portofolio-Bima-Abiyasa',
  liveUrl: 'https://zevilent.github.io/Portofolio-Bima-Abiyasa/',
  /** Set to a path under /public once a real photo exists; null keeps the typographic slot. */
  photo: null as string | null,
  seo: {
    homeTitle: 'Bima Abiyasa — AI Agentic Full Stack Website Developer',
    defaultDescription:
      'AI Agentic Full Stack Website Developer di Bogor. Website dan web application modern yang dibangun end-to-end: interface, backend, database, automation, integrasi AI. Mulai Rp3.900.000.',
    description404: 'Halaman tidak ditemukan.',
    themeColor: '#0A0A0B',
  },
} as const;

export type Site = typeof site;
