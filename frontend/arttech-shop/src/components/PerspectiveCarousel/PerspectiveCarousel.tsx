import { useState, useEffect, useRef, useCallback, type ReactNode } from 'react';

interface CarouselItem {
  image: string;
  title: string;
  desc: string;
  time?: number;
}

const INITIAL_DATA: CarouselItem[] = [
  {
    image: 'https://picsum.photos/id/117/1000/1000',
    title: 'Advanced Illustration Courses',
    desc: "Master the art of digital drawing",
  },
  {
    image: 'https://picsum.photos/id/137/1000/1000',
    title: 'Custom Wooden Frames',
    desc: 'Perfectly crafted for your canvas',
  },
  {
    image: 'https://picsum.photos/id/153/1000/1000',
    title: 'Professional Tattoo Designs',
    desc: 'Ink your story with unique stencils',
  },
  {
    image: 'https://picsum.photos/id/265/1000/1000',
    title: 'Pencil Sketching Basics',
    desc: 'Start your journey into fine arts',
  },
];

interface PerspectiveCarouselProps {
  isInfinity?: boolean;
  autoplay?: boolean;
  delay?: number;
  visibleAmount?: number;
}

/**
 * 3D Perspective Carousel component with drag/swipe interactions.
 */
export function PerspectiveCarousel({
  isInfinity = true,
  autoplay = false,
  delay = 10,
  visibleAmount = 4,
}: PerspectiveCarouselProps): ReactNode {
  const [screenWidth, setScreenWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1000
  );
  const [nowIndex, setNowIndex] = useState(isInfinity ? visibleAmount : 0);
  const [isAnimate, setIsAnimate] = useState(true);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [diffX, setDiffX] = useState(0);
  const [movingStatus, setMovingStatus] = useState<1 | -1>(1);
  const [dataArray, setDataArray] = useState<CarouselItem[]>(INITIAL_DATA);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Responsive widths
  const carouselPostWidth = screenWidth > 900 ? 400 : screenWidth * 0.85;
  const carouselPostMargin = 40;

  // Screen resize handler
  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Setup data array for infinite looping
  useEffect(() => {
    if (isInfinity) {
      const behindData = INITIAL_DATA.slice(0, visibleAmount);
      const beforeData = INITIAL_DATA.slice(-visibleAmount);
      let newDataArray = [...beforeData, ...INITIAL_DATA, ...behindData];
      newDataArray = newDataArray.map((item, index) => ({
        ...item,
        time: new Date().getTime() + index,
      }));
      setDataArray(newDataArray);
    } else {
      setDataArray(
        INITIAL_DATA.map((item, index) => ({
          ...item,
          time: new Date().getTime() + index,
        }))
      );
    }
  }, [isInfinity, visibleAmount]);

  // Change image index safely
  const changeImagePosition = useCallback(
    (indexOffset: number) => {
      let thisIndex = (nowIndex + indexOffset) % dataArray.length;
      if (!isInfinity && thisIndex < 0) thisIndex = dataArray.length - 1;
      if (isInfinity) thisIndex = nowIndex + indexOffset;
      setNowIndex(thisIndex);
      setIsAnimate(true);
    },
    [nowIndex, dataArray.length, isInfinity]
  );

  // Autoplay functionality
  useEffect(() => {
    if (autoplay) {
      timerRef.current = setInterval(() => {
        changeImagePosition(1);
      }, delay * 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [autoplay, delay, changeImagePosition]);

  const computedLeft = () => {
    let leftSpan = -nowIndex * carouselPostWidth;
    let marginSpan = carouselPostMargin * nowIndex;
    if (isInfinity) {
      marginSpan = carouselPostMargin * (nowIndex - 1) + carouselPostMargin;
    }
    return {
      carouselTranslateX: leftSpan - marginSpan,
      carouselTranslateZ: -400,
    };
  };

  const handleTransitionEnd = () => {
    if (!isInfinity) return;
    if (nowIndex >= dataArray.length - visibleAmount) {
      setNowIndex(visibleAmount);
      setIsAnimate(false);
    } else if (nowIndex <= 0) {
      setNowIndex(dataArray.length - visibleAmount * 2);
      setIsAnimate(false);
    }
  };

  // Drag Interactions
  const handleMouseDown = (event: React.MouseEvent | React.TouchEvent) => {
    const clientX =
      'touches' in event ? event.touches[0].clientX : (event as React.MouseEvent).clientX;
    setIsMouseDown(true);
    setStartX(clientX);
  };

  const handleMouseUp = (event: React.MouseEvent | React.TouchEvent) => {
    const maxDiffX = carouselPostWidth / 2;
    const clientX =
      'changedTouches' in event
        ? event.changedTouches[0].clientX
        : (event as React.MouseEvent).clientX;
    const currentDiffX = startX - clientX;
    let thisIndex = nowIndex;

    if (currentDiffX > maxDiffX) {
      thisIndex = nowIndex + 1;
    } else if (currentDiffX < -maxDiffX) {
      thisIndex = nowIndex - 1;
    }

    if (!isInfinity) {
      thisIndex = Math.max(0, Math.min(thisIndex, dataArray.length - 1));
    }

    setIsMouseDown(false);
    setIsAnimate(true);
    setNowIndex(thisIndex);
    setStartX(0);
    setDiffX(0);
  };

  const handleMouseLeave = () => {
    if (!isMouseDown) return;
    setIsMouseDown(false);
    setIsAnimate(true);
    setStartX(0);
    setDiffX(0);
  };

  const handleMouseMove = (event: React.MouseEvent | React.TouchEvent) => {
    if (!isMouseDown) return;
    const clientX =
      'touches' in event ? event.touches[0].clientX : (event as React.MouseEvent).clientX;
    const currentDiffX = startX - clientX;
    const spanDistance = carouselPostWidth + carouselPostMargin;

    if (currentDiffX > spanDistance || currentDiffX < -spanDistance) {
      return;
    } else {
      setDiffX(currentDiffX);
      setMovingStatus(-currentDiffX < 0 ? -1 : 1);
    }
  };

  const computedMovingStyle = (index: number) => {
    let styles = {
      translateX: 0,
      translateZ: 0,
      opacityStyle: 1,
    };
    if (!isMouseDown && nowIndex <= index) return styles;
    if (!isMouseDown && nowIndex > index) {
      return { translateX: 0, translateZ: -carouselPostWidth, opacityStyle: 0 };
    }

    if (movingStatus === 1) {
      // Swipe Left (Next)
      if (nowIndex - 1 === index) {
        let z = -carouselPostWidth + -diffX;
        styles.translateZ = z > 0 ? 0 : z;
        styles.opacityStyle = -diffX / carouselPostWidth;
      } else if (nowIndex > index) {
        styles.translateZ = -carouselPostWidth;
        styles.opacityStyle = 0;
      }
    } else if (movingStatus === -1) {
      // Swipe Right (Prev)
      if (nowIndex === index) {
        styles.translateZ = -diffX;
        styles.opacityStyle = 1 - Math.abs(diffX / carouselPostWidth);
      } else if (nowIndex > index) {
        styles.translateZ = -carouselPostWidth;
        styles.opacityStyle = 0;
      }
    }
    styles.translateX = -diffX;
    return styles;
  };

  const { carouselTranslateX } = computedLeft();

  return (
    <section
      className="relative w-full py-16 md:py-24 bg-[var(--color-surface)] dark:bg-[var(--color-dark-surface)] 
                 border-t border-[var(--color-border)] dark:border-[var(--color-dark-border)] overflow-hidden transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 sm:mb-16 text-center">
        <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-[var(--color-text-primary)] dark:text-[var(--color-dark-text-primary)]">
          Featured Originals
        </h2>
        <p className="mt-4 font-body text-[var(--color-text-secondary)] dark:text-[var(--color-dark-text-secondary)] max-w-2xl mx-auto">
          Explore our latest collection of premium curated artwork and storytelling.
        </p>
      </div>

      <div className="relative w-full flex justify-center items-center select-none overflow-hidden pb-12">
        <div className="w-full lg:pl-[240px] relative transition-all duration-300 ease-in-out">
          {/* Main Carousel Track */}
          <div
            className="relative [perspective:600px] flex"
            style={{ transition: isAnimate ? 'all 0.3s' : 'none' }}
            onMouseMove={handleMouseMove}
            onTouchMove={handleMouseMove}
            onMouseDown={handleMouseDown}
            onTouchStart={handleMouseDown}
            onMouseUp={handleMouseUp}
            onTouchEnd={handleMouseUp}
            onTransitionEnd={handleTransitionEnd}
            onMouseLeave={handleMouseLeave}
          >
            {dataArray.map((item, index) => {
              const { translateX, translateZ, opacityStyle } = computedMovingStyle(index);
              return (
                <div
                  key={index}
                  className="relative flex flex-col shrink-0 group cursor-grab active:cursor-grabbing"
                  style={{
                    width: carouselPostWidth,
                    marginRight: carouselPostMargin,
                    transform: `translateX(${
                      carouselTranslateX + translateX
                    }px) translateZ(${translateZ}px)`,
                    opacity: opacityStyle,
                    transition: isAnimate ? 'all 0.5s' : 'none',
                  }}
                >
                  <div
                    className="w-full h-[300px] sm:h-[400px] bg-center bg-cover transition-transform duration-500 ease-out group-hover:scale-[1.02] rounded-xl shadow-lg"
                    style={{ backgroundImage: `url(${item.image})` }}
                  />
                  <div className="mt-6 text-center">
                    <h3 className="font-display text-xl font-bold tracking-wide text-[var(--color-text-primary)] dark:text-[var(--color-dark-text-primary)]">
                      {item.title}
                    </h3>
                    <p className="mt-3 font-body text-sm tracking-wide opacity-80 text-[var(--color-text-secondary)] dark:text-[var(--color-dark-text-secondary)]">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Decorative Shadows / Bars */}
          <div className="flex [perspective:600px] mt-6 pointer-events-none">
            {dataArray.map((_, index) => {
              const { translateX, translateZ, opacityStyle } = computedMovingStyle(index);
              return (
                <div
                  key={`bar-${index}`}
                  className="relative shrink-0 border-b border-[var(--color-border)] dark:border-[var(--color-dark-border)] pb-8 mb-2"
                  style={{
                    width: carouselPostWidth,
                    marginRight: carouselPostMargin,
                    transform: `translateX(${
                      carouselTranslateX + translateX
                    }px) translateZ(${(translateZ * 2) / 3}px)`,
                    opacity: opacityStyle,
                    transition: isAnimate ? 'all 0.5s' : 'none',
                  }}
                >
                  {/* Diamond shape indicator */}
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 bg-[var(--color-border)] dark:bg-[var(--color-dark-border)] transition-colors duration-300" />
                </div>
              );
            })}
          </div>
        </div>

        {/* Controls */}
        <button
          className="absolute left-4 sm:left-8 top-[35%] sm:top-[40%] -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full z-20
                     bg-[var(--color-surface-elevated)] dark:bg-[var(--color-dark-surface-elevated)]
                     border border-[var(--color-border)] dark:border-[var(--color-dark-border)]
                     text-[var(--color-text-primary)] dark:text-[var(--color-dark-text-primary)]
                     hover:text-[var(--color-brand-600)] dark:hover:text-[var(--color-brand-400)]
                     hover:border-[var(--color-brand-500)] dark:hover:border-[var(--color-brand-500)]
                     hover:shadow-[0_4px_14px_rgba(34,197,94,0.15)]
                     transition-all duration-300 focus:outline-none"
          onClick={() => changeImagePosition(-1)}
          aria-label="Previous slide"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          className="absolute right-4 sm:right-8 top-[35%] sm:top-[40%] -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full z-20
                     bg-[var(--color-surface-elevated)] dark:bg-[var(--color-dark-surface-elevated)]
                     border border-[var(--color-border)] dark:border-[var(--color-dark-border)]
                     text-[var(--color-text-primary)] dark:text-[var(--color-dark-text-primary)]
                     hover:text-[var(--color-brand-600)] dark:hover:text-[var(--color-brand-400)]
                     hover:border-[var(--color-brand-500)] dark:hover:border-[var(--color-brand-500)]
                     hover:shadow-[0_4px_14px_rgba(34,197,94,0.15)]
                     transition-all duration-300 focus:outline-none"
          onClick={() => changeImagePosition(1)}
          aria-label="Next slide"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </section>
  );
}
