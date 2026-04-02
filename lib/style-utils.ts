import { StyleProps, Breakpoint, ResponsiveStyle } from './types';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getStylesForBreakpoint = (
  style: ResponsiveStyle,
  breakpoint: Breakpoint
): StyleProps => {
  const desktop = style.desktop || {};
  const tablet = style.tablet || {};
  const mobile = style.mobile || {};

  if (breakpoint === 'desktop') return desktop;
  if (breakpoint === 'tablet') return { ...desktop, ...tablet };
  if (breakpoint === 'mobile') return { ...desktop, ...tablet, ...mobile };
  
  return desktop;
};

export const styleToCss = (props: StyleProps): React.CSSProperties => {
  const css: React.CSSProperties = {};

  if (props.width) css.width = props.width;
  if (props.height) css.height = props.height;
  if (props.display) css.display = props.display;
  if (props.flexDirection) css.flexDirection = props.flexDirection;
  if (props.alignItems) css.alignItems = props.alignItems;
  if (props.justifyContent) css.justifyContent = props.justifyContent;
  if (props.gap) css.gap = props.gap;

  if (props.padding) {
    if (props.padding.top) css.paddingTop = props.padding.top;
    if (props.padding.right) css.paddingRight = props.padding.right;
    if (props.padding.bottom) css.paddingBottom = props.padding.bottom;
    if (props.padding.left) css.paddingLeft = props.padding.left;
  }

  if (props.margin) {
    if (props.margin.top) css.marginTop = props.margin.top;
    if (props.margin.right) css.marginRight = props.margin.right;
    if (props.margin.bottom) css.marginBottom = props.margin.bottom;
    if (props.margin.left) css.marginLeft = props.margin.left;
  }

  if (props.fontSize) css.fontSize = props.fontSize;
  if (props.fontWeight) css.fontWeight = props.fontWeight;
  if (props.fontFamily) css.fontFamily = props.fontFamily;
  if (props.lineHeight) css.lineHeight = props.lineHeight;
  if (props.letterSpacing) css.letterSpacing = props.letterSpacing;
  if (props.textAlign) css.textAlign = props.textAlign;
  if (props.color) css.color = props.color;

  if (props.backgroundColor) css.backgroundColor = props.backgroundColor;
  if (props.backgroundImage) css.backgroundImage = `url(${props.backgroundImage})`;
  if (props.backgroundSize) css.backgroundSize = props.backgroundSize;
  if (props.backgroundPosition) css.backgroundPosition = props.backgroundPosition;
  if (props.backgroundRepeat) css.backgroundRepeat = props.backgroundRepeat;

  if (props.border) {
    if (props.border.width) css.borderWidth = props.border.width;
    if (props.border.style) css.borderStyle = props.border.style;
    if (props.border.color) css.borderColor = props.border.color;
    if (props.border.radius) css.borderRadius = props.border.radius;
  }

  if (props.boxShadow) css.boxShadow = props.boxShadow;
  if (props.opacity) css.opacity = props.opacity;
  if (props.backdropBlur) css.backdropFilter = `blur(${props.backdropBlur})`;
  if (props.zIndex) css.zIndex = props.zIndex;
  if (props.position) css.position = props.position;
  if (props.top) css.top = props.top;
  if (props.right) css.right = props.right;
  if (props.bottom) css.bottom = props.bottom;
  if (props.left) css.left = props.left;

  return css;
};
