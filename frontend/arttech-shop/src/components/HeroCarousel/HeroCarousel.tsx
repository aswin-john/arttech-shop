import {
  useState,
  useEffect,
  useRef,
  useCallback,
  type ReactNode,
  type TouchEvent as ReactTouchEvent,
} from 'react';
import { CarouselCard } from './CarouselCard';

interface CarouselSlide {
  id: number;
  title: string;
  image: string;
}

const CAROUSEL_DATA: CarouselSlide[] = [
  {
    id: 1,
    title: 'ride the waves.',
    image:
      'https://images.unsplash.com/photo-1468657988500-aca2be09f4c6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1740&q=80',
  },
  {
    id: 2,
    title: 'tread the unknown.',
    image:
      'https://images.unsplash.com/photo-1522163723043-478ef79a5bb4?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1843&q=80',
  },
  {
    id: 3,
    title: 'climb the highest.',
    image:
      'https://images.unsplash.com/photo-1495781856580-b3c4e8d21bf9?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1726&q=80',
  },
  {
    id: 4,
    title: 'escape.',
    image:
      'https://images.unsplash.com/photo-1504903271097-d7e7c7f5f7ad?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1160&q=80',
  },
];

/** Auto-play interval in milliseconds */
const AUTOPLAY_INTERVAL = 5000;

/** Minimum swipe distance in px to trigger slide change */
const SWIPE_THRESHOLD = 50;

/** Chevron left icon */
function ChevronLeftIcon(): ReactNode {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}

