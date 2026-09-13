import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

/**
 * Contrast guard (brief §2.1 + §9). The ratios quoted in the brief are recomputed here
 * from the real hex values in tokens.css, so a careless colour edit fails the build
 * instead of silently shipping text below WCAG AA.
 */

type Rgb = { r: number; g: number; b: number };

function hexToRgb(hex: string): Rgb {
  const clean = hex.trim().replace('#', '');
  const value = clean.length === 3 ? clean.replace(/(.)/g, '$1$1') : clean;
  return {
    r: Number.parseInt(value.slice(0, 2), 16),
    g: Number.parseInt(value.slice(2, 4), 16),
    b: Number.parseInt(value.slice(4, 6), 16),
  };
}

function channelLuminance(channel: number): number {
  const c = channel / 255;
  return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
}

export function luminance({ r, g, b }: Rgb): number {
  return (
    0.2126 * channelLuminance(r) + 0.7152 * channelLuminance(g) + 0.0722 * channelLuminance(b)
  );
}

export function contrastRatio(foreground: string, background: string): number {
  const a = luminance(hexToRgb(foreground));
  const b = luminance(hexToRgb(background));
  const [lighter, darker] = a > b ? [a, b] : [b, a];
  return (lighter + 0.05) / (darker + 0.05);
}

const tokens = readFileSync(resolve(process.cwd(), 'src/styles/tokens.css'), 'utf8');

function tokenValue(name: string): string {
  const match = tokens.match(new RegExp(`--${name}:\\s*(#[0-9a-fA-F]{3,8})`));
  if (!match?.[1]) throw new Error(`token --${name} not found as a hex value in tokens.css`);
  return match[1];
}

const bg = tokenValue('color-bg');
const surface1 = tokenValue('color-surface-1');
const surface2 = tokenValue('color-surface-2');
const surface3 = tokenValue('color-surface-3');

describe('token contrast (WCAG 2.1 AA)', () => {
  const textPairs: Array<[string, string, string, number]> = [
    ['text', 'color-text', bg, 4.5],
    ['text-2', 'color-text-2', bg, 4.5],
    ['text-muted', 'color-text-muted', bg, 4.5],
    ['text-muted on surface-1', 'color-text-muted', surface1, 4.5],
    ['text-muted-hi on surface-2', 'color-text-muted-hi', surface2, 4.5],
    ['text-muted-hi on surface-3', 'color-text-muted-hi', surface3, 4.5],
    ['gold on bg', 'color-gold', bg, 4.5],
    ['gold on surface-1', 'color-gold', surface1, 4.5],
    ['gold-bright on bg', 'color-gold-bright', bg, 4.5],
    ['ember on bg (live states)', 'color-ember', bg, 4.5],
    ['ember on surface-1', 'color-ember', surface1, 4.5],
  ];

  it.each(textPairs)('%s meets AA', (_label, token, background, min) => {
    const ratio = contrastRatio(tokenValue(token), background);
    expect(ratio).toBeGreaterThanOrEqual(min);
  });

  it('keeps ivory clearly warmer and softer than pure white', () => {
    const { r, g, b } = hexToRgb(tokenValue('color-text'));
    expect(r).toBeGreaterThan(g);
    expect(g).toBeGreaterThan(b);
    expect(r).toBeLessThan(255);
  });

  it('keeps the palette free of the banned purple/blue range', () => {
    for (const token of ['color-text', 'color-gold', 'color-ember']) {
      const { b } = hexToRgb(tokenValue(token));
      const { r } = hexToRgb(tokenValue(token));
      expect(b).toBeLessThan(r);
    }
  });

  it('documents the duration scale the site is allowed to use', () => {
    for (const duration of ['--dur-1', '--dur-2', '--dur-3', '--dur-4', '--dur-5', '--dur-6']) {
      expect(tokens).toContain(duration);
    }
  });

  it('mirrors the CSS duration tokens in the JS motion config', async () => {
    const { duration } = await import('@/config/motion');
    expect(Object.values(duration)).toEqual([120, 200, 320, 560, 900, 1200]);
  });
});
