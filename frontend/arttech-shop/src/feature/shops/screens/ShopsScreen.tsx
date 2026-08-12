import type { ReactNode } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ShopsLanding } from './ShopsLanding';
import { OriginalArtworksScreen } from './OriginalArtworksScreen';
import { LimitedEditionPrintsScreen } from './LimitedEditionPrintsScreen';

/**
 * Shops route container with nested sub-routes:
 *   /shops                        → ShopsLanding
 *   /shops/original-artworks      → OriginalArtworksScreen
 *   /shops/limited-edition-prints → LimitedEditionPrintsScreen
 */
export function ShopsScreen(): ReactNode {
  return (
    <Routes>
      <Route index element={<ShopsLanding />} />
      <Route path="original-artworks" element={<OriginalArtworksScreen />} />
      <Route
        path="limited-edition-prints"
        element={<LimitedEditionPrintsScreen />}
      />
    </Routes>
  );
}
