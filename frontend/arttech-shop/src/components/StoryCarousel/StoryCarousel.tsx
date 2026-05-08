import { useState, useCallback, useEffect, type ReactNode } from 'react';

const IMAGES = [
  { src: 'https://i.postimg.cc/1X5zGSHT/storyintro1.jpg', alt: 'Pencil Sketching', link: '#IMG1' },
  { src: 'https://i.postimg.cc/yxQ8nGpN/storyintro2.jpg', alt: 'Digital Illustrations', link: '#IMG2' },
  { src: 'https://i.postimg.cc/mZ8kbcZG/storyintro3.jpg', alt: 'Custom Framing', link: '#IMG3' },
  { src: 'https://i.postimg.cc/kXH5bkt1/storyintro4.jpg', alt: 'Tattoo Art', link: '#IMG4' },
  { src: 'https://i.postimg.cc/8Pc5s1sf/storyintro5.jpg', alt: 'Drawing Courses', link: '#IMG5' },
];

/**
 * Tailwind classes representing the different position states of the carousel.
 * Adjusted for mobile-first responsiveness to prevent overflow and overlap.
 */
const POSITION_CLASSES: Record<string, string> = {
  selected:
    'z-10 left-1/2 -translate-x-1/2 translate-y-0 w-56 h-56 sm:w-64 sm:h-64 lg:w-80 lg:h-80 opacity-100',
  prev: 'z-[5] left-[20%] sm:left-[28%] -translate-x-1/2 translate-y-0 w-44 h-44 sm:w-56 sm:h-56 lg:w-[280px] lg:h-[280px] opacity-100',
  next: 'z-[5] left-[80%] sm:left-[72%] -translate-x-1/2 translate-y-0 w-44 h-44 sm:w-56 sm:h-56 lg:w-[280px] lg:h-[280px] opacity-100',
  prevLeftSecond:
    'z-[2] left-[5%] sm:left-[40%] -translate-x-[80%] sm:-translate-x-[65%] translate-y-[5%] w-28 h-28 sm:w-40 sm:h-40 lg:w-[230px] lg:h-[230px] opacity-40 sm:opacity-100 brightness-50 sm:brightness-60',
  nextRightSecond:
    'z-[2] left-[95%] sm:left-[60%] -translate-x-[20%] sm:-translate-x-[35%] translate-y-[5%] w-28 h-28 sm:w-40 sm:h-40 lg:w-[230px] lg:h-[230px] opacity-40 sm:opacity-100 brightness-50 sm:brightness-60',
  hideLeft:
    'z-0 left-0 -translate-x-full opacity-0 w-24 h-24 sm:w-40 sm:h-40 lg:w-[230px] lg:h-[230px]',
  hideRight:
    'z-0 left-full translate-x-0 opacity-0 w-24 h-24 sm:w-40 sm:h-40 lg:w-[230px] lg:h-[230px]',
};

/**
 * Story Carousel component displaying an octagonal, 3D-like arrangement of images.
 */
