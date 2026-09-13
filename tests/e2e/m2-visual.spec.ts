import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { mkdir } from 'node:fs/promises';
import { join } from 'node:path';

/**
 * M2 review harness: screenshots at the two required widths + an axe scan.
 * Run: npx playwright test tests/e2e/m2-visual.spec.ts
 * Output: docs/screenshots/M2/
 */

const OUT = join(process.cwd(), 'docs', 'screenshots', 'M2');
const BASE = '/Portofolio-Bima-Abiyasa/';

test.beforeAll(async () => {
  await mkdir(OUT, { recursive: true });
});

test.describe('M2 visual review', () => {
  test('desktop 1440 — hero, terminal, marquee', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(BASE, { waitUntil: 'load' });
    // Wait for the lazy WebGL tier decision + first frames (or its static fallback).
    await page.waitForTimeout(2500);
    await page.screenshot({ path: join(OUT, 'desktop-1440-hero.png') });

    await page.evaluate(() => window.scrollTo(0, window.innerHeight * 1.1));
    await page.waitForTimeout(900);
    await page.screenshot({ path: join(OUT, 'desktop-1440-marquee.png') });
  });

  test('mobile 390 — hero and menu', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(BASE, { waitUntil: 'load' });
    await page.waitForTimeout(2000);
    await page.screenshot({ path: join(OUT, 'mobile-390-hero.png') });

    const menuButton = page.getByRole('button', { name: /menu/i });
    if (await menuButton.isVisible()) {
      await menuButton.click();
      await page.waitForTimeout(700);
      await page.screenshot({ path: join(OUT, 'mobile-390-menu.png') });
      await page.keyboard.press('Escape');
    }
  });
});

test.describe('M2 accessibility', () => {
  test('home has no axe violations', async ({ page }) => {
    await page.goto(BASE, { waitUntil: 'load' });
    await page.waitForTimeout(1500);

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();

    expect(
      results.violations,
      results.violations
        .map((v) => `${v.id} (${v.impact}): ${v.nodes.map((n) => n.target.join(' ')).join(', ')}`)
        .join('\n'),
    ).toEqual([]);
  });

  test('home works with JavaScript disabled', async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false });
    const page = await context.newPage();
    await page.goto(BASE, { waitUntil: 'load' });

    // The LCP copy must be real HTML, visible without JS (brief §9).
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await expect(page.getByRole('link', { name: /lihat karya/i })).toBeVisible();
    await context.close();
  });
});
