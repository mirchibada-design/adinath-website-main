// components/sections/Amenities.tsx
// ─────────────────────────────────────────────────────────────
// Section 6: Amenities
// 4-column icon grid with:
//   - Lucide icons mapped by name
//   - Staggered entrance animation
//   - Hover: icon brightens to gold
// ─────────────────────────────────────────────────────────────

'use client';

import { motion } from 'framer-motion';
import {
  Waves, Dumbbell, Leaf, Shield, Car, Users, Gamepad2,
  Wifi, Coffee, Film, Zap, Sparkles,
} from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import Container from '@/components/Container';
import { AMENITIES } from '@/utils/constants';

// ─── Map icon name → Lucide component ────────────────────────
const ICON_MAP: Record<string, React.ElementType> = {
  waves: Waves,
  dumbbell: Dumbbell,
  spa: Sparkles,
  trees: Leaf,
  shield: Shield,
  car: Car,
  users: Users,
  gamepad: Gamepad2,
  wifi: Wifi,
  coffee: Coffee,
  video: Film,
  zap: Zap,
};

// ─── Animation variants ───────────────────────────────────────
const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] } },
};

export default function Amenities() {
  return (
    <section
      id="amenities"
      className="relative section-padding"
      style={{ background: '#0A0A0A' }}
      aria-label="Amenities"
    >
      {/* ── Ambient top glow ──────────────────────────────── */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-px"
        style={{ background: 'linear-gradient(to right, transparent, rgba(223,193,94,0.4), transparent)' }}
        aria-hidden="true"
      />

      <Container>

        {/* ── Section Header ────────────────────────────────── */}
        <SectionHeader
          label="World-Class Amenities"
          heading="A Life Fully Lived"
          subheading="Over 30 curated amenities designed to enrich every dimension of your daily experience."
          align="center"
          className="mb-20"
        />

        {/* ── Amenities Grid ────────────────────────────────── */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-px"
          role="list"
        >
          {AMENITIES.map((amenity) => {
            const Icon = ICON_MAP[amenity.icon] || Sparkles;
            return (
              <AmenityCard key={amenity.label} amenity={amenity} Icon={Icon} />
            );
          })}
        </motion.div>

        {/* ── Footnote ──────────────────────────────────────── */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-center font-dm-sans text-xs text-white/20 tracking-widest uppercase mt-14"
        >
          {'+ 20 more amenities \u00b7 Full amenity list available on request'}
        </motion.p>
      </Container>
    </section>
  );
}

// ─── Individual Amenity Card ──────────────────────────────────
function AmenityCard({
  amenity,
  Icon,
}: {
  amenity: { icon: string; label: string };
  Icon: React.ElementType;
}) {
  return (
    <motion.div
      variants={item}
      role="listitem"
      className="
        group flex flex-col items-center justify-center gap-4
        p-8 border border-white/[0.05]
        hover:border-gold/25 hover:bg-white/[0.015]
        transition-all duration-400 cursor-default
      "
    >
      {/* Icon */}
      <div
        className="
          w-10 h-10 flex items-center justify-center
          border border-white/10
          group-hover:border-gold/30
          transition-colors duration-400
        "
      >
        <Icon
          size={18}
          className="text-white/30 group-hover:text-gold transition-colors duration-400"
          aria-hidden="true"
        />
      </div>

      {/* Label */}
      <span className="font-dm-sans text-xs tracking-[0.15em] uppercase text-white/40 group-hover:text-white/70 transition-colors duration-400 text-center">
        {amenity.label}
      </span>
    </motion.div>
  );
}
