import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

export interface ThemeColors {
  primary: string;
  primaryLight: string;
  secondary: string;
  secondaryHover: string;
}

export interface Theme {
  key: string;
  name: string;
  colors: ThemeColors;
  opacity: number;
}

/** Lighten a hex color */
function lightenColor(hex: string, percent: number): string {
  const num = parseInt(hex.replace('#', ''), 16);
  const r = Math.min(255, (num >> 16) + Math.round(((255 - (num >> 16)) * percent) / 100));
  const g = Math.min(255, ((num >> 8) & 0x00ff) + Math.round(((255 - ((num >> 8) & 0x00ff)) * percent) / 100));
  const b = Math.min(255, (num & 0x0000ff) + Math.round(((255 - (num & 0x0000ff)) * percent) / 100));
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

/** Darken a hex color */
function darkenColor(hex: string, percent: number): string {
  const num = parseInt(hex.replace('#', ''), 16);
  const r = Math.max(0, (num >> 16) - Math.round(((num >> 16) * percent) / 100));
  const g = Math.max(0, ((num >> 8) & 0x00ff) - Math.round((((num >> 8) & 0x00ff) * percent) / 100));
  const b = Math.max(0, (num & 0x0000ff) - Math.round(((num & 0x0000ff) * percent) / 100));
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

/** Convert hex to rgba string */
export function hexToRgba(hex: string, alpha: number): string {
  const num = parseInt(hex.replace('#', ''), 16);
  const r = (num >> 16) & 255;
  const g = (num >> 8) & 255;
  const b = num & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

/** Build ThemeColors from primary + secondary */
export function buildThemeColors(primary: string, secondary: string): ThemeColors {
  return {
    primary,
    primaryLight: lightenColor(primary, 12),
    secondary,
    secondaryHover: darkenColor(secondary, 15),
  };
}

export const THEMES: Theme[] = [
  { key: 'default', name: 'Default', colors: buildThemeColors('#0A1931', '#F5A623'), opacity: 1 },
  { key: 'ocean', name: 'Ocean Blue', colors: buildThemeColors('#0C4A6E', '#38BDF8'), opacity: 1 },
  { key: 'emerald', name: 'Emerald', colors: buildThemeColors('#064E3B', '#10B981'), opacity: 1 },
  { key: 'purple', name: 'Royal Purple', colors: buildThemeColors('#3B0764', '#A855F7'), opacity: 1 },
  { key: 'sunset', name: 'Sunset', colors: buildThemeColors('#7C2D12', '#F97316'), opacity: 1 },
];

interface ThemeContextValue {
  currentTheme: Theme;
  setTheme: (key: string) => void;
  setCustomColors: (primary: string, secondary: string, opacity?: number) => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  currentTheme: THEMES[0],
  setTheme: () => {},
  setCustomColors: () => {},
});

export const useTheme = () => useContext(ThemeContext);

function applyThemeToDOM(theme: Theme) {
  const root = document.documentElement;
  root.style.setProperty('--color-primary', theme.colors.primary);
  root.style.setProperty('--color-primary-light', theme.colors.primaryLight);
  root.style.setProperty('--color-secondary', theme.colors.secondary);
  root.style.setProperty('--color-secondary-hover', theme.colors.secondaryHover);
  root.style.setProperty('--color-primary-rgba', hexToRgba(theme.colors.primary, theme.opacity));
  root.style.setProperty('--color-secondary-rgba', hexToRgba(theme.colors.secondary, theme.opacity));
  root.style.setProperty('--theme-opacity', String(theme.opacity));
}

function loadSavedTheme(): Theme {
  try {
    const saved = localStorage.getItem('theme');
    if (saved && saved !== 'custom') {
      const found = THEMES.find((t) => t.key === saved);
      if (found) return found;
    }
    const custom = localStorage.getItem('theme-custom');
    if (custom) {
      const { primary, secondary, opacity } = JSON.parse(custom);
      return { key: 'custom', name: 'Custom', colors: buildThemeColors(primary, secondary), opacity: opacity ?? 1 };
    }
  } catch {}
  return THEMES[0];
}

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState<Theme>(loadSavedTheme);

  useEffect(() => {
    applyThemeToDOM(currentTheme);
  }, [currentTheme]);

  const setTheme = useCallback((key: string) => {
    const found = THEMES.find((t) => t.key === key);
    if (found) {
      setCurrentTheme(found);
      try {
        localStorage.setItem('theme', key);
        localStorage.removeItem('theme-custom');
      } catch {}
    }
  }, []);

  const setCustomColors = useCallback((primary: string, secondary: string, opacity: number = 1) => {
    const theme: Theme = { key: 'custom', name: 'Custom', colors: buildThemeColors(primary, secondary), opacity };
    setCurrentTheme(theme);
    try {
      localStorage.setItem('theme', 'custom');
      localStorage.setItem('theme-custom', JSON.stringify({ primary, secondary, opacity }));
    } catch {}
  }, []);

  return (
    <ThemeContext.Provider value={{ currentTheme, setTheme, setCustomColors }}>
      {children}
    </ThemeContext.Provider>
  );
};
