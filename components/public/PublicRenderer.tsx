'use client';

import React from 'react';
import { SectionNode, ColumnNode, WidgetNode, Breakpoint } from '../../lib/types';
import { getStylesForBreakpoint, styleToCss, cn } from '../../lib/style-utils';
import { useBreakpoint } from '../../lib/useBreakpoint';
import { motion } from 'framer-motion';

// Widgets
import { HeadingWidget, TextWidget, ImageWidget, ButtonWidget } from '../builder/widgets/BasicWidgets';
import { VideoWidget, DividerWidget, SpacerWidget, IconWidget } from '../builder/widgets/MediaWidgets';
import { ListWidget, AccordionWidget, TabsWidget } from '../builder/widgets/InteractiveWidgets';
import { CarouselWidget, FormWidget, MapWidget, HtmlWidget } from '../builder/widgets/AdvancedWidgets';

const WIDGET_MAP: Record<string, React.FC<{ props: any }>> = {
  heading: HeadingWidget,
  text: TextWidget,
  image: ImageWidget,
  button: ButtonWidget,
  video: VideoWidget,
  divider: DividerWidget,
  spacer: SpacerWidget,
  icon: IconWidget,
  list: ListWidget,
  accordion: AccordionWidget,
  tabs: TabsWidget,
  carousel: CarouselWidget,
  form: FormWidget,
  map: MapWidget,
  html: HtmlWidget,
};

const PublicWidget = ({ widget, breakpoint }: { widget: WidgetNode; breakpoint: Breakpoint }) => {
  const styles = getStylesForBreakpoint(widget.style, breakpoint);
  const cssStyle = styleToCss(styles);
  const WidgetComponent = WIDGET_MAP[widget.type];

  const animation = widget.animations || { type: 'fade', duration: 0.6, delay: 0, once: true };

  const getVariants = () => {
    switch (animation.type) {
      case 'fade': return { hidden: { opacity: 0 }, visible: { opacity: 1 } };
      case 'slide-up': return { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };
      case 'slide-down': return { hidden: { opacity: 0, y: -20 }, visible: { opacity: 1, y: 0 } };
      case 'slide-left': return { hidden: { opacity: 0, x: 20 }, visible: { opacity: 1, x: 0 } };
      case 'slide-right': return { hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } };
      case 'zoom-in': return { hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 1, scale: 1 } };
      case 'zoom-out': return { hidden: { opacity: 0, scale: 1.05 }, visible: { opacity: 1, scale: 1 } };
      default: return { hidden: { opacity: 1 }, visible: { opacity: 1 } };
    }
  };

  return (
    <motion.div
      style={cssStyle}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: animation.once }}
      variants={getVariants()}
      transition={{ duration: animation.duration, delay: animation.delay, ease: 'easeOut' }}
      className="w-full"
    >
      {WidgetComponent ? <WidgetComponent props={widget.props} /> : null}
    </motion.div>
  );
};

const PublicColumn = ({ column, breakpoint }: { column: ColumnNode; breakpoint: Breakpoint }) => {
  const styles = getStylesForBreakpoint(column.style, breakpoint);
  const cssStyle = styleToCss(styles);

  const getEffectiveWidth = () => {
    if (breakpoint === 'mobile') return column.style?.mobile?.width || '100%';
    if (breakpoint === 'tablet') return column.style?.tablet?.width || column.width;
    return column.width;
  };

  return (
    <div style={{ ...cssStyle, width: getEffectiveWidth() }}>
      {column.widgets.map((widget) => (
        <PublicWidget key={widget.id} widget={widget} breakpoint={breakpoint} />
      ))}
    </div>
  );
};

const PublicSection = ({ section, breakpoint }: { section: SectionNode; breakpoint: Breakpoint }) => {
  const styles = getStylesForBreakpoint(section.style, breakpoint);
  const cssStyle = styleToCss(styles);

  return (
    <section style={cssStyle} className="relative overflow-hidden">
      {styles.backgroundOverlay && (
        <div 
          className="absolute inset-0 pointer-events-none z-0" 
          style={{ backgroundColor: styles.backgroundOverlay }} 
        />
      )}
      <div className={cn(
        'mx-auto h-full flex flex-wrap relative z-10',
        section.containerWidth === 'boxed' ? 'max-w-[1280px] px-4' : 'w-full'
      )}>
        {section.columns.map((column) => (
          <PublicColumn key={column.id} column={column} breakpoint={breakpoint} />
        ))}
      </div>
    </section>
  );
};

export const PublicPage = ({ canvas }: { canvas: SectionNode[] }) => {
  const breakpoint = useBreakpoint();

  return (
    <div className="w-full min-h-screen bg-white">
      {canvas.map((section) => (
        <PublicSection key={section.id} section={section} breakpoint={breakpoint} />
      ))}
    </div>
  );
};
