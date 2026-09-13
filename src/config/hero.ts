/**
 * Hero copy + the agent terminal script (brief §5.2).
 * Kept in config because it is content, not layout.
 */

export const heroCopy = {
  eyebrow: 'AI AGENTIC FULL STACK WEBSITE DEVELOPER · BOGOR, ID',
  /** Split around the emphasised word — the serif italic accent. */
  headlineLead: 'Build ',
  headlineAccent: 'smarter',
  headlineRest: '. Ship faster.',
  subheadline:
    'Website dan web application modern yang dibangun end-to-end: interface, backend, database, automation, hingga integrasi AI.',
  workMode: 'Bekerja remote dengan klien di seluruh Indonesia.',
  ctaPrimary: 'Lihat Karya',
  ctaSecondary: 'Diskusikan Proyek',
  scrollCue: 'SCROLL',
  worksAnchor: '#karya',
} as const;

export type TerminalSegment = { text: string; tone?: 'prompt' | 'key' | 'ok' };

export const terminalCopy = {
  footnote: 'ILUSTRASI PROSES',
  /** Screen-reader text alternative (the animated region is aria-hidden). */
  alternative:
    'Ilustrasi alur kerja: riset dan prioritas, scope tertulis, struktur data, antarmuka, pengujian unit dan aksesibilitas, pemeriksaan keamanan, review manusia, lalu deploy.',
  lines: [
    [{ text: '$ ', tone: 'prompt' }, { text: 'agent run build --scope tertulis', tone: 'key' }],
    [{ text: '' }],
    [
      { text: '→ discover   ' },
      { text: 'tujuan · pengguna · prioritas', tone: 'key' },
    ],
    [
      { text: '→ scope      ' },
      { text: 'proposal · timeline · milestone', tone: 'key' },
    ],
    [
      { text: '→ schema     ' },
      { text: 'struktur data · relasi', tone: 'key' },
    ],
    [
      { text: '→ ui         ' },
      { text: 'komponen · design system', tone: 'key' },
    ],
    [
      { text: '→ tests      ' },
      { text: 'unit · e2e · aksesibilitas ', tone: 'key' },
      { text: '✓', tone: 'ok' },
    ],
    [
      { text: '→ security   ' },
      { text: 'dependensi · validasi input ', tone: 'key' },
      { text: '✓', tone: 'ok' },
    ],
    [{ text: '→ review     ' }, { text: 'manusia: Bima', tone: 'key' }],
    [{ text: '→ deploy     ' }, { text: 'live ', tone: 'key' }, { text: '✓', tone: 'ok' }],
  ] satisfies TerminalSegment[][],
  /** Mobile shows a shorter slice so the card stays compact (brief §6/02). */
  mobileLineCount: 6,
  charDelayMs: 22,
  linePauseMs: 90,
  loopPauseMs: 900,
} as const;
