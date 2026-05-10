// components/sections/FloorPlans.tsx
// ─────────────────────────────────────────────────────────────
// Section 8: Floor Plans
// Tab-based interface:
//   - Tabs for each BHK type
//   - Selected card shows floor plan image placeholder
//   - Price, area, and config details
// ─────────────────────────────────────────────────────────────

'use client';

import { useState } from 'react';
import Container from '@/components/Container';
import { motion, AnimatePresence } from 'framer-motion';
import { Square, IndianRupee } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import Button from '@/components/ui/Button';
import { FLOOR_PLANS } from '@/utils/constants';

export default function FloorPlans() {
  const [activeId, setActiveId] = useState(FLOOR_PLANS[0].id);
  const activePlan = FLOOR_PLANS.find((p) => p.id === activeId)!;

  return (
    <section
      id="floor-plans"
      className="relative section-padding"
      style={{ background: '#0A0A0A' }}
      aria-label="Floor plans"
    >
      {/* ── Right side glow ───────────────────────────────── */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 w-px h-1/2"
        style={{ background: 'linear-gradient(to bottom, transparent, rgba(223,193,94,0.2), transparent)' }}
        aria-hidden="true"
      />

      <Container>

        {/* ── Section Header ────────────────────────────────── */}
        <SectionHeader
          label="Residences"
          heading="Choose Your Space"
          subheading="From intimate 2 BHK residences to sprawling penthouses — every layout crafted with intention."
          align="center"
          className="mb-16"
        />

        {/* ── Tab Buttons ───────────────────────────────────── */}
        <div
          className="flex flex-wrap justify-center gap-2 mb-12"
          role="tablist"
          aria-label="Floor plan types"
        >
          {FLOOR_PLANS.map((plan) => (
            <button
              key={plan.id}
              role="tab"
              aria-selected={activeId === plan.id}
              aria-controls={`plan-panel-${plan.id}`}
              onClick={() => setActiveId(plan.id)}
              className={`
                relative px-6 py-3 font-dm-sans text-xs tracking-[0.2em] uppercase
                transition-all duration-300 border
                ${activeId === plan.id
                  ? 'border-gold/60 text-gold bg-gold/5'
                  : 'border-white/10 text-white/40 hover:border-white/25 hover:text-white/70'
                }
              `}
            >
              {plan.type}
              {/* Active indicator */}
              {activeId === plan.id && (
                <motion.div
                  layoutId="tab-indicator"
                  className="absolute bottom-0 left-0 right-0 h-px bg-gold"
                  aria-hidden="true"
                />
              )}
            </button>
          ))}
        </div>

        {/* ── Active Plan Detail ────────────────────────────── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeId}
            id={`plan-panel-${activeId}`}
            role="tabpanel"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            className="grid lg:grid-cols-2 gap-8 items-start"
          >

            {/* ── Floor Plan Image Placeholder ──────────────── */}
            <div
              className="relative aspect-[4/3] border border-white/[0.04] overflow-hidden image-placeholder"
              aria-label={`${activePlan.type} floor plan diagram`}
            >
              {/*
                Replace this div with:
                <Image
                  src={`/images/floor-plan-${activePlan.id}.png`}
                  fill
                  alt={`${activePlan.type} floor plan`}
                  className="object-contain p-8"
                />
              */}

              {/* Placeholder: abstract floor plan wireframe */}
              <FloorPlanWireframe type={activePlan.type} />

              {/* Badge */}
              <div className="absolute top-4 left-4 px-3 py-1 bg-gold text-black">
                <span className="font-dm-sans text-[10px] font-medium tracking-widest uppercase">
                  {activePlan.badge}
                </span>
              </div>
            </div>

            {/* ── Plan Details ──────────────────────────────── */}
            <div className="flex flex-col gap-6 lg:py-4">
              {/* Config header */}
              <div>
                <p className="font-dm-sans text-xs tracking-[0.35em] text-gold/60 uppercase mb-2">
                  Configuration
                </p>
                <h3 className="font-playfair font-light text-white text-4xl md:text-5xl">
                  {activePlan.type}
                </h3>
              </div>

              {/* Gold rule */}
              <div className="w-12 h-px bg-gold/40" aria-hidden="true" />

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4">
                <StatBox
                  icon={Square}
                  label="Carpet Area"
                  value={activePlan.area}
                />
                <StatBox
                  icon={IndianRupee}
                  label="Starting Price"
                  value={activePlan.price}
                />
              </div>

              {/* Features list */}
              <div className="space-y-3">
                {[
                  'Double-height lobby entry',
                  'Floor-to-ceiling windows',
                  'Modular kitchen with island',
                  'Premium Italian marble flooring',
                  'Smart home automation ready',
                ].map((feature) => (
                  <div key={feature} className="flex items-center gap-3">
                    <div className="w-1 h-1 bg-gold/60 rounded-full flex-shrink-0" aria-hidden="true" />
                    <span className="font-dm-sans text-xs text-white/50">{feature}</span>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Button variant="gold" href="#contact" aria-label={`Enquire about ${activePlan.type}`}>
                  Enquire Now
                </Button>
                <Button variant="outline" href="#contact" aria-label={`Request ${activePlan.type} brochure`}>
                  Request Brochure
                </Button>
              </div>

              {/* Disclaimer */}
              <p className="font-dm-sans text-[10px] text-white/20 leading-relaxed">
                * All dimensions are approximate. Actual carpet area may vary subject to
                final drawings. Prices are indicative and subject to change.
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

      </Container>
    </section>
  );
}

// ─── Stat Box ─────────────────────────────────────────────────
function StatBox({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="border border-white/8 p-5">
      <div className="flex items-center gap-2 mb-3">
        <Icon size={13} className="text-gold/50" aria-hidden="true" />
        <span className="font-dm-sans text-[10px] tracking-widest uppercase text-white/30">{label}</span>
      </div>
      <p className="font-playfair font-light text-white text-xl">{value}</p>
    </div>
  );
}

// ─── Floor Plan Wireframe Placeholder ─────────────────────────
function FloorPlanWireframe({ type }: { type: string }) {
  const rooms = type.includes('4') ? 4 : type.includes('3') ? 3 : 2;

  return (
    <div className="absolute inset-8 flex flex-col gap-2 opacity-15" aria-hidden="true">
      {/* Master bedroom */}
      <div className="flex gap-2 flex-1">
        <div className="flex-[2] border border-gold/40 flex items-center justify-center">
          <span className="font-dm-sans text-[8px] text-white/60 uppercase tracking-wider">Master BR</span>
        </div>
        {rooms >= 3 && (
          <div className="flex-1 border border-gold/30 flex items-center justify-center">
            <span className="font-dm-sans text-[8px] text-white/60 uppercase tracking-wider">BR 2</span>
          </div>
        )}
      </div>

      {/* Living + Kitchen */}
      <div className="flex gap-2 flex-[1.5]">
        <div className="flex-[3] border border-gold/40 flex items-center justify-center">
          <span className="font-dm-sans text-[8px] text-white/60 uppercase tracking-wider">Living / Dining</span>
        </div>
        <div className="flex-1 border border-gold/30 flex items-center justify-center">
          <span className="font-dm-sans text-[8px] text-white/60 uppercase tracking-wider">Kitchen</span>
        </div>
      </div>

      {/* Additional rooms for 3/4 BHK */}
      {rooms >= 3 && (
        <div className="flex gap-2 flex-1">
          <div className="flex-1 border border-gold/30 flex items-center justify-center">
            <span className="font-dm-sans text-[8px] text-white/60 uppercase tracking-wider">BR 3</span>
          </div>
          {rooms === 4 && (
            <div className="flex-1 border border-gold/30 flex items-center justify-center">
              <span className="font-dm-sans text-[8px] text-white/60 uppercase tracking-wider">Study</span>
            </div>
          )}
          <div className="flex-[2] border border-gold/20 flex items-center justify-center">
            <span className="font-dm-sans text-[8px] text-white/60 uppercase tracking-wider">Balcony</span>
          </div>
        </div>
      )}
    </div>
  );
}
