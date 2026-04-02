/**
 * Mobile-Responsive Utilities
 * Provides breakpoints and responsive design patterns for mobile-first approach
 */

import React from 'react';

export const BREAKPOINTS = {
  mobile: 375,      // iPhone 17 Pro width
  tablet: 768,      // iPad
  desktop: 1280,    // Desktop
};

export const MEDIA_QUERIES = {
  mobile: '(max-width: 640px)',
  tablet: '(min-width: 641px) and (max-width: 1024px)',
  desktop: '(min-width: 1025px)',
  touchDevice: '(hover: none) and (pointer: coarse)',
  notch: '(viewport-fit: cover)',
};

export const RESPONSIVE_STYLES = `
  /* Global Mobile Responsive Styles */
  
  /* Touch-friendly sizing for mobile */
  @media (hover: none) and (pointer: coarse) {
    button, a, input[type="button"], input[type="submit"] {
      min-height: 44px;
      min-width: 44px;
    }
  }

  /* Safe area support for notched devices */
  @supports (padding: max(0px)) {
    body {
      padding-left: max(12px, env(safe-area-inset-left));
      padding-right: max(12px, env(safe-area-inset-right));
      padding-top: max(12px, env(safe-area-inset-top));
      padding-bottom: max(12px, env(safe-area-inset-bottom));
    }
  }

  /* Mobile-optimized text */
  @media (max-width: 640px) {
    html {
      font-size: 14px;
    }
    
    h1 {
      font-size: 28px !important;
      line-height: 1.2 !important;
    }
    
    h2 {
      font-size: 24px !important;
      line-height: 1.2 !important;
    }
    
    h3 {
      font-size: 20px !important;
      line-height: 1.3 !important;
    }
    
    p, span, a {
      font-size: 14px !important;
      line-height: 1.6 !important;
    }
  }

  /* Prevent zoom on input focus (iOS) */
  @media (max-width: 640px) {
    input, textarea, select {
      font-size: 16px;
    }
  }

  /* Touch-friendly spacing */
  @media (max-width: 640px) {
    button, a, .btn {
      padding: 12px 16px;
      border-radius: 8px;
    }
  }

  /* Responsive images */
  img {
    max-width: 100%;
    height: auto;
    display: block;
  }

  /* Scrollbar hiding for mobile */
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }

  /* Responsive grid */
  @media (max-width: 640px) {
    .grid {
      grid-template-columns: 1fr !important;
    }
    .grid-cols-2 {
      grid-template-columns: 1fr !important;
    }
    .grid-cols-3 {
      grid-template-columns: 1fr !important;
    }
    .grid-cols-4 {
      grid-template-columns: 1fr !important;
    }
  }

  /* Responsive flexbox */
  @media (max-width: 640px) {
    .flex-row {
      flex-direction: column;
    }
  }

  /* Prevent horizontal scroll on mobile */
  @media (max-width: 640px) {
    body, html {
      overflow-x: hidden;
      max-width: 100vw;
    }
  }
`;

/**
 * Get responsive value based on current viewport
 */
export const getResponsiveValue = (mobile: any, tablet?: any, desktop?: any) => {
  if (typeof window === 'undefined') return desktop || tablet || mobile;

  const width = window.innerWidth;
  if (width <= BREAKPOINTS.mobile) return mobile;
  if (width <= BREAKPOINTS.tablet) return tablet || mobile;
  return desktop || tablet || mobile;
};

/**
 * Hook to detect current breakpoint
 */
export const useBreakpoint = () => {
  const [breakpoint, setBreakpoint] = React.useState<'mobile' | 'tablet' | 'desktop'>('desktop');

  React.useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width <= BREAKPOINTS.mobile) setBreakpoint('mobile');
      else if (width <= BREAKPOINTS.tablet) setBreakpoint('tablet');
      else setBreakpoint('desktop');
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return breakpoint;
};

export default {
  BREAKPOINTS,
  MEDIA_QUERIES,
  RESPONSIVE_STYLES,
  getResponsiveValue,
};
