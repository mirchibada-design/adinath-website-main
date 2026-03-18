// components/ui/GoldDivider.tsx
// ─────────────────────────────────────────────────────────────
// A decorative gold horizontal rule used between sections.
// Animates in on scroll using Framer Motion.
// ─────────────────────────────────────────────────────────────

'use client';

import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';

interface GoldDividerProps {
  className?: string;
  width?: 'sm' | 'md' | 'lg' | 'full'; // Control line width
}

export default function GoldDivider({ className, width = 'md' }: GoldDividerProps) {
  const widthClass = {
    sm: 'w-16',
    md: 'w-24',
    lg: 'w-48',
    full: 'w-full',
  }[width];

  return (
    <motion.div
      initial={{ scaleX: 0, opacity: 0 }}
      whileInView={{ scaleX: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
      className={cn(
        'h-px origin-left',
        widthClass,
        // Gradient: fade on both ends, solid gold in center
        'bg-gradient-to-r from-transparent via-gold to-transparent',
        className
      )}
      role="separator"
      aria-hidden="true"
    />
  );
}
