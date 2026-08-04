import { useState, useEffect, type ReactNode } from 'react';
import { NavLink as RouterNavLink } from 'react-router-dom';
import { ThemeSwitcher } from '../ThemeSwitcher/ThemeSwitcher';
import { MobileMenu } from './MobileMenu';
import type { NavLink } from './types';

const NAV_LINKS: NavLink[] = [
  { label: 'Home', href: '/' },
  // { label: 'Services', href: '#services', hasDropdown: true },
  { label: 'Shops', href: '/shops' , hasDropdown: true},
  // { label: 'Blog', href: '#blog' },
  { label: 'Contact', href: '/contact' },
  // { label: 'Partner', href: '#partner' },
  // { label: 'Payment', href: '/payment' },
];

/** Search icon SVG */
function SearchIcon(): ReactNode {
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
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

/** Shopping bag icon SVG */
function ShoppingBagIcon(): ReactNode {
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
      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 01-8 0" />
    </svg>
  );
}

/** Hamburger menu icon SVG */
function MenuIcon(): ReactNode {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

/** Chevron down icon for dropdown indicators */
function ChevronDownIcon(): ReactNode {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

/**
 * Main site header with:
 * - Desktop: Full nav links | Centered "Berlion" logo | Search, Cart, Theme icons
 * - Mobile: Hamburger | Logo | Cart — with slide-in drawer
 *
 * Positioned as a transparent overlay on top of the hero carousel.
 * Becomes opaque on scroll for readability.
 */
export function Header(): ReactNode {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Track scroll position for header background change
  useEffect(() => {
    function handleScroll(): void {
      setIsScrolled(window.scrollY > 20);
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        id="site-header"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300
          ${
            isScrolled
              ? 'bg-[var(--color-surface-overlay)] dark:bg-[var(--color-dark-surface-overlay)] backdrop-blur-xl shadow-sm border-b border-[var(--color-border)] dark:border-[var(--color-dark-border)]'
              : 'bg-transparent'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-18">
            {/* ─── Left: Navigation (desktop) / Hamburger (mobile) ─── */}
            <div className="flex items-center gap-1 flex-1">
              {/* Mobile hamburger */}
              <button
                id="mobile-menu-toggle"
                type="button"
                className="lg:hidden flex items-center justify-center w-9 h-9 rounded-full
                           text-[var(--color-text-primary)] dark:text-[var(--color-dark-text-primary)]
                           hover:bg-[var(--color-border-subtle)] dark:hover:bg-[var(--color-dark-border)]
                           transition-colors duration-200 cursor-pointer"
                onClick={() => setIsMobileMenuOpen(true)}
                aria-label="Open navigation menu"
              >
                <MenuIcon />
              </button>

              {/* Desktop navigation */}
              <nav
                id="desktop-nav"
                className="hidden lg:flex items-center gap-1"
                aria-label="Main navigation"
              >
                {NAV_LINKS.map((link) => (
                  <RouterNavLink
                    key={link.label}
                    to={link.href}
                    end={link.href === '/'}
                    className={({ isActive }) =>
                      `flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium
                       transition-colors duration-200
                       ${isActive
                         ? 'text-[var(--color-brand-600)] dark:text-[var(--color-brand-400)]'
                         : 'text-[var(--color-text-secondary)] dark:text-[var(--color-dark-text-secondary)] hover:text-[var(--color-text-primary)] dark:hover:text-[var(--color-dark-text-primary)]'
                       }`
                    }
                  >
                    {link.label}
                    {link.hasDropdown && <ChevronDownIcon />}
                  </RouterNavLink>
                ))}
              </nav>
            </div>

            {/* ─── Center: Logo ─── */}
            <RouterNavLink
              to="/"
              id="logo"
              className="flex items-center gap-2 text-[var(--color-text-primary)] dark:text-[var(--color-dark-text-primary)]
                         no-underline shrink-0"
            >
              {/* Logo mark */}
              <span
                className="flex items-center justify-center w-8 h-8 rounded-lg
                           bg-[var(--color-brand-600)] text-white font-display font-bold text-lg"
              >
                B
              </span>
              <span className="font-display text-xl font-bold tracking-wide uppercase">
                Berlion
              </span>
            </RouterNavLink>

            {/* ─── Right: Actions ─── */}
            <div className="flex items-center gap-1 flex-1 justify-end">
              {/* Search — hidden on small mobile */}
              <button
                id="search-toggle"
                type="button"
                className="hidden sm:flex items-center justify-center w-9 h-9 rounded-full
                           text-[var(--color-text-secondary)] dark:text-[var(--color-dark-text-secondary)]
                           hover:bg-[var(--color-border-subtle)] dark:hover:bg-[var(--color-dark-border)]
                           transition-colors duration-200 cursor-pointer"
                aria-label="Search"
              >
                <SearchIcon />
              </button>

              {/* Cart */}
              <button
                id="cart-toggle"
                type="button"
                className="flex items-center justify-center w-9 h-9 rounded-full
                           text-[var(--color-text-secondary)] dark:text-[var(--color-dark-text-secondary)]
                           hover:bg-[var(--color-border-subtle)] dark:hover:bg-[var(--color-dark-border)]
                           transition-colors duration-200 cursor-pointer"
                aria-label="Shopping cart"
              >
                <ShoppingBagIcon />
              </button>

              {/* Theme switcher — hidden on mobile (available in mobile menu) */}
              <div className="hidden sm:block">
                <ThemeSwitcher />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile navigation drawer */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        links={NAV_LINKS}
      />
    </>
  );
}


