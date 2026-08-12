import { useEffect, useRef, type ReactNode } from 'react';
import type { ArtworkProduct } from '../types';
import { ArtworkCard } from './ArtworkCard';

interface ArtworkGridProps {
  heading: string;
  description?: string;
  items: ArtworkProduct[];
}

/**
 * Responsive grid layout for artwork products.
 * Handles the page heading, staggered entrance animation, and
 * mobile-first column breakpoints (1 → 2 → 3 columns).
 */
export function ArtworkGrid({
  heading,
  description,
  items,
}: ArtworkGridProps): ReactNode {
  const gridRef = useRef<HTMLDivElement>(null);

  /* Staggered fade-in on mount via IntersectionObserver */
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const cards = grid.querySelectorAll<HTMLElement>('[data-animate]');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const delay = Number(el.dataset.delay ?? 0);
            setTimeout(() => {
              el.classList.remove('opacity-0', 'translate-y-6');
              el.classList.add('opacity-100', 'translate-y-0');
            }, delay);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.1 },
    );

    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, [items]);

  return (
    <section
      className="w-full bg-[var(--color-surface)] dark:bg-[var(--color-dark-surface)]
                 transition-colors duration-300"
    >
      <div className="mx-auto w-full max-w-none px-4 sm:px-8 lg:px-16 xl:px-24 2xl:px-32 py-12 md:py-16 lg:py-20">
        {/* Page heading */}
        <div className="mb-10 md:mb-14 lg:mb-16 text-center">
          <h1
            className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold
                       text-[var(--color-text-primary)] dark:text-[var(--color-dark-text-primary)]"
          >
            {heading}
          </h1>
          {description && (
            <p
              className="mt-4 mx-auto max-w-2xl text-base sm:text-lg
                         text-[var(--color-text-secondary)] dark:text-[var(--color-dark-text-secondary)]"
            >
              {description}
            </p>
          )}
        </div>

        {/* Responsive grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5
                     gap-6 lg:gap-8 xl:gap-10"
        >
          {items.map((item, index) => (
            <div
              key={item.id}
              data-animate
              data-delay={index * 100}
              className="opacity-0 translate-y-6 transition-all duration-500 ease-[var(--ease-out-expo)]"
            >
              <ArtworkCard product={item} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
