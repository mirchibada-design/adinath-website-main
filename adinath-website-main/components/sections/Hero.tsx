// components/sections/Hero.tsx
// ─────────────────────────────────────────────────────────────
// Section 1: Full-viewport hero.
// Static layout — cinematic entrance via Framer Motion.
//
// REPLACING THE BACKGROUND IMAGE
//   Inside the background <div>, replace the gradient with:
//
//   import Image from 'next/image';
//   <Image
//     src="/images/hero-bg.jpg"
//     fill
//     alt="ANANTAM aerial view"
//     className="object-cover"
//     priority
//   />
//
//   Recommended: wide landscape photo, dark-toned.
// ─────────────────────────────────────────────────────────────

'use client';

import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import { SITE_CONFIG } from '@/utils/constants';

// ─── Entrance animation ───────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.9, ease: [0.4, 0, 0.2, 1] },
  }),
};

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative bg-black overflow-hidden"
      style={{ height: '100dvh', minHeight: 600 }}
      aria-label="Hero — ANANTAM luxury apartments"
    >

      {/* ── Background ─────────────────────────────────────── */}
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src="/images/hero.jpg"
          fill
          alt="ANANTAM luxury society — aerial view"
          className="object-cover object-center"
          priority
          quality={90}
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/55" />
        {/* Warm gold accent */}
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse at 30% 70%, rgba(223,193,94,0.06) 0%, transparent 55%)`,
          }}
        />
      </div>

      {/* ── Vignette ───────────────────────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(to bottom,
            rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.08) 30%,
            rgba(0,0,0,0.08) 70%, rgba(0,0,0,0.75) 100%)`,
        }}
        aria-hidden="true"
      />

      {/* ── Hero Content ───────────────────────────────────── */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 h-full justify-center">

        {/* Full Logo */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.3, duration: 1.0, ease: [0.4, 0, 0.2, 1] }}
          className="flex justify-center mb-6"
        >
          <img
            src="/logo/adinath%20anantam%20logo%20full.png"
            alt="Adinath Anantam"
            style={{ width: 'clamp(200px, 30vw, 420px)', height: 'auto' }}
          />
        </motion.div>

        {/* Gold rule */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.8, ease: 'easeInOut' }}
          className="w-24 h-px bg-gradient-to-r from-transparent via-gold to-transparent my-6"
          aria-hidden="true"
        />

        {/* Tagline */}
        <motion.p
          custom={1.1}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="font-playfair font-light italic text-white/55 tracking-widest text-base sm:text-lg mb-3"
        >
          {SITE_CONFIG.tagline}
        </motion.p>

        {/* Location */}
        <motion.p
          custom={1.2}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="font-dm-sans text-xs tracking-[0.3em] uppercase text-white/35 mb-10"
        >
          {SITE_CONFIG.location}
        </motion.p>

        {/* CTAs */}
        <motion.div
          custom={1.4}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="flex flex-col sm:flex-row gap-4"
        >
          <Button variant="gold" href="#contact" aria-label="Schedule a visit to ANANTAM">
            Schedule a Visit
          </Button>
          <Button variant="outline" href="#overview" aria-label="Explore the ANANTAM project">
            Explore Project
          </Button>
        </motion.div>
      </div>

      {/* ── Scroll Indicator ───────────────────────────────── */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20 cursor-pointer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
        onClick={() => document.getElementById('scroll-story')?.scrollIntoView({ behavior: 'smooth' })}
        role="button"
        tabIndex={0}
        aria-label="Scroll down to explore"
        onKeyDown={(e) =>
          e.key === 'Enter' &&
          document.getElementById('scroll-story')?.scrollIntoView({ behavior: 'smooth' })
        }
      >
        <span className="font-dm-sans text-[10px] tracking-[0.4em] uppercase text-white/30">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
        >
          <ChevronDown className="text-gold/60 w-5 h-5" aria-hidden="true" />
        </motion.div>
        <motion.div
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut', delay: 0.2 }}
          className="w-px h-10 bg-gradient-to-b from-gold/60 to-transparent origin-top"
          aria-hidden="true"
        />
      </motion.div>
    </section>
  );
}
