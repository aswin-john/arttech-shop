import { useState, useRef, useEffect, type ReactNode } from 'react';
import { useTheme } from '../../context/ThemeContext';

type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeOption {
  value: ThemeMode;
  label: string;
  icon: ReactNode;
}

/** SVG icon for sun (light mode) */
function SunIcon(): ReactNode {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );
}

/** SVG icon for moon (dark mode) */
function MoonIcon(): ReactNode {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

/** SVG icon for monitor (system mode) */
function MonitorIcon(): ReactNode {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  );
}

const THEME_OPTIONS: ThemeOption[] = [
  { value: 'light', label: 'Light', icon: <SunIcon /> },
  { value: 'dark', label: 'Dark', icon: <MoonIcon /> },
  { value: 'system', label: 'System', icon: <MonitorIcon /> },
];

/**
 * Theme switcher dropdown with three modes:
 * light, dark, and system (OS preference).
 */
export function ThemeSwitcher(): ReactNode {
  const { mode, setMode } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const activeOption = THEME_OPTIONS.find((opt) => opt.value === mode);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent): void {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // Close dropdown on Escape key
  useEffect(() => {
    function handleEscape(event: KeyboardEvent): void {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  function handleSelect(value: ThemeMode): void {
    setMode(value);
    setIsOpen(false);
  }

  return (
    <div className="relative" ref={containerRef}>
      <button
        id="theme-switcher-toggle"
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-9 h-9 rounded-full
                   text-[var(--color-text-secondary)] dark:text-[var(--color-dark-text-secondary)]
                   hover:bg-[var(--color-border-subtle)] dark:hover:bg-[var(--color-dark-border)]
                   transition-colors duration-200 cursor-pointer"
        aria-label={`Theme: ${activeOption?.label}. Click to change.`}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span className="transition-transform duration-300" style={{ transform: isOpen ? 'rotate(180deg)' : 'none' }}>
          {activeOption?.icon}
        </span>
      </button>

      {isOpen && (
        <div
          role="listbox"
          aria-label="Select theme"
          className="absolute right-0 top-full mt-2 z-50
                     w-36 rounded-xl overflow-hidden
                     bg-[var(--color-surface)] dark:bg-[var(--color-dark-surface-elevated)]
                     border border-[var(--color-border)] dark:border-[var(--color-dark-border)]
                     shadow-lg
                     animate-in fade-in slide-in-from-top-2"
          style={{
            animation: 'dropdownIn 0.2s var(--ease-out-expo) forwards',
          }}
        >
          {THEME_OPTIONS.map((option) => (
            <button
              key={option.value}
              type="button"
              role="option"
              aria-selected={mode === option.value}
              onClick={() => handleSelect(option.value)}
              className={`flex items-center gap-2.5 w-full px-3.5 py-2.5 text-sm
                         transition-colors duration-150 cursor-pointer
                         ${
                           mode === option.value
                             ? 'bg-[var(--color-brand-50)] dark:bg-[var(--color-brand-900)]/30 text-[var(--color-brand-600)] dark:text-[var(--color-brand-400)] font-medium'
                             : 'text-[var(--color-text-secondary)] dark:text-[var(--color-dark-text-secondary)] hover:bg-[var(--color-border-subtle)] dark:hover:bg-[var(--color-dark-border)]'
                         }`}
            >
              {option.icon}
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
