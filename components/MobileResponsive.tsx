'use client';

import React, { ReactNode } from 'react';
import { cn } from '@/lib/style-utils';

interface MobileResponsiveWrapperProps {
  children: ReactNode;
  className?: string;
  fullHeight?: boolean;
  noPadding?: boolean;
  noMargin?: boolean;
}

/**
 * Mobile-responsive wrapper component that ensures proper padding, margins, and sizing
 * for mobile devices. Automatically handles safe areas on notched devices.
 */
export const MobileResponsiveWrapper: React.FC<MobileResponsiveWrapperProps> = ({
  children,
  className,
  fullHeight = false,
  noPadding = false,
  noMargin = false,
}) => {
  return (
    <div
      className={cn(
        // Mobile-first responsive padding
        'px-4 md:px-6 lg:px-8',
        'py-4 md:py-6 lg:py-8',
        
        // Safe area support for notched devices
        '[padding-left:max(1rem,env(safe-area-inset-left))]',
        '[padding-right:max(1rem,env(safe-area-inset-right))]',
        '[padding-top:max(1rem,env(safe-area-inset-top))]',
        '[padding-bottom:max(1rem,env(safe-area-inset-bottom))]',
        
        // Conditional padding
        noPadding && 'px-0 py-0',
        noMargin && 'm-0',
        
        // Height handling
        fullHeight && 'min-h-screen md:min-h-full',
        
        // Custom className
        className
      )}
    >
      {children}
    </div>
  );
};

/**
 * Mobile-responsive grid component
 */
export const MobileResponsiveGrid: React.FC<{
  children: ReactNode;
  cols?: number;
  className?: string;
}> = ({ children, cols = 1, className }) => {
  return (
    <div
      className={cn(
        'grid',
        'grid-cols-1 gap-4',
        'md:gap-6',
        'lg:gap-8',
        // Responsive columns
        cols >= 2 && 'sm:grid-cols-2',
        cols >= 3 && 'md:grid-cols-3',
        cols >= 4 && 'lg:grid-cols-4',
        className
      )}
    >
      {children}
    </div>
  );
};

/**
 * Touch-friendly button wrapper
 */
export const TouchFriendlyButton: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({ children, className, ...props }) => {
  return (
    <button
      className={cn(
        // Minimum touch target size (44x44px for iOS guidelines)
        'min-h-[44px] min-w-[44px] px-4',
        
        // Default padding
        'py-2 md:py-2.5',
        
        // Better tap feedback
        'active:scale-95 transition-transform',
        
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

/**
 * Responsive container for different viewports
 */
export const ResponsiveContainer: React.FC<{
  children: ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  centered?: boolean;
  className?: string;
}> = ({ children, maxWidth = 'lg', centered = true, className }) => {
  const maxWidthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    full: 'max-w-full',
  };

  return (
    <div
      className={cn(
        maxWidthClasses[maxWidth],
        centered && 'mx-auto',
        'w-full',
        className
      )}
    >
      {children}
    </div>
  );
};

export default {
  MobileResponsiveWrapper,
  MobileResponsiveGrid,
  TouchFriendlyButton,
  ResponsiveContainer,
};
