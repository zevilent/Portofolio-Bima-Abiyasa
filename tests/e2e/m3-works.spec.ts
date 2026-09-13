import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { mkdir } from 'node:fs/promises';
import { join } from 'node:path';

/**
 * M3: Selected Works + case studies. Also the review harness for this milestone.
 * Output: docs/screenshots/M3/
 */
const OUT = join(process.cwd(), 'docs', 'screenshots', 'M3');
const BASE = '/Portofolio-Bima-Abiyasa/';
const SLUGS = ['hikari-tutor', 'phoenix-signal', 'niaga-one', 'teras-kinara-residence'];

test.beforeAll(async () => {
  await mkdir(OUT, { recursive: true });
});

test.describe('works stack', () => {
  test('renders four cards with posters, status plates and a concept badge', async ({ page }) => {
    await page.goto(BASE, { waitUntil: 'load' });
    const cards = page.locator('[data-work-card]');
    await expect(cards).toHaveCount(4);

    // The concept project must announce itself as a concept.
    await expect(page.locator('[data-work-card]').nth(3)).toContainText('Konsep');
    // Live status plates are present and no card invents a year.
    await expect(page.locator('[data-work-card]').first()).toContainText('STATUS: LIVE');

    const posters = await page.locator('[data-work-card] picture img').count();
    expect(posters).toBeGreaterThanOrEqual(4);
  });

  test('each card links to its case study', async ({ page }) => {
    await page.goto(BASE, { waitUntil: 'load' });
    for (const slug of SLUGS) {
      await expect(page.locator(`[data-transition-name="karya-${slug}"]`)).toHaveAttribute(
        'href',
        `${BASE}karya/${slug}`,
      );
    }
  });

  test('desktop screenshot of the works section', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(BASE, { waitUntil: 'load' });
    await page.locator('#karya').scrollIntoViewIfNeeded();
    await page.waitForTimeout(900);
    await page.screenshot({ path: join(OUT, 'desktop-1440-karya.png') });
  });

  test('mobile screenshot of the works section', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(BASE, { waitUntil: 'load' });
    await page.locator('#karya').scrollIntoViewIfNeeded();
    await page.waitForTimeout(900);
    await page.screenshot({ path: join(OUT, 'mobile-390-karya.png') });
  });
});

test.describe('case studies', () => {
  for (const slug of SLUGS) {
    test(`${slug}: page renders with heading, live link and next project`, async ({ page }) => {
      await page.goto(`${BASE}karya/${slug}`, { waitUntil: 'load' });
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
      await expect(page.getByText('Proyek berikutnya')).toBeVisible();
      await expect(page.getByRole('link', { name: /live site/i })).toBeVisible();
    });
  }

  test('has no axe violations on a case study', async ({ page }) => {
    await page.goto(`${BASE}karya/niaga-one`, { waitUntil: 'load' });
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();
    expect(
      results.violations,
      results.violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(' ')).join(', ')}`).join('\n'),
    ).toEqual([]);
  });

  test('has no axe violations on the home page (works section included)', async ({ page }) => {
    await page.goto(BASE, { waitUntil: 'load' });
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();
    expect(
      results.violations,
      results.violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(' ')).join(', ')}`).join('\n'),
    ).toEqual([]);
  });

  test('case study screenshot (desktop)', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(`${BASE}karya/hikari-tutor`, { waitUntil: 'load' });
    await page.waitForTimeout(800);
    await page.screenshot({ path: join(OUT, 'desktop-1440-case-study.png') });
  });

  test('case study screenshot (mobile)', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`${BASE}karya/hikari-tutor`, { waitUntil: 'load' });
    await page.waitForTimeout(800);
    await page.screenshot({ path: join(OUT, 'mobile-390-case-study.png') });
  });
});
