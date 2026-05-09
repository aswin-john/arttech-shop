import React, { useRef, useEffect } from 'react';

function useTilt(active: boolean, animationDuration = '150ms') {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current || !active) {
      if (ref.current) {
        ref.current.style.transition = `transform 0.5s ease-in-out`;
        ref.current.style.removeProperty('--px');
        ref.current.style.removeProperty('--py');
      }
      return;
    }

    const unify = (e: any) => (e.changedTouches ? e.changedTouches[0] : e);

    const state = {
      rect: undefined as DOMRect | undefined,
      mouseX: undefined as number | undefined,
      mouseY: undefined as number | undefined,
    };

    let el = ref.current;

    const handleEnterEvent = () => {
      el.style.transition = `transform ${animationDuration} ease-out`;
    };

    const handleMoveEvent = (e: MouseEvent | TouchEvent) => {
      if (!el) return;
      if (!state.rect) {
        state.rect = el.getBoundingClientRect();
      }
      state.mouseX = unify(e).clientX;
      state.mouseY = unify(e).clientY;

      const px = (state.mouseX! - state.rect.left) / state.rect.width;
      const py = (state.mouseY! - state.rect.top) / state.rect.height;

      el.style.setProperty('--px', px.toFixed(2));
      el.style.setProperty('--py', py.toFixed(2));
    };

    const handleEndEvent = () => {
      if (!el) return;
      el.style.setProperty('--px', '0.5');
      el.style.setProperty('--py', '0.5');
      el.style.transition = `transform ${animationDuration} ease-in`;
    };

    el.addEventListener('mouseenter', handleEnterEvent);
    el.addEventListener('mousemove', handleMoveEvent as EventListener);
    el.addEventListener('mouseleave', handleEndEvent);
    el.addEventListener('touchstart', handleEnterEvent, { passive: true });
    el.addEventListener('touchmove', handleMoveEvent as EventListener, { passive: true });
    el.addEventListener('touchend', handleEndEvent);

    return () => {
      el.removeEventListener('mouseenter', handleEnterEvent);
      el.removeEventListener('mousemove', handleMoveEvent as EventListener);
      el.removeEventListener('mouseleave', handleEndEvent);
      el.removeEventListener('touchstart', handleEnterEvent);
      el.removeEventListener('touchmove', handleMoveEvent as EventListener);
      el.removeEventListener('touchend', handleEndEvent);
    };
  }, [animationDuration, active]);

  return ref;
}

export interface ReviewSlideData {
  id: number;
  name: string;
  avatar: string;
  rating: number;
  timeAgo: string;
  text: string;
}

interface ReviewSlideProps {
  slide: ReviewSlideData;
  offset: number;
}

export const ReviewSlide: React.FC<ReviewSlideProps> = ({ slide, offset }) => {
  const active = offset === 0;
  const ref = useTilt(active);

  const dir = offset === 0 ? 0 : offset > 0 ? 1 : -1;
  const absOffset = Math.abs(offset);

  const zIndex = 50 - absOffset;
  const opacity = active ? 1 : Math.max(0, 1 - absOffset * 0.4);

  // Custom tailwind-like transform logic for 3D depth and tilt
  const transformStyle = active 
    ? `perspective(1000px) rotateY(calc((var(--px, 0.5) - 0.5) * 35deg)) rotateX(calc((var(--py, 0.5) - 0.5) * -35deg))`
    : `perspective(1000px) translateX(calc(100% * ${offset} * 0.6)) rotateY(calc(-40deg * ${dir})) scale(${1 - absOffset * 0.15})`;

  return (
    <div
      className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ease-in-out ${
        active ? 'pointer-events-auto' : 'pointer-events-none'
      }`}
      style={{
        zIndex,
        opacity,
      }}
    >
      <div
        ref={ref}
        className="relative w-[320px] sm:w-[380px] md:w-[450px] min-h-[260px] bg-white dark:bg-[#1a1a1b] rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 p-6 md:p-8 cursor-grab active:cursor-grabbing will-change-transform"
        style={{
          transformStyle: 'preserve-3d',
          transform: transformStyle,
          transition: active ? undefined : 'transform 0.5s ease-in-out',
        }}
      >
        <div 
          className="flex flex-col h-full transform-gpu transition-all duration-300"
          style={{ transform: active ? 'translateZ(30px)' : 'translateZ(0)' }}
        >
          {/* Header */}
          <div className="flex items-start justify-between mb-5">
            <div>
              <div className="flex gap-[2px] mb-1.5">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className={`w-4 h-4 sm:w-5 sm:h-5 ${i < slide.rating ? 'text-[#fbbc04]' : 'text-gray-300 dark:text-gray-600'}`} fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-[13px] text-gray-500 dark:text-gray-400 font-medium">{slide.timeAgo}</span>
            </div>
            <div className="w-8 h-8 flex items-center justify-center">
              <svg className="w-full h-full" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
            </div>
          </div>

          {/* Review Text */}
          <p className="text-gray-700 dark:text-gray-300 text-[15px] sm:text-base leading-relaxed mb-6 flex-grow line-clamp-4">
            "{slide.text}"
          </p>

          {/* User Info */}
          <div className="flex items-center gap-3 mt-auto">
            <img src={slide.avatar} alt={slide.name} className="w-10 h-10 rounded-full object-cover shadow-sm border border-gray-100 dark:border-gray-700" />
            <div className="flex flex-col">
              <span className="font-semibold text-sm text-gray-900 dark:text-white leading-tight">{slide.name}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
