import type { OriginalArtwork, LimitedEditionPrint } from '../types';

/** Resolve a public asset path using Vite's configured base URL */
const base = import.meta.env.BASE_URL;
function asset(path: string): string {
  // Avoid double slashes: base already ends with '/', path starts with '/'
  return `${base}${path.startsWith('/') ? path.slice(1) : path}`;
}

export const ORIGINAL_ARTWORKS: OriginalArtwork[] = [
  {
    id: 'oa-1',
    title: 'Sunset Over the Hills',
    subtitle: 'Oil on Canvas — 36 × 48 in',
    image: asset('/images/artworks/sunset-hills.png'),
    type: 'original',
    price: 85000,
    isSold: false,
  },
  {
    id: 'oa-2',
    title: 'Geometric Reverie',
    subtitle: 'Mixed Media on Canvas — 40 × 50 in',
    image: asset('/images/artworks/geometric-blue.png'),
    type: 'original',
    price: 120000,
    isSold: true,
  },
  {
    id: 'oa-3',
    title: 'Whispers of the Forest',
    subtitle: 'Watercolour on Paper — 24 × 24 in',
    image: asset('/images/artworks/misty-forest.png'),
    type: 'original',
    price: 45000,
    isSold: false,
  },
  {
    id: 'oa-4',
    title: 'Cerulean Depths',
    subtitle: 'Acrylic on Canvas — 48 × 72 in',
    image: asset('/images/artworks/ocean-abstract.png'),
    type: 'original',
    price: 175000,
    isSold: false,
  },
  {
    id: 'oa-5',
    title: 'Poppy Meadow at Dawn',
    subtitle: 'Oil on Linen — 30 × 40 in',
    image: asset('/images/artworks/floral-garden.png'),
    type: 'original',
    price: 95000,
    isSold: true,
  },
];

export const LIMITED_EDITION_PRINTS: LimitedEditionPrint[] = [
  {
    id: 'lep-1',
    title: 'City at Dusk',
    subtitle: 'Archival Giclée on Hahnemühle',
    image: asset('/images/artworks/urban-skyline.png'),
    type: 'limited-edition',
    variants: [
      { size: 'A3', price: 3500, totalEditions: 15, soldCount: 12 },
      { size: 'A2', price: 5500, totalEditions: 10, soldCount: 10 },
      { size: 'A1', price: 8500, totalEditions: 5, soldCount: 2 },
    ],
  },
  {
    id: 'lep-2',
    title: 'Botanical Study — Monstera & Fern',
    subtitle: 'Archival Giclée on Cotton Rag',
    image: asset('/images/artworks/botanical-fern.png'),
    type: 'limited-edition',
    variants: [
      { size: 'A4', price: 2000, totalEditions: 20, soldCount: 20 },
      { size: 'A3', price: 3500, totalEditions: 15, soldCount: 15 },
      { size: 'A2', price: 5000, totalEditions: 10, soldCount: 10 },
    ],
  },
  {
    id: 'lep-3',
    title: 'Terracotta Flow',
    subtitle: 'Archival Giclée on Hahnemühle',
    image: asset('/images/artworks/abstract-warmth.png'),
    type: 'limited-edition',
    variants: [
      { size: 'A3', price: 3000, totalEditions: 15, soldCount: 5 },
      { size: 'A2', price: 4500, totalEditions: 10, soldCount: 3 },
      { size: 'A1', price: 7000, totalEditions: 5, soldCount: 0 },
    ],
  },
  {
    id: 'lep-4',
    title: 'Morning Mist — Pine Valley',
    subtitle: 'Archival Giclée on Bamboo Paper',
    image: asset('/images/artworks/misty-forest.png'),
    type: 'limited-edition',
    variants: [
      { size: 'A3', price: 3200, totalEditions: 12, soldCount: 8 },
      { size: 'A2', price: 5000, totalEditions: 8, soldCount: 8 },
      { size: 'A1', price: 7500, totalEditions: 4, soldCount: 1 },
    ],
  },
  {
    id: 'lep-5',
    title: 'Azure Tempest',
    subtitle: 'Archival Giclée on Cotton Rag',
    image: asset('/images/artworks/ocean-abstract.png'),
    type: 'limited-edition',
    variants: [
      { size: 'A3', price: 4000, totalEditions: 10, soldCount: 7 },
      { size: 'A2', price: 6000, totalEditions: 8, soldCount: 4 },
      { size: 'A1', price: 9000, totalEditions: 3, soldCount: 0 },
    ],
  },
];
