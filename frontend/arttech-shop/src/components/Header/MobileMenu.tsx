import { useState, useEffect, type ReactNode } from 'react';
import { NavLink as RouterNavLink } from 'react-router-dom';
import { ThemeSwitcher } from '../ThemeSwitcher/ThemeSwitcher';
import type { NavLink } from './types';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  links: NavLink[];
}

/** Close (X) icon SVG */
function CloseIcon(): ReactNode {
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
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

/** Chevron down icon */
function ChevronDownIcon(): ReactNode {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
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
 * Renders mobile nav links with accordion-style expandable children.
 * Links with `children` show a chevron that expands sub-items on tap.
 */
function MobileNavLinks({
  links,
  onClose,
}: {
  links: NavLink[];
  onClose: () => void;
}): ReactNode {
  const [expandedLabel, setExpandedLabel] = useState<string | null>(null);

  return (
    <ul className="list-none p-0 m-0 flex flex-col gap-1">
      {links.map((link) => (
        <li key={link.label}>
          {link.hasDropdown && link.children ? (
            <>
              {/* Accordion trigger */}
              <button
                type="button"
                onClick={() =>
                  setExpandedLabel((prev) =>
                    prev === link.label ? null : link.label,
                  )
                }
                className={`flex w-full items-center justify-between px-3 py-3 rounded-lg text-base font-medium
                  transition-colors duration-200 cursor-pointer
                  ${
                    expandedLabel === link.label
                      ? 'text-[var(--color-brand-600)] dark:text-[var(--color-brand-400)] bg-[var(--color-brand-50)] dark:bg-[var(--color-brand-900)]/20'
                      : 'text-[var(--color-text-primary)] dark:text-[var(--color-dark-text-primary)] hover:bg-[var(--color-border-subtle)] dark:hover:bg-[var(--color-dark-border)]'
                  }`}
                aria-expanded={expandedLabel === link.label}
              >
                {link.label}
                <span
                  className={`transition-transform duration-200 ${
                    expandedLabel === link.label ? 'rotate-180' : ''
                  }`}
                >
                  <ChevronDownIcon />
                </span>
              </button>

              {/* Sub-items */}
              {expandedLabel === link.label && (
                <ul className="list-none p-0 m-0 mt-1 ml-3 flex flex-col gap-0.5 border-l-2 border-[var(--color-border)] dark:border-[var(--color-dark-border)]">
                  {link.children.map((child) => (
                    <li key={child.label}>
                      <RouterNavLink
                        to={child.href}
                        onClick={onClose}
                        className={({ isActive }) =>
                          `block pl-4 pr-3 py-2.5 rounded-r-lg text-sm font-medium
                           transition-colors duration-150
                           ${isActive
                             ? 'text-[var(--color-brand-600)] dark:text-[var(--color-brand-400)] bg-[var(--color-brand-50)] dark:bg-[var(--color-brand-900)]/20'
                             : 'text-[var(--color-text-secondary)] dark:text-[var(--color-dark-text-secondary)] hover:text-[var(--color-text-primary)] dark:hover:text-[var(--color-dark-text-primary)] hover:bg-[var(--color-border-subtle)] dark:hover:bg-[var(--color-dark-border)]'
                           }`
                        }
                      >
                        {child.label}
                      </RouterNavLink>
                    </li>
                  ))}
                </ul>
              )}
            </>
          ) : (
            <RouterNavLink
              to={link.href}
              end={link.href === '/'}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center justify-between px-3 py-3 rounded-lg text-base font-medium
                 transition-colors duration-200
                 ${isActive
                   ? 'text-[var(--color-brand-600)] dark:text-[var(--color-brand-400)] bg-[var(--color-brand-50)] dark:bg-[var(--color-brand-900)]/20'
                   : 'text-[var(--color-text-primary)] dark:text-[var(--color-dark-text-primary)] hover:bg-[var(--color-border-subtle)] dark:hover:bg-[var(--color-dark-border)]'
                 }`
              }
            >
              {link.label}
            </RouterNavLink>
          )}
        </li>
      ))}
    </ul>
  );
}

/**
 * Full-screen slide-in mobile navigation drawer.
 * Slides in from the left with a backdrop overlay.
 * Contains all nav links + theme switcher.
 */
export function MobileMenu({
  isOpen,
  onClose,
  links,
}: MobileMenuProps): ReactNode {
  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    function handleEscape(event: KeyboardEvent): void {
      if (event.key === 'Escape') {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  return (
    <>
      {/* Backdrop overlay */}
      <div
        className={`fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm
                    transition-opacity duration-300
                    ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer panel */}
      <div
        id="mobile-menu-panel"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={`fixed top-0 left-0 z-[70] h-full w-[280px] max-w-[85vw]
                    bg-[var(--color-surface)] dark:bg-[var(--color-dark-surface-elevated)]
                    shadow-2xl
                    transition-transform duration-300
                    ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
        style={{ transitionTimingFunction: 'var(--ease-out-expo)' }}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-5 h-16 border-b border-[var(--color-border)] dark:border-[var(--color-dark-border)]">
          <RouterNavLink
            to="/"
            className="flex items-center gap-2 text-[var(--color-text-primary)] dark:text-[var(--color-dark-text-primary)] no-underline"
          >
            <span
              className="flex items-center justify-center w-7 h-7 rounded-md
                         bg-[var(--color-brand-600)] text-white font-display font-bold text-sm"
            >
              B
            </span>
            <span className="font-display text-lg font-bold tracking-wide uppercase">
              Berlion
            </span>
          </RouterNavLink>

          <button
            type="button"
            onClick={onClose}
            className="flex items-center justify-center w-9 h-9 rounded-full
                       text-[var(--color-text-secondary)] dark:text-[var(--color-dark-text-secondary)]
                       hover:bg-[var(--color-border-subtle)] dark:hover:bg-[var(--color-dark-border)]
                       transition-colors duration-200 cursor-pointer"
            aria-label="Close menu"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Navigation links */}
        <nav className="px-3 py-4" aria-label="Mobile navigation">
          <MobileNavLinks links={links} onClose={onClose} />
        </nav>

        {/* Theme section at bottom */}
        <div className="absolute bottom-30 left-0 right-0 px-5 py-4 border-t border-[var(--color-border)] dark:border-[var(--color-dark-border)]">
          <div className="flex items-center justify-between">
            <span className="text-sm text-[var(--color-text-muted)] dark:text-[var(--color-dark-text-muted)]">
              Appearance
            </span>
            <ThemeSwitcher />
          </div>
        </div>
      </div>
    </>
  );
}
