import { useState, useEffect } from 'react';

// Dummy data for testimonials relating to art/drawings
const originalItems = [
    {
        player: {
            title: 'Elena Rostova',
            desc: '"The drawing courses here transformed my approach to digital illustration. Exceptional mentors and vibrant community!"',
            image: 'https://i.pravatar.cc/500?img=47',
        },
    },
    {
        player: {
            title: 'Marcus Thorne',
            desc: '"I ordered a custom wooden frame for my latest canvas, and the craftsmanship is simply unmatched. Highly recommended."',
            image: 'https://i.pravatar.cc/500?img=11',
        },
    },
    {
        player: {
            title: 'Sarah Jenkins',
            desc: '"Found the perfect tattoo stencils. The intricate designs gave me exactly the inspiration I needed for my sleeve."',
            image: 'https://i.pravatar.cc/500?img=5',
        },
    },
    {
        player: {
            title: 'David Chen',
            desc: '"The pencil sketching basics course is a must for beginners. Clear instructions and amazing feedback on my assignments."',
            image: 'https://i.pravatar.cc/500?img=68',
        },
    },
    {
        player: {
            title: 'Amelia Vance',
            desc: '"Beautiful selection of original art. The illustration I purchased looks stunning in my studio and arrived perfectly packaged."',
            image: 'https://i.pravatar.cc/500?img=44',
        },
    },
];

const sleep = (ms = 0) => new Promise((resolve) => setTimeout(resolve, ms));

