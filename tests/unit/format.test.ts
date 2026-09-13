import { describe, expect, it } from 'vitest';
import {
  SHOW_PRICES_FALLBACK,
  formatPrice,
  juta,
  priceForJsonLd,
  rupiah,
  rupiahCompact,
  type PriceStyle,
} from '@/lib/format';

describe('rupiah', () => {
  it('formats with Indonesian thousand separators', () => {
    expect(rupiah(3_900_000)).toBe('Rp3.900.000');
    expect(rupiah(8_500_000)).toBe('Rp8.500.000');
    expect(rupiah(15_000_000)).toBe('Rp15.000.000');
    expect(rupiah(1_000)).toBe('Rp1.000');
    expect(rupiah(0)).toBe('Rp0');
  });

  it('refuses nonsense input rather than printing NaN', () => {
    expect(() => rupiah(Number.NaN)).toThrow();
    expect(() => rupiah(-1)).toThrow();
  });
});

describe('juta and rupiahCompact', () => {
  it('renders whole and fractional millions the Indonesian way', () => {
    expect(juta(18)).toBe('18 juta');
    expect(juta(1.5)).toBe('1,5 juta');
  });

  it('uses ribu below one million', () => {
    expect(rupiahCompact(0.75)).toBe('Rp750 ribu');
    expect(rupiahCompact(1.5)).toBe('Rp1,5 juta');
    expect(rupiahCompact(4)).toBe('Rp4 juta');
  });
});

describe('formatPrice', () => {
  const cases: Array<[PriceStyle, string]> = [
    [{ kind: 'from', amount: 3_900_000 }, 'Mulai Rp3.900.000'],
    [{ kind: 'from', amount: 8_500_000 }, 'Mulai Rp8.500.000'],
    [{ kind: 'from', amount: 15_000_000 }, 'Mulai Rp15.000.000'],
    [{ kind: 'range', min: 18, max: 35, unit: 'juta' }, 'Rp18–35 juta'],
    [{ kind: 'range', min: 40, max: 120, unit: 'juta' }, 'Rp40–120 juta'],
    [{ kind: 'fromMillion', min: 75 }, 'Mulai Rp75 juta'],
    [{ kind: 'perPage', amount: 0.75 }, 'Rp750 ribu/halaman'],
    [{ kind: 'perPage', amount: 1.5 }, 'Rp1,5 juta/halaman'],
    [{ kind: 'perProvider', amount: 1.5 }, 'Rp1,5 juta/provider'],
    [{ kind: 'perApi', amount: 3 }, 'Rp3 juta/API'],
    [{ kind: 'perChannel', amount: 2 }, 'Rp2 juta/channel'],
    [{ kind: 'perMonth', amount: 1 }, 'Rp1 juta/bulan'],
    [{ kind: 'perMonth', amount: 2.5 }, 'Rp2,5 juta/bulan'],
    [{ kind: 'perMonth', amount: 5 }, 'Rp5 juta/bulan'],
    [{ kind: 'percentOfDevelopment', percent: 25 }, '+25% nilai development'],
    [{ kind: 'byScope' }, 'Berdasarkan scope'],
  ];

  it.each(cases)('formats %j as "%s"', (style, expected) => {
    expect(formatPrice(style)).toBe(expected);
  });

  it('collapses every style to "Minta estimasi" when SHOW_PRICES is false', () => {
    for (const [style] of cases) {
      expect(formatPrice(style, false)).toBe(SHOW_PRICES_FALLBACK);
    }
  });

  it('uses a real en-dash between range bounds (not a hyphen)', () => {
    expect(formatPrice({ kind: 'range', min: 18, max: 35, unit: 'juta' })).toContain('–');
  });
});

describe('priceForJsonLd', () => {
  it('returns entry-point prices as integer rupiah strings', () => {
    expect(priceForJsonLd({ kind: 'from', amount: 3_900_000 })).toEqual({
      price: '3900000',
      priceCurrency: 'IDR',
    });
    expect(priceForJsonLd({ kind: 'fromMillion', min: 75 })).toEqual({
      price: '75000000',
      priceCurrency: 'IDR',
    });
  });

  it('uses the range minimum as the entry point, never an invented average', () => {
    expect(priceForJsonLd({ kind: 'range', min: 18, max: 35, unit: 'juta' })?.price).toBe('18000000');
  });

  it('returns null where there is no single honest figure', () => {
    expect(priceForJsonLd({ kind: 'byScope' })).toBeNull();
    expect(priceForJsonLd({ kind: 'percentOfDevelopment', percent: 25 })).toBeNull();
    expect(priceForJsonLd({ kind: 'perMonth', amount: 2.5 })).toBeNull();
  });
});
