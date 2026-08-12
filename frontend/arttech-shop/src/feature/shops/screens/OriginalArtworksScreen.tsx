import type { ReactNode } from 'react';
import { ArtworkGrid } from '../components/ArtworkGrid';
import { ORIGINAL_ARTWORKS } from '../data/mockData';

/**
 * Route screen for `/shops/original-artworks`.
 * Renders the full collection of original (one-of-a-kind) artworks.
 */
export function OriginalArtworksScreen(): ReactNode {
  return (
    <ArtworkGrid
      heading="Original Artworks"
      description="One-of-a-kind pieces created with passion. Each artwork is unique — once sold, it's gone forever."
      items={ORIGINAL_ARTWORKS}
    />
  );
}
