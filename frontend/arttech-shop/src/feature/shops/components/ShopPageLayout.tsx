import { useEffect, useState, type ReactNode } from 'react';
import type { ArtworkProduct, LimitedEditionPrint, OriginalArtwork, SizeVariant } from '../types';
import { ArtworkCard } from './ArtworkCard';
import { formatPrice, isVariantSoldOut } from '../types';

interface ShopPageLayoutProps {
  heading: string;
  items: ArtworkProduct[];
  heroTag: string;
  heroTitle: ReactNode;
  heroSubtitle: string;
  heroImage: string;
  isOriginal: boolean;
  onNavigateAlternate: () => void;
}

export function ShopPageLayout({
  heading,
  items,
  heroTag,
  heroTitle,
  heroSubtitle,
  heroImage,
  isOriginal,
  onNavigateAlternate,
}: ShopPageLayoutProps): ReactNode {
  const [selectedProduct, setSelectedProduct] = useState<ArtworkProduct | null>(null);

  return (
    <div className="min-h-screen bg-[var(--color-surface)] dark:bg-[#0a0a0a] text-[var(--color-text-primary)] dark:text-gray-100 font-sans transition-colors duration-300 pb-20">
      {/* Hero Section */}
      <section className="mx-auto w-full max-w-[1600px] px-4 sm:px-8 lg:px-12 pt-8 pb-12 flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
        <div className="flex-1 space-y-6">
          <p className="text-[#a58652] dark:text-[#c4a46a] text-xs sm:text-sm font-bold tracking-widest uppercase">
            {heroTag}
          </p>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
            {heroTitle}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-xl">
            {heroSubtitle}
          </p>
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <button className="bg-[#0b6e2f] hover:bg-[#095725] text-white px-6 py-3 rounded text-sm font-semibold tracking-wide transition-colors flex items-center gap-2">
              SHOP {isOriginal ? 'ORIGINALS' : 'PRINTS'} <span>→</span>
            </button>
            <button 
              onClick={onNavigateAlternate}
              className="border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 px-6 py-3 rounded text-sm font-semibold tracking-wide transition-colors"
            >
              VIEW {isOriginal ? 'PRINTS' : 'ORIGINALS'}
            </button>
          </div>
        </div>
        <div className="flex-1 w-full lg:w-auto h-[300px] sm:h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl relative">
          <img src={heroImage} alt="Gallery" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
        </div>
      </section>

      {/* Badges Section */}
      <section className="border-y border-gray-200 dark:border-gray-800 bg-white dark:bg-[#111] py-6">
        <div className="mx-auto w-full max-w-[1600px] px-4 sm:px-8 lg:px-12 flex flex-wrap justify-between gap-6 sm:gap-4 text-sm">
          {[
            { title: 'Museum Quality', sub: 'Archival Giclée Prints' },
            { title: 'Limited Run', sub: 'Never Reprinted' },
            { title: 'Premium Materials', sub: 'Archival Paper & Inks' },
            { title: 'Secure Packaging', sub: 'Worldwide Shipping' },
          ].map((b, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded bg-[#f4f4f4] dark:bg-[#1a1a1a] flex items-center justify-center text-[#0b6e2f] border border-gray-200 dark:border-gray-800">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              </div>
              <div>
                <p className="font-semibold">{b.title}</p>
                <p className="text-gray-500 dark:text-gray-400 text-xs">{b.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Main Content: Master-Detail */}
      <section className="mx-auto w-full max-w-[1600px] px-4 sm:px-8 lg:px-12 mt-12 flex flex-col xl:flex-row gap-8 items-start relative">
        
        {/* Left Side: Grid */}
        <div className={`flex-1 w-full transition-all duration-500 ${selectedProduct ? 'xl:w-[60%]' : 'xl:w-full'}`}>
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-display text-2xl font-bold">{heading}</h2>
            <button className="flex items-center gap-2 px-4 py-2 text-sm border border-gray-300 dark:border-gray-700 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
              Filter
            </button>
          </div>

          <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-500 ${!selectedProduct ? 'xl:grid-cols-4 2xl:grid-cols-5' : ''}`}>
            {items.map((item) => (
              <div 
                key={item.id} 
                onClick={() => setSelectedProduct(item)}
                className="cursor-pointer"
              >
                <ArtworkCard product={item} />
              </div>
            ))}
          </div>
          
          <div className="mt-10 flex justify-center">
            <button className="border border-gray-300 dark:border-gray-700 px-8 py-3 rounded text-sm font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              VIEW ALL {isOriginal ? 'ORIGINALS' : 'PRINTS'} →
            </button>
          </div>
        </div>

        {/* Right Side: Detail Panel */}
        {selectedProduct && (
          <div className="w-full xl:w-[450px] 2xl:w-[500px] xl:sticky xl:top-6 bg-white dark:bg-[#111] border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-xl flex-shrink-0 animate-in slide-in-from-right-8 duration-300">
            {/* Header */}
            <div className="flex justify-between items-start mb-6 text-sm text-gray-500">
              <p>Home &gt; {heading} &gt; {selectedProduct.title}</p>
              <div className="flex gap-4">
                <button aria-label="Share" className="hover:text-black dark:hover:text-white"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg></button>
                <button aria-label="Wishlist" className="hover:text-black dark:hover:text-white"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg></button>
              </div>
            </div>

            <div className="flex flex-col gap-6">
              {/* Product Image */}
              <div className="flex gap-4">
                <div className="w-2/3 bg-[#f5f5f5] dark:bg-[#1a1a24] rounded-lg p-4 flex items-center justify-center">
                  <img src={selectedProduct.image} alt={selectedProduct.title} className="w-full h-auto drop-shadow-xl" />
                </div>
                <div className="w-1/3 flex flex-col gap-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className={`bg-[#f5f5f5] dark:bg-[#1a1a24] rounded border-2 ${i === 1 ? 'border-[#0b6e2f]' : 'border-transparent'} p-1`}>
                      <img src={selectedProduct.image} alt="thumbnail" className="w-full h-auto drop-shadow-sm" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Title & Info */}
              <div>
                <h3 className="font-display text-2xl font-bold mb-1">{selectedProduct.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{selectedProduct.subtitle}</p>
                <ProductDetailPricing product={selectedProduct} />
              </div>

              {/* Badges for detail */}
              <div className="bg-[#f9f9f9] dark:bg-[#151515] rounded-lg p-4 border border-gray-200 dark:border-gray-800 space-y-4 text-sm">
                {[
                  { icon: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z', title: 'Museum Quality', sub: 'Archival Giclée Print' },
                  { icon: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z', title: 'Premium Paper', sub: 'Bamboo Paper 290gsm' },
                  { icon: 'M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6', title: 'Limited Run', sub: 'Only 12 prints per size' },
                  { icon: 'M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z', title: 'Secure Packaging', sub: 'Worldwide Shipping' },
                ].map((b, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="text-[#0b6e2f]">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={b.icon}/></svg>
                    </div>
                    <div>
                      <p className="font-semibold text-xs text-gray-900 dark:text-gray-100">{b.title}</p>
                      <p className="text-gray-500 text-xs">{b.sub}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-3">
                <button className="w-full bg-[#0b6e2f] hover:bg-[#095725] text-white py-3 rounded font-bold tracking-wide transition-colors flex items-center justify-center gap-2">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
                  ADD TO CART
                </button>
                <button className="w-full border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 py-3 rounded font-bold tracking-wide transition-colors flex items-center justify-center gap-2 text-sm">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                  ADD TO WISHLIST
                </button>
              </div>

              {/* About */}
              <div className="pt-6 border-t border-gray-200 dark:border-gray-800">
                <h4 className="font-display font-bold text-lg mb-2">About the Artwork</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                  A serene morning in the pine valley, where mist dances between the trees and the forest comes alive.
                </p>
                <table className="text-sm w-full text-gray-700 dark:text-gray-300">
                  <tbody>
                    <tr><td className="py-1 w-24">Paper</td><td className="py-1">: Bamboo Paper 290gsm</td></tr>
                    <tr><td className="py-1">Ink</td><td className="py-1">: Archival Pigment Ink</td></tr>
                    <tr><td className="py-1">Edition</td><td className="py-1">: Limited to 12 per size</td></tr>
                    <tr><td className="py-1">Signed</td><td className="py-1">: Yes, by the artist</td></tr>
                    <tr><td className="py-1">Packaging</td><td className="py-1">: Secure Tube Packaging</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

function ProductDetailPricing({ product }: { product: ArtworkProduct }) {
  if (product.type === 'original') {
    return <OriginalProductDetail product={product as OriginalArtwork} />;
  }
  return <LimitedEditionProductDetail product={product as LimitedEditionPrint} />;
}

function OriginalProductDetail({ product }: { product: OriginalArtwork }) {
  return (
    <div className="mb-4">
      <p className="text-2xl font-bold text-[#0b6e2f]">{formatPrice(product.price)}</p>
      <p className="text-sm text-[#a58652] mt-1">{product.isSold ? 'Sold' : 'Available'}</p>
    </div>
  );
}

function LimitedEditionProductDetail({ product }: { product: LimitedEditionPrint }) {
  const firstAvailable = product.variants.find((v) => !isVariantSoldOut(v));
  const [selected, setSelected] = useState<SizeVariant>(firstAvailable ?? product.variants[0]);

  useEffect(() => {
    const first = product.variants.find((v) => !isVariantSoldOut(v)) ?? product.variants[0];
    setSelected(first);
  }, [product]);

  const remaining = selected.totalEditions - selected.soldCount;

  return (
    <div className="mb-4">
      <p className="text-2xl font-bold text-[#0b6e2f]">{formatPrice(selected.price)}</p>
      <p className="text-sm text-[#a58652] mt-1 mb-4">{remaining} / {selected.totalEditions} left</p>

      <p className="text-xs font-bold uppercase tracking-wider mb-2">SIZE</p>
      <div className="flex gap-2">
        {product.variants.map((v) => (
          <button
            key={v.size}
            onClick={() => setSelected(v)}
            disabled={isVariantSoldOut(v)}
            className={`px-4 py-1.5 rounded-md text-sm font-semibold border ${
              isVariantSoldOut(v)
                ? 'opacity-50 cursor-not-allowed border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800'
                : selected.size === v.size
                ? 'bg-[#0b6e2f] text-white border-[#0b6e2f]'
                : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
            }`}
          >
            {v.size}
          </button>
        ))}
      </div>
    </div>
  );
}