/** Chevron right icon */
function ChevronRightIcon(): ReactNode {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

/**
 * Computes the translateX value based on active index, card width, and viewport.
 * Centers the active card in the viewport.
 */
function computeTranslate(
  containerWidth: number,
  activeIndex: number,
): number {
  // Detect breakpoint via container width
  let cardWidthFraction = 0.5; // desktop default (50%)
  if (containerWidth < 640) {
    cardWidthFraction = 1; // mobile: full width
  } else if (containerWidth < 1024) {
    cardWidthFraction = 0.7; // tablet: 70%
  }

  const cardWidth = containerWidth * cardWidthFraction;
  // Center formula: offset = (containerWidth - cardWidth) / 2 - activeIndex * cardWidth
  const centerOffset = (containerWidth - cardWidth) / 2;
  return centerOffset - activeIndex * cardWidth;
}

/**
 * Full-screen hero carousel with:
 * - TranslateX-based sliding
 * - Active card scale/blur effects
 * - Dot indicators + Prev/Next buttons
 * - Auto-play with pause on hover
 * - Touch/swipe support on mobile
 */
export function HeroCarousel(): ReactNode {
  const [activeIndex, setActiveIndex] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const touchStartRef = useRef<number>(0);

  const slideCount = CAROUSEL_DATA.length;

  // Recalculate translateX whenever activeIndex or container size changes
  const updateTranslate = useCallback(() => {
    if (!carouselRef.current) return;
    const containerWidth = carouselRef.current.offsetWidth;
    setTranslateX(computeTranslate(containerWidth, activeIndex));
  }, [activeIndex]);

  useEffect(() => {
    updateTranslate();
  }, [updateTranslate]);

  // Handle window resize
  useEffect(() => {
    function handleResize(): void {
      updateTranslate();
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [updateTranslate]);

  // Auto-play: advance every AUTOPLAY_INTERVAL unless paused
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slideCount);
    }, AUTOPLAY_INTERVAL);

    return () => clearInterval(timer);
  }, [isPaused, slideCount]);

  // Touch support for mobile swiping
  function handleTouchStart(event: ReactTouchEvent): void {
    touchStartRef.current = event.touches[0].clientX;
  }

  function handleTouchEnd(event: ReactTouchEvent): void {
    const touchEnd = event.changedTouches[0].clientX;
    const diff = touchStartRef.current - touchEnd;

    if (Math.abs(diff) > SWIPE_THRESHOLD) {
      if (diff > 0 && activeIndex < slideCount - 1) {
        // Swipe left → next
        setActiveIndex(activeIndex + 1);
      } else if (diff < 0 && activeIndex > 0) {
        // Swipe right → prev
        setActiveIndex(activeIndex - 1);
      }
    }
  }

  function goToPrev(): void {
    if (activeIndex > 0) setActiveIndex(activeIndex - 1);
  }

  function goToNext(): void {
    if (activeIndex < slideCount - 1) setActiveIndex(activeIndex + 1);
  }

  return (
    <section
      id="hero-carousel"
      className="relative w-full h-[calc(100vh-4rem)] lg:h-[calc(100vh-4.5rem)] overflow-hidden bg-[#0a0a0f]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Carousel track */}
      <div
        ref={carouselRef}
        className="flex transition-transform duration-500"
        style={{
          transform: `translateX(${translateX}px)`,
          transitionTimingFunction: 'var(--ease-out-expo)',
        }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {CAROUSEL_DATA.map((slide, index) => (
          <CarouselCard key={slide.id} active={activeIndex === index}>
            <div
              className={`relative w-full h-full bg-cover bg-center transition-all duration-600
                          ${
                            activeIndex === index
                              ? 'scale-100'
                              : 'scale-90 blur-[5px]'
                          }`}
              style={{
                backgroundImage: `url("${slide.image}")`,
                transitionTimingFunction:
                  'cubic-bezier(0.165, 0.84, 0.44, 1)',
              }}
            >
              {/* Dark gradient overlay for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

              {/* Slide title */}
              <div
                className={`absolute left-6 sm:left-10 lg:left-12
                            top-1/2 max-w-[280px] sm:max-w-[320px]
                            transition-all duration-700 delay-200
                            ${
                              activeIndex === index
                                ? 'opacity-100 -translate-y-1/2'
                                : 'opacity-0 -translate-y-[30%]'
                            }`}
                style={{
                  transitionTimingFunction: 'var(--ease-out-expo)',
                }}
              >
                <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight m-0">
                  {slide.title}
                </h2>
              </div>
            </div>
          </CarouselCard>
        ))}
      </div>

      {/* ─── Controls overlay ─── */}
      <div className="absolute bottom-4 sm:bottom-6 left-0 right-0 flex flex-col items-center gap-2.5 sm:gap-3 z-10">
        {/* Dot indicators */}
        <div className="flex items-center gap-2.5" role="tablist" aria-label="Carousel slides">
          {CAROUSEL_DATA.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              role="tab"
              aria-selected={activeIndex === index}
              aria-label={`Slide ${index + 1}: ${slide.title}`}
              onClick={() => setActiveIndex(index)}
              className={`rounded-full border-0 p-0 transition-all duration-300 cursor-pointer
                          ${
                            activeIndex === index
                              ? 'w-8 h-2 bg-white'
                              : 'w-2 h-2 bg-white/40 hover:bg-white/60'
                          }`}
            />
          ))}
        </div>

        {/* Prev / Next buttons */}
        <div className="flex items-center gap-3">
          <button
            id="carousel-prev"
            type="button"
            disabled={activeIndex === 0}
            onClick={goToPrev}
            className="flex items-center justify-center w-10 h-10 rounded-full
                       bg-white/10 backdrop-blur-sm border border-white/20
                       text-white/80 hover:bg-white/20 hover:text-white
                       disabled:opacity-30 disabled:cursor-not-allowed
                       transition-all duration-200 cursor-pointer"
            aria-label="Previous slide"
          >
            <ChevronLeftIcon />
          </button>

          <button
            id="carousel-next"
            type="button"
            disabled={activeIndex === slideCount - 1}
            onClick={goToNext}
            className="flex items-center justify-center w-10 h-10 rounded-full
                       bg-white/10 backdrop-blur-sm border border-white/20
                       text-white/80 hover:bg-white/20 hover:text-white
                       disabled:opacity-30 disabled:cursor-not-allowed
                       transition-all duration-200 cursor-pointer"
            aria-label="Next slide"
          >
            <ChevronRightIcon />
          </button>
        </div>
      </div>
    </section>
  );
}
