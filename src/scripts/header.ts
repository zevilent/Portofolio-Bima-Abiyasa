/**
 * Header behaviour: scroll-direction hide/show + the mobile overlay dialog.
 * Everything is registered through onPage() so it survives ClientRouter swaps and is
 * torn down cleanly (brief §7 law 3).
 */
import { motion, onPage } from './motion';

/** A setup either returns its teardown or nothing at all. */
type MaybeCleanup = (() => void) | void;

const SCROLL_THRESHOLD = 8;

export function initHeader(): MaybeCleanup {
  const header = document.querySelector<HTMLElement>('[data-header]');
  if (!header) return;

  let lastY = window.scrollY;
  let frame = 0;

  const update = () => {
    frame = 0;
    const y = window.scrollY;
    const delta = y - lastY;

    if (y <= SCROLL_THRESHOLD) {
      header.removeAttribute('data-hidden');
      header.removeAttribute('data-scrolled');
    } else {
      header.toggleAttribute('data-scrolled', true);
      if (!motion.reduced) {
        if (delta > SCROLL_THRESHOLD) header.setAttribute('data-hidden', '');
        else if (delta < -SCROLL_THRESHOLD) header.removeAttribute('data-hidden');
      }
    }

    lastY = y;
  };

  const onScroll = () => {
    if (frame) return;
    frame = window.requestAnimationFrame(update);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  update();

  return () => {
    window.removeEventListener('scroll', onScroll);
    if (frame) window.cancelAnimationFrame(frame);
  };
}

export function initMobileMenu(): MaybeCleanup {
  const overlay = document.querySelector<HTMLElement>('[data-menu-overlay]');
  const openButton = document.querySelector<HTMLButtonElement>('[data-menu-open]');
  const closeButton = document.querySelector<HTMLButtonElement>('[data-menu-close]');
  if (!overlay || !openButton) return;

  const FOCUSABLE = 'a[href], button:not([disabled])';
  let lastFocused: HTMLElement | null = null;

  const open = () => {
    lastFocused = document.activeElement as HTMLElement | null;
    overlay.hidden = false;
    // Next frame so the opacity transition has a starting value.
    window.requestAnimationFrame(() => overlay.setAttribute('data-open', ''));
    openButton.setAttribute('aria-expanded', 'true');
    document.documentElement.style.overflow = 'hidden';
    overlay.querySelector<HTMLElement>(FOCUSABLE)?.focus();
  };

  const close = () => {
    overlay.removeAttribute('data-open');
    openButton.setAttribute('aria-expanded', 'false');
    document.documentElement.style.overflow = '';
    const finish = () => {
      overlay.hidden = true;
    };
    if (motion.reduced) finish();
    else window.setTimeout(finish, motion.duration.d3);

    (lastFocused ?? openButton).focus();
  };

  const onOpenClick = () => open();
  const onCloseClick = () => close();

  const onKeydown = (event: KeyboardEvent) => {
    if (overlay.hidden) return;

    if (event.key === 'Escape') {
      event.preventDefault();
      close();
      return;
    }

    if (event.key !== 'Tab') return;

    // Focus trap: keep Tab inside the dialog.
    const nodes = Array.from(overlay.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
      (node) => node.offsetParent !== null,
    );
    if (nodes.length === 0) return;

    const first = nodes[0]!;
    const last = nodes[nodes.length - 1]!;
    const active = document.activeElement;

    if (event.shiftKey && (active === first || active === overlay)) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && active === last) {
      event.preventDefault();
      first.focus();
    }
  };

  const onLinkClick = (event: MouseEvent) => {
    const target = event.target as HTMLElement | null;
    if (target?.closest('a[href]')) close();
  };

  openButton.addEventListener('click', onOpenClick);
  closeButton?.addEventListener('click', onCloseClick);
  overlay.addEventListener('keydown', onKeydown);
  overlay.addEventListener('click', onLinkClick);

  return () => {
    openButton.removeEventListener('click', onOpenClick);
    closeButton?.removeEventListener('click', onCloseClick);
    overlay.removeEventListener('keydown', onKeydown);
    overlay.removeEventListener('click', onLinkClick);
    document.documentElement.style.overflow = '';
  };
}

onPage(() => {
  const stopHeader = initHeader();
  const stopMenu = initMobileMenu();
  return () => {
    if (typeof stopHeader === 'function') stopHeader();
    if (typeof stopMenu === 'function') stopMenu();
  };
});
