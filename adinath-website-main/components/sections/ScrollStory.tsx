// components/sections/ScrollStory.tsx
// ─────────────────────────────────────────────────────────────
// Section 2: Scroll Story / Building Reveal
// Uses GSAP ScrollTrigger to create a pinned scroll narrative:
//   - 3 story "frames" that progress as you scroll
//   - Building silhouette gradually reveals bottom → top
//   - Text panels fade in per frame
// ─────────────────────────────────────────────────────────────

'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

// ─── Story frames content ─────────────────────────────────────
const STORY_FRAMES = [
  {
    id: 1,
    label: 'The Vision',
    heading: 'Born from\nA Dream',
    body: 'In the ancient city of Jodhpur, where history and modernity converge, rises ANANTAM — a testament to architectural ambition and timeless luxury.',
  },
  {
    id: 2,
    label: 'The Design',
    heading: 'Crafted for\nEternity',
    body: 'Every facade, every corridor, every residence has been meticulously designed to honour the grandeur of Rajasthan while embracing the demands of contemporary living.',
  },
  {
    id: 3,
    label: 'The Life',
    heading: 'A World\nUnto Itself',
    body: 'ANANTAM is not merely a home. It is a curated lifestyle — where every sunrise over the Blue City is yours to own.',
  },
];

