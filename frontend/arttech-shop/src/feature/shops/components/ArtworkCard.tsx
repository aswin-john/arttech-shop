import { useState, type ReactNode } from 'react';
import type {
  ArtworkProduct,
  OriginalArtwork,
  LimitedEditionPrint,
  SizeVariant,
} from '../types';
import { formatPrice, isFullySoldOut, isVariantSoldOut } from '../types';

interface ArtworkCardProps {
  product: ArtworkProduct;
}

/**
 * Unified card component for both Original Artworks and Limited Edition Prints.
 * Conditionally renders size selector, stock indicators, and sold badges
 * based on the product type discriminator.
 */
export function ArtworkCard({ product }: ArtworkCardProps): ReactNode {
  const isOriginal = product.type === 'original';
  const isSold = isOriginal
    ? (product as OriginalArtwork).isSold
    : isFullySoldOut(product as LimitedEditionPrint);

  return (
    <article
      id={`artwork-${product.id}`}
      className={`group relative flex flex-col overflow-hidden rounded-2xl
                  border border-[var(--color-border)] dark:border-[var(--color-dark-border)]
                  bg-[var(--color-surface)] dark:bg-[var(--color-dark-surface-elevated)]
                  transition-all duration-300 ease-[var(--ease-out-expo)]
                  hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_8px_30px_rgba(0,0,0,0.4)]
                  hover:scale-[1.02]`}
    >
      {/* Image container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[var(--color-surface-elevated)] dark:bg-[#1a1a24] p-4 flex items-center justify-center 
      ">
        <img
          src={product.image}
          alt={product.title}
          loading="lazy"
          className={`max-h-full max-w-full object-contain transition-transform duration-500 ease-[var(--ease-out-expo)]
                     group-hover:scale-105 drop-shadow-lg 
                     ${isSold ? 'grayscale opacity-60' : ''}`}
        />

        {/* Sold / Out of Stock overlay badge */}
        {isSold && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 z-10">
            <span
              className="rounded-full bg-red-600 px-4 py-1.5 text-xs font-bold uppercase
                         tracking-widest text-white shadow-lg"
            >
              {isOriginal ? 'Sold' : 'Out of Stock'}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-2 p-5 sm:p-6 bg-[var(--color-surface)] dark:bg-[var(--color-dark-surface-elevated)]">
        <h3
          className="font-display text-lg font-semibold leading-snug
                     text-[var(--color-text-primary)] dark:text-[var(--color-dark-text-primary)]
                     line-clamp-2"
        >
          {product.title}
        </h3>

        <p
          className="text-sm text-[var(--color-text-secondary)]
                     dark:text-[var(--color-dark-text-secondary)]"
        >
          {product.subtitle}
        </p>

        {/* Price + variant selector */}
        {isOriginal ? (
          <OriginalPriceBlock product={product as OriginalArtwork} />
        ) : (
          <PrintVariantBlock product={product as LimitedEditionPrint} />
        )}
      </div>
    </article>
  );
}

/* ─── Original Artwork: simple price ─── */

function OriginalPriceBlock({
  product,
}: {
  product: OriginalArtwork;
}): ReactNode {
  return (
    <p
      className={`mt-auto pt-2 font-body text-lg font-bold
                  ${
                    product.isSold
                      ? 'text-[var(--color-text-muted)] dark:text-[var(--color-dark-text-muted)] line-through'
                      : 'text-[var(--color-brand-700)] dark:text-[var(--color-brand-400)]'
                  }`}
    >
      {formatPrice(product.price)}
    </p>
  );
}

/* ─── Limited Edition Print: size pills + stock counter ─── */

function PrintVariantBlock({
  product,
}: {
  product: LimitedEditionPrint;
}): ReactNode {
  const firstAvailable = product.variants.find((v) => !isVariantSoldOut(v));
  const [selected, setSelected] = useState<SizeVariant>(
    firstAvailable ?? product.variants[0],
  );

  const allSoldOut = isFullySoldOut(product);
  const remaining = selected.totalEditions - selected.soldCount;
  const selectedSoldOut = isVariantSoldOut(selected);

  return (
    <div className="mt-auto flex flex-col gap-3 pt-2">
      {/* Size pills */}
      <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Select size">
        {product.variants.map((variant) => {
          const soldOut = isVariantSoldOut(variant);
          const isActive = variant.size === selected.size;

          return (
            <button
              key={variant.size}
              type="button"
              role="radio"
              aria-checked={isActive}
              aria-label={`${variant.size}${soldOut ? ' — sold out' : ''}`}
              disabled={soldOut}
              onClick={() => setSelected(variant)}
              className={`rounded-full px-3 py-1 text-xs font-semibold
                         transition-all duration-200
                         ${
                           soldOut
                             ? 'cursor-not-allowed bg-[var(--color-border-subtle)] text-[var(--color-text-muted)] line-through dark:bg-[var(--color-dark-border)] dark:text-[var(--color-dark-text-muted)]'
                             : isActive
                               ? 'bg-[var(--color-brand-600)] text-white shadow-sm dark:bg-[var(--color-brand-500)]'
                               : 'bg-[var(--color-surface-elevated)] text-[var(--color-text-secondary)] hover:bg-[var(--color-brand-100)] dark:bg-[var(--color-dark-surface)] dark:text-[var(--color-dark-text-secondary)] dark:hover:bg-[var(--color-dark-border)]'
                         }`}
            >
              {variant.size}
            </button>
          );
        })}
      </div>

      {/* Price */}
      <p
        className={`font-body text-lg font-bold
                    ${
                      allSoldOut
                        ? 'text-[var(--color-text-muted)] dark:text-[var(--color-dark-text-muted)] line-through'
                        : 'text-[var(--color-brand-700)] dark:text-[var(--color-brand-400)]'
                    }`}
      >
        {formatPrice(selected.price)}
      </p>

      {/* Stock indicator */}
      {!allSoldOut && !selectedSoldOut && (
        <p className="text-xs text-[var(--color-text-muted)] dark:text-[var(--color-dark-text-muted)]">
          {remaining} / {selected.totalEditions} left
        </p>
      )}
    </div>
  );
}
