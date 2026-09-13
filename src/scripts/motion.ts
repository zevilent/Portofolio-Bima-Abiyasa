/**
 * Motion lifecycle — the single place that owns Lenis, GSAP and per-page setup.
 *
 * Why this exists (brief §7 law 3): with Astro ClientRouter every navigation replaces
 * the DOM, so any listener, animation context or WebGL context created for the old page
 * must be destroyed. Scripts register work through onPage(); everything else stays out
 * of the global scope, so a second navigation cannot double-register anything.
 */
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { duration, ease, isFinePointer, isMobileViewport, prefersReducedMotion } from '@/config/motion';

export const motion = {
  duration,
  ease,
  get reduced(): boolean {
    return prefersReducedMotion();
  },
  get finePointer(): boolean {
    return isFinePointer();
  },
  get mobile(): boolean {
    return isMobileViewport();
  },
  gsap,
  ScrollTrigger,
} as const;

type Cleanup = () => void;
/** A page setup may return its own teardown; registering one is optional. */
type MaybeCleanup = Cleanup | void;
type PageSetup = () => MaybeCleanup;

let teardowns: Cleanup[] = [];
let lenis: Lenis | null = null;
let registered = false;

/** Register per-page setup. Returns a function to run it immediately (script tags). */
export function onPage(setup: PageSetup): void {
  const result = setup();
  teardowns.push(typeof result === 'function' ? result : () => {});
}

function currentPageKey(): string {
  return window.location.pathname + window.location.search;
}

/** Create Lenis once per page. Desktop + motion allowed + no hash target only. */
function initSmoothScroll(): Cleanup {
  const shouldSkip = prefersReducedMotion() || !isFinePointer();

  if (shouldSkip || lenis) {
    document.documentElement.classList.add('no-smooth-scroll');
    return () => {};
  }

  lenis = new Lenis({
    duration: duration.d6 / 1000,
    easing: (t) => 1 - Math.pow(1 - t, 4),
    smoothWheel: true,
    syncTouch: false,
    autoRaf: false,
  });

  document.documentElement.classList.add('has-smooth-scroll');

  let frame = 0;
  const raf = (time: number) => {
    lenis?.raf(time);
    frame = window.requestAnimationFrame(raf);
  };
  frame = window.requestAnimationFrame(raf);

  const anchorHandler = (event: MouseEvent) => {
    const link = (event.target as HTMLElement | null)?.closest<HTMLAnchorElement>('a[href^="#"]');
    if (!link) return;

    const id = link.getAttribute('href');
    if (!id || id === '#') return;

    const target = document.querySelector(id);
    if (!target) return;

    event.preventDefault();
    lenis?.scrollTo(target as HTMLElement, { offset: -80 });
    history.pushState(null, '', id);
  };

  document.addEventListener('click', anchorHandler);

  return () => {
    document.removeEventListener('click', anchorHandler);
    window.cancelAnimationFrame(frame);
    lenis?.destroy();
    lenis = null;
    document.documentElement.classList.remove('has-smooth-scroll');
  };
}

/** Magnetic buttons (desktop, fine pointer, motion allowed only — brief §7 #11). */
function initMagnetics(): Cleanup {
  if (prefersReducedMotion() || !isFinePointer()) return () => {};

  const nodes = Array.from(document.querySelectorAll<HTMLElement>('[data-magnetic]'));
  if (nodes.length === 0) return () => {};

  const MAX_PULL = 12;
  const RADIUS = 120;
  const disposers: Cleanup[] = [];
  let frame = 0;

  for (const node of nodes) {
    let px = 0;
    let py = 0;

    const apply = () => {
      frame = 0;
      node.style.setProperty('--pull-x', `${px.toFixed(2)}px`);
      node.style.setProperty('--pull-y', `${py.toFixed(2)}px`);
    };

    const onMove = (event: PointerEvent) => {
      const rect = node.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = event.clientX - cx;
      const dy = event.clientY - cy;
      const distance = Math.hypot(dx, dy);
      const reach = RADIUS + Math.max(rect.width, rect.height) / 2;

      if (distance > reach) {
        px = 0;
        py = 0;
      } else {
        const falloff = 1 - distance / reach;
        px = Math.max(-MAX_PULL, Math.min(MAX_PULL, dx * 0.25 * falloff));
        py = Math.max(-MAX_PULL, Math.min(MAX_PULL, dy * 0.25 * falloff));
      }

      if (!frame) frame = window.requestAnimationFrame(apply);
    };

    const onLeave = () => {
      px = 0;
      py = 0;
      if (!frame) frame = window.requestAnimationFrame(apply);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    node.addEventListener('pointerleave', onLeave);

    disposers.push(() => {
      window.removeEventListener('pointermove', onMove);
      node.removeEventListener('pointerleave', onLeave);
      node.style.removeProperty('--pull-x');
      node.style.removeProperty('--pull-y');
    });
  }

  return () => {
    if (frame) window.cancelAnimationFrame(frame);
    disposers.forEach((dispose) => dispose());
  };
}

/**
 * Boostrap the lifecycle once per document.
 *
 * How this actually works (each point is the result of a failing test, not a guess):
 *
 *  1. The page bundles evaluate BEFORE this document's `astro:page-load` arrives, and
 *     `onPage()` runs each setup immediately — that is why the hero reaches its idle
 *     callback at all on a fresh load.
 *  2. `astro:page-load` is emitted for the first document AND for every client-side
 *     navigation, so one handler serves both paths.
 *  3. A page owns the document between "its work started" and "a navigation began". While
 *     it owns it, a repeated `astro:page-load` must be ignored: running tear-downs a
 *     second time destroys a live page (it cancelled the hero's WebGL boot). On a real
 *     swap the ownership token changes, and the new page's teardowns run then.
 */
function boot(): void {
  if (registered) return;
  registered = true;

  gsap.registerPlugin(ScrollTrigger);

  /** The page this document currently hosts. Null until a page takes ownership. */
  let owner: string | null = null;
  let shellCleanup: Cleanup | null = null;

  const startPage = () => {
    const cleanups = [initSmoothScroll(), initMagnetics()];
    document.documentElement.setAttribute('data-page', currentPageKey());
    window.dispatchEvent(new CustomEvent('ba:page'));
    owner = currentPageKey();
    return () => cleanups.forEach((fn) => fn());
  };

  const stopPage = () => {
    // Snapshot first: a teardown may re-register work for the page that follows
    // (the hero's disposer re-arms the WebGL boot), and that work must survive.
    const pending = teardowns;
    teardowns = [];
    pending.forEach((fn) => fn());
    shellCleanup?.();
    shellCleanup = null;
    owner = null;
  };

  document.addEventListener('astro:page-load', () => {
    const key = currentPageKey();
    // Same page, already owned: this is a duplicate event, so leave it alone.
    if (owner === key) return;

    if (owner !== null) {
      // A different page is arriving: retire the outgoing one first.
      stopPage();
    }

    shellCleanup = startPage();
  });

  window.addEventListener('pagehide', stopPage);
}

boot();