export default function ScrollStory() {
  const containerRef = useRef<HTMLElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);
  const buildingRef = useRef<HTMLDivElement>(null);

  // ── GSAP ScrollTrigger Setup ─────────────────────────────
  useScrollAnimation(containerRef, (el, gsap, ScrollTrigger) => {
    const frames = el.querySelectorAll<HTMLElement>('.story-frame');
    const building = el.querySelector<HTMLElement>('.building-reveal');
    const buildingInner = el.querySelector<HTMLElement>('.building-inner');

    if (!frames.length || !building || !buildingInner) return;

    // Create a timeline pinned to the section
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: 'top top',
        end: `+=${window.innerHeight * (STORY_FRAMES.length + 1)}`,
        scrub: 1.5,     // Smooth scrub — higher = more lag (cinematic)
        pin: true,      // Pin section while animating
        anticipatePin: 1,
      },
    });

    // Building: clip-path reveals from bottom to top as you scroll
    tl.fromTo(
      buildingInner,
      { clipPath: 'inset(100% 0% 0% 0%)' },
      { clipPath: 'inset(0% 0% 0% 0%)', duration: STORY_FRAMES.length, ease: 'none' }
    );

    // Building subtle scale
    tl.fromTo(
      building,
      { scale: 1.1, opacity: 0.6 },
      { scale: 1, opacity: 1, duration: STORY_FRAMES.length, ease: 'none' },
      '<' // Start at same time as clip-path
    );

    // Each text frame: fade in, hold, fade out
    frames.forEach((frame, i) => {
      const startTime = i;
      // Fade in
      tl.fromTo(frame, { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.4 }, startTime);
      // Hold
      tl.to(frame, { opacity: 1, duration: 0.6 }, startTime + 0.4);
      // Fade out (except last)
      if (i < frames.length - 1) {
        tl.to(frame, { opacity: 0, x: 30, duration: 0.4 }, startTime + 1.0);
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  });

  return (
    <section
      ref={containerRef}
      id="scroll-story"
      className="relative bg-black overflow-hidden"
      style={{ height: '100vh' }} // Will be extended by GSAP pin
      aria-label="Project story"
    >
      <div className="relative h-screen flex">

        {/* ── Left: Story Text Panel ────────────────────────── */}
        <div
          ref={storyRef}
          className="relative z-10 w-full lg:w-1/2 flex items-center px-6 md:px-[60px] xl:px-[120px]"
        >
          {/* All story frames stacked — GSAP controls which is visible */}
          <div className="relative w-full">
            {STORY_FRAMES.map((frame, i) => (
              <div
                key={frame.id}
                className={`story-frame absolute top-0 left-0 w-full ${i === 0 ? 'opacity-100' : 'opacity-0'}`}
                aria-hidden={i !== 0}
              >
                {/* Frame counter */}
                <p className="font-dm-sans text-[10px] tracking-[0.4em] uppercase text-gold/60 mb-6">
                  {String(frame.id).padStart(2, '0')} — {frame.label}
                </p>

                {/* Heading */}
                <h2 className="font-playfair font-light text-white leading-[1.05] mb-6"
                  style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', whiteSpace: 'pre-line' }}
                >
                  {frame.heading}
                </h2>

                {/* Gold rule */}
                <div className="w-12 h-px bg-gold mb-6" aria-hidden="true" />

                {/* Body */}
                <p className="font-dm-sans font-light text-white/50 leading-relaxed text-base max-w-sm">
                  {frame.body}
                </p>
              </div>
            ))}

            {/* Fallback visible frame for no-JS / first render */}
            <div className="opacity-0 select-none" aria-hidden="true">
              {/* This phantom div preserves height */}
              <p className="text-[10px] mb-6">spacer</p>
              <h2 className="leading-[1.05] mb-6" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
                Born from{'\n'}A Dream
              </h2>
              <div className="h-px mb-6" />
              <p className="leading-relaxed text-base max-w-sm">
                {STORY_FRAMES[0].body}
              </p>
            </div>
          </div>
        </div>

        {/* ── Right: Building Reveal ────────────────────────── */}
        <div
          ref={buildingRef}
          className="building-reveal hidden lg:flex absolute right-0 top-0 w-1/2 h-full items-end justify-center overflow-hidden"
          aria-hidden="true"
        >
          {/* Building silhouette placeholder */}
          {/* Replace this div with an <Image> of the building once available */}
          <div className="building-inner w-full h-full relative">
            {/* Main building shape */}
            <div className="absolute inset-0 flex items-end justify-center">
              <BuildingSilhouette />
            </div>
            {/* Right gradient fade */}
            <div className="absolute inset-0 bg-gradient-to-l from-black/0 via-transparent to-black/80" />
          </div>

          {/* Bottom gradient */}
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black to-transparent z-10" />
        </div>

        {/* ── Progress dots ─────────────────────────────────── */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-20">
          {STORY_FRAMES.map((frame) => (
            <div
              key={frame.id}
              className="w-1 h-1 rounded-full bg-white/20"
              aria-hidden="true"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Building Silhouette SVG Placeholder ─────────────────────
// This renders a stylised luxury tower outline as a placeholder.
// Replace with an actual building image using <Image> component.
function BuildingSilhouette() {
  return (
    <div className="relative w-72 h-[85%]">
      {/* Tower body */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-40 h-full">
        {/* Main structure gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-800/80 via-stone-900/60 to-stone-950/40" />

        {/* Window grid */}
        <div className="absolute inset-x-4 top-8 bottom-8 grid grid-cols-4 gap-1.5">
          {Array.from({ length: 48 }).map((_, i) => (
            <div
              key={i}
              className="bg-gold/10 rounded-sm"
              style={{
                opacity: Math.random() > 0.5 ? 0.3 + Math.random() * 0.4 : 0.05,
              }}
            />
          ))}
        </div>

        {/* Vertical accent lines */}
        <div className="absolute top-0 left-4 w-px h-full bg-gold/10" />
        <div className="absolute top-0 right-4 w-px h-full bg-gold/10" />

        {/* Balcony lines */}
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="absolute left-0 right-0 h-px bg-white/5"
            style={{ bottom: `${12 + i * 11}%` }}
          />
        ))}

        {/* Rooftop element */}
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-2 h-4 bg-gold/30" />
        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-px bg-gold/20" />
      </div>

      {/* Podium base */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-stone-800/60 to-transparent" />

      {/* Ambient glow */}
      <motion.div
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(223,193,94,0.08) 0%, transparent 70%)',
          filter: 'blur(20px)',
        }}
        aria-hidden="true"
      />
    </div>
  );
}
