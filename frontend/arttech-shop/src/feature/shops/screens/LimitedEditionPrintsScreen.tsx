import type { ReactNode } from 'react';
import { ArtworkGrid } from '../components/ArtworkGrid';
import { LIMITED_EDITION_PRINTS } from '../data/mockData';

/**
 * Route screen for `/shops/limited-edition-prints`.
 * Renders the collection of limited edition prints with size variants.
 */
export function LimitedEditionPrintsScreen(): ReactNode {
  return (
    <ArtworkGrid
      heading="Limited Edition Prints"
      description="Museum-quality giclée prints on archival paper. Each size is a limited run — grab yours before they're gone."
      items={LIMITED_EDITION_PRINTS}
    />
  );
}
