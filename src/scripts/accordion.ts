/**
 * Accordions (terms + add-ons) — the native <details> element already handles keyboard and
 * screen readers, so this only adds the "one open at a time" behaviour for the terms list
 * and keeps the disclosure state consistent after a ClientRouter swap.
 */
import { onPage } from './motion';

export function initAccordions(): (() => void) | void {
  const groups = Array.from(document.querySelectorAll<HTMLElement>('[data-accordion]'));
  const listeners: Array<() => void> = [];

  for (const group of groups) {
    const items = Array.from(group.querySelectorAll<HTMLDetailsElement>('details'));

    const onChange = (current: HTMLDetailsElement) => () => {
      if (!current.open) return;
      for (const item of items) {
        if (item !== current) item.open = false;
      }
    };

    for (const item of items) {
      const listener = onChange(item);
      item.addEventListener('toggle', listener);
      listeners.push(() => item.removeEventListener('toggle', listener));
    }
  }

  return () => listeners.forEach((off) => off());
}

onPage(() => initAccordions());
