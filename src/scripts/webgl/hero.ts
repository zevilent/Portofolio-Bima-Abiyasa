/**
 * WebGL hero lifecycle (brief §8.1): decide the tier once, lazy-load the scene on idle,
 * and hand back a disposer that releases the renderer, listeners and observers.
 *
 * Tiering is intentionally conservative: a phone or low-core machine gets the lite
 * field, and a machine that asks for reduced motion, Save-Data or 2G gets no canvas at
 * all — just the static SVG constellation that is already in the DOM.
 */
import { prefersReducedMotion } from '@/config/motion';

type Tier = 'full' | 'lite' | 'off';

const COUNT_FULL = 12_000;
const COUNT_LITE = 4_000;

function detectTier(): Tier {
  if (prefersReducedMotion()) return 'off';

  const nav = navigator as Navigator & {
    connection?: { saveData?: boolean; effectiveType?: string };
    deviceMemory?: number;
  };

  if (nav.connection?.saveData) return 'off';
  if (nav.connection?.effectiveType && ['slow-2g', '2g'].includes(nav.connection.effectiveType)) {
    return 'off';
  }

  const cores = navigator.hardwareConcurrency ?? 4;
  const memory = nav.deviceMemory ?? 8;
  if (cores < 4) return 'off';

  const smallViewport = window.matchMedia('(max-width: 767px)').matches;
  if (smallViewport || cores <= 4 || memory < 8) return 'lite';

  return 'full';
}

function idle(callback: () => void): number {
  const w = window as Window & {
    requestIdleCallback?: (cb: () => void, options?: { timeout: number }) => number;
  };
  if (typeof w.requestIdleCallback === 'function') {
    return w.requestIdleCallback(callback, { timeout: 1_200 });
  }
  return window.setTimeout(callback, 200);
}

export function initWebglHero(): () => void {
  const host = document.querySelector<HTMLElement>('[data-webgl-host]');
  if (!host) return () => {};

  const tier = detectTier();
  host.setAttribute('data-tier', tier);

  if (tier === 'off') {
    host.setAttribute('data-static', '');
    return () => {};
  }

  let disposed = false;
  let dispose: (() => void) | null = null;

  const handle = idle(() => {
    void (async () => {
      if (disposed) return;

      const { default: createScene } = await import('./hero-scene');
      if (disposed) return;

      dispose = createScene({
        host,
        count: tier === 'lite' ? COUNT_LITE : COUNT_FULL,
        maxPixelRatio: tier === 'lite' ? 1.5 : 2,
      });
    })();
  });

  const w = window as unknown as { cancelIdleCallback?: (id: number) => void };

  return () => {
    disposed = true;
    if (typeof w.cancelIdleCallback === 'function') w.cancelIdleCallback(handle);
    else window.clearTimeout(handle);
    dispose?.();
    dispose = null;
    host.removeAttribute('data-ready');
  };
}
