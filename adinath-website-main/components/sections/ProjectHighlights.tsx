// components/sections/ProjectHighlights.tsx
// ─────────────────────────────────────────────────────────────
// Section 4: Project Highlights
// Four feature cards in a 2x2 grid with:
//   - Lucide icons
//   - Staggered scroll-reveal animation
//   - Subtle hover: border brightens + icon glows
// ─────────────────────────────────────────────────────────────

'use client';

import { motion } from 'framer-motion';
import { Building2, LayoutDashboard, Star, MapPin } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import Container from '@/components/Container';
import { PROJECT_HIGHLIGHTS } from '@/utils/constants';

// ─── Map icon string → Lucide component ──────────────────────
const ICON_MAP: Record<string, React.ElementType> = {
  building: Building2,
  layout: LayoutDashboard,
  star: Star,
  'map-pin': MapPin,
};

// ─── Card animation variants ──────────────────────────────────
const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const card = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.4, 0, 0.2, 1] },
  },
};

export default function ProjectHighlights() {
  return (
    <section
      id="highlights"
      className="relative bg-dark-2 section-padding"
      style={{ background: '#0A0A0A' }}
      aria-label="Project highlights"
    >
      {/* ── Subtle texture ────────────────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: 'radial-gradient(circle at 0% 50%, rgba(223,193,94,0.04) 0%, transparent 50%)',
        }}
        aria-hidden="true"
      />

      <Container>

        {/* ── Section Header ────────────────────────────────── */}
        <SectionHeader
          label="What Sets Us Apart"
          heading="Excellence in Every Detail"
          subheading="ANANTAM is a convergence of extraordinary design, premium materials, and thoughtful living experiences."
          align="center"
          className="mb-20"
        />

        {/* ── Highlights Grid ───────────────────────────────── */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid sm:grid-cols-2 gap-px"
          role="list"
        >
          {PROJECT_HIGHLIGHTS.map((highlight) => {
            const Icon = ICON_MAP[highlight.icon] || Building2;

            return (
              <motion.div
                key={highlight.id}
                variants={card}
                role="listitem"
                className="
                  group relative p-10 lg:p-14
                  border border-white/[0.06]
                  hover:border-gold/30
                  hover:bg-white/[0.015]
                  transition-all duration-500 ease-out
                  overflow-hidden cursor-default
                "
              >
                {/* Background hover glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                  style={{
                    background: 'radial-gradient(circle at 20% 80%, rgba(223,193,94,0.05) 0%, transparent 60%)',
                  }}
                  aria-hidden="true"
                />

                {/* Card number */}
                <span
                  className="absolute top-8 right-10 font-playfair text-white/[0.04] text-7xl font-light leading-none select-none"
                  aria-hidden="true"
                >
                  {String(highlight.id).padStart(2, '0')}
                </span>

                {/* Icon container */}
                <div className="relative mb-8">
                  <div
                    className="
                      w-12 h-12 border border-white/10
                      group-hover:border-gold/40
                      flex items-center justify-center
                      transition-all duration-500
                    "
                  >
                    <Icon
                      size={20}
                      className="text-white/40 group-hover:text-gold transition-colors duration-500"
                      aria-hidden="true"
                    />
                  </div>
                </div>

                {/* Title */}
                <h3 className="font-playfair font-light text-white text-xl md:text-2xl mb-4 leading-snug group-hover:text-white transition-colors duration-300">
                  {highlight.title}
                </h3>

                {/* Gold rule */}
                <div
                  className="w-8 h-px bg-gold/30 group-hover:w-14 group-hover:bg-gold/60 transition-all duration-500 mb-5"
                  aria-hidden="true"
                />

                {/* Description */}
                <p className="font-dm-sans font-light text-white/40 text-sm leading-relaxed max-w-xs">
                  {highlight.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}
