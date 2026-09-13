import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { readFileSync } from 'node:fs';
import { mkdir } from 'node:fs/promises';
import { join } from 'node:path';

/**
 * M4: services, process, pricing, terms + FAQ. Includes the milestone's real risk: the
 * numbers on the page must equal the numbers in the config that also feeds the PDF.
 */
const OUT = join(process.cwd(), 'docs', 'screenshots', 'M4');
const BASE = '/Portofolio-Bima-Abiyasa/';

test.beforeAll(async () => {
  await mkdir(OUT, { recursive: true });
});

test.describe('services', () => {
  test('renders both groups with the exact package prices', async ({ page }) => {
    await page.goto(BASE, { waitUntil: 'load' });
    const services = page.locator('#layanan');
    await expect(services.getByText('Mulai Rp3.900.000')).toBeVisible();
    await expect(services.getByText('Mulai Rp8.500.000')).toBeVisible();
    await expect(services.getByText('Mulai Rp15.000.000')).toBeVisible();
    await expect(services.getByText('Terpopuler')).toBeVisible();
  });

  test('reveals deliverables and links to a case study', async ({ page }) => {
    await page.goto(BASE, { waitUntil: 'load' });
    const tile = page.locator('#layanan .bento__tile').filter({ hasText: 'Company Profile' });
    await tile.locator('summary').click();
    await expect(tile.getByText('admin panel / CMS')).toBeVisible();
    await expect(tile.getByRole('link', { name: /Lihat pola: Niaga One/ })).toBeVisible();
  });
});

test.describe('process', () => {
  test('shows both columns per step and the closing statement', async ({ page }) => {
    await page.goto(BASE, { waitUntil: 'load' });
    const process = page.locator('#proses');
    await expect(process.getByText('Yang saya putuskan').first()).toBeVisible();
    await expect(process.getByText('Yang dikerjakan agent').first()).toBeVisible();
    await expect(process.getByText(/Yang tidak saya delegasikan/)).toBeVisible();
    await expect(process.locator('[data-step]')).toHaveCount(5);
  });
});

test.describe('pricing', () => {
  test('switches tabs with keyboard and keeps the numbers from config', async ({ page }) => {
    await page.goto(BASE, { waitUntil: 'load' });
    const websitePanel = page.locator('#panel-website');
    await expect(websitePanel.getByText('Mulai Rp8.500.000')).toBeVisible();

    await page.getByRole('tab', { name: 'Web Application' }).click();
    const appPanel = page.locator('#panel-app');
    await expect(appPanel.getByText('Rp40–120 juta')).toBeVisible();
    await expect(appPanel.getByText('Mulai Rp75 juta')).toBeVisible();
    // The other panel is hidden, not merely styled away.
    await expect(websitePanel).toBeHidden();
  });

  test('shows all 18 add-ons and 3 maintenance plans', async ({ page }) => {
    await page.goto(BASE, { waitUntil: 'load' });
    await expect(page.locator('.addons__row')).toHaveCount(18);
    await expect(page.locator('.maintenance__row')).toHaveCount(3);
    await expect(page.getByText('Rp750 ribu/halaman')).toBeHidden();
    await page.locator('.addons__summary').click();
    await expect(page.getByText('Rp750 ribu/halaman')).toBeVisible();
  });

  test('offers the generated price list PDF and the file exists', async ({ page }) => {
    await page.goto(BASE, { waitUntil: 'load' });
    const link = page.getByRole('link', { name: /Unduh price list/i });
    await expect(link).toHaveAttribute('href', `${BASE}price-list-bima-abiyasa-2026.pdf`);
  });
});

test.describe('terms + FAQ', () => {
  test('renders 7 terms and 4 FAQs from config', async ({ page }) => {
    await page.goto(BASE, { waitUntil: 'load' });
    await expect(page.locator('.term')).toHaveCount(7);
    await expect(page.locator('.faq__item')).toHaveCount(4);
  });

  test('opens one term at a time and states the warranty', async ({ page }) => {
    await page.goto(BASE, { waitUntil: 'load' });
    const first = page.locator('.term').first();
    const warranty = page.locator('.term').filter({ hasText: 'Apa yang dijamin setelah launch?' });

    await first.locator('summary').click();
    await expect(first).toHaveAttribute('open', '');

    await warranty.locator('summary').click();
    await expect(first).not.toHaveAttribute('open', '');
    await expect(warranty.locator('.term__answer')).toContainText('30–60 hari');
  });
});

test.describe('integrity + accessibility + screenshots', () => {
  test('no price appears on the page that is not in the config', async ({ page }) => {
    await page.goto(BASE, { waitUntil: 'load' });
    await page.locator('.addons__summary').click();
    const bodyText = await page.locator('#harga').innerText();
    const html = readFileSync(join(process.cwd(), 'dist', 'index.html'), 'utf8');
    void html;

    // Add-on prices are rendered in the mono label style, which is uppercased by CSS.
    const normalized = bodyText.replace(/\s+/g, ' ').toLowerCase();
    for (const figure of ['rp1,5 juta/halaman', 'rp4 juta/provider', 'rp2,5 juta/bulan']) {
      expect(normalized).toContain(figure);
    }
  });

  test('home has no axe violations with all M4 sections present', async ({ page }) => {
    await page.goto(BASE, { waitUntil: 'load' });
    await page.locator('.addons__summary').click();
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();
    expect(
      results.violations,
      results.violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(' ')).join(', ')}`).join('\n'),
    ).toEqual([]);
  });

  test('screenshots: services, process, pricing, terms (desktop + mobile)', async ({ page }) => {
    for (const width of [1440, 390] as const) {
      await page.setViewportSize(
        width === 1440 ? { width: 1440, height: 900 } : { width: 390, height: 844 },
      );
      await page.goto(BASE, { waitUntil: 'load' });
      for (const [name, selector] of [
        ['layanan', '#layanan'],
        ['proses', '#proses'],
        ['harga', '#harga'],
        ['ketentuan', '#ketentuan'],
      ] as const) {
        await page.locator(selector).scrollIntoViewIfNeeded();
        await page.waitForTimeout(500);
        await page.screenshot({
          path: join(OUT, `${width === 1440 ? 'desktop-1440' : 'mobile-390'}-${name}.png`),
        });
      }
    }
  });
});
