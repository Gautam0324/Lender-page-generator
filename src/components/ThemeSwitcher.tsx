import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Palette, Check } from 'lucide-react';
import { useTheme, THEMES } from '../store/ThemeContext';

/** Generate a color grid: columns = hues, rows = light→dark variations */
function generateColorGrid(): string[][] {
  const hues = [0, 15, 30, 45, 60, 80, 100, 120, 150, 180, 200, 220, 240, 260, 280, 300, 330];
  const rows: string[][] = [];

  // Row 0-1: Very light tints (high lightness)
  for (let li = 0; li < 2; li++) {
    const lightness = 92 - li * 10;
    const row: string[] = [];
    for (const h of hues) {
      row.push(`hsl(${h}, 70%, ${lightness}%)`);
    }
    rows.push(row);
  }

  // Rows 2-8: Full saturation, varying lightness
  const lightnesses = [72, 62, 52, 45, 38, 30, 22];
  for (const l of lightnesses) {
    const row: string[] = [];
    for (const h of hues) {
      row.push(`hsl(${h}, 80%, ${l}%)`);
    }
    rows.push(row);
  }

  // Row 9-10: Dark / desaturated
  for (let di = 0; di < 2; di++) {
    const lightness = 15 - di * 7;
    const row: string[] = [];
    for (const h of hues) {
      row.push(`hsl(${h}, 40%, ${lightness}%)`);
    }
    rows.push(row);
  }

  // Row 11: Grayscale
  const grayRow: string[] = [];
  const graySteps = hues.length;
  for (let i = 0; i < graySteps; i++) {
    const l = Math.round((i / (graySteps - 1)) * 100);
    grayRow.push(`hsl(0, 0%, ${100 - l}%)`);
  }
  rows.push(grayRow);

  return rows;
}

/** Convert any CSS color to hex via canvas */
function colorToHex(color: string): string {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = 1;
  const ctx = canvas.getContext('2d')!;
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, 1, 1);
  const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