export function StoryCarousel(): ReactNode {
  const [selectedIndex, setSelectedIndex] = useState(3);

  const moveToSelected = useCallback((direction: 'next' | 'prev') => {
    if (direction === 'next') {
      setSelectedIndex((prevIndex) => (prevIndex + 1) % IMAGES.length);
    } else if (direction === 'prev') {
      setSelectedIndex((prevIndex) =>
        prevIndex === 0 ? IMAGES.length - 1 : prevIndex - 1
      );
    }
  }, []);

  const getPositionState = (index: number) => {
    const relativeIndex = (index - selectedIndex + IMAGES.length) % IMAGES.length;
    if (relativeIndex === 0) return 'selected';
    if (relativeIndex === 1) return 'next';
    if (relativeIndex === 2) return 'nextRightSecond';
    if (relativeIndex === IMAGES.length - 1) return 'prev';
    if (relativeIndex === IMAGES.length - 2) return 'prevLeftSecond';
    return relativeIndex > 2 ? 'hideRight' : 'hideLeft';
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') moveToSelected('prev');
      if (e.key === 'ArrowRight') moveToSelected('next');
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [moveToSelected]);

  return (
    <section
      id="story-carousel"
      className="relative w-full overflow-hidden 
                 bg-[var(--color-surface)] dark:bg-[var(--color-dark-surface)] 
                 py-16 md:py-24 transition-colors duration-300 border-t border-[var(--color-border)] dark:border-[var(--color-dark-border)]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2
            className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold
                       text-[var(--color-text-primary)] dark:text-[var(--color-dark-text-primary)]"
          >
            Our Story
          </h2>
          <p className="mt-4 font-body text-[var(--color-text-secondary)] dark:text-[var(--color-dark-text-secondary)] max-w-2xl mx-auto">
            Explore the journey behind our distinctive craftsmanship and design approach.
          </p>
        </div>

        {/* Carousel Area */}
        <div className="relative h-[300px] sm:h-[380px] w-full max-w-5xl mx-auto flex justify-center items-center">
          {IMAGES.map((image, index) => {
            const positionState = getPositionState(index);
            const classes = POSITION_CLASSES[positionState] || '';
            const isSelected = positionState === 'selected';

            return (
              <div
                key={index}
                className={`absolute flex items-center justify-center 
                            transition-all duration-1000 ease-[var(--ease-out-expo)] 
                            bg-[var(--color-brand-400)] dark:bg-[var(--color-brand-500)]
                            ${classes} group cursor-pointer`}
                style={{
                  clipPath:
                    'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
                }}
                onClick={() => setSelectedIndex(index)}
                aria-label={`View ${image.alt}`}
                role="button"
                tabIndex={0}
              >
                <div
                  className="w-full h-full object-cover overflow-hidden relative 
                             transition-all duration-1000 ease-[var(--ease-out-expo)]"
                  style={{
                    clipPath:
                      'polygon(31% 1%, 69% 1%, 99% 31%, 99% 69%, 69% 99%, 31% 99%, 1% 69%, 1% 31%)',
                  }}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className={`absolute inset-0 w-full h-full object-cover 
                               transition-all duration-500 ease-out mix-blend-normal
                               ${
                                 isSelected
                                   ? 'filter-none group-hover:brightness-70 group-hover:scale-110'
                                   : 'brightness-90 sm:brightness-100 group-hover:brightness-70 group-hover:scale-110'
                               }`}
                  />
                  {/* Overlay Text */}
                  <div
                    className="absolute inset-0 flex justify-center items-center 
                               text-[var(--color-brand-50)] dark:text-[var(--color-brand-100)] 
                               opacity-0 group-hover:opacity-100 z-10 transition-opacity duration-400
                               pointer-events-none bg-black/40 font-display font-medium text-lg sm:text-xl tracking-wide"
                  >
                    {image.alt}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-center items-center mt-12 sm:mt-16 gap-8">
          <button
            onClick={() => moveToSelected('prev')}
            className="w-12 h-12 flex items-center justify-center rounded-full 
                       bg-[var(--color-surface-elevated)] dark:bg-[var(--color-dark-surface-elevated)]
                       border border-[var(--color-border)] dark:border-[var(--color-dark-border)]
                       text-[var(--color-text-primary)] dark:text-[var(--color-dark-text-primary)]
                       hover:text-[var(--color-brand-600)] dark:hover:text-[var(--color-brand-400)]
                       hover:border-[var(--color-brand-500)] dark:hover:border-[var(--color-brand-500)]
                       hover:shadow-[0_4px_14px_rgba(34,197,94,0.15)]
                       transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-500)]"
            aria-label="Previous story"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => moveToSelected('next')}
            className="w-12 h-12 flex items-center justify-center rounded-full 
                       bg-[var(--color-surface-elevated)] dark:bg-[var(--color-dark-surface-elevated)]
                       border border-[var(--color-border)] dark:border-[var(--color-dark-border)]
                       text-[var(--color-text-primary)] dark:text-[var(--color-dark-text-primary)]
                       hover:text-[var(--color-brand-600)] dark:hover:text-[var(--color-brand-400)]
                       hover:border-[var(--color-brand-500)] dark:hover:border-[var(--color-brand-500)]
                       hover:shadow-[0_4px_14px_rgba(34,197,94,0.15)]
                       transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-500)]"
            aria-label="Next story"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
