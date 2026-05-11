import React, { useState } from 'react';
import { ReviewSlide } from './ReviewSlide';
import type { ReviewSlideData } from './ReviewSlide';

const DUMMY_REVIEWS: ReviewSlideData[] = [
  {
    id: 1,
    name: "Sarah Jenkins",
    avatar: "https://i.pravatar.cc/150?u=sarah",
    rating: 5,
    timeAgo: "2 months ago",
    text: "Absolutely love the custom frame for my watercolor piece! The quality is exceptional and it perfectly complements the art."
  },
  {
    id: 2,
    name: "Michael Chen",
    avatar: "https://i.pravatar.cc/150?u=michael",
    rating: 5,
    timeAgo: "6 months ago",
    text: "The illustration I commissioned was beyond my expectations. Highly skilled artists and wonderful communication throughout."
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    avatar: "https://i.pravatar.cc/150?u=emma",
    rating: 5,
    timeAgo: "1 year ago",
    text: "Bought a beautiful set of drawing frames here. They arrived well-packaged and add a premium feel to my home gallery."
  },
  {
    id: 4,
    name: "David Smith",
    avatar: "https://i.pravatar.cc/150?u=david",
    rating: 5,
    timeAgo: "3 weeks ago",
    text: "Got a custom digital illustration done and it's stunning. The attention to detail is remarkable. Highly recommend their work!"
  },
  {
    id: 5,
    name: "Jessica Taylor",
    avatar: "https://i.pravatar.cc/150?u=jessica",
    rating: 5,
    timeAgo: "4 months ago",
    text: "Excellent service and breathtaking art pieces. I purchased a landscape painting and the colors are just so vibrant in person."
  }
];

export const Review3DCarousel: React.FC = () => {
  const [slideIndex, setSlideIndex] = useState(0);

  const handlePrevSlide = () => {
    setSlideIndex((prev) => (prev === 0 ? DUMMY_REVIEWS.length - 1 : prev - 1));
  };

  const handleNextSlide = () => {
    setSlideIndex((prev) => (prev + 1) % DUMMY_REVIEWS.length);
  };

  return (
    <section className="py-20 overflow-hidden relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            What Our Art Community Says
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Discover why artists and art lovers trust us for their framing and illustration needs.
          </p>
        </div>

        <div className="relative w-full max-w-5xl mx-auto h-[400px] flex items-center justify-center group">
          
          {/* Navigation Buttons */}
          <button 
            className="absolute left-2 md:-left-8 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/90 dark:bg-gray-800/90 shadow-lg text-gray-800 dark:text-white hover:bg-white dark:hover:bg-gray-700 transition-colors backdrop-blur-sm focus:outline-none opacity-0 group-hover:opacity-100 duration-300"
            onClick={handlePrevSlide}
            aria-label="Previous review"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button 
            className="absolute right-2 md:-right-8 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/90 dark:bg-gray-800/90 shadow-lg text-gray-800 dark:text-white hover:bg-white dark:hover:bg-gray-700 transition-colors backdrop-blur-sm focus:outline-none opacity-0 group-hover:opacity-100 duration-300"
            onClick={handleNextSlide}
            aria-label="Next review"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Carousel Track */}
          <div className="relative w-full h-full flex justify-center items-center perspective-[1000px]">
            {DUMMY_REVIEWS.map((slide, i) => {
              // Calculate relative offset considering the circular nature
              // We want the active slide to have offset 0.
              // Slides to the right should have positive offset, left negative.
              const total = DUMMY_REVIEWS.length;
              let offset = (i - slideIndex) % total;
              
              // Adjust offset to wrap around correctly 
              if (offset < -Math.floor(total / 2)) {
                offset += total;
              } else if (offset > Math.floor(total / 2)) {
                offset -= total;
              }

              return (
                <ReviewSlide 
                  key={slide.id} 
                  slide={slide} 
                  offset={offset} 
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
