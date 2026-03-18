// components/sections/DeveloperTrust.tsx
// ─────────────────────────────────────────────────────────────
// Section 9: Developer Trust
// Split layout:
//   - Left: Large image placeholder (developer photo or project)
//   - Right: Stats, about text, trust markers
// ─────────────────────────────────────────────────────────────

'use client';

import { motion } from 'framer-motion';
import { Award, CheckCircle } from 'lucide-react';
import Image from 'next/image';
import SectionHeader from '@/components/ui/SectionHeader';
import Container from '@/components/Container';
import GoldDivider from '@/components/ui/GoldDivider';
import { DEVELOPER_STATS, SITE_CONFIG } from '@/utils/constants';

// ─── Trust points shown under the about text ─────────────────
const TRUST_POINTS = [
  'RERA Registered Developer',
  'ISO 9001:2015 Certified',
  'Multiple CREDAI awards for excellence',
  'Bank-approved project',
  'Transparent transactions & legal title',
];

// ─── Animation variants ───────────────────────────────────────
const fadeLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.9, ease: [0.4, 0, 0.2, 1] } },
};
const fadeRight = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.9, ease: [0.4, 0, 0.2, 1], delay: 0.1 } },
};
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};
const statItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] } },
};

export default function DeveloperTrust() {
  return (
    <section
      id="developer"
      className="relative bg-black section-padding overflow-hidden"
      aria-label="About Adinath Buildwell — developer trust"
    >
      {/* ── Subtle background gradient ────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 0% 50%, rgba(223,193,94,0.03) 0%, transparent 60%)',
        }}
        aria-hidden="true"
      />

      <Container>

        {/* ── Section Header ────────────────────────────────── */}
        <SectionHeader
          label="The Builder"
          heading="Built on Trust, Delivered with Pride"
          align="center"
          className="mb-20"
        />

        {/* ── Two Column ────────────────────────────────────── */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* ── Left: Image Placeholder ───────────────────── */}
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="relative"
          >
            {/* Main image */}
            <div
              className="relative aspect-[3/4] max-w-sm mx-auto lg:mx-0 overflow-hidden border border-white/5"
              aria-label="Adinath Buildwell — project image"
            >
              <Image
                src="/images/last.jpg"
                fill
                alt="ANANTAM by Adinath Buildwell"
                className="object-cover object-center"
                sizes="(max-width: 1024px) 80vw, 400px"
                loading="lazy"
              />
              {/* Subtle bottom fade */}
              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />

              {/* Floating award badge */}
              <div className="absolute -bottom-4 -right-4 border border-gold/30 bg-black p-4 w-28 h-28 flex flex-col items-center justify-center text-center">
                <Award size={20} className="text-gold mb-1" aria-hidden="true" />
                <span className="font-dm-sans text-[9px] text-white/60 tracking-widest uppercase leading-tight">
                  Award Winning Builder
                </span>
              </div>
            </div>
          </motion.div>

          {/* ── Right: Content ────────────────────────────── */}
          <motion.div
            variants={fadeRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="space-y-8"
          >
            {/* About heading */}
            <div>
              <h3 className="font-playfair font-light text-white text-2xl md:text-3xl leading-snug mb-4">
                {SITE_CONFIG.developer}
              </h3>
              <GoldDivider width="sm" />
            </div>

            {/* About text */}
            <p className="font-dm-sans font-light text-white/50 text-sm leading-relaxed">
              Founded over 25 years ago, Adinath Buildwell has grown to become Jodhpur&apos;s
              most trusted real estate developer — a name synonymous with integrity,
              quality construction, and on-time delivery.
            </p>
            <p className="font-dm-sans font-light text-white/50 text-sm leading-relaxed">
              With 50+ completed projects housing over 5,000 families, every Adinath
              development is a testament to uncompromising standards and the belief that
              great architecture can elevate how people live.
            </p>

            {/* Stats */}
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              {DEVELOPER_STATS.map((stat) => (
                <motion.div
                  key={stat.label}
                  variants={statItem}
                  className="border border-white/[0.06] p-5 hover:border-gold/25 transition-colors duration-300"
                >
                  <p className="font-playfair font-light text-gold text-2xl mb-1">{stat.value}</p>
                  <p className="font-dm-sans text-[10px] text-white/40 tracking-widest uppercase">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </motion.div>

            {/* Trust points */}
            <div className="space-y-3 pt-2">
              {TRUST_POINTS.map((point) => (
                <div key={point} className="flex items-center gap-3">
                  <CheckCircle
                    size={14}
                    className="text-gold/60 flex-shrink-0"
                    aria-hidden="true"
                  />
                  <span className="font-dm-sans text-xs text-white/50">{point}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
