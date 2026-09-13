/**
 * Pricing tabs (brief §7 #16): a real tablist — click plus arrow/Home/End keys, roving
 * tabindex, panels toggled with `hidden`. Registered via onPage() for teardown.
 */
import { onPage } from './motion';

export function initPricing(): (() => void) | void {
  const tablist = document.querySelector<HTMLElement>('[data-pricing-tabs]');
  if (!tablist) return;

  const tabs = Array.from(tablist.querySelectorAll<HTMLButtonElement>('[data-pricing-tab]'));
  const panels = Array.from(document.querySelectorAll<HTMLElement>('[data-pricing-panel]'));
  if (tabs.length === 0) return;

  const select = (index: number, focus = true) => {
    tabs.forEach((tab, i) => {
      const active = i === index;
      tab.setAttribute('aria-selected', active ? 'true' : 'false');
      tab.tabIndex = active ? 0 : -1;
      if (active && focus) tab.focus();
    });

    panels.forEach((panel, i) => {
      panel.hidden = i !== index;
    });
  };

  const onClick = (index: number) => () => select(index);

  const onKeydown = (event: KeyboardEvent) => {
    const current = tabs.findIndex((tab) => tab.getAttribute('aria-selected') === 'true');
    if (current < 0) return;

    let next: number | null = null;
    if (event.key === 'ArrowRight') next = (current + 1) % tabs.length;
    else if (event.key === 'ArrowLeft') next = (current - 1 + tabs.length) % tabs.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = tabs.length - 1;

    if (next === null) return;
    event.preventDefault();
    select(next);
  };

  const handlers = tabs.map((tab, index) => {
    const handler = onClick(index);
    tab.addEventListener('click', handler);
    return { tab, handler };
  });
  tablist.addEventListener('keydown', onKeydown);

  // Ensure a consistent starting state even if the markup changed.
  const initial = tabs.findIndex((tab) => tab.getAttribute('aria-selected') === 'true');
  select(initial < 0 ? 0 : initial, false);

  return () => {
    handlers.forEach(({ tab, handler }) => tab.removeEventListener('click', handler));
    tablist.removeEventListener('keydown', onKeydown);
  };
}

onPage(() => initPricing());
