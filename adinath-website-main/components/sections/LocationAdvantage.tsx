// components/sections/LocationAdvantage.tsx
// ─────────────────────────────────────────────────────────────
// Section 7: Location Advantage
// Two-column layout:
//   - Left: Map placeholder with radial pin animation
//   - Right: Landmark list with distance badges
// ─────────────────────────────────────────────────────────────

'use client';

import { motion } from 'framer-motion';
import { MapPin, Clock } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import Container from '@/components/Container';
import { LOCATION_HIGHLIGHTS } from '@/utils/constants';

// ─── Stagger animation ────────────────────────────────────────
const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};
const item = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } },
};

export default function LocationAdvantage() {
  return (
    <section
      id="location"
      className="relative bg-black section-padding overflow-hidden"
      aria-label="Location advantage"
    >
      {/* ── Background grid texture ───────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
        aria-hidden="true"
      />

      <Container>

        {/* ── Section Header ────────────────────────────────── */}
        <SectionHeader
          label="Location"
          heading="Perfectly Positioned"
          subheading="At the crossroads of convenience and culture — Jodhpur's most connected address."
          align="center"
          className="mb-20"
        />

        {/* ── Two Column Layout ─────────────────────────────── */}
        <div className="grid lg:grid-cols-2 gap-6 md:gap-10 lg:gap-20 items-start">

          {/* ── Left: Map Placeholder ─────────────────────── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
            className="relative overflow-hidden border border-white/10 rounded-2xl min-h-[350px] lg:min-h-[520px]"
            aria-label="Location map — Jodhpur, Rajasthan"
          >
            {/*
              Map Placeholder — Replace with:
              <iframe
                src="https://maps.google.com/?q=Jodhpur+Rajasthan&output=embed"
                width="100%" height="100%" className="absolute inset-0"
                title="ANANTAM Location Map"
              />
            */}
            <MapVisualization />

            {/* Map border glow */}
            <div
              className="absolute inset-0 border border-gold/10 pointer-events-none"
              aria-hidden="true"
            />
          </motion.div>

          {/* ── Right: Landmarks List ─────────────────────── */}
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="space-y-3"
          >
            <motion.h3
              variants={item}
              className="font-playfair font-light text-white text-2xl mb-8"
            >
              Everything Within Reach
            </motion.h3>

            {LOCATION_HIGHLIGHTS.map((loc) => (
              <motion.div
                key={loc.place}
                variants={item}
                className="
                  group flex items-center justify-between
                  p-5 border border-white/[0.06]
                  hover:border-gold/25 hover:bg-white/[0.02]
                  transition-all duration-300
                "
              >
                {/* Place with icon */}
                <div className="flex items-center gap-4">
                  <div
                    className="
                      w-8 h-8 border border-white/10
                      group-hover:border-gold/30
                      flex items-center justify-center flex-shrink-0
                      transition-colors duration-300
                    "
                  >
                    <MapPin
                      size={12}
                      className="text-white/30 group-hover:text-gold transition-colors duration-300"
                      aria-hidden="true"
                    />
                  </div>
                  <span className="font-dm-sans text-sm text-white/60 group-hover:text-white/80 transition-colors duration-300">
                    {loc.place}
                  </span>
                </div>

                {/* Distance badge */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  <Clock size={11} className="text-gold/40" aria-hidden="true" />
                  <span className="font-dm-sans text-xs tracking-widest text-gold/60 group-hover:text-gold transition-colors duration-300">
                    {loc.distance}
                  </span>
                </div>
              </motion.div>
            ))}

            {/* City note */}
            <motion.div
              variants={item}
              className="pt-6 border-t border-white/5"
            >
              <p className="font-dm-sans text-xs text-white/30 leading-relaxed">
                Jodhpur is the second largest city in Rajasthan and one of India&apos;s fastest
                growing smart cities with investments in metro rail, ring road, and IT parks.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

// ─── Map Visualization Placeholder ───────────────────────────
// Renders an abstract city-grid map until a real Google Maps embed is added
function MapVisualization() {
  return (
    <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-stone-950 to-zinc-900">

      {/* Grid lines representing streets */}
      <svg
        className="absolute inset-0 w-full h-full opacity-20"
        viewBox="0 0 400 300"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        {/* Horizontal streets */}
        {[50, 100, 150, 200, 250].map((y) => (
          <line key={`h${y}`} x1="0" y1={y} x2="400" y2={y} stroke="rgba(223,193,94,0.3)" strokeWidth="0.5" />
        ))}
        {/* Vertical streets */}
        {[80, 160, 240, 320].map((x) => (
          <line key={`v${x}`} x1={x} y1="0" x2={x} y2="300" stroke="rgba(223,193,94,0.3)" strokeWidth="0.5" />
        ))}
        {/* Diagonal road */}
        <line x1="0" y1="300" x2="400" y2="50" stroke="rgba(223,193,94,0.2)" strokeWidth="0.5" />
      </svg>

      {/* Center pin pulsing animation */}
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Pulse rings */}
        {[1, 2, 3].map((ring) => (
          <motion.div
            key={ring}
            animate={{ scale: [1, 2.5], opacity: [0.4, 0] }}
            transition={{
              repeat: Infinity,
              duration: 2.5,
              delay: ring * 0.6,
              ease: 'easeOut',
            }}
            className="absolute w-6 h-6 border border-gold/50 rounded-full"
            aria-hidden="true"
          />
        ))}

        {/* Central dot */}
        <div className="relative z-10">
          <motion.div
            animate={{ boxShadow: ['0 0 6px rgba(223,193,94,0.4)', '0 0 18px rgba(223,193,94,0.7)', '0 0 6px rgba(223,193,94,0.4)'] }}
            transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
            className="w-3 h-3 bg-gold rounded-full"
            aria-hidden="true"
          />
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
            <span className="font-dm-sans text-[10px] text-gold/80 tracking-widest uppercase">
              ANANTAM
            </span>
          </div>
        </div>
      </div>

      {/* City label */}
      <div className="absolute bottom-4 left-4">
        <p className="font-playfair text-white/20 text-2xl font-light">Jodhpur</p>
        <p className="font-dm-sans text-[10px] text-white/15 tracking-widest">Rajasthan, India</p>
      </div>

      {/* Compass */}
      <div className="absolute top-4 right-4 flex flex-col items-center opacity-30">
        <span className="font-dm-sans text-[8px] text-gold tracking-widest">N</span>
        <div className="w-px h-4 bg-gold/60" />
        <div className="w-2 h-2 border-l border-b border-gold/60 rotate-45 -mt-1" />
      </div>
    </div>
  );
}
