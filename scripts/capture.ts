/**
 * scripts/capture.ts — screenshots + smooth-scroll preview videos of the real project sites.
 *
 * Run with your own sites only, and only after Bima gives the go-ahead (REASONIX.md rule):
 *
 *   npm run capture                      # capture everything listed in src/config/works.ts
 *   npm run capture -- --only=niaga-one  # one project
 *   npm run capture -- --skip-video      # screenshots only (fast)
 *
 * Output per project (committed, they are content):
 *   src/assets/karya/<slug>/desktop.avif|webp   full-page desktop shot
 *   src/assets/karya/<slug>/mobile.avif|webp    full-page mobile shot
 *   src/assets/karya/<slug>/preview.mp4|webm    short muted scroll clip, <= 1.5 MB each
 *
 * Anything the site refuses to give us (bot wall, cookie wall, timeout) is reported per
 * site instead of failing the whole run, and the UI falls back to the typographic plate
 * (brief §5.4, R4). Nothing here runs in CI.
 */
import { chromium, type Browser, type Page } from 'playwright';
import { mkdir, rename, rm, readdir, stat, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';
import { works } from '../src/config/works.ts';

const ROOT = resolve(process.cwd());
const ASSET_ROOT = join(ROOT, 'src', 'assets', 'karya');
const WORK_DIR = join(ROOT, '.cache', 'capture');

const VIEWPORTS = {
  desktop: { width: 1440, height: 900 },
  mobile: { width: 390, height: 844 },
} as const;

type ViewportName = keyof typeof VIEWPORTS;

/** Hard cap from the brief (§8.4): a preview clip that cannot fit is not shipped. */
const MAX_VIDEO_BYTES = 1_500_000;

const args = new Set(process.argv.slice(2));
const onlyArg = process.argv.find((arg) => arg.startsWith('--only='));
const only = onlyArg?.split('=')[1];
const skipVideo = args.has('--skip-video');

type Report = {
  slug: string;
  url: string;
  status: 'ok' | 'partial' | 'failed';
  files: string[];
  videoBytes: Record<string, number>;
  notes: string[];
};

const reports: Report[] = [];

function log(message: string): void {
  process.stdout.write(`${message}\n`);
}

/** Dismiss the usual consent/announcement layers so they don't cover the shot. */
async function dismissOverlays(page: Page): Promise<void> {
  const patterns = [
    /terima semua/i,
    /terima/i,
    /setuju/i,
    /accept all/i,
    /accept/i,
    /allow all/i,
    /got it/i,
    /mengerti/i,
    /tutup/i,
    /close/i,
    /nanti saja/i,
  ];

  for (const pattern of patterns) {
    const button = page.getByRole('button', { name: pattern }).first();
    try {
      if (await button.isVisible({ timeout: 250 })) {
        await button.click({ timeout: 1_000 });
        await page.waitForTimeout(250);
      }
    } catch {
      // Overlay not present — expected on most sites.
    }
  }
}

async function settle(page: Page): Promise<void> {
  await page.waitForLoadState('networkidle', { timeout: 15_000 }).catch(() => {});
  // Let fonts and lazy images paint, then scroll the full page once so everything loads.
  await page.evaluate(async () => {
    const step = window.innerHeight * 0.9;
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 120));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(600);
}

async function screenshotProject(
  browser: Browser,
  slug: string,
  url: string,
  viewport: ViewportName,
  dir: string,
): Promise<void> {
  const page = await browser.newPage({
    viewport: VIEWPORTS[viewport],
    deviceScaleFactor: viewport === 'mobile' ? 2 : 1,
    isMobile: viewport === 'mobile',
    hasTouch: viewport === 'mobile',
  });

  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 45_000 });
  await dismissOverlays(page);
  await settle(page);

  const png = join(WORK_DIR, `${slug}-${viewport}.png`);
  await page.screenshot({ path: png, fullPage: true, animations: 'disabled' });

  // Convert with the local ImageMagick or sharp; otherwise keep the PNG so nothing is lost.
  const converted = await convertScreenshot(png, dir, viewport);
  if (!converted) {
    // No converter: keep the raw PNG next to the others rather than losing the shot.
    await rename(png, join(dir, `${viewport}.png`));
  }

  await page.close();
}

/**
 * Convert the full-page PNG to AVIF + WebP. sharp ships with Astro's image pipeline, so
 * there is no new tool to install; if it is missing we keep the PNG and log it.
 */
async function convertScreenshot(
  png: string,
  dir: string,
  viewport: ViewportName,
): Promise<boolean> {
  try {
    const { default: sharp } = await import('sharp');

    // Full-page shots can be very tall, and libheif refuses very large frames in practice
    // (its nominal limit is higher than what the encoder accepts). Empirically 16,000 px
    // is the tallest AVIF that encodes here, so scale by whichever edge is furthest over.
    const meta = await sharp(png).metadata();
    const width = meta.width ?? 1600;
    const height = meta.height ?? 0;
    const widthTarget = 1600;
    const heightLimit = 16_000;
    const scale = Math.min(1, widthTarget / width, heightLimit / Math.max(height, 1));

    const base = sharp(png).resize({
      width: Math.max(1, Math.round(width * scale)),
      withoutEnlargement: true,
    });

    await base.clone().avif({ quality: 50 }).toFile(join(dir, `${viewport}.avif`));
    await base.clone().webp({ quality: 76 }).toFile(join(dir, `${viewport}.webp`));
    await rm(png, { force: true });
    return true;
  } catch (error) {
    log(`  ! image conversion unavailable (${String(error).slice(0, 80)}) — keeping PNG`);
    return false;
  }
}

