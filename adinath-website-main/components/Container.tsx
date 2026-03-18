// components/Container.tsx
// ─────────────────────────────────────────────────────────────
// Global layout container with responsive horizontal margins.
//   Desktop (xl 1280px+): 120px padding on each side
//   Tablet  (md 768px+):   60px padding on each side
//   Mobile  (< 768px):     24px padding on each side
//
// Usage: wrap the inner content of any section with <Container>
// instead of manually adding px- classes everywhere.
//
// Example:
//   <section className="bg-black py-24">
//     <Container>
//       <h2>...</h2>
//     </Container>
//   </section>
// ─────────────────────────────────────────────────────────────

import { cn } from '@/utils/cn';
import type { ReactNode, ElementType } from 'react';

interface ContainerProps {
  children: ReactNode;
  className?: string;
  /** Render as a different HTML element (default: div) */
  as?: ElementType;
}

export default function Container({
  children,
  className,
  as: Tag = 'div',
}: ContainerProps) {
  return (
    <Tag
      className={cn(
        // Full width, centred, max width cap for ultra-wide screens
        'w-full mx-auto max-w-[1680px]',
        // ── Responsive horizontal padding ──────────────────
        'px-6',           // 24px  — mobile
        'md:px-[60px]',   // 60px  — tablet  (768px+)
        'xl:px-[120px]',  // 120px — desktop (1280px+)
        className
      )}
    >
      {children}
    </Tag>
  );
}
