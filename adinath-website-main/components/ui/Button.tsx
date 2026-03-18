// components/ui/Button.tsx
// ─────────────────────────────────────────────────────────────
// Reusable button component.
// Variants: 'gold' (filled gold), 'outline' (gold border), 'ghost' (text only)
// Works as both <button> and <a> (via href prop)
// ─────────────────────────────────────────────────────────────

'use client';

import { cn } from '@/utils/cn';
import { type ReactNode } from 'react';

// ─── Props ────────────────────────────────────────────────────
interface ButtonProps {
  children: ReactNode;
  variant?: 'gold' | 'outline' | 'ghost';
  href?: string;           // If provided, renders as an anchor tag
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  'aria-label'?: string;
}

// ─── Variant Styles ───────────────────────────────────────────
const variants = {
  // Filled gold — primary CTA
  gold: `
    bg-gold text-black font-medium
    hover:bg-gold-light active:bg-gold-dark
    shadow-[0_0_20px_rgba(223,193,94,0.25)]
    hover:shadow-[0_0_30px_rgba(223,193,94,0.4)]
  `,
  // Gold outline — secondary CTA
  outline: `
    bg-transparent text-gold border border-gold/70
    hover:border-gold hover:bg-gold/5
    hover:shadow-[0_0_15px_rgba(223,193,94,0.1)]
  `,
  // Ghost — minimal, text only
  ghost: `
    bg-transparent text-white/70
    hover:text-gold hover:bg-white/5
  `,
};

// ─── Shared base styles ───────────────────────────────────────
const base = `
  inline-flex items-center justify-center gap-2
  px-7 py-3.5
  text-sm tracking-[0.12em] uppercase font-dm-sans
  transition-all duration-300 ease-out
  cursor-pointer select-none
  disabled:opacity-40 disabled:cursor-not-allowed
`;

// ─── Button Component ─────────────────────────────────────────
export default function Button({
  children,
  variant = 'gold',
  href,
  onClick,
  className,
  type = 'button',
  disabled = false,
  'aria-label': ariaLabel,
}: ButtonProps) {
  const styles = cn(base, variants[variant], className);

  // Render as anchor if href is provided
  if (href) {
    return (
      <a
        href={href}
        className={styles}
        aria-label={ariaLabel}
        // Smooth scroll for on-page anchor links
        onClick={(e) => {
          if (href.startsWith('#')) {
            e.preventDefault();
            const el = document.querySelector(href);
            el?.scrollIntoView({ behavior: 'smooth' });
          }
          onClick?.();
        }}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={styles}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}
