'use client';

import React from 'react';
import { SectionNode } from '../../lib/types';
import { Column } from './Column';
import { useBuilderStore } from '../../lib/builderStore';
import { getStylesForBreakpoint, styleToCss, cn } from '../../lib/style-utils';
import { Trash2, Copy, Move, Plus } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

interface SectionProps {
  section: SectionNode;
}

export const Section: React.FC<SectionProps> = ({ section }) => {
  const { 
    responsiveMode, 
    selectedElementId, 
    selectElement, 
    removeSection, 
    addColumn 
  } = useBuilderStore();
  
  const isSelected = selectedElementId === section.id;
  const styles = getStylesForBreakpoint(section.style, responsiveMode);
  const cssStyle = styleToCss(styles);

  const handleAddColumn = (e: React.MouseEvent) => {
    e.stopPropagation();
    addColumn(section.id, {
      id: uuidv4(),
      width: '50%',
      widgets: [],
      style: { desktop: {} }
    });
  };

  return (
    <section
      id={section.id}
      style={cssStyle}
      onClick={(e) => {
        e.stopPropagation();
        selectElement(section.id);
      }}
      className={cn(
        'relative group min-h-[100px] transition-all border-y border-transparent overflow-hidden',
        isSelected ? 'ring-2 ring-indigo-500 z-10' : 'hover:ring-1 hover:ring-indigo-200'
      )}
    >
      {/* Background Overlay */}
      {styles.backgroundOverlay && (
        <div 
          className="absolute inset-0 pointer-events-none z-0" 
          style={{ backgroundColor: styles.backgroundOverlay }} 
        />
      )}
      {/* Section Controls */}
      <div className={cn(
        'absolute -top-8 left-1/2 -translate-x-1/2 flex items-center bg-blue-500 rounded-t-lg px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity z-20 pointer-events-auto shadow-lg',
        isSelected ? 'opacity-100' : ''
      )}>
        <button className="p-1 hover:bg-blue-600 text-white rounded transition-colors" title="Move Section">
          <Move className="w-3.5 h-3.5" />
        </button>
        <div className="w-px h-4 bg-blue-400 mx-1.5" />
        <button 
          className="p-1 hover:bg-blue-600 text-white rounded transition-colors" 
          title="Add Column"
          onClick={handleAddColumn}
        >
          <Plus className="w-3.5 h-3.5" />
        </button>
        <button className="p-1 hover:bg-blue-600 text-white rounded transition-colors" title="Duplicate">
          <Copy className="w-3.5 h-3.5" />
        </button>
        <button 
          className="p-1 hover:bg-red-600 text-white rounded transition-colors" 
          onClick={(e) => { e.stopPropagation(); removeSection(section.id); }}
          title="Delete Section"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className={cn(
        'mx-auto h-full flex flex-wrap',
        section.containerWidth === 'boxed' ? 'px-4' : 'px-0'
      )}>
        {section.columns.map((column) => (
          <Column key={column.id} column={column} sectionId={section.id} />
        ))}
      </div>
    </section>
  );
};