export const ThemeSwitcher: React.FC = () => {
  const { currentTheme, setTheme, setCustomColors } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'presets' | 'custom'>('presets');
  const [pickingFor, setPickingFor] = useState<'primary' | 'secondary'>('primary');
  const containerRef = useRef<HTMLDivElement>(null);

  const [customPrimary, setCustomPrimary] = useState(
    currentTheme.key === 'custom' ? currentTheme.colors.primary : '#0A1931'
  );
  const [customSecondary, setCustomSecondary] = useState(
    currentTheme.key === 'custom' ? currentTheme.colors.secondary : '#F5A623'
  );
  const [opacity, setOpacity] = useState(currentTheme.opacity ?? 1);

  const colorGrid = useMemo(() => generateColorGrid(), []);

  // Close on click outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleGridColorPick = (cssColor: string) => {
    const hex = colorToHex(cssColor);
    if (pickingFor === 'primary') {
      setCustomPrimary(hex);
      setCustomColors(hex, customSecondary, opacity);
    } else {
      setCustomSecondary(hex);
      setCustomColors(customPrimary, hex, opacity);
    }
  };

  const handleOpacityChange = (val: number) => {
    setOpacity(val);
    setCustomColors(customPrimary, customSecondary, val);
  };

  return (
    <div ref={containerRef} className="theme-switcher-container" id="theme-switcher">
      {/* Floating trigger */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="theme-switcher-trigger"
        aria-label="Change color theme"
        title="Change theme"
      >
        <Palette size={22} />
      </button>

      {/* Panel */}
      <div className={`theme-switcher-panel ${isOpen ? 'theme-switcher-panel--open' : ''}`}>
        {/* Tab switcher */}
        <div className="theme-tabs">
          <button
            className={`theme-tab ${activeTab === 'presets' ? 'theme-tab--active' : ''}`}
            onClick={() => setActiveTab('presets')}
          >
            Presets
          </button>
          <button
            className={`theme-tab ${activeTab === 'custom' ? 'theme-tab--active' : ''}`}
            onClick={() => setActiveTab('custom')}
          >
            Custom
          </button>
        </div>

        {/* Presets tab */}
        {activeTab === 'presets' && (
          <div className="theme-switcher-swatches">
            {THEMES.map((theme, index) => {
              const isActive = currentTheme.key === theme.key;
              return (
                <button
                  key={theme.key}
                  onClick={() => setTheme(theme.key)}
                  className={`theme-swatch ${isActive ? 'theme-swatch--active' : ''}`}
                  style={{ transitionDelay: isOpen ? `${index * 50}ms` : '0ms' }}
                  aria-label={`Switch to ${theme.name} theme`}
                  title={theme.name}
                >
                  <span className="theme-swatch-color" aria-hidden="true">
                    <span className="theme-swatch-half theme-swatch-half--left" style={{ backgroundColor: theme.colors.primary }} />
                    <span className="theme-swatch-half theme-swatch-half--right" style={{ backgroundColor: theme.colors.secondary }} />
                  </span>
                  {isActive && (
                    <span className="theme-swatch-check">
                      <Check size={14} strokeWidth={3} />
                    </span>
                  )}
                  <span className="theme-swatch-label">{theme.name}</span>
                </button>
              );
            })}
          </div>
        )}

        {/* Custom tab */}
        {activeTab === 'custom' && (
          <div className="theme-custom-tab">
            {/* Picking for toggle */}
            <div className="theme-pick-toggle">
              <button
                className={`theme-pick-btn ${pickingFor === 'primary' ? 'theme-pick-btn--active' : ''}`}
                onClick={() => setPickingFor('primary')}
              >
                <span className="theme-pick-dot" style={{ backgroundColor: customPrimary }} />
                Primary
              </button>
              <button
                className={`theme-pick-btn ${pickingFor === 'secondary' ? 'theme-pick-btn--active' : ''}`}
                onClick={() => setPickingFor('secondary')}
              >
                <span className="theme-pick-dot" style={{ backgroundColor: customSecondary }} />
                Accent
              </button>
            </div>

            {/* Color Grid */}
            <div className="theme-color-grid">
              {colorGrid.map((row, ri) => (
                <div key={ri} className="theme-color-grid-row">
                  {row.map((color, ci) => (
                    <button
                      key={`${ri}-${ci}`}
                      className="theme-color-cell"
                      style={{ backgroundColor: color }}
                      onClick={() => handleGridColorPick(color)}
                      title={colorToHex(color).toUpperCase()}
                      aria-label={`Pick color ${color}`}
                    />
                  ))}
                </div>
              ))}
            </div>

            {/* Selected color preview */}
            <div className="theme-selected-preview">
              <div className="theme-preview-swatch">
                <span style={{ backgroundColor: customPrimary, width: '50%', height: '100%', display: 'inline-block', borderRadius: '6px 0 0 6px' }} />
                <span style={{ backgroundColor: customSecondary, width: '50%', height: '100%', display: 'inline-block', borderRadius: '0 6px 6px 0' }} />
              </div>
              <div className="theme-preview-hex">
                <span>{customPrimary.toUpperCase()}</span>
                <span>{customSecondary.toUpperCase()}</span>
              </div>
            </div>

            {/* Opacity Slider */}
            <div className="theme-opacity-section">
              <label className="theme-opacity-label">
                Opacity
                <span className="theme-opacity-value">{Math.round(opacity * 100)}%</span>
              </label>
              <div className="theme-opacity-slider-wrap">
                <div
                  className="theme-opacity-track"
                  style={{
                    background: `linear-gradient(to right, transparent, ${customPrimary})`,
                  }}
                />
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={opacity}
                  onChange={(e) => handleOpacityChange(parseFloat(e.target.value))}
                  className="theme-opacity-slider"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
