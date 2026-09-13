/**
 * Hero scripts entry point. Loaded by the homepage; registers itself with the motion
 * lifecycle so a ClientRouter navigation tears it down before the DOM swap.
 */
import { onPage } from './motion';
import { initHero } from './hero';
import { initWebglHero } from './webgl/hero';

onPage(() => {
  const stopHero = initHero();
  const stopWebgl = initWebglHero();

  return () => {
    stopHero();
    stopWebgl();
  };
});
