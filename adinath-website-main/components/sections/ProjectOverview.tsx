// components/sections/ProjectOverview.tsx
// ─────────────────────────────────────────────────────────────
// Section 3: Project Overview
// Two-column layout:
//   - Left: Large animated stat numbers
//   - Right: Description + location + developer badge
// ─────────────────────────────────────────────────────────────

'use client';

import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import Container from '@/components/Container';
import { PROJECT_STATS, SITE_CONFIG } from '@/utils/constants';

// ─── Framer Motion Variants ───────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.8, ease: [0.4, 0, 0.2, 1] },
  }),
};

export default function ProjectOverview() {
  return (
    <section
      id="overview"
      className="relative bg-black section-padding"
      aria-label="Project overview"
    >
      {/* ── Background accent ─────────────────────────────── */}
      <div
        className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-transparent via-gold/20 to-transparent"
        aria-hidden="true"
      />

      <Container>

        {/* ── Section Header ────────────────────────────────── */}
        <SectionHeader
          label="Project Overview"
          heading="Designed for Those Who Demand More"
          subheading="ANANTAM is Adinath Buildwell's most ambitious residential masterpiece — a landmark address in Jodhpur where architectural brilliance meets an elevated way of life."
          align="center"
          className="mb-20"
        />

        {/* ── Stats Row ─────────────────────────────────────── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-2 md:grid-cols-4 gap-px border border-white/5 mb-24"
        >
          {PROJECT_STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              custom={i * 0.1}
              variants={fadeUp}
              className="
                flex flex-col items-center justify-center text-center
                p-8 md:p-10 border-b md:border-b-0 border-r border-white/5
                group hover:bg-white/[0.02] transition-colors duration-300
                last:border-r-0
              "
            >
              {/* Stat value */}
              <span className="font-playfair font-light text-white text-4xl md:text-5xl lg:text-6xl leading-none mb-3 group-hover:text-gold transition-colors duration-500">
                {stat.value}
              </span>
              {/* Gold separator */}
              <div className="w-6 h-px bg-gold/40 mb-3" aria-hidden="true" />
              {/* Stat label */}
              <span className="font-dm-sans text-xs tracking-[0.2em] uppercase text-white/40">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* ── Detail Cards ──────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
          className="grid md:grid-cols-2 gap-6 items-start"
        >
          {/* Location card */}
          <div className="border border-white/8 p-8 relative overflow-hidden group">
            {/* Hover glow */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ background: 'radial-gradient(circle at 50% 50%, rgba(223,193,94,0.04) 0%, transparent 70%)' }}
              aria-hidden="true"
            />

            <div className="flex items-start gap-4 mb-6">
              <div className="w-8 h-8 border border-gold/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                <MapPin size={14} className="text-gold" aria-hidden="true" />
              </div>
              <div>
                <p className="font-dm-sans text-xs tracking-[0.3em] uppercase text-gold/60 mb-1">
                  Location
                </p>
                <h4 className="font-playfair text-white text-xl font-light">{SITE_CONFIG.location}</h4>
              </div>
            </div>

            <p className="font-dm-sans text-sm text-white/40 leading-relaxed mb-6">
              Jodhpur — the Blue City of Rajasthan — is one of India&apos;s fastest-growing
              tier-2 cities, combining heritage charm with modern infrastructure investment.
            </p>

            {/* Location highlights */}
            <div className="grid grid-cols-2 gap-3">
              {[
                'Airport: 12 min',
                'Railway: 8 min',
                'AIIMS: 10 min',
                'City Centre: 5 min',
              ].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-gold/40 rounded-full flex-shrink-0" aria-hidden="true" />
                  <span className="font-dm-sans text-xs text-white/40">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Developer credibility badge */}
          <div className="border border-white/8 p-6 flex items-center gap-5">
            <div
              className="w-12 h-12 border border-gold/20 flex items-center justify-center flex-shrink-0"
              aria-label="Adinath Buildwell logo placeholder"
            >
              <span className="font-playfair text-gold text-xs">AB</span>
            </div>
            <div>
              <p className="font-playfair text-white text-sm font-light">
                {SITE_CONFIG.developer}
              </p>
              <p className="font-dm-sans text-xs text-white/40 tracking-wide mt-0.5">
                25+ Years · Jodhpur&apos;s Most Trusted Developer
              </p>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
