import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

/** Category card data for the landing page */
interface CategoryCard {
  id: string;
  title: string;
  description: string;
  href: string;
  icon: ReactNode;
}

const CATEGORIES: CategoryCard[] = [
  {
    id: 'original-artworks',
    title: 'Original Artworks',
    description:
      'Unique, one-of-a-kind paintings and mixed-media pieces. Each artwork is an original creation that can never be replicated.',
    href: '/shops/original-artworks',
    icon: <PaletteIcon />,
  },
  {
    id: 'limited-edition-prints',
    title: 'Limited Edition Prints',
    description:
      'Museum-quality giclée prints on archival paper. Available in multiple sizes with strictly limited runs.',
    href: '/shops/limited-edition-prints',
    icon: <PrintIcon />,
  },
];

/**
 * Landing page for `/shops`.
 * Displays two prominent category cards that link to each sub-section.
 */
export function ShopsLanding(): ReactNode {
  return (
    <section
      className="w-full bg-[var(--color-surface)] dark:bg-[var(--color-dark-surface)]
                 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20">
        {/* Page heading */}
        <div className="mb-10 md:mb-14 lg:mb-16 text-center">
          <h1
            className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold
                       text-[var(--color-text-primary)] dark:text-[var(--color-dark-text-primary)]"
          >
            Our Collections
          </h1>
          <p
            className="mt-4 mx-auto max-w-2xl text-base sm:text-lg
                       text-[var(--color-text-secondary)] dark:text-[var(--color-dark-text-secondary)]"
          >
            Explore our curated selection of premium art — from unique originals
            to collectible limited edition prints.
          </p>
        </div>

        {/* Category cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto">
          {CATEGORIES.map((category) => (
            <Link
              key={category.id}
              to={category.href}
              id={`category-${category.id}`}
              className="group relative flex flex-col items-center gap-5 p-8 sm:p-10
                         rounded-2xl border border-[var(--color-border)] dark:border-[var(--color-dark-border)]
                         bg-[var(--color-surface-elevated)] dark:bg-[var(--color-dark-surface-elevated)]
                         transition-all duration-300 ease-[var(--ease-out-expo)]
                         hover:shadow-[0_12px_40px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_12px_40px_rgba(0,0,0,0.5)]
                         hover:scale-[1.02] hover:border-[var(--color-brand-300)] dark:hover:border-[var(--color-brand-700)]
                         text-center no-underline"
            >
              {/* Icon */}
              <div
                className="flex items-center justify-center w-16 h-16
                           rounded-xl
                           bg-[var(--color-brand-50)] dark:bg-[var(--color-brand-900)]/30
                           text-[var(--color-brand-600)] dark:text-[var(--color-brand-400)]
                           group-hover:scale-110 transition-transform duration-300"
              >
                {category.icon}
              </div>

              <h2
                className="font-display text-xl sm:text-2xl font-bold
                           text-[var(--color-text-primary)] dark:text-[var(--color-dark-text-primary)]"
              >
                {category.title}
              </h2>

              <p
                className="text-sm sm:text-base
                           text-[var(--color-text-secondary)] dark:text-[var(--color-dark-text-secondary)]
                           leading-relaxed"
              >
                {category.description}
              </p>

              {/* CTA arrow */}
              <span
                className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold
                           text-[var(--color-brand-600)] dark:text-[var(--color-brand-400)]
                           group-hover:gap-2.5 transition-all duration-300"
              >
                Browse Collection
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Icon Components ─── */

function PaletteIcon(): ReactNode {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" />
      <circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
      <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" />
      <circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
    </svg>
  );
}

function PrintIcon(): ReactNode {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <rect x="7" y="7" width="10" height="10" rx="1" />
      <path d="M7 2v2" />
      <path d="M17 2v2" />
      <path d="M2 7h2" />
      <path d="M2 17h2" />
      <path d="M20 7h2" />
      <path d="M20 17h2" />
      <path d="M7 20v2" />
      <path d="M17 20v2" />
    </svg>
  );
}
