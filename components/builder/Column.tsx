'use client';

import React from 'react';
import { ColumnNode } from '../../lib/types';
import { useDroppable } from '@dnd-kit/core';
import { WidgetRenderer } from './WidgetRenderer';
import { useBuilderStore } from '../../lib/builderStore';
import { getStylesForBreakpoint, styleToCss, cn } from '../../lib/style-utils';
import { Trash2, Copy, Move } from 'lucide-react';

interface ColumnProps {
  column: ColumnNode;
  sectionId: string;
}

export const Column: React.FC<ColumnProps> = ({ column, sectionId }) => {
  const { responsiveMode, selectedElementId, selectElement, removeColumn } = useBuilderStore();
  
  const { setNodeRef, isOver } = useDroppable({
    id: column.id,
    data: {
      type: 'column',
      sectionId,
      columnId: column.id,
    },
  });

  const isSelected = selectedElementId === column.id;
  const styles = getStylesForBreakpoint(column.style, responsiveMode);
  const cssStyle = styleToCss(styles);

  const getEffectiveWidth = () => {
    if (responsiveMode === 'mobile') {
      const mobileStyle = column.style?.mobile;
      return mobileStyle?.width || '100%';
    }
    if (responsiveMode === 'tablet') {
      const tabletStyle = column.style?.tablet;
      return tabletStyle?.width || column.width;
    }
    return column.width;
  };

  return (
    <div
      ref={setNodeRef}
      id={column.id}
      style={{ ...cssStyle, width: getEffectiveWidth() }}
      onClick={(e) => {
        e.stopPropagation();
        selectElement(column.id);
      }}
      className={cn(
        'relative group min-h-[100px] border border-dashed p-4 transition-all duration-200',
        isSelected ? 'border-indigo-500 bg-indigo-50/10 ring-1 ring-inset ring-indigo-500' : 'border-gray-100 hover:border-indigo-300',
        isOver ? 'bg-indigo-50 border-indigo-400 border-solid ring-2 ring-indigo-200' : ''
      )}
    >
      {/* Column Labels/Controls */}
      <div className={cn(
        'absolute -top-3 -right-1 flex items-center bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 group-hover:opacity-100 transition-opacity z-20',
        isSelected ? 'opacity-100 border-indigo-500' : ''
      )}>
        <span className="text-[9px] font-bold text-gray-400 px-2 py-1 uppercase tracking-wider border-r border-gray-100">
           Column
        </span>
        <button 
          className="p-1 hover:text-red-500 text-gray-400" 
          onClick={(e) => { e.stopPropagation(); removeColumn(sectionId, column.id); }}
        >
          <Trash2 className="w-3 h-3" />
        </button>
      </div>

      {column.widgets.length === 0 ? (
        <div className="h-full min-h-[80px] flex items-center justify-center text-gray-300 pointer-events-none italic text-sm">
           Drop widget here
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {column.widgets.map((widget) => (
            <WidgetRenderer 
              key={widget.id} 
              widget={widget} 
              sectionId={sectionId} 
              columnId={column.id} 
            />
          ))}
        </div>
      )}
    </div>
  );
};
