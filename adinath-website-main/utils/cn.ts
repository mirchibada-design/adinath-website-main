// utils/cn.ts
// ─────────────────────────────────────────────────────────────
// Utility: merges Tailwind classes cleanly.
// clsx handles conditional classes; tailwind-merge resolves conflicts.
// Usage: cn('px-4 py-2', isActive && 'bg-gold', className)
// ─────────────────────────────────────────────────────────────

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
