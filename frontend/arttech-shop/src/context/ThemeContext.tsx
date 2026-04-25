import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react';

type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeContextValue {
  /** The user's selected preference (light | dark | system) */
  mode: ThemeMode;
  /** The resolved appearance currently applied */
  resolvedTheme: 'light' | 'dark';
  /** Update the theme mode */
  setMode: (mode: ThemeMode) => void;
}

const STORAGE_KEY = 'theme-preference';

const ThemeContext = createContext<ThemeContextValue | null>(null);

/**
 * Reads the persisted preference from localStorage.
 * Defaults to 'system' on first visit (no stored value).
 */
function getStoredMode(): ThemeMode {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'light' || stored === 'dark' || stored === 'system') {
      return stored;
    }
  } catch {
    // localStorage may be unavailable (e.g. incognito in some browsers)
  }
  return 'system';
}

/**
 * Resolves the effective theme based on mode and OS preference.
 */
function resolveTheme(mode: ThemeMode): 'light' | 'dark' {
  if (mode === 'system') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  }
  return mode;
}

/**
 * Applies or removes the `.dark` class on the `<html>` element.
 * Tailwind v4 uses this class for dark mode variants.
 */
function applyThemeToDOM(resolved: 'light' | 'dark'): void {
  const root = document.documentElement;
  if (resolved === 'dark') {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
}

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps): ReactNode {
  const [mode, setModeState] = useState<ThemeMode>(getStoredMode);
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>(() =>
    resolveTheme(getStoredMode()),
  );

  const setMode = useCallback((newMode: ThemeMode) => {
    setModeState(newMode);
    try {
      localStorage.setItem(STORAGE_KEY, newMode);
    } catch {
      // Silently fail if localStorage unavailable
    }
  }, []);

  // Re-resolve whenever mode changes
  useEffect(() => {
    const resolved = resolveTheme(mode);
    setResolvedTheme(resolved);
    applyThemeToDOM(resolved);
  }, [mode]);

  // Listen for OS preference changes when in system mode
  useEffect(() => {
    if (mode !== 'system') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = (): void => {
      const resolved = resolveTheme('system');
      setResolvedTheme(resolved);
      applyThemeToDOM(resolved);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [mode]);

  return (
    <ThemeContext.Provider value={{ mode, resolvedTheme, setMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

/**
 * Hook to access the theme context.
 * Must be used within a ThemeProvider.
 */
export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
