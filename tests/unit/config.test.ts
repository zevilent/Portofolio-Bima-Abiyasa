import { describe, expect, it } from 'vitest';
import { site } from '@/config/site';
import { flags } from '@/config/flags';
import { capabilities, confirmedCapabilities } from '@/config/capabilities';
import { works, worksSorted, nextWork } from '@/config/works';
import {
  websitePackages,
  webAppPackages,
  websiteInclusions,
  briefProjectTypes,
} from '@/config/services';
import { addons, maintenancePlans } from '@/config/addons';
import { GUARANTEE_DAYS, terms, priceNote } from '@/config/terms';
import { faq } from '@/config/faq';
import { processSteps } from '@/config/process';
import { budgetRanges, timelines } from '@/config/briefForm';
import { analytics, analyticsConfigured, consentCopy } from '@/config/analytics';
import { availability } from '@/config/availability';
import { formatPrice } from '@/lib/format';

describe('business data integrity — everything must match what Bima supplied', () => {
  it('carries the exact website package prices from the brief', () => {
    const prices = websitePackages.map((pkg) => formatPrice(pkg.price));
    expect(prices).toEqual(['Mulai Rp3.900.000', 'Mulai Rp8.500.000', 'Mulai Rp15.000.000']);
  });

  it('carries the exact web application prices from the brief', () => {
    const prices = webAppPackages.map((pkg) => formatPrice(pkg.price));
    expect(prices).toEqual([
      'Rp18–35 juta',
      'Rp25–50 juta',
      'Rp30–65 juta',
      'Rp40–120 juta',
      'Mulai Rp75 juta',
    ]);
  });

  it('has exactly 18 add-ons and 3 maintenance plans', () => {
    expect(addons).toHaveLength(18);
    expect(maintenancePlans).toHaveLength(3);
    expect(maintenancePlans.map((plan) => formatPrice(plan.price))).toEqual([
      'Rp1 juta/bulan',
      'Rp2,5 juta/bulan',
      'Rp5 juta/bulan',
    ]);
  });

  it('keeps revisions and timelines identical to the brief', () => {
    expect(websitePackages.map((pkg) => `${pkg.revisions} · ${pkg.timeline}`)).toEqual([
      '2 revisi · 7–12 hari kerja',
      '3 revisi · 2–4 minggu',
      '3 revisi · 4–7 minggu',
    ]);
  });

  it('marks Company Profile as the popular package and only that one', () => {
    expect(websitePackages.filter((pkg) => pkg.popular).map((pkg) => pkg.name)).toEqual([
      'Company Profile',
    ]);
  });
});

describe('the warranty duration is one value everywhere (decision D2)', () => {
  const places: Array<[string, string]> = [
    ['terms accordion', terms.find((term) => term.id === 'garansi')?.answer ?? ''],
    ['faq maintenance answer', faq.find((item) => item.id === 'maintenance')?.answer ?? ''],
    ['website inclusions', websiteInclusions.join(' ')],
  ];

  it.each(places)('%s mentions the guaranteed duration', (_label, text) => {
    expect(text).toContain(GUARANTEE_DAYS);
  });

  it('does not contain any other warranty duration anywhere in the config', () => {
    const haystack = JSON.stringify({ terms, faq, websiteInclusions, priceNote });
    expect(haystack).not.toMatch(/30[–-]90/);
    expect(GUARANTEE_DAYS).toBe('30–60 hari');
  });
});

describe('honesty guards', () => {
  it('never renders an unconfirmed capability or technology', () => {
    expect(capabilities.some((item) => !item.confirmed)).toBe(true);
    expect(confirmedCapabilities.every((item) => item.confirmed)).toBe(true);
    expect(confirmedCapabilities.length).toBeLessThanOrEqual(capabilities.length);
  });

  it('invents no year, stack or result for any project', () => {
    for (const work of works) {
      expect(work.year).toBeNull();
      expect(work.stack).toEqual([]);
    }
  });

  it('keeps Teras Kinara labelled as a concept, link or no link', () => {
    // The demo URL arrived in M3, but the project is still concept work: the flag is what
    // drives the "Konsep" badge, so a live URL can never make it read as client work.
    const concept = works.find((work) => work.slug === 'teras-kinara-residence');
    expect(concept?.concept).toBe(true);
    expect(concept?.category).toContain('Konsep');
    expect(concept?.url).toMatch(/^https:\/\//);
  });

  it('flags exactly one project as concept work', () => {
    expect(works.filter((work) => work.concept).map((work) => work.slug)).toEqual([
      'teras-kinara-residence',
    ]);
  });

  it('ships no stats row because no real numbers were provided (proposal P3)', () => {
    expect(flags.SHOW_STATS).toBe(false);
  });

  it('does not load analytics without a real ID', () => {
    expect(analytics.ga4).toBe('');
    expect(analytics.metaPixel).toBe('');
    expect(analyticsConfigured()).toBe(false);
  });

  it('lists only services Bima actually offers', () => {
    expect(site.services).toEqual([
      'Custom website',
      'Web application',
      'AI integration',
      'Business automation',
    ]);
  });
});

describe('works integrity', () => {
  it('has 4 unique slugs in a stable order', () => {
    expect(works).toHaveLength(4);
    expect(new Set(works.map((work) => work.slug)).size).toBe(4);
    expect(worksSorted.map((work) => work.order)).toEqual([1, 2, 3, 4]);
  });

  it('links every live project to a real https URL', () => {
    for (const work of works.filter((item) => item.status === 'live')) {
      expect(work.url).toMatch(/^https:\/\//);
    }
  });

  it('wraps the next-project link around the list', () => {
    expect(nextWork('hikari-tutor').slug).toBe('phoenix-signal');
    expect(nextWork('teras-kinara-residence').slug).toBe('hikari-tutor');
  });

  it('points every example slug at a project that exists', () => {
    const slugs = new Set(works.map((work) => work.slug));
    for (const pkg of [...websitePackages, ...webAppPackages]) {
      if (pkg.exampleSlug) expect(slugs.has(pkg.exampleSlug)).toBe(true);
    }
  });
});

describe('form and copy wiring', () => {
  it('offers every package as a project type, plus the unsure option', () => {
    expect(briefProjectTypes).toHaveLength(
      websitePackages.length + webAppPackages.length + 1,
    );
    expect(briefProjectTypes.at(-1)).toBe('Belum tahu, perlu diskusi');
  });

  it('keeps budget ranges aligned with the real price range', () => {
    expect(budgetRanges).toHaveLength(6);
    expect(budgetRanges.at(-1)).toBe('Belum ada anggaran tetap');
    expect(timelines).toEqual(['Secepatnya', '1–3 bulan', '3–6 bulan', 'Masih eksplorasi']);
  });

  it('has a 6-step process with both human and agent work per step', () => {
    expect(processSteps).toHaveLength(5);
    for (const step of processSteps) {
      expect(step.human.length).toBeGreaterThanOrEqual(2);
      expect(step.agent.length).toBeGreaterThanOrEqual(3);
      expect(step.output.length).toBeGreaterThan(0);
    }
  });

  it('has consent copy in Bahasa Indonesia with an equal-weight decline', () => {
    expect(consentCopy.accept).toContain('Izinkan');
    expect(consentCopy.decline).toBe('Tolak');
    expect(consentCopy.text).toContain('Tidak ada data');
  });

  it('exposes availability text from config and hidden when disabled', () => {
    expect(availability.label).toBe('Menerima proyek baru');
    expect(typeof availability.enabled).toBe('boolean');
  });
});
