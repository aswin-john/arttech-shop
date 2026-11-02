import type { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { ORIGINAL_ARTWORKS } from '../data/mockData';
import { ShopPageLayout } from '../components/ShopPageLayout';

/**
 * Route screen for `/shops/original-artworks`.
 * Renders the full collection of original (one-of-a-kind) artworks using the master-detail layout.
 */
export function OriginalArtworksScreen(): ReactNode {
  const navigate = useNavigate();

  return (
    <ShopPageLayout
      heading="Original Artworks"
      items={ORIGINAL_ARTWORKS}
      heroTag="ORIGINAL ARTWORKS"
      heroTitle={<>One-of-a-kind<br />pieces created<br />with passion.</>}
      heroSubtitle="Each artwork is unique — once sold, it's gone forever."
      heroImage={ORIGINAL_ARTWORKS[0]?.image || ''}
      isOriginal={true}
      onNavigateAlternate={() => navigate('/shops/limited-edition-prints')}
    />
  );
}
