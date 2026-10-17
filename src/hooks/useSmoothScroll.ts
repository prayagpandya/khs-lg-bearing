import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import { useReducedMotion } from './useEnvironment';

let lenisInstance: Lenis | null = null;

/** Lenis smooth scrolling, disabled when the user prefers reduced motion. */
export function useSmoothScroll(): void {
  const reduced = useReducedMotion();
  const { pathname } = useLocation();

  useEffect(() => {
    if (reduced) return;
    const lenis = new Lenis({
      duration: 0.35,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      wheelMultiplier: 1.2,
      touchMultiplier: 1.5
    });
    lenisInstance = lenis;
    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      lenisInstance = null;
    };
  }, [reduced]);

  useEffect(() => {
    if (lenisInstance) lenisInstance.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);
  }, [pathname]);
}

/** Suspends smooth scroll (e.g., when a modal or dialog is open) */
export function stopSmoothScroll(): void {
  lenisInstance?.stop();
}

/** Resumes smooth scroll */
export function startSmoothScroll(): void {
  lenisInstance?.start();
}