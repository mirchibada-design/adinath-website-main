// components/sections/BuildingShowcase.tsx
// ─────────────────────────────────────────────────────────────
// Section 5: Building Showcase (Gallery)
// Horizontal scroll gallery with:
//   - Drag-to-scroll (Framer Motion)
//   - Subtle zoom on hover
//   - Cinematic layout with mixed portrait/landscape ratios
//   - Image labels with fade-in
//   - Scroll progress indicator
// ─────────────────────────────────────────────────────────────

'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import SectionHeader from '@/components/ui/SectionHeader';
import Container from '@/components/Container';
import { GALLERY_IMAGES } from '@/utils/constants';

// ─── Gallery card config ──────────────────────────────────────
// Each card has different width to create an editorial feel
const CARD_WIDTHS = ['w-72', 'w-52', 'w-80', 'w-72', 'w-52', 'w-80'];

export default function BuildingShowcase() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // ── Scroll the track by a fixed amount ────────────────────
  const scroll = (dir: 'left' | 'right') => {
    if (!trackRef.current) return;
    const amount = 360;
    trackRef.current.scrollBy({ left: dir === 'right' ? amount : -amount, behavior: 'smooth' });
  };

  // ── Update arrow button states ─────────────────────────────
  const handleScroll = () => {
    if (!trackRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = trackRef.current;
    setCanScrollLeft(scrollLeft > 20);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 20);
  };

  return (
    <section
      id="gallery"
      className="relative bg-black section-padding overflow-hidden"
      aria-label="Building showcase gallery"
    >
      <Container className="mb-14">
        {/* ── Section Header with Arrow Buttons ─────────────── */}
        <div className="flex items-end justify-between gap-6">
          <SectionHeader
            label="Gallery"
            heading="See the Vision"
            subheading="A glimpse into the spaces that await you at ANANTAM."
            align="left"
          />

          {/* Arrow buttons — desktop */}
          <div className="hidden md:flex items-center gap-3 pb-1">
            <button
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              className="
                w-11 h-11 border border-white/10 flex items-center justify-center
                hover:border-gold/50 hover:text-gold
                disabled:opacity-20 disabled:cursor-not-allowed
                text-white/50 transition-all duration-300
              "
              aria-label="Scroll gallery left"
            >
              <ArrowLeft size={16} aria-hidden="true" />
            </button>
            <button
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              className="
                w-11 h-11 border border-white/10 flex items-center justify-center
                hover:border-gold/50 hover:text-gold
                disabled:opacity-20 disabled:cursor-not-allowed
                text-white/50 transition-all duration-300
              "
              aria-label="Scroll gallery right"
            >
              <ArrowRight size={16} aria-hidden="true" />
            </button>
          </div>
        </div>
      </Container>

      {/* ── Gallery Track ─────────────────────────────────────
          Framer Motion drag + native scroll for both touch and mouse
      ──────────────────────────────────────────────────────── */}
      <motion.div
        ref={trackRef}
        onScroll={handleScroll}
        className="
          flex gap-4 overflow-x-auto scrollbar-hide
          px-6 md:px-[60px] xl:px-[120px]
          cursor-grab active:cursor-grabbing
          select-none
        "
        // Keyboard accessibility: allow arrow key scrolling
        role="region"
        aria-label="Gallery images, scroll horizontally"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'ArrowRight') scroll('right');
          if (e.key === 'ArrowLeft') scroll('left');
        }}
      >
        {GALLERY_IMAGES.map((image, i) => (
          <GalleryCard
            key={image.id}
            image={image}
            index={i}
            widthClass={CARD_WIDTHS[i % CARD_WIDTHS.length]}
          />
        ))}

        {/* Trailing spacer */}
        <div className="w-6 flex-shrink-0" aria-hidden="true" />
      </motion.div>

      {/* ── Scroll hint for mobile ─────────────────────────── */}
      <p className="md:hidden text-center font-dm-sans text-xs tracking-widest text-white/20 mt-6 uppercase">
        Swipe to explore
      </p>
    </section>
  );
}

// ─── Individual Gallery Card ──────────────────────────────────
function GalleryCard({
  image,
  index,
  widthClass,
}: {
  image: typeof GALLERY_IMAGES[number];
  index: number;
  widthClass: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      className={`
        relative flex-shrink-0 ${widthClass}
        ${image.aspect === 'portrait' ? 'h-[450px]' : 'h-[340px]'}
        overflow-hidden group image-placeholder
      `}
      aria-label={`Gallery: ${image.label}`}
    >
      {/* Real image */}
      <motion.div
        className="absolute inset-0"
        whileHover={{ scale: 1.04 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      >
        <Image
          src={`/images/${image.id}.jpg`}
          fill
          alt={image.label}
          className="object-cover object-center"
          sizes="(max-width: 768px) 80vw, 400px"
          loading={index === 0 ? 'eager' : 'lazy'}
        />
      </motion.div>

      {/* Hover overlay */}
      <div
        className="
          absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent
          opacity-0 group-hover:opacity-100 transition-opacity duration-500
        "
        aria-hidden="true"
      />

      {/* Image label */}
      <div
        className="
          absolute bottom-0 left-0 right-0 p-5
          translate-y-4 group-hover:translate-y-0
          opacity-0 group-hover:opacity-100
          transition-all duration-400 ease-out
        "
      >
        <p className="font-dm-sans text-xs tracking-[0.25em] uppercase text-gold/80">
          {image.label}
        </p>
        <div className="w-6 h-px bg-gold/40 mt-2" aria-hidden="true" />
      </div>

      {/* Top number badge */}
      <div className="absolute top-4 right-4">
        <span className="font-playfair text-white/20 text-2xl font-light">
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>
    </motion.div>
  );
}
