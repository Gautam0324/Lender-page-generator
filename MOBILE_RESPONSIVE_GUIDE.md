# Mobile Responsive Features Guide

## Overview

The application now includes comprehensive mobile responsiveness with an integrated iPhone 17 Pro mobile preview feature. This guide explains the new mobile-responsive capabilities.

## 🎯 New Features

### 1. **iPhone Mobile Preview Panel**
   - **Location**: Builder toolbar (top-right corner)
   - **Icon**: Smartphone icon in the header
   - **Functionality**: Opens a modal showing a realistic iPhone preview of your design

#### Supported Devices:
- iPhone 14 (390x844px)
- iPhone 15 (393x852px)  
- **iPhone 17 Pro (410x882px)** ← Latest with Dynamic Island

#### Features:
- Live preview updates as you build
- Accurate device bezels and notch simulation
- Safe area padding for notched devices
- Interactive device selector
- Scrollable content preview

### 2. **Enhanced Canvas Responsive Preview**

The main canvas now displays your design in three responsive modes:

#### Desktop Mode
- Full width (max 1280px)
- Shows full layout
- Best for editing complex sections

#### Tablet Mode
- 768px width
- 1024px height
- iPad-style frame with bezels
- Good for medium-screen layouts

#### Mobile Mode (iPhone 17 Pro)
- 410px width (iPhone 17 Pro width)
- 882px height (iPhone 17 Pro height)
- Realistic rounded corners and home bar
- Dynamic Island notch at top
- Best for mobile-first design

### 3. **Responsive Default Styles**

When you add widgets, they now include responsive styles:

```typescript
style: {
  desktop: {
    padding: { top: '60px', bottom: '60px', left: '20px', right: '20px' },
  },
  mobile: {
    padding: { top: '40px', bottom: '40px', left: '16px', right: '16px' }
  }
}
```

### 4. **Global Mobile Responsive CSS**

Added to `app/layout.tsx`:

- **Safe Area Support**: Automatically handles notches and home indicators on iOS devices
- **Touch-Friendly Targets**: 44x44px minimum touch targets for accessibility
- **Font Sizing**: Prevents unwanted zoom on input focus (iOS)
- **Responsive Images**: Automatic scaling of images
- **Prevent Horizontal Scroll**: Stops unwanted overflow on mobile

### 5. **Mobile-Optimized Layout Components**

New components in `components/MobileResponsive.tsx`:

#### `MobileResponsiveWrapper`
Provides safe-area aware padding and margin:
```tsx
<MobileResponsiveWrapper>
  <YourContent />
</MobileResponsiveWrapper>
```

#### `MobileResponsiveGrid`
Responsive grid that adapts to screen size:
```tsx
<MobileResponsiveGrid cols={3}>
  <Item />
  <Item />
  <Item />
</MobileResponsiveGrid>
```

#### `TouchFriendlyButton`
Buttons with 44px minimum height:
```tsx
<TouchFriendlyButton onClick={handleClick}>
  Tap Me
</TouchFriendlyButton>
```

#### `ResponsiveContainer`
Container that respects max-width:
```tsx
<ResponsiveContainer maxWidth="lg">
  <Content />
</ResponsiveContainer>
```

## 📱 Mobile Breakpoints

```typescript
// From lib/responsive-utils.ts
const BREAKPOINTS = {
  mobile: 375,      // iPhone 17 Pro width
  tablet: 768,      // iPad
  desktop: 1280,    // Desktop
};
```

## 🎨 Using Responsive Styles in the Builder

### Step 1: Enter Mobile Mode
Click the **Mobile** button in the toolbar (or use the mobile preview)

### Step 2: Adjust Styles
- Select an element
- Open the Style Panel (right sidebar)
- Modify properties for mobile view
- Styles automatically apply only to mobile breakpoint

