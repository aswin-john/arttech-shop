import type { ReactNode } from 'react';

/**
 * Shops screen — placeholder for the shops listing page.
 * Will be expanded with product grid, filters, and categories.
 */
export function ShopsScreen(): ReactNode {
  return (
    <section className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center">
      <h1 className="text-3xl font-display font-bold text-[var(--color-text-primary)] dark:text-[var(--color-dark-text-primary)] mb-4">
        Shops
      </h1>
      <p className="text-lg text-[var(--color-text-secondary)] dark:text-[var(--color-dark-text-secondary)] max-w-md">
        Our curated collection is coming soon. Stay tuned for premium art &amp; tech products.
      </p>
    </section>
  );
}
