/**
 * Process section behaviour (brief §7 #13): light up each step's diagram node as the step
 * enters view, and reveal the steps themselves. Runs through onPage() so ClientRouter
 * navigations tear it down.
 */
import { onPage, motion } from './motion';

export function initProcess(): (() => void) | void {
  const steps = Array.from(document.querySelectorAll<HTMLElement>('[data-step]'));
  if (steps.length === 0) return;

  const nodes = Array.from(document.querySelectorAll<HTMLElement>('[data-orch-node]'));
  const observed: HTMLElement[] = [];

  const markActive = (index: number) => {
    nodes.forEach((node, i) => {
      if (i <= index) node.setAttribute('data-active', '');
    });
  };

  // Reduced motion: everything is already visible; just mark all nodes active once.
  if (motion.reduced) {
    nodes.forEach((node) => node.setAttribute('data-active', ''));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const index = Number((entry.target as HTMLElement).dataset.index ?? '0');
        markActive(index);
        (entry.target as HTMLElement).setAttribute('data-seen', '');
      }
    },
    { rootMargin: '-25% 0px -35% 0px', threshold: 0 },
  );

  steps.forEach((step, index) => {
    step.dataset.index = String(index);
    observer.observe(step);
    observed.push(step);
  });

  // Nodes are visually lit from the start for the first step, so the diagram never looks
  // empty before the visitor scrolls.
  markActive(0);

  return () => {
    observer.disconnect();
    observed.forEach((step) => step.removeAttribute('data-seen'));
  };
}

onPage(() => initProcess());
