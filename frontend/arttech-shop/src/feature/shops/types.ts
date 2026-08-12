/** A single size variant for limited edition prints */
export interface SizeVariant {
  size: string;
  price: number;
  totalEditions: number;
  soldCount: number;
}

/** Base fields shared by all artwork products */
interface BaseArtwork {
  id: string;
  title: string;
  subtitle: string;
  image: string;
}

/** An original (one-of-a-kind) artwork — fixed size, single price */
export interface OriginalArtwork extends BaseArtwork {
  type: 'original';
  price: number;
  isSold: boolean;
}

/** A limited-edition print — multiple sizes, each with its own stock */
export interface LimitedEditionPrint extends BaseArtwork {
  type: 'limited-edition';
  variants: SizeVariant[];
}

/** Union type for any artwork product */
export type ArtworkProduct = OriginalArtwork | LimitedEditionPrint;

/**
 * Check whether a limited-edition print is completely sold out
 * (every size variant has sold all its editions).
 */
export function isFullySoldOut(print: LimitedEditionPrint): boolean {
  return print.variants.every((v) => v.soldCount >= v.totalEditions);
}

/**
 * Check whether a specific size variant is sold out.
 */
export function isVariantSoldOut(variant: SizeVariant): boolean {
  return variant.soldCount >= variant.totalEditions;
}

/**
 * Format a number as Indian Rupee price with commas.
 * e.g. 15000 → "₹15,000"
 */
export function formatPrice(amount: number): string {
  return `₹${amount.toLocaleString('en-IN')}`;
}
