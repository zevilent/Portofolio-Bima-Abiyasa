/**
 * URL helpers — the ONLY place that knows about Astro's `base`.
 *
 * Deploy target is a GitHub Pages project site
 * (https://zevilent.github.io/Portofolio-Bima-Abiyasa/), so `import.meta.env.BASE_URL`
 * is `/Portofolio-Bima-Abiyasa/`. Never write a root-absolute path such as
 * `href="/karya/x"` in a component: build it with withBase() instead, so moving to a
 * clean URL or a custom domain stays a one-line change (REASONIX.md).
 */

/** Astro's configured base, normalised to always start and end with "/". */
export function basePath(): string {
  const raw = import.meta.env.BASE_URL || '/';
  const withLeading = raw.startsWith('/') ? raw : `/${raw}`;
  return withLeading.endsWith('/') ? withLeading : `${withLeading}/`;
}

/**
 * Prefix an internal path with the site base.
 *
 * withBase('/')                  -> '/Portofolio-Bima-Abiyasa/'
 * withBase('/karya/hikari-tutor')-> '/Portofolio-Bima-Abiyasa/karya/hikari-tutor'
 * withBase('#karya')             -> '#karya' (hash-only links pass through untouched)
 * withBase('https://x.dev')      -> 'https://x.dev' (absolute URLs pass through)
 */
export function withBase(path = '/'): string {
  if (!path) return basePath();
  // Hash-only, query-only, protocol-relative and absolute URLs are not ours to rewrite.
  if (/^([a-z][a-z0-9+.-]*:|\/\/|#|\?)/i.test(path)) return path;

  const base = basePath();
  const clean = path.startsWith('/') ? path.slice(1) : path;
  if (clean === '') return base;

  // Keep a trailing slash if the caller asked for one, drop it otherwise.
  return `${base}${clean}`.replace(/\/{2,}/g, '/');
}

/** Absolute URL for canonical / og:url / sitemap. */
export function absoluteUrl(path = '/'): string {
  const site = (import.meta.env.SITE || '').replace(/\/$/, '');
  return `${site}${withBase(path)}`.replace(/\/{2,}/g, (_match, offset: number) => (offset === 6 ? '//' : '/'));
}
