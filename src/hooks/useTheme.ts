import { useEffect, useState } from 'react';

export type Theme = 'dark' | 'light';
export const THEME_STORAGE_KEY = 'khs-lg-theme';

export function getInitialTheme(): Theme {
  if (typeof document !== 'undefined' && document.documentElement.classList.contains('theme-light')) return 'light';
  if (typeof window !== 'undefined' && window.localStorage.getItem(THEME_STORAGE_KEY) === 'light') return 'light';
  return 'dark';
}

export function applyTheme(theme: Theme) {
  if (typeof document === 'undefined') return;
  document.documentElement.classList.toggle('theme-light', theme === 'light');
  document.documentElement.dataset.theme = theme;
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
    window.dispatchEvent(new CustomEvent('khs-theme-change', { detail: theme }));
  }
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    const handleThemeChange = (e: Event) => {
      const customEvent = e as CustomEvent<Theme>;
      if (customEvent.detail && (customEvent.detail === 'light' || customEvent.detail === 'dark')) {
        setTheme(customEvent.detail);
      } else {
        setTheme(getInitialTheme());
      }
    };

    window.addEventListener('khs-theme-change', handleThemeChange);
    window.addEventListener('storage', handleThemeChange);
    return () => {
      window.removeEventListener('khs-theme-change', handleThemeChange);
      window.removeEventListener('storage', handleThemeChange);
    };
  }, []);

  const toggleTheme = () => {
    const nextTheme: Theme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    applyTheme(nextTheme);
  };

  return { theme, toggleTheme };
}
