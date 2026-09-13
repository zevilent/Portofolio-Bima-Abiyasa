/**
 * Motion tokens mirrored for JS (brief §3.4). CSS is the source of truth in
 * tokens.css; this file exists so GSAP timelines use the same numbers instead of
 * ad-hoc literals. If a value changes in tokens.css, change it here too — the
 * motion spec test compares the two.
 */

export const duration = {
  d1: 120,
  d2: 200,
  d3: 320,
  d4: 560,
  d5: 900,
  d6: 1200,
} as const;

export const seconds = {
  d1: duration.d1 / 1000,
  d2: duration.d2 / 1000,
  d3: duration.d3 / 1000,
  d4: duration.d4 / 1000,
  d5: duration.d5 / 1000,
  d6: duration.d6 / 1000,
} as const;

export const stagger = {
  s1: duration.d1 / 3,
  s2: duration.d2 / 3.33,
  s3: duration.d3 / 3.55,
} as const;

/**
 * GSAP accepts cubic-bezier strings through CustomEase, but CustomEase is a paid
 * plugin in some bundles — so the free core receives our curves as SVG-path-like
 * "power" approximations OR as raw cubic-bezier via the built-in `ease` string form.
 * GSAP core supports `cubic-bezier(...)` strings directly, which keeps us on the
 * free tier and on exactly the same curves as CSS.
 */
export const ease = {
  luxe: 'cubic-bezier(0.16, 1, 0.3, 1)',
  outQuint: 'cubic-bezier(0.22, 1, 0.36, 1)',
  inOutQuart: 'cubic-bezier(0.76, 0, 0.24, 1)',
  spring: 'cubic-bezier(0.34, 1.36, 0.64, 1)',
} as const;

/** Single source for the reduced-motion query. */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined' || !window.matchMedia) return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/** Desktop pointer check: touch devices get the simplified behaviour (brief §7). */
export function isFinePointer(): boolean {
  if (typeof window === 'undefined' || !window.matchMedia) return false;
  return window.matchMedia('(pointer: fine)').matches;
}

export function isMobileViewport(): boolean {
  if (typeof window === 'undefined' || !window.matchMedia) return false;
  return window.matchMedia('(max-width: 767px)').matches;
}
