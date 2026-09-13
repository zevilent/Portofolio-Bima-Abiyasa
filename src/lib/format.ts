/**
 * Price formatting — one place decides how rupiah is rendered (brief §5.5, §5.7).
 * Prices live in src/config/services.ts as integers (rupiah, no separators) plus an
 * explicit display style, so nothing is formatted by hand inside a component.
 */

export type PriceStyle =
  | { kind: 'from'; amount: number } // "Mulai Rp3.900.000"
  | { kind: 'range'; min: number; max: number; unit: 'juta' } // "Rp18–35 juta"
  | { kind: 'fromMillion'; min: number } // "Mulai Rp75 juta"
  | { kind: 'perPage'; amount: number } // "Rp750 ribu/halaman"
  | { kind: 'perProvider'; amount: number } // "Rp1,5 juta/provider"
  | { kind: 'perApi'; amount: number } // "Rp3 juta/API"
  | { kind: 'perChannel'; amount: number } // "Rp2 juta/channel"
  | { kind: 'perMonth'; amount: number } // "Rp1 juta/bulan"
  | { kind: 'percentOfDevelopment'; percent: number } // "+25% nilai development"
  | { kind: 'byScope' }; // "Berdasarkan scope"

export const SHOW_PRICES_FALLBACK = 'Minta estimasi';

/** Format an integer rupiah amount with Indonesian thousand separators: 3900000 -> "Rp3.900.000". */
export function rupiah(amount: number): string {
  if (!Number.isFinite(amount)) throw new Error(`rupiah(): not a finite number: ${amount}`);
  const rounded = Math.round(amount);
  if (rounded < 0) throw new Error(`rupiah(): negative amount: ${amount}`);
  return `Rp${rounded.toLocaleString('id-ID')}`;
}

/** Short form used inside ranges: 18 -> "18 juta". */
export function juta(amountInMillions: number): string {
  const value = Number.isInteger(amountInMillions)
    ? String(amountInMillions)
    : amountInMillions.toLocaleString('id-ID', { maximumFractionDigits: 1 });
  return `${value} juta`;
}

/** 0.75 juta -> "Rp750 ribu"; 1.5 -> "Rp1,5 juta". Used for per-item prices. */
export function rupiahCompact(amountInMillions: number): string {
  if (amountInMillions < 1) {
    return `Rp${Math.round(amountInMillions * 1000).toLocaleString('id-ID')} ribu`;
  }
  return `Rp${amountInMillions.toLocaleString('id-ID', { maximumFractionDigits: 1 })} juta`;
}

const UNIT_SUFFIX: Partial<Record<PriceStyle['kind'], string>> = {
  perPage: '/halaman',
  perProvider: '/provider',
  perApi: '/API',
  perChannel: '/channel',
  perMonth: '/bulan',
};

/**
 * Render a price for display. When prices are disabled (SHOW_PRICES=false) every style
 * collapses to "Minta estimasi" — including "byScope", which would otherwise leak a
 * price-free but price-shaped slot (brief §5.7).
 */
export function formatPrice(style: PriceStyle, showPrices = true): string {
  if (!showPrices) return SHOW_PRICES_FALLBACK;

  switch (style.kind) {
    case 'from':
      return `Mulai ${rupiah(style.amount)}`;
    case 'range':
      return `Rp${style.min}–${style.max} juta`;
    case 'fromMillion':
      return `Mulai Rp${juta(style.min)}`;
    case 'perPage':
    case 'perProvider':
    case 'perApi':
    case 'perChannel':
    case 'perMonth':
      return `${rupiahCompact(style.amount)}${UNIT_SUFFIX[style.kind] ?? ''}`;
    case 'percentOfDevelopment':
      return `+${style.percent}% nilai development`;
    case 'byScope':
      return 'Berdasarkan scope';
    default: {
      const exhaustive: never = style;
      throw new Error(`formatPrice(): unknown style ${JSON.stringify(exhaustive)}`);
    }
  }
}

/** Machine-readable value for JSON-LD offers; null when there is no single figure. */
export function priceForJsonLd(style: PriceStyle): { price: string; priceCurrency: 'IDR' } | null {
  switch (style.kind) {
    case 'from':
      return { price: String(Math.round(style.amount)), priceCurrency: 'IDR' };
    case 'fromMillion':
      return { price: String(Math.round(style.min * 1_000_000)), priceCurrency: 'IDR' };
    case 'range':
      // Google wants one figure: use the entry point, never a fabricated average.
      return { price: String(Math.round(style.min * 1_000_000)), priceCurrency: 'IDR' };
    default:
      return null;
  }
}
