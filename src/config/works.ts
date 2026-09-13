/**
 * Works — Selected Works cards (brief §5.4). Only the facts Bima supplied are here:
 * name, category, status, live URL. Year, role, stack and results are intentionally
 * absent (null) until he provides them — an empty field is omitted in the UI, and
 * the card falls back to a typographic plate. Never fill these with guesses.
 */

export type WorkStatus = 'live' | 'concept' | 'coming-soon';

export type Work = {
  slug: string;
  name: string;
  category: string;
  status: WorkStatus;
  url: string | null;
  urlLabel?: string;
  /** Concept work stays honest: it ships with a visible badge wherever it appears. */
  concept?: boolean;
  description: string;
  /** null → the year label is hidden (proposal P4). */
  year: number | null;
  /** Drafted from the live site in M3, verified by Bima before shipping (proposal P5). */
  stack: string[];
  order: number;
};

export const works: Work[] = [
  {
    slug: 'hikari-tutor',
    name: 'Hikari Tutor',
    category: 'Web Application',
    status: 'live',
    url: 'https://hikaritutor.web.id',
    description: 'Platform belajar Bahasa Jepang dengan pengalaman belajar yang terstruktur.',
    year: null,
    stack: [],
    order: 1,
  },
  {
    slug: 'phoenix-signal',
    name: 'Phoenix Signal',
    category: 'Web Application',
    status: 'live',
    url: 'https://phoenixsignal.app',
    description:
      'Aplikasi signal XAUUSD dengan penyajian data yang modern, analisis, dan pengalaman pengguna yang rapi.',
    year: null,
    stack: [],
    order: 2,
  },
  {
    slug: 'niaga-one',
    name: 'Niaga One',
    category: 'Web Application',
    status: 'live',
    url: 'https://niaga-one.vercel.app',
    description: 'Web application bisnis dengan antarmuka yang bersih dan responsif.',
    year: null,
    stack: [],
    order: 3,
  },
  {
    slug: 'teras-kinara-residence',
    name: 'Teras Kinara Residence',
    category: 'Website · Konsep',
    status: 'live',
    url: 'https://zevilent.github.io/teras-kinara-landing/',
    concept: true,
    description: 'Landing page konsep untuk proyek residensial fiktif.',
    year: null,
    stack: [],
    order: 4,
  },
];

export const worksSorted = [...works].sort((a, b) => a.order - b.order);

export const worksCopy = {
  eyebrow: '03 / KARYA TERPILIH',
  heading: 'Karya',
  headingAccent: 'terpilih',
  intro: 'Empat proyek: tiga sudah live, satu masih konsep.',
  statusLabels: {
    live: 'STATUS: LIVE',
    concept: 'STATUS: KONSEP',
    'coming-soon': 'STATUS: SEGERA',
  } satisfies Record<WorkStatus, string>,
  conceptBadge: 'Konsep',
  liveLink: 'Live site',
  caseStudyLink: 'Studi kasus',
} as const;

/** Next project in the reading order, wrapping around — used by the case-study footer. */
export function nextWork(slug: string): Work {
  const index = worksSorted.findIndex((work) => work.slug === slug);
  const next = worksSorted[(index + 1) % worksSorted.length];
  // worksSorted is never empty in practice; the assertion keeps TS honest.
  return next as Work;
}
