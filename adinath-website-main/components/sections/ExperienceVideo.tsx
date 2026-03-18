// components/sections/ExperienceVideo.tsx
// ─────────────────────────────────────────────────────────────
// Cinematic scroll-driven video section.
// Scroll down  → video plays forward.
// Scroll up    → video rewinds.
//
// REPLACING THE VIDEO
// ─────────────────────────────────────────────────────────────
//   1. Export a walkthrough video from your editing tool.
//   2. Re-encode it with frequent keyframes for smooth scrubbing:
//
//      ffmpeg -i your-walkthrough.mp4 \
//        -vcodec libx264 -crf 23 -preset slow \
//        -g 15 -movflags +faststart -an \
//        public/videos/experience.mp4
//
//   3. Replace the src below with "/videos/experience.mp4".
//      Recommended: 15–30s duration, 1280×720 or 1920×1080.
//
// SCROLL TUNING
//   Adjust `scrollDistance` in the useScrollAnimation call below:
//   • Higher value (e.g. 3000) = slower / more deliberate scrubbing
//   • Lower value (e.g. 1500) = faster playback per scroll unit
// ─────────────────────────────────────────────────────────────

'use client';

import { useRef } from 'react';
import Container from '@/components/Container';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { initVideoScroll } from '@/animations/videoScroll';

// ── Overlay texts with scroll trigger points ─────────────────
// `progress` is a 0→1 value matching scroll progress through the pin.
// Each label fades in, holds, then fades out within a 14%-scroll window.
const OVERLAY_TEXTS = [
  { progress: 0.08, label: 'Step Inside' },
  { progress: 0.38, label: 'Crafted for Comfort' },
  { progress: 0.68, label: 'Designed for Life' },
] as const;

export default function ExperienceVideo() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef   = useRef<HTMLVideoElement>(null);

  // Kick off GSAP scroll animation once both refs are mounted
  useScrollAnimation(sectionRef, (sectionEl, gsap, ST) => {
    if (!videoRef.current) return;
    return initVideoScroll(sectionEl, videoRef.current, gsap, ST, {
      scrollDistance: 2000,
      scrub: 1.2,
    });
  });

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative bg-black py-20 md:py-28"
      style={{ opacity: 0 }} // GSAP fades this in on scroll-enter
      aria-label="Interior walkthrough — ANANTAM apartments"
    >
      <Container>

        {/* ── Section header ──────────────────────────────── */}
        <div className="text-center mb-14">
          <p className="font-dm-sans text-[10px] tracking-[0.45em] uppercase text-gold/70 mb-4">
            The Living Experience
          </p>
          <h2 className="font-playfair font-light text-white text-4xl md:text-5xl lg:text-6xl tracking-wide">
            Walk Inside ANANTAM
          </h2>
          <div
            className="w-20 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mt-6"
            aria-hidden="true"
          />
          <p className="font-dm-sans text-sm text-white/30 tracking-widest mt-5 uppercase">
            Scroll to explore
          </p>
        </div>

        {/* ── Video container — centered at 65vw max ──────── */}
        {/* Full width on mobile, 65vw centered on md+ */}
        <div className="mx-auto w-full md:max-w-[65vw]">

          {/* Video wrapper: rounded corners, overflow hidden, shadow */}
          {/* The .ev-video-wrapper class is targeted by initVideoScroll */}
          <div
            className="ev-video-wrapper relative overflow-hidden bg-black will-change-transform"
            style={{
              borderRadius: 20,
              boxShadow: [
                '0 2px 4px rgba(0,0,0,0.5)',
                '0 8px 24px rgba(0,0,0,0.4)',
                '0 40px 100px rgba(0,0,0,0.65)',
              ].join(', '),
              aspectRatio: '16 / 9',
            }}
          >
            {/*
              ── VIDEO ELEMENT ─────────────────────────────────
              `muted`        — required for programmatic playback
              `playsInline`  — prevents iOS fullscreen takeover
              `preload="auto"` — buffers ahead for smooth scrubbing

              REPLACE src with "/videos/experience.mp4"
              when your video is ready.
            */}
            {/* Gradient placeholder — sits below video, shows before load */}
            <div
              className="absolute inset-0 bg-gradient-to-br from-stone-950 via-zinc-900 to-stone-950"
              aria-hidden="true"
            />

            <video
              ref={videoRef}
              className="absolute inset-0 w-full h-full object-cover"
              src="/videos/experience.mp4"
              muted
              playsInline
              preload="auto"
              aria-label="Interior walkthrough of ANANTAM apartment"
            />

            {/* Cinematic vignette — frames the video edges */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: [
                  'linear-gradient(to bottom, rgba(0,0,0,0.18) 0%, transparent 25%, transparent 75%, rgba(0,0,0,0.40) 100%)',
                  'linear-gradient(to right,  rgba(0,0,0,0.10) 0%, transparent 12%, transparent 88%, rgba(0,0,0,0.10) 100%)',
                ].join(', '),
              }}
              aria-hidden="true"
            />

            {/* ── Overlay texts ────────────────────────────── */}
            {/* Controlled entirely by initVideoScroll via gsap.set */}
            {OVERLAY_TEXTS.map(({ progress, label }) => (
              <div
                key={label}
                className="ev-overlay-text absolute inset-0 flex items-center justify-center pointer-events-none"
                data-at-progress={progress}
                style={{ opacity: 0 }} // initial state — GSAP owns this
                aria-hidden="true"
              >
                <p
                  className="font-playfair font-light italic text-white text-xl md:text-3xl lg:text-4xl tracking-widest text-center px-8"
                  style={{ textShadow: '0 2px 32px rgba(0,0,0,0.9)' }}
                >
                  {label}
                </p>
              </div>
            ))}

            {/* Corner accent lines — purely decorative */}
            {(['tl', 'tr', 'bl', 'br'] as const).map((corner) => (
              <div
                key={corner}
                className="absolute w-8 h-8 pointer-events-none"
                style={{
                  top:    corner.startsWith('t') ? 16 : 'auto',
                  bottom: corner.startsWith('b') ? 16 : 'auto',
                  left:   corner.endsWith('l')   ? 16 : 'auto',
                  right:  corner.endsWith('r')   ? 16 : 'auto',
                  borderTop:    corner.startsWith('t') ? '1px solid rgba(223,193,94,0.25)' : 'none',
                  borderBottom: corner.startsWith('b') ? '1px solid rgba(223,193,94,0.25)' : 'none',
                  borderLeft:   corner.endsWith('l')   ? '1px solid rgba(223,193,94,0.25)' : 'none',
                  borderRight:  corner.endsWith('r')   ? '1px solid rgba(223,193,94,0.25)' : 'none',
                }}
                aria-hidden="true"
              />
            ))}
          </div>

          {/* ── Progress dots ─────────────────────────────── */}
          {/* Visual cue for the three scroll checkpoints */}
          <div className="flex items-center justify-center gap-3 mt-6" aria-hidden="true">
            {OVERLAY_TEXTS.map(({ label }) => (
              <div key={label} className="flex items-center gap-3">
                <div className="w-12 h-px bg-white/10 rounded-full" />
                <span className="font-dm-sans text-[9px] tracking-[0.3em] uppercase text-white/15">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>

      </Container>
    </section>
  );
}