export function TestimonialCarousel() {
    const [slideWidth, setSlideWidth] = useState(300);
    const [isMobile, setIsMobile] = useState(false);
    
    // Create duplicated items for infinite scrolling effect
    const _items = [...originalItems, ...originalItems];
    const length = originalItems.length;
    const keys = Array.from(Array(_items.length).keys());

    const [items, setItems] = useState(keys);
    const [isTicking, setIsTicking] = useState(false);
    const [activeIdx, setActiveIdx] = useState(0);

    // Responsive configuration
    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            setIsMobile(width < 768);
            if (width < 640) {
                setSlideWidth(280);
            } else if (width < 1024) {
                setSlideWidth(320);
            } else {
                setSlideWidth(360);
            }
        };
        
        handleResize(); // Initial call
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const prevClick = (jump = 1) => {
        if (!isTicking) {
            setIsTicking(true);
            setItems((prev) => prev.map((_, i) => prev[(i + jump) % _items.length]));
        }
    };

    const nextClick = (jump = 1) => {
        if (!isTicking) {
            setIsTicking(true);
            setItems((prev) => prev.map((_, i) => prev[(i - jump + _items.length) % _items.length]));
        }
    };

    const handleDotClick = (idx: number) => {
        if (idx < activeIdx) prevClick(activeIdx - idx);
        if (idx > activeIdx) nextClick(idx - activeIdx);
    };

    useEffect(() => {
        if (isTicking) sleep(300).then(() => setIsTicking(false));
    }, [isTicking]);

    useEffect(() => {
        setActiveIdx((length - (items[0] % length)) % length);
    }, [items, length]);

    const createItem = (position: number, idx: number) => {
        const item = {
            styles: {
                transform: `translateX(${position * slideWidth}px)`,
                opacity: 1,
                filter: 'grayscale(0)',
            },
            player: _items[idx].player,
        };

        switch (position) {
            case length - 1:
            case length + 1:
                item.styles = { ...item.styles, filter: 'grayscale(1)' };
                if (isMobile) {
                    item.styles = { ...item.styles, opacity: 0 };
                }
                break;
            case length:
                // Active item is fully visible and full color
                break;
            default:
                // Other items are hidden
                item.styles = { ...item.styles, opacity: 0 };
                break;
        }

        return item;
    };

    // Width enough to hold all items centered correctly
    const listWidth = (length + 0.5) * slideWidth * 2;

    return (
        <section className="relative w-full py-16 md:py-24 bg-[var(--color-surface)] dark:bg-[var(--color-dark-surface)] overflow-hidden transition-colors duration-300 border-t border-[var(--color-border)] dark:border-[var(--color-dark-border)]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 sm:mb-16 text-center">
                <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-[var(--color-text-primary)] dark:text-[var(--color-dark-text-primary)]">
                    Community Testimonials
                </h2>
                <p className="mt-4 font-body text-[var(--color-text-secondary)] dark:text-[var(--color-dark-text-secondary)] max-w-2xl mx-auto">
                    Hear what artists and creators have to say about our platform.
                </p>
            </div>

            <div className="flex justify-center items-center relative w-full mt-[10%] sm:mt-[5%] pb-8 md:pb-16">
                <div 
                    className="relative"
                    style={{ height: '400px', width: `${slideWidth * (isMobile ? 1 : 3)}px`, maxWidth: '100%' }}
                >
                    {/* Previous Button */}
                    <button
                        className="absolute left-4 md:-left-12 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center rounded-full
                                 bg-[var(--color-surface-elevated)] dark:bg-[var(--color-dark-surface-elevated)]
                                 border border-[var(--color-border)] dark:border-[var(--color-dark-border)]
                                 text-[var(--color-text-primary)] dark:text-[var(--color-dark-text-primary)]
                                 hover:text-[var(--color-brand-600)] dark:hover:text-[var(--color-brand-400)]
                                 hover:border-[var(--color-brand-500)] dark:hover:border-[var(--color-brand-500)]
                                 hover:shadow-[0_4px_14px_rgba(34,197,94,0.15)]
                                 transition-all duration-300 focus:outline-none"
                        onClick={() => prevClick()}
                        aria-label="Previous testimonial"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>

                    {/* Carousel Container */}
                    <div className="h-full w-full overflow-visible md:overflow-hidden relative">
                        <ul 
                            className="absolute top-0 left-1/2 -translate-x-1/2 h-full m-0 p-0 list-none"
                            style={{ width: `${listWidth}px` }}
                        >
                            {items.map((pos, i) => {
                                const item = createItem(pos, i);
                                const isActive = pos === length;
                                
                                return (
                                    <li
                                        key={i}
                                        className="absolute top-0 p-4 transition-all duration-300 ease-in-out"
                                        style={{ 
                                            width: `${slideWidth}px`, 
                                            height: `${slideWidth}px`, 
                                            transform: item.styles.transform,
                                            opacity: item.styles.opacity,
                                            filter: item.styles.filter,
                                            zIndex: isActive ? 10 : 1
                                        }}
                                    >
                                        <div className="relative w-full h-full group flex flex-col items-center">
                                            {/* Image container */}
                                            <div className="relative w-full h-full overflow-hidden rounded-xl shadow-lg cursor-pointer
                                                            border border-[var(--color-border)] dark:border-[var(--color-dark-border)]">
                                                <img 
                                                    src={item.player.image} 
                                                    alt={item.player.title} 
                                                    className={`w-full h-full object-cover transition-transform duration-500 ease-out ${isActive ? 'group-hover:scale-110' : ''}`}
                                                />
                                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                                    <span className="text-white font-medium text-sm md:text-base capitalize">Read more</span>
                                                </div>
                                            </div>

                                            {/* Text body */}
                                            <div className={`absolute -bottom-8 md:-bottom-12 w-[90%] bg-[var(--color-surface)] dark:bg-[var(--color-dark-surface)] 
                                                            border border-[var(--color-border)] dark:border-[var(--color-dark-border)] 
                                                            rounded-lg p-4 shadow-xl flex flex-col items-center text-center transition-all duration-300
                                                            ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                                                <h4 className="font-display font-bold uppercase tracking-wide text-[var(--color-text-primary)] dark:text-[var(--color-dark-text-primary)] text-sm md:text-base m-0">
                                                    {item.player.title}
                                                </h4>
                                                <p className="mt-2 text-xs md:text-sm text-[var(--color-text-secondary)] dark:text-[var(--color-dark-text-secondary)] line-clamp-3">
                                                    {item.player.desc}
                                                </p>
                                            </div>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>

                    {/* Next Button */}
                    <button
                        className="absolute right-4 md:-right-12 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center rounded-full
                                 bg-[var(--color-surface-elevated)] dark:bg-[var(--color-dark-surface-elevated)]
                                 border border-[var(--color-border)] dark:border-[var(--color-dark-border)]
                                 text-[var(--color-text-primary)] dark:text-[var(--color-dark-text-primary)]
                                 hover:text-[var(--color-brand-600)] dark:hover:text-[var(--color-brand-400)]
                                 hover:border-[var(--color-brand-500)] dark:hover:border-[var(--color-brand-500)]
                                 hover:shadow-[0_4px_14px_rgba(34,197,94,0.15)]
                                 transition-all duration-300 focus:outline-none"
                        onClick={() => nextClick()}
                        aria-label="Next testimonial"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Pagination Dots */}
            <div className="flex justify-center mt-16 md:mt-20 space-x-3">
                {items.slice(0, length).map((_, i) => (
                    <button
                        key={i}
                        onClick={() => handleDotClick(i)}
                        className={`w-3 h-3 md:w-4 md:h-4 rounded-full transition-all duration-300 outline-none
                            ${i === activeIdx 
                                ? 'bg-[var(--color-text-primary)] dark:bg-[var(--color-dark-text-primary)] scale-125' 
                                : 'bg-[var(--color-border)] dark:bg-[var(--color-dark-border)] hover:bg-[var(--color-text-secondary)] dark:hover:bg-[var(--color-dark-text-secondary)]'
                            }`}
                        aria-label={`Go to slide ${i + 1}`}
                    />
                ))}
            </div>
        </section>
    );
}
