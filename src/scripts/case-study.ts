/**
 * Case-study enhancements (M3): a lazy, muted preview video for the hero screenshot.
 * The video is never loaded on mobile, reduced motion or Data Saver — the still is enough.
 */
import { prefersReducedMotion, isMobileViewport } from '@/config/motion';

export function initCaseStudy(): (() => void) | void {
  const video = document.querySelector<HTMLVideoElement>('.case__video');
  if (!video) return;

  const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection
    ?.saveData;

  if (prefersReducedMotion() || isMobileViewport() || saveData) return;

  video.preload = 'metadata';
  const play = () => {
    void video.play().catch(() => {
      // Autoplay refused: the poster remains, which is fine.
    });
  };

  const observer = new IntersectionObserver(
    (entries) => {
      const entry = entries[0];
      if (!entry) return;
      if (entry.isIntersecting) play();
      else video.pause();
    },
    { threshold: 0.25 },
  );
  observer.observe(video);

  const onVisibility = () => {
    if (document.visibilityState === 'hidden') video.pause();
    else if (video.getBoundingClientRect().top < window.innerHeight) play();
  };
  document.addEventListener('visibilitychange', onVisibility);

  return () => {
    observer.disconnect();
    document.removeEventListener('visibilitychange', onVisibility);
    video.pause();
  };
}

initCaseStudy();
