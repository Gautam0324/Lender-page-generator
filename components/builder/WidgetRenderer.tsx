'use client';

import React from 'react';
import { WidgetNode } from '../../lib/types';
import { useBuilderStore } from '../../lib/builderStore';
import { getStylesForBreakpoint, styleToCss, cn } from '../../lib/style-utils';
import { useDraggable } from '@dnd-kit/core';
import { 
  Trash2, 
  GripVertical 
} from 'lucide-react';
import { motion } from 'framer-motion';

// Widgets
import { HeadingWidget, TextWidget, ImageWidget, ButtonWidget } from './widgets/BasicWidgets';
import { VideoWidget, DividerWidget, SpacerWidget, IconWidget } from './widgets/MediaWidgets';
import { ListWidget, AccordionWidget, TabsWidget } from './widgets/InteractiveWidgets';
import { CarouselWidget, FormWidget, MapWidget, HtmlWidget } from './widgets/AdvancedWidgets';

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

interface WidgetRendererProps {
  widget: WidgetNode;
  sectionId: string;
  columnId: string;
}

export const WidgetRenderer: React.FC<WidgetRendererProps> = ({ widget, sectionId, columnId }) => {
  const { responsiveMode, selectedElementId, selectElement, removeWidget } = useBuilderStore();
  
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: widget.id,
    data: {
      type: 'widget',
      sectionId,
      columnId,
      widgetId: widget.id,
    },
  });

  const isSelected = selectedElementId === widget.id;
  const styles = getStylesForBreakpoint(widget.style, responsiveMode);
  const cssStyle = styleToCss(styles);

  const dragStyle = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    zIndex: 1000,
  } : undefined;

  const WidgetComponent = WIDGET_MAP[widget.type];

  return (
    <div
      ref={setNodeRef}
      id={widget.id}
      style={{ ...cssStyle, ...dragStyle }}
      onClick={(e) => {
        e.stopPropagation();
        selectElement(widget.id);
      }}
      className={cn(
        'relative group min-h-[40px] transition-all duration-300 rounded-2xl mb-2',
        isSelected ? 'ring-2 ring-indigo-500 shadow-2xl z-10 bg-indigo-50/5 p-1' : 'hover:ring-1 hover:ring-indigo-300 p-0',
        isDragging ? 'opacity-20 scale-95 grayscale' : ''
      )}
    >
      {/* Widget Controls */}
      <div className={cn(
        'absolute -top-4 right-4 flex items-center bg-indigo-600 rounded-full px-2 py-1.5 shadow-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-3 group-hover:translate-y-0 z-30 pointer-events-auto',
        isSelected ? 'opacity-100 translate-y-0' : ''
      )}>
        <button 
           className="p-1 hover:bg-indigo-700 text-white rounded-full transition-all cursor-grab active:cursor-grabbing outline-none" 
           {...listeners} 
           {...attributes}
           title="Reorder Widget"
        >
           <GripVertical className="w-3.5 h-3.5" />
        </button>
        <div className="w-[1px] h-4 bg-indigo-500/50 mx-2" />
        <button 
          className="p-1 hover:bg-red-500 text-white rounded-full transition-all outline-none" 
          onClick={(e) => { e.stopPropagation(); removeWidget(widget.id); }}
          title="Delete Widget"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>

      <motion.div 
        className="w-full h-full"
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {WidgetComponent ? (
          <WidgetComponent props={widget.props} />
        ) : (
          <div className="p-8 bg-slate-50 text-slate-400 rounded-3xl border border-slate-100 flex items-center justify-center font-bold text-xs uppercase tracking-[0.2em]">
             Unknown Widget: {widget.type}
          </div>
        )}
      </motion.div>
    </div>
  );
};
