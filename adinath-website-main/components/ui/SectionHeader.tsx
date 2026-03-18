// components/ui/SectionHeader.tsx
// ─────────────────────────────────────────────────────────────
// Reusable section header with:
//   - Small uppercase label (e.g. "Project Highlights")
//   - Large Playfair Display heading
//   - Optional subtitle paragraph
//   - Scroll-triggered fade-up animation via Framer Motion
// ─────────────────────────────────────────────────────────────

'use client';

import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';

// ─── Props ────────────────────────────────────────────────────
interface SectionHeaderProps {
  label?: string;          // Small all-caps label above heading
  heading: string;         // Main heading (Playfair Display)
  subheading?: string;     // Optional paragraph below heading
  align?: 'left' | 'center' | 'right';
  light?: boolean;         // If true, renders on light background
  className?: string;
}

// ─── Animation Variants ───────────────────────────────────────
const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.4, 0, 0.2, 1] } },
};

// ─── Component ────────────────────────────────────────────────
export default function SectionHeader({
  label,
  heading,
  subheading,
  align = 'center',
  light = false,
  className,
}: SectionHeaderProps) {
  const alignClass = {
    left: 'text-left items-start',
    center: 'text-center items-center',
    right: 'text-right items-end',
  }[align];

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      className={cn('flex flex-col gap-4', alignClass, className)}
    >
      {/* Small uppercase label */}
      {label && (
        <motion.p
          variants={item}
          className={cn(
            'text-xs tracking-[0.35em] uppercase font-dm-sans font-medium',
            light ? 'text-black/50' : 'text-gold/80'
          )}
        >
          {label}
        </motion.p>
      )}

      {/* Gold rule above heading */}
      <motion.div
        variants={item}
        className={cn(
          'h-px w-12 bg-gold',
          align === 'center' && 'self-center',
          align === 'right' && 'self-end'
        )}
      />

      {/* Main heading */}
      <motion.h2
        variants={item}
        className={cn(
          'font-playfair font-light leading-[1.1]',
          'text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem]',
          light ? 'text-black' : 'text-white'
        )}
      >
        {heading}
      </motion.h2>

      {/* Optional subheading */}
      {subheading && (
        <motion.p
          variants={item}
          className={cn(
            'font-dm-sans font-light leading-relaxed max-w-2xl',
            'text-sm sm:text-base',
            light ? 'text-black/60' : 'text-white/50'
          )}
        >
          {subheading}
        </motion.p>
      )}
    </motion.div>
  );
}
