// animations/videoScroll.ts
// ─────────────────────────────────────────────────────────────
// Scroll-driven video playback for the ExperienceVideo section.
//
// HOW SCROLL → VIDEO MAPPING WORKS
// ─────────────────────────────────────────────────────────────
// The section is PINNED for `scrollDistance` pixels.
// ScrollTrigger fires `onUpdate` with a smoothed `progress` (0→1).
// We multiply that progress by video.duration to get currentTime:
//
//   progress 0.0  →  video.currentTime = 0s      (first frame)
//   progress 0.5  →  video.currentTime = Xs      (mid-video)
//   progress 1.0  →  video.currentTime = Xs      (last frame)
//
// `scrub: N` smooths the mapping — higher N = more lag = silkier feel.
// Recommended range: 1.0 – 1.5.
//
// VIDEO ENCODING TIPS (for smooth scrubbing)
// ─────────────────────────────────────────────────────────────
//   ffmpeg -i input.mp4 \
//     -vcodec libx264 -crf 23 -preset slow \
//     -g 15 \                ← keyframe every 15 frames (critical!)
//     -movflags +faststart \ ← enables streaming before full download
//     -an output.mp4         ← strip audio (muted anyway)
//
// A short walkthrough video (15–30s) works best.
// ─────────────────────────────────────────────────────────────

import type { gsap as GSAPType } from 'gsap';
import type { ScrollTrigger as STType } from 'gsap/ScrollTrigger';

export interface VideoScrollOptions {
  /** Total pinned scroll distance in pixels. Default: 2000 */
  scrollDistance?: number;
  /** GSAP scrub lag in seconds. Higher = smoother. Default: 1.2 */
  scrub?: number;
}

/**
 * Initialise scroll-driven video playback.
 * Called from ExperienceVideo via the useScrollAnimation hook.
 *
 * @param sectionEl  The <section> element to pin
 * @param videoEl    The <video> element to scrub
 * @param gsap       GSAP instance (passed in to avoid SSR import)
 * @param ST         ScrollTrigger plugin (already registered)
 * @param options    Scroll config overrides
 * @returns          Cleanup function
 */
export function initVideoScroll(
  sectionEl: HTMLElement,
  videoEl: HTMLVideoElement,
  gsap: typeof GSAPType,
  ST: typeof STType,
  options: VideoScrollOptions = {}
): () => void {
  const { scrollDistance = 2000, scrub = 1.2 } = options;

  // ── Accessibility: reduced-motion fallback ─────────────────
  // Users who prefer reduced motion get a simple autoplay loop
  // instead of the scroll-scrubbed experience.
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reducedMotion) {
    videoEl.muted = true;
    videoEl.autoplay = true;
    videoEl.loop = true;
    videoEl.play().catch(() => {});
    return () => {};
  }

  // ── Element references ─────────────────────────────────────
  const videoWrapper = sectionEl.querySelector<HTMLElement>('.ev-video-wrapper');
  const textOverlays = Array.from(
    sectionEl.querySelectorAll<HTMLElement>('.ev-overlay-text')
  );

  // Ensure video starts paused at first frame
  videoEl.pause();
  videoEl.currentTime = 0;

  // ── Video seeking helper ───────────────────────────────────
  // We buffer the target time so we can seek as soon as the
  // video has loaded enough data (handles slow connections).
  let targetTime = 0;

  const seekVideo = () => {
    if (videoEl.readyState >= 2 && isFinite(videoEl.duration) && videoEl.duration > 0) {
      // requestAnimationFrame prevents seek storm on fast scroll
      requestAnimationFrame(() => {
        videoEl.currentTime = targetTime;
      });
    }
  };

  videoEl.addEventListener('loadeddata', seekVideo, { passive: true });
  videoEl.addEventListener('canplay', seekVideo, { passive: true });

  // ── Section fade-in (one-shot, fires when section enters viewport) ──
  gsap.fromTo(
    sectionEl,
    { opacity: 0 },
    {
      opacity: 1,
      duration: 0.9,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: sectionEl,
        start: 'top 88%',
        toggleActions: 'play none none none',
      },
    }
  );

  // ── Main scrubber (pin + video + scale + text overlays) ────
  const mainST = ST.create({
    trigger: sectionEl,
    start: 'top top',
    end: `+=${scrollDistance}`,
    scrub,
    pin: true,
    anticipatePin: 1,

    onUpdate(self) {
      const p = self.progress; // 0 → 1 (smoothed by scrub)

      // 1 ─ Scrub video ──────────────────────────────────────
      if (isFinite(videoEl.duration) && videoEl.duration > 0) {
        targetTime = p * videoEl.duration;
        seekVideo();
      }

      // 2 ─ Subtle cinematic zoom on video wrapper ───────────
      //     scale 1 (start) → 1.08 (end): barely perceptible,
      //     but adds depth and makes the section feel alive.
      if (videoWrapper) {
        gsap.set(videoWrapper, { scale: 1 + 0.08 * p });
      }

      // 3 ─ Overlay text fade-in / fade-out ──────────────────
      //     Each .ev-overlay-text carries a `data-at-progress`
      //     attribute (0–1) indicating when it should appear.
      //     Each text is visible for a 14%-of-scroll window.
      textOverlays.forEach((el) => {
        const at   = parseFloat(el.dataset.atProgress ?? '0');
        const win  = 0.14;     // total visible window
        const half = win / 2;  // 50% in → 50% out

        let opacity = 0;
        let y = 14; // default hidden: shifted down

        if (p >= at && p < at + half) {
          // ── Fading in ──────────────────────────────
          const t = (p - at) / half;       // 0 → 1
          opacity = t;
          y = 14 * (1 - t);               // 14 → 0
        } else if (p >= at + half && p < at + win) {
          // ── Fading out ─────────────────────────────
          const t = (p - (at + half)) / half; // 0 → 1
          opacity = 1 - t;
          y = -10 * t;                    // 0 → -10
        }

        gsap.set(el, { opacity, y });
      });
    },
  });

  // ── Cleanup ────────────────────────────────────────────────
  return () => {
    mainST.kill();
    videoEl.removeEventListener('loadeddata', seekVideo);
    videoEl.removeEventListener('canplay', seekVideo);
    // Kill any orphaned fade-in trigger attached to this element
    ST.getAll()
      .filter((t) => t.trigger === sectionEl)
      .forEach((t) => t.kill());
  };
}
