/**
 * Hero behaviours: split-text reveal + the agent terminal typing loop.
 * Both are registered through onPage() so ClientRouter swaps clean them up.
 */
import { motion } from './motion';
import { terminalCopy } from '@/config/hero';

/** A setup either returns its teardown or nothing at all. */
type MaybeCleanup = (() => void) | void;

/** Word-mask reveal. Without JS the words are simply visible (CSS default). */
function initSplitReveal(): MaybeCleanup {
  const root = document.querySelector<HTMLElement>('[data-split]');
  if (!root) return;

  const words = Array.from(root.querySelectorAll<HTMLElement>('[data-word]'));
  if (words.length === 0) return;

  if (motion.reduced) {
    words.forEach((word) => {
      word.style.transform = 'none';
      word.style.opacity = '1';
    });
    root.setAttribute('data-split-ready', '');
    return;
  }

  const { gsap, duration, ease } = motion;

  const ctx = gsap.context(() => {
    gsap.set(words, { yPercent: 110, opacity: 0 });
    gsap.to(words, {
      yPercent: 0,
      opacity: 1,
      duration: duration.d5 / 1000,
      ease: ease.luxe,
      stagger: duration.d3 / 1000 / 5,
      delay: 0.05,
      onComplete: () => root.setAttribute('data-split-ready', ''),
    });
  }, root);

  return () => ctx.revert();
}

/** The build log: types line by line, then loops after a calm pause. */
function initTerminal(): MaybeCleanup {
  const root = document.querySelector<HTMLElement>('[data-terminal]');
  const output = root?.querySelector<HTMLElement>('[data-terminal-output]');
  if (!root || !output) return;

  const isMobile = window.matchMedia('(max-width: 767px)').matches;
  const lines = isMobile
    ? terminalCopy.lines.slice(0, terminalCopy.mobileLineCount)
    : terminalCopy.lines;

  const render = (segments: readonly { text: string; tone?: string }[]): string =>
    segments
      .map((segment) =>
        segment.tone ? `<span class="t-${segment.tone}">${escapeHtml(segment.text)}</span>` : escapeHtml(segment.text),
      )
      .join('');

  const escapeHtml = (value: string): string =>
    value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  // Reduced motion: show the complete log, no typing, no loop.
  if (motion.reduced) {
    output.innerHTML = lines.map(render).join('\n');
    root.setAttribute('data-terminal-static', '');
    return;
  }

  let lineIndex = 0;
  let charIndex = 0;
  let timer = 0;
  let paused = false;
  let active = true;

  const schedule = (delay: number) => {
    timer = window.setTimeout(step, delay);
  };

  const step = () => {
    if (!active) return;
    if (paused) {
      schedule(220);
      return;
    }

    const line = lines[lineIndex];
    if (!line) {
      // Loop: clear, breathe, start over.
      output.textContent = '';
      lineIndex = 0;
      charIndex = 0;
      schedule(terminalCopy.loopPauseMs);
      return;
    }

    const fullText = line.map((segment) => segment.text).join('');

    if (charIndex < fullText.length) {
      charIndex += 1;
      const partial = fullText.slice(0, charIndex);
      let consumed = 0;

      output.innerHTML = line
        .map((segment) => {
          const start = consumed;
          consumed += segment.text.length;
          const slice = partial.slice(start, Math.min(consumed, partial.length));
          if (!slice) return '';
          return segment.tone
            ? `<span class="t-${segment.tone}">${escapeHtml(slice)}</span>`
            : escapeHtml(slice);
        })
        .join('');

      schedule(terminalCopy.charDelayMs);
      return;
    }

    output.innerHTML = `${output.innerHTML}\n`;
    lineIndex += 1;
    charIndex = 0;
    schedule(terminalCopy.linePauseMs);
  };

  const onEnter = () => {
    paused = true;
  };
  const onLeave = () => {
    paused = false;
  };
  const onVisibility = () => {
    if (document.visibilityState === 'hidden') paused = true;
    else paused = false;
  };

  root.addEventListener('pointerenter', onEnter);
  root.addEventListener('pointerleave', onLeave);
  root.addEventListener('focusin', onEnter);
  root.addEventListener('focusout', onLeave);
  document.addEventListener('visibilitychange', onVisibility);

  schedule(terminalCopy.linePauseMs * 6);

  return () => {
    active = false;
    window.clearTimeout(timer);
    root.removeEventListener('pointerenter', onEnter);
    root.removeEventListener('pointerleave', onLeave);
    root.removeEventListener('focusin', onEnter);
    root.removeEventListener('focusout', onLeave);
    document.removeEventListener('visibilitychange', onVisibility);
  };
}

/** Decorative scroll cue fade-out once the visitor starts reading. */
function initScrollCueReveal(): MaybeCleanup {
  const cue = document.querySelector<HTMLElement>('.hero__cue');
  if (!cue || motion.reduced) return;

  let frame = 0;
  const update = () => {
    frame = 0;
    cue.style.opacity = window.scrollY > 40 ? '0' : '1';
  };
  const onScroll = () => {
    if (!frame) frame = window.requestAnimationFrame(update);
  };

  window.addEventListener('scroll', onScroll, { passive: true });

  return () => {
    window.removeEventListener('scroll', onScroll);
    if (frame) window.cancelAnimationFrame(frame);
  };
}

/** Entry point used by the page script; returns the combined teardown. */
export function initHero(): () => void {
  const stops = [initSplitReveal(), initTerminal(), initScrollCueReveal()];
  return () => {
    stops.forEach((stop) => {
      if (typeof stop === 'function') stop();
    });
  };
}
