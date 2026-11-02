import type { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { LIMITED_EDITION_PRINTS } from '../data/mockData';
import { ShopPageLayout } from '../components/ShopPageLayout';

/**
 * Route screen for `/shops/limited-edition-prints`.
 * Renders the collection of limited edition prints using the master-detail layout.
 */
export function LimitedEditionPrintsScreen(): ReactNode {
  const navigate = useNavigate();

  return (
    <ShopPageLayout
      heading="Limited Edition Prints"
      items={LIMITED_EDITION_PRINTS}
      heroTag="LIMITED EDITION"
      heroTitle={<>Museum-quality<br />giclée prints.</>}
      heroSubtitle="Each size is a limited run — grab yours before they're gone."
      heroImage={LIMITED_EDITION_PRINTS[3]?.image || ''}
      isOriginal={false}
      onNavigateAlternate={() => navigate('/shops/original-artworks')}
    />
  );
}
