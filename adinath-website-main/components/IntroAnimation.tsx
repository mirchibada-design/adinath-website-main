// components/IntroAnimation.tsx
// ─────────────────────────────────────────────────────────────
// Cinematic intro animation — plays once per session.
//
// Animation sequence (total ~2.5s):
//   0.0s  Black overlay + logo fades in (opacity 0→1, scale 0.85→1)
//   0.9s  Logo zooms toward viewer (scale 1→1.7) — "camera zoom"
//   1.8s  Logo BURSTS outward (scale 1.7→12) while overlay fades → hero reveals
//   2.5s  Component unmounts
//
// Skipped automatically when:
//   - User has already seen it this session (sessionStorage)
//   - prefers-reduced-motion media query is active
//
// To replace the logo:
//   1. Delete the <LogoMark /> component below
//   2. Replace with: <Image src="/images/logo.svg" width={280} height={80} alt="ANANTAM" />
//      OR keep <LogoMark /> and update the SVG path data.
// ─────────────────────────────────────────────────────────────

'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ─── Animation phase state ────────────────────────────────────
type Phase = 'enter' | 'zoom' | 'burst';

export default function IntroAnimation() {
  const [show, setShow] = useState(false);
  const [phase, setPhase] = useState<Phase>('enter');

  useEffect(() => {
    // ── 1. Respect prefers-reduced-motion ─────────────────
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReducedMotion) return;

    // ── 2. Skip if already played this session ─────────────
    if (sessionStorage.getItem('anantam-intro')) return;

    // ── 3. Show the intro ──────────────────────────────────
    setShow(true);

    // ── 4. Advance through phases ─────────────────────────
    const t1 = setTimeout(() => setPhase('zoom'), 900);   // Start zoom
    const t2 = setTimeout(() => setPhase('burst'), 1800); // Burst outward
    const t3 = setTimeout(() => {
      setShow(false);
      sessionStorage.setItem('anantam-intro', '1');
    }, 2500); // Unmount

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  // ── Skip handler (keyboard / button) ──────────────────────
  const skip = () => {
    setShow(false);
    sessionStorage.setItem('anantam-intro', '1');
  };

  return (
    <AnimatePresence>
      {show && (
        /* ── Dark overlay ────────────────────────────────── */
        <motion.div
          key="intro-overlay"
          className="fixed inset-0 z-[9999] bg-black flex items-center justify-center overflow-hidden"
          // Fade the overlay out during the burst phase
          animate={{ opacity: phase === 'burst' ? 0 : 1 }}
          transition={{
            duration: 0.55,
            ease: 'easeIn',
            delay: phase === 'burst' ? 0.08 : 0,
          }}
          // Keyboard: press Escape to skip
          onKeyDown={(e) => e.key === 'Escape' && skip()}
          tabIndex={-1}
          aria-modal="true"
          role="dialog"
          aria-label="Intro animation"
        >
          {/* ── Logo container ──────────────────────────── */}
          <motion.div
            className="flex flex-col items-center will-change-transform"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{
              opacity: phase === 'burst' ? 0 : 1,
              scale:
                phase === 'enter' ? 1        // At rest
                : phase === 'zoom' ? 1.7     // Camera zooms in
                : 12,                         // Burst — fills screen
            }}
            transition={{
              opacity: { duration: 0.55, ease: [0.4, 0, 0.2, 1] },
              scale: {
                duration: phase === 'enter' ? 0.6
                  : phase === 'zoom' ? 0.95
                  : 0.4,
                // Spring-like ease for zoom, sharp ease-in for burst
                ease: phase === 'burst'
                  ? [0.4, 0, 1, 1]
                  : [0.4, 0, 0.2, 1],
              },
            }}
          >
            <LogoMark />
          </motion.div>

          {/* ── Ambient gold radial glow ─────────────────── */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: phase === 'zoom' ? 1 : 0 }}
            transition={{ duration: 0.8 }}
            style={{
              background:
                'radial-gradient(ellipse at center, rgba(223,193,94,0.06) 0%, transparent 65%)',
            }}
            aria-hidden="true"
          />

          {/* ── Thin gold horizontal rule beneath logo ───── */}
          <motion.div
            className="absolute"
            style={{ bottom: '50%', marginBottom: '-3rem' }}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{
              scaleX: phase !== 'enter' ? 0 : 1,
              opacity: phase !== 'enter' ? 0 : 0.4,
            }}
            transition={{ duration: 0.6, delay: 0.4 }}
            aria-hidden="true"
          />

          {/* ── Skip button ──────────────────────────────── */}
          <button
            onClick={skip}
            className="
              absolute bottom-8 right-8
              font-dm-sans text-[10px] tracking-[0.35em] uppercase
              text-white/25 hover:text-white/55
              transition-colors duration-300
              focus-visible:outline-gold focus-visible:outline-1
            "
            aria-label="Skip intro animation"
          >
            Skip
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── LogoMark SVG ─────────────────────────────────────────────
// Inline SVG placeholder logo.
//
// TO REPLACE WITH YOUR REAL LOGO:
//   Option A (SVG file):
//     import Image from 'next/image';
//     <Image src="/images/logo.svg" width={320} height={90} alt="ANANTAM" priority />
//
//   Option B (inline SVG):
//     Replace the <svg> below with your brand SVG code.
//     Keep width/height similar so the animation scale works correctly.
// ─────────────────────────────────────────────────────────────
function LogoMark() {
  return (
    <svg
      width="340"
      height="90"
      viewBox="0 0 340 90"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="ANANTAM by Adinath Buildwell"
      role="img"
    >
      {/* ── Primary wordmark ────────────────────────────── */}
      <text
        x="170"
        y="52"
        textAnchor="middle"
        dominantBaseline="middle"
        fontFamily="'Playfair Display', Georgia, serif"
        fontSize="44"
        fontWeight="300"
        letterSpacing="14"
        fill="#FFFFFF"
      >
        ANANTAM
      </text>

      {/* ── Gold divider line ────────────────────────────── */}
      <line
        x1="100"
        y1="68"
        x2="240"
        y2="68"
        stroke="#DFC15E"
        strokeWidth="0.6"
        opacity="0.7"
      />

      {/* ── Developer sub-label ──────────────────────────── */}
      <text
        x="170"
        y="80"
        textAnchor="middle"
        dominantBaseline="middle"
        fontFamily="'DM Sans', system-ui, sans-serif"
        fontSize="8"
        letterSpacing="5"
        fill="#DFC15E"
        opacity="0.65"
      >
        BY ADINATH BUILDWELL
      </text>
    </svg>
  );
}