### Step 3: Test on iPhone 17 Pro
- Click the Smartphone icon (top-right toolbar)
- Select "iPhone 17 Pro"
- Verify your design looks great on mobile

## 💡 Best Practices

### 1. Mobile-First Approach
- Start with mobile styles
- Add desktop styles as enhancements
- Use `mobile → tablet → desktop` hierarchy

### 2. Touch-Friendly Design
- Buttons minimum 44x44px
- Spacing between touch targets (8px min)
- Use larger fonts for mobile (14px-16px)

### 3. Responsive Images
- Use `max-width: 100%` for images
- Avoid fixed widths on mobile
- Consider different image sizes for different devices

### 4. Safe Areas
- Don't place critical content under notch
- Use 16px padding minimum on mobile
- Account for home bar at bottom

## 📐 Responsive Meta Tags

Added to `app/layout.tsx`:

```html
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, viewport-fit=cover" />
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
<meta name="theme-color" content="#ffffff" />
```

These enable:
- Proper viewport scaling
- Notch support (viewport-fit=cover)
- PWA capabilities
- Status bar theming on iOS

## 🔧 Responsive Utils

The `lib/responsive-utils.ts` file exports:

```typescript
// Get responsive value based on viewport
getResponsiveValue(mobileValue, tabletValue, desktopValue)

// Detect current breakpoint (hook)
useBreakpoint() → 'mobile' | 'tablet' | 'desktop'

// Predefined media queries
MEDIA_QUERIES.mobile
MEDIA_QUERIES.tablet
MEDIA_QUERIES.desktop
MEDIA_QUERIES.touchDevice
```

## 📊 Header Responsiveness

The builder header automatically adjusts for mobile:

- **Desktop**: Shows full title and status
- **Tablet**: Hides some labels
- **Mobile**: Shows only icons, hides responsive mode buttons

## 🚀 Advanced Usage

### Custom Responsive Styles

```tsx
// In your component
const { responsiveMode } = useBuilderStore();

const styles = getStylesForBreakpoint(element.style, responsiveMode);
const cssStyle = styleToCss(styles);

return <div style={cssStyle}>{content}</div>;
```

### Device-Specific CSS

```css
/* Touch devices */
@media (hover: none) and (pointer: coarse) {
  button {
    min-height: 44px;
  }
}

/* Notched devices */
@supports (padding: max(0px)) {
  body {
    padding-left: max(16px, env(safe-area-inset-left));
  }
}
```

## ✅ Checklist for Mobile-Responsive Design

- [ ] Test on iPhone 17 Pro preview
- [ ] Test on tablet (768px) mode
- [ ] Verify safe areas are respected
- [ ] Check touch target sizes (44x44px minimum)
- [ ] Ensure fonts are readable (14px+)
- [ ] Test navigation on mobile
- [ ] Verify images scale properly
- [ ] Check form inputs zoom prevention
- [ ] Test horizontal scroll prevention
- [ ] Verify notch/home bar handling

## 🐛 Troubleshooting

### Preview doesn't update
- Click the refresh button in the mobile preview
- Ensure canvas has content (not empty)
- Check browser console for errors

### Safe areas not working
- Verify viewport meta tag is set
- Test on iOS simulator or device
- Check `viewport-fit=cover` is enabled

### Fonts too small on mobile
- Use responsive font sizes in mobile style
- Minimum 14px for body text
- Minimum 16px for input fields

## 📚 Related Files

- `components/builder/MobilePreview.tsx` - Mobile preview modal
- `components/builder/Canvas.tsx` - Main editing canvas
- `components/MobileResponsive.tsx` - Responsive utility components
- `lib/responsive-utils.ts` - Responsive utilities and hooks
- `app/layout.tsx` - Global responsive setup
- `app/builder/[pageId]/page.tsx` - Builder page with mobile controls

---

**Version**: 1.0  
**Last Updated**: 2024  
**Device Support**: iPhone 14+, iPad, Desktop
