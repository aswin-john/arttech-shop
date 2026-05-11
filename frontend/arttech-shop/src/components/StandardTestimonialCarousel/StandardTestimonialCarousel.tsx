import { useState, useEffect } from 'react';

const testimonials = [
    {
        id: 1,
        name: 'ELENA ROSTOVA',
        desc: 'The drawing courses here transformed my approach to digital illustration. Exceptional mentors and vibrant community!',
        image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=500',
    },
    {
        id: 2,
        name: 'MARCUS THORNE',
        desc: 'I ordered a custom wooden frame for my latest canvas, and the craftsmanship is simply unmatched. Highly recommended.',
        image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=500',
    },
    {
        id: 3,
        name: 'SARAH JENKINS',
        desc: 'Found the perfect tattoo stencils. The intricate designs gave me exactly the inspiration I needed for my sleeve.',
        image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=500',
    },
    {
        id: 4,
        name: 'DAVID CHEN',
        desc: 'The pencil sketching basics course is a must for beginners. Clear instructions and amazing feedback on my assignments.',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=500',
    },
    {
        id: 5,
        name: 'AMELIA VANCE',
        desc: 'Beautiful selection of original art. The illustration I purchased looks stunning in my studio and arrived perfectly packaged.',
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=500',
    },
];

export function StandardTestimonialCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [itemsPerView, setItemsPerView] = useState(3);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 640) {
                setItemsPerView(1);
            } else if (window.innerWidth < 1024) {
                setItemsPerView(2);
            } else {
                setItemsPerView(4);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const maxIndex = Math.max(0, testimonials.length - itemsPerView);

    const handleNext = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
        setTimeout(() => setIsAnimating(false), 500);
    };

    const handlePrev = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
        setTimeout(() => setIsAnimating(false), 500);
    };

    const handleDotClick = (index: number) => {
        if (isAnimating || index === currentIndex) return;
        setIsAnimating(true);
        setCurrentIndex(index);
        setTimeout(() => setIsAnimating(false), 500);
    };

    return (
        <section className="relative w-full pb-16 md:pb-24 pt-0 md:pt-0 bg-[var(--color-surface)] dark:bg-[var(--color-dark-surface)] transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 sm:mb-16 text-center">
                <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-[var(--color-text-primary)] dark:text-[var(--color-dark-text-primary)]">
                    Community Testimonials
                </h2>
                <p className="mt-4 font-body text-[var(--color-text-secondary)] dark:text-[var(--color-dark-text-secondary)] max-w-2xl mx-auto">
                    Hear what artists and creators have to say about our platform.
                </p>
            </div>

            <div className="relative w-full select-none pb-12">
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Track Container */}
                    <div className="overflow-hidden w-full px-2 py-4">
                        <div 
                            className="flex transition-transform duration-500 ease-in-out"
                            style={{ 
                                transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
                            }}
                        >
                            {testimonials.map((testimonial) => (
                                <div 
                                    key={testimonial.id}
                                    className="px-4 flex-shrink-0 group cursor-pointer"
                                    style={{ width: `${100 / itemsPerView}%` }}
                                >
                                    <div className="flex flex-col h-full bg-transparent">
                                        <div className="w-full h-[200px] md:h-[400px] bg-center bg-cover transition-transform duration-500 ease-out group-hover:scale-[1.02] rounded-xl shadow-lg"
                                             style={{ backgroundImage: `url(${testimonial.image})` }}
                                        />
                                        <div className="mt-4 md:mt-6 text-center">
                                            <h3 className="font-display text-base md:text-xl font-bold tracking-wide text-[var(--color-text-primary)] dark:text-[var(--color-dark-text-primary)] uppercase">
                                                {testimonial.name}
                                            </h3>
                                            <p className="mt-2 md:mt-3 font-body text-xs md:text-sm tracking-wide opacity-80 text-[var(--color-text-secondary)] dark:text-[var(--color-dark-text-secondary)] line-clamp-2 md:line-clamp-none">
                                                {testimonial.desc}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
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
                    onClick={handlePrev}
                    aria-label="Previous testimonials"
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
                    onClick={handleNext}
                    aria-label="Next testimonials"
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

            {/* Dots */}
            <div className="flex justify-center items-center mt-2 space-x-3">
                {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => handleDotClick(idx)}
                        aria-label={`Go to slide ${idx + 1}`}
                        className={`rounded-full transition-all duration-300 focus:outline-none
                            ${idx === currentIndex 
                                ? 'w-2.5 h-2.5 bg-[var(--color-text-primary)] dark:bg-[var(--color-dark-text-primary)]' 
                                : 'w-2.5 h-2.5 bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600'
                            }`}
                    />
                ))}
            </div>
        </section>
    );
}
