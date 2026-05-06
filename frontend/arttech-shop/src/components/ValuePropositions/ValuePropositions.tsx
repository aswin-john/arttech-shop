import type { ReactNode } from 'react';

/**
 * Data for each offering/feature card.
 * Icons are defined as separate components below for maintainability.
 */
interface OfferItem {
  id: string;
  label: string;
  icon: ReactNode;
}

/* ─── Icon Components ─── */

/** Medal/badge icon representing premium quality */
function PremiumQualityIcon(): ReactNode {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="48"
      height="48"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="8" r="6" />
      <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
      <path d="M12 2v2" />
      <path d="M12 8l1.5 1.5" />
      <path d="M12 8l-1.5 1.5" />
    </svg>
  );
}

/** Gear/customization icon representing easy customizations */
function CustomizationsIcon(): ReactNode {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="48"
      height="48"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12.22 2h-.44a2 2 0 00-2 2v.18a2 2 0 01-1 1.73l-.43.25a2 2 0 01-2 0l-.15-.08a2 2 0 00-2.73.73l-.22.38a2 2 0 00.73 2.73l.15.1a2 2 0 011 1.72v.51a2 2 0 01-1 1.74l-.15.09a2 2 0 00-.73 2.73l.22.38a2 2 0 002.73.73l.15-.08a2 2 0 012 0l.43.25a2 2 0 011 1.73V20a2 2 0 002 2h.44a2 2 0 002-2v-.18a2 2 0 011-1.73l.43-.25a2 2 0 012 0l.15.08a2 2 0 002.73-.73l.22-.39a2 2 0 00-.73-2.73l-.15-.08a2 2 0 01-1-1.74v-.5a2 2 0 011-1.74l.15-.09a2 2 0 00.73-2.73l-.22-.38a2 2 0 00-2.73-.73l-.15.08a2 2 0 01-2 0l-.43-.25a2 2 0 01-1-1.73V4a2 2 0 00-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

/** Smiley face icon representing 100% satisfaction */
function SatisfactionIcon(): ReactNode {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="48"
      height="48"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M8 14s1.5 2 4 2 4-2 4-2" />
      <line x1="9" y1="9" x2="9.01" y2="9" />
      <line x1="15" y1="9" x2="15.01" y2="9" />
    </svg>
  );
}

/** Delivery truck icon representing free delivery */
function FreeDeliveryIcon(): ReactNode {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="48"
      height="48"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M14 18V6a2 2 0 00-2-2H4a2 2 0 00-2 2v11a1 1 0 001 1h2" />
      <path d="M15 18h2a1 1 0 001-1v-3.65a1 1 0 00-.22-.624l-3.48-4.35A1 1 0 0013.52 8H14" />
      <circle cx="17" cy="18" r="2" />
      <circle cx="7" cy="18" r="2" />
      {/* "FREE" tag indicator */}
      <path d="M5 14h4" />
    </svg>
  );
}

const OFFER_ITEMS: OfferItem[] = [
  {
    id: 'premium-quality',
    label: 'Premium Quality',
    icon: <PremiumQualityIcon />,
  },
  {
    id: 'easy-customizations',
    label: 'Easy Customizations',
    icon: <CustomizationsIcon />,
  },
  {
    id: 'satisfaction-rate',
    label: '100% Satisfaction Rate',
    icon: <SatisfactionIcon />,
  },
  {
    id: 'free-delivery',
    label: 'Pan India Free Delivery',
    icon: <FreeDeliveryIcon />,
  },
];

/**
 * Value Propositions feature highlights section.
 * Displays four value propositions with icons in a responsive grid.
 * Mobile: single column → Tablet: 2 columns → Desktop: 4 columns.
 */
export function ValuePropositions(): ReactNode {
  return (
    <section
      id="what-we-offer"
      className="w-full
                 bg-[var(--color-surface)] dark:bg-[var(--color-dark-surface-elevated)]
                 border-t border-[var(--color-border)] dark:border-[var(--color-dark-border)]
                 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20">
        {/* Section heading */}
        <h2
          className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold
                     text-center
                     text-[var(--color-text-primary)] dark:text-[var(--color-dark-text-primary)]
                     mb-10 md:mb-14 lg:mb-16"
        >
          What We Offer
        </h2>

        {/* Feature grid */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4
                     gap-8 sm:gap-6 lg:gap-8"
        >
          {OFFER_ITEMS.map((item) => (
            <div
              key={item.id}
              id={`offer-${item.id}`}
              className="offer-card flex flex-col items-center text-center
                         py-6 px-4
                         rounded-2xl
                         transition-all duration-300
                         hover:bg-[var(--color-surface-elevated)] dark:hover:bg-[var(--color-dark-surface)]
                         hover:shadow-[0_4px_24px_rgba(0,0,0,0.06)] dark:hover:shadow-[0_4px_24px_rgba(0,0,0,0.3)]
                         group cursor-default"
            >
              {/* Icon container */}
              <div
                className="flex items-center justify-center
                           w-16 h-16 mb-5
                           rounded-xl
                           text-[var(--color-text-secondary)] dark:text-[var(--color-dark-text-secondary)]
                           group-hover:text-[var(--color-brand-600)] dark:group-hover:text-[var(--color-brand-400)]
                           transition-colors duration-300"
              >
                {item.icon}
              </div>

              {/* Label */}
              <span
                className="text-sm sm:text-base font-medium tracking-wide
                           text-[var(--color-text-primary)] dark:text-[var(--color-dark-text-primary)]
                           transition-colors duration-300"
              >
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