/** Records a short, smooth scroll of the page; the clip is muted and poster-friendly. */
async function recordPreview(browser: Browser, slug: string, url: string, dir: string): Promise<Record<string, number>> {
  const sizes: Record<string, number> = {};
  const page = await browser.newPage({
    viewport: VIEWPORTS.desktop,
    recordVideo: { dir: WORK_DIR, size: { width: 1280, height: 720 } },
  });

  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 45_000 });
  await dismissOverlays(page);
  await page.waitForTimeout(800);

  // The scroll is deliberately slow and continuous: it reads as a crafted preview,
  // not as a screen recording of someone hunting for a section.
  await page.evaluate(async () => {
    const distance = Math.min(document.body.scrollHeight - window.innerHeight, window.innerHeight * 1.6);
    const duration = 6_000;
    const start = performance.now();
    await new Promise<void>((done) => {
      const step = (now: number) => {
        const t = Math.min((now - start) / duration, 1);
        // easeInOutSine keeps the motion calm at both ends.
        const eased = 0.5 - Math.cos(Math.PI * t) / 2;
        window.scrollTo(0, distance * eased);
        if (t < 1) requestAnimationFrame(step);
        else done();
      };
      requestAnimationFrame(step);
    });
  });

  const video = page.video();
  await page.close();
  if (!video) return sizes;

  const raw = await video.path();
  const mp4 = join(dir, 'preview.mp4');
  const webm = join(dir, 'preview.webm');

  const mp4Ok = transcode(raw, mp4, [
    '-c:v', 'libx264', '-crf', '30', '-preset', 'slow', '-pix_fmt', 'yuv420p',
    '-vf', 'fps=24,scale=1280:-2', '-an', '-movflags', '+faststart',
  ]);
  const webmOk = transcode(raw, webm, [
    '-c:v', 'libvpx-vp9', '-crf', '38', '-b:v', '0', '-row-mt', '1',
    '-vf', 'fps=24,scale=1280:-2', '-an',
  ]);

  for (const [name, path, ok] of [
    ['mp4', mp4, mp4Ok],
    ['webm', webm, webmOk],
  ] as const) {
    if (!ok) continue;
    const { size } = await stat(path);
    sizes[name] = size;
    if (size > MAX_VIDEO_BYTES) {
      log(`  ! ${slug} ${name} is ${(size / 1_000_000).toFixed(2)} MB (cap 1.5 MB) — dropping it.`);
      await rm(path, { force: true });
      delete sizes[name];
    }
  }

  await rm(raw, { force: true });
  return sizes;
}

function transcode(input: string, output: string, args: string[]): boolean {
  const result = spawnSync('ffmpeg', ['-y', '-loglevel', 'error', '-i', input, ...args, output], {
    stdio: 'ignore',
  });
  return result.status === 0 && existsSync(output);
}

async function captureProject(browser: Browser, slug: string, url: string): Promise<Report> {
  const report: Report = { slug, url, status: 'ok', files: [], videoBytes: {}, notes: [] };
  const dir = join(ASSET_ROOT, slug);
  await mkdir(dir, { recursive: true });

  for (const viewport of ['desktop', 'mobile'] as const) {
    try {
      await screenshotProject(browser, slug, url, viewport, dir);
      report.files.push(join('src/assets/karya', slug, viewport));
    } catch (error) {
      report.status = 'partial';
      report.notes.push(`screenshot ${viewport} failed: ${String(error).slice(0, 160)}`);
    }
  }

  if (!skipVideo) {
    try {
      report.videoBytes = await recordPreview(browser, slug, url, dir);
      if (Object.keys(report.videoBytes).length === 0) {
        report.status = report.status === 'failed' ? 'failed' : 'partial';
        report.notes.push('no preview video produced (transcode failed or clip over the 1.5 MB cap)');
      }
    } catch (error) {
      report.status = report.status === 'failed' ? 'failed' : 'partial';
      report.notes.push(`video failed: ${String(error).slice(0, 160)}`);
    }
  }

  const written = await readdir(dir).catch(() => [] as string[]);
  if (written.length === 0) {
    report.status = 'failed';
    report.notes.push('nothing captured for this site');
  }

  return report;
}

async function main(): Promise<void> {
  const targets = works.filter((work) => work.url && (!only || work.slug === only));
  const skipped = works.filter((work) => !work.url);

  await mkdir(WORK_DIR, { recursive: true });
  log(`Capture: ${targets.length} site(s)${only ? ` (--only=${only})` : ''}${skipVideo ? ' [screenshots only]' : ''}`);
  for (const work of skipped) {
    log(`  – skipping ${work.slug}: no live URL (status: ${work.status})`);
  }

  const browser = await chromium.launch();

  for (const work of targets) {
    log(`\n→ ${work.slug} ${work.url}`);
    const report = await captureProject(browser, work.slug, work.url as string);
    reports.push(report);
    log(`  status: ${report.status}`);
    for (const note of report.notes) log(`  note: ${note}`);
    for (const [name, size] of Object.entries(report.videoBytes)) {
      log(`  ${name}: ${(size / 1_000_000).toFixed(2)} MB`);
    }
  }

  await browser.close();
  await writeFile(join(WORK_DIR, 'report.json'), `${JSON.stringify(reports, null, 2)}\n`);
  await rm(WORK_DIR, { recursive: true, force: true });

  const failed = reports.filter((report) => report.status !== 'ok');
  log(`\nDone. ${reports.length - failed.length}/${reports.length} clean.`);
  if (failed.length > 0) {
    log('Sites needing a manual look:');
    for (const report of failed) log(`  ${report.slug}: ${report.notes.join('; ')}`);
  }
}

main().catch((error: unknown) => {
  process.stderr.write(`capture failed: ${String(error)}\n`);
  process.exitCode = 1;
});
