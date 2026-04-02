export type Breakpoint = 'desktop' | 'tablet' | 'mobile';

export interface StyleProps {
  // Layout
  width?: string;
  height?: string;
  display?: string;
  flexDirection?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  alignItems?: string;
  justifyContent?: string;
  gap?: string;

  // Spacing
  margin?: {
    top?: string;
    right?: string;
    bottom?: string;
    left?: string;
  };
  padding?: {
    top?: string;
    right?: string;
    bottom?: string;
    left?: string;
  };

  // Typography
  fontSize?: string;
  fontWeight?: string;
  fontFamily?: string;
  lineHeight?: string;
  letterSpacing?: string;
  textAlign?: 'left' | 'center' | 'right' | 'justify';
  color?: string;

  // Visuals
  backgroundColor?: string;
  backgroundImage?: string;
  backgroundSize?: string;
  backgroundPosition?: string;
  backgroundRepeat?: string;
  backgroundOverlay?: string;
  backdropBlur?: string;
  border?: {
    width?: string;
    style?: string;
    color?: string;
    radius?: string;
  };
  boxShadow?: string;
  opacity?: string;

  // Advanced
  zIndex?: number;
  overflow?: string;
  position?: 'static' | 'relative' | 'absolute' | 'fixed' | 'sticky';
  top?: string;
  right?: string;
  bottom?: string;
  left?: string;
}

export type ResponsiveStyle = {
  [key in Breakpoint]?: StyleProps;
};

export interface AnimationProps {
  type: 'none' | 'fade' | 'slide-up' | 'slide-down' | 'slide-left' | 'slide-right' | 'zoom-in' | 'zoom-out';
  duration: number;
  delay: number;
  once: boolean;
}

export interface WidgetNode {
  id: string;
  type: string;
  props: Record<string, any>;
  style: ResponsiveStyle;
  className?: string;
  animations?: AnimationProps;
}

export interface ColumnNode {
  id: string;
  width: string; // e.g. "33.33%" or "50%"
  widgets: WidgetNode[];
  style: ResponsiveStyle;
}

export interface SectionNode {
  id: string;
  columns: ColumnNode[];
  style: ResponsiveStyle;
  containerWidth: 'boxed' | 'full';
}

export interface BuilderState {
  pageId: string;
  canvas: SectionNode[];
  selectedElementId: string | null;
  responsiveMode: Breakpoint;
  isPreviewMode: boolean;
  globalSettings: {
    primaryColor: string;
    secondaryColor: string;
    fontFamily: string;
    containerWidth: string;
  };
  history: {
    past: SectionNode[][];
    future: SectionNode[][];
  };
}

export type BuilderAction =
  | { type: 'SET_CANVAS'; canvas: SectionNode[] }
  | { type: 'ADD_SECTION'; section: SectionNode; index?: number }
  | { type: 'MOVE_SECTION'; fromIndex: number; toIndex: number }
  | { type: 'REMOVE_SECTION'; id: string }
  | { type: 'UPDATE_SECTION'; id: string; updates: Partial<SectionNode> }
  | { type: 'ADD_COLUMN'; sectionId: string; column: ColumnNode }
  | { type: 'UPDATE_COLUMN'; sectionId: string; columnId: string; updates: Partial<ColumnNode> }
  | { type: 'REMOVE_COLUMN'; sectionId: string; columnId: string }
  | { type: 'ADD_WIDGET'; sectionId: string; columnId: string; widget: WidgetNode; index?: number }
  | { type: 'MOVE_WIDGET'; from: { sectionId: string; columnId: string; index: number }; to: { sectionId: string; columnId: string; index: number } }
  | { type: 'UPDATE_WIDGET'; id: string; updates: Partial<WidgetNode> }
  | { type: 'REMOVE_WIDGET'; id: string }
  | { type: 'SELECT_ELEMENT'; id: string | null }
  | { type: 'SET_RESPONSIVE_MODE'; mode: Breakpoint }
  | { type: 'UNDO' }
  | { type: 'REDO' }
  | { type: 'SET_GLOBAL_SETTINGS'; settings: Partial<BuilderState['globalSettings']> };
