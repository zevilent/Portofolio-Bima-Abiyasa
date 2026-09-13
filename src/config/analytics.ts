/**
 * Analytics (brief §10.2). Empty IDs mean the script is NEVER loaded — enforced by
 * tests/unit/config.test.ts and by lib/track.ts, which no-ops without consent.
 * No secrets belong in this file: GA4 Measurement IDs and Meta Pixel IDs are public
 * identifiers, not credentials.
 */

import { flags } from './flags';

export type ConsentState = 'granted' | 'denied' | 'unset';

export const analytics = {
  /** Fill with a real GA4 Measurement ID (G-XXXXXXX) to enable GA4. */
  ga4: '',
  /** Fill with a real Meta Pixel ID to enable the pixel. */
  metaPixel: '',
  /** Consent is required before anything loads, regardless of the IDs above. */
  requireConsent: true,
  storageKey: 'ba-consent',
} as const;

export const consentCopy = {
  text: 'Situs ini hanya memuat analytics kalau Anda setuju. Tidak ada data dari formulir yang dikirim ke server.',
  accept: 'Izinkan analytics',
  decline: 'Tolak',
  learnMore: 'Pelajari',
  /** Anchored to the FAQ until a /privasi page exists (proposal P2). */
  learnMoreHref: '#faq',
} as const;

/** True when at least one real ID exists AND the analytics flag is on. */
export function analyticsConfigured(): boolean {
  return flags.ENABLE_ANALYTICS && Boolean(analytics.ga4 || analytics.metaPixel);
}
