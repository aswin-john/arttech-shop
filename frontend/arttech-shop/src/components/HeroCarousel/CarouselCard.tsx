import type { ReactNode } from 'react';

interface CarouselCardProps {
  /** Whether this card is the currently active/focused card */
  active: boolean;
  children: ReactNode;
}

/**
 * Individual carousel card with active/inactive visual states.
 * Active: full scale, no blur, visible title.
 * Inactive: scaled down, blurred, hidden title.
 */
export function CarouselCard({ active, children }: CarouselCardProps): ReactNode {
  return (
    <div
      className={`carousel-card shrink-0
                  w-[50%]
                  h-[280px] md:h-[320px] lg:h-[360px]
                  transition-all duration-500
                  ${active ? 'active' : ''}`}
      style={{ transitionTimingFunction: 'var(--ease-out-expo)' }}
    >
      {children}
    </div>
  );
}
