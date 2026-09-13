/**
 * Gold spotlight (brief §7 #12): two CSS custom properties per card, updated in a rAF
 * batch. Nothing here reads layout during scroll, and the same effect is applied on
 * keyboard focus so the "luxury" cue is not pointer-only.
 */
import { onPage, motion } from './motion';

export function initSpotlight(): (() => void) | void {
  const tiles = Array.from(document.querySelectorAll<HTMLElement>('[data-spotlight]'));
  if (tiles.length === 0) return;

  if (motion.reduced || !motion.finePointer) return;

  let frame = 0;
  const pending = new Map<HTMLElement, { x: number; y: number }>();

  const flush = () => {
    frame = 0;
    for (const [tile, point] of pending) {
      tile.style.setProperty('--mx', `${point.x.toFixed(1)}px`);
      tile.style.setProperty('--my', `${point.y.toFixed(1)}px`);
    }
    pending.clear();
  };

  const listeners: Array<() => void> = [];

  for (const tile of tiles) {
    const onMove = (event: PointerEvent) => {
      const rect = tile.getBoundingClientRect();
      pending.set(tile, { x: event.clientX - rect.left, y: event.clientY - rect.top });
      if (!frame) frame = window.requestAnimationFrame(flush);
    };

    tile.addEventListener('pointermove', onMove, { passive: true });
    listeners.push(() => tile.removeEventListener('pointermove', onMove));
  }

  return () => {
    if (frame) window.cancelAnimationFrame(frame);
    pending.clear();
    listeners.forEach((off) => off());
  };
}

onPage(() => initSpotlight());
