// hooks/useScrollAnimation.ts
// ─────────────────────────────────────────────────────────────
// Custom hook: wraps GSAP ScrollTrigger setup with proper cleanup.
// Use this in any section that needs scroll-driven animation.
//
// Example usage:
//   const sectionRef = useRef<HTMLElement>(null);
//   useScrollAnimation(sectionRef, (el, ScrollTrigger) => {
//     gsap.from(el.querySelectorAll('.animate'), { opacity: 0, y: 40, ... });
//   });
// ─────────────────────────────────────────────────────────────

import { useEffect, type RefObject } from 'react';

type SetupCallback = (
  element: HTMLElement,
  gsap: typeof import('gsap').gsap,
  ScrollTrigger: typeof import('gsap/ScrollTrigger').ScrollTrigger
) => void | (() => void); // Can return cleanup function

export function useScrollAnimation(
  ref: RefObject<HTMLElement | null>,
  setup: SetupCallback,
  deps: unknown[] = [] // Additional dependencies that should re-run the effect
) {
  useEffect(() => {
    // Guard: only run in browser (not during SSR)
    if (typeof window === 'undefined') return;
    if (!ref.current) return;

    let cleanup: (() => void) | void;

    // Dynamically import GSAP to keep it out of SSR
    const loadGSAP = async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');

      // Register the ScrollTrigger plugin (safe to call multiple times)
      gsap.registerPlugin(ScrollTrigger);

      if (ref.current) {
        cleanup = setup(ref.current, gsap, ScrollTrigger);
      }
    };

    loadGSAP();

    // Cleanup: kills all ScrollTriggers when component unmounts
    return () => {
      if (typeof cleanup === 'function') {
        cleanup();
      }
      // We don't kill ALL ScrollTriggers here — other components may be using them
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, ...deps]);
}
