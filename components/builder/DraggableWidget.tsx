'use client';

import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { LucideIcon } from 'lucide-react';
import * as Icons from 'lucide-react';
import { cn } from '../../lib/style-utils';

interface DraggableWidgetProps {
  type: string;
  icon: LucideIcon;
  label: string;
  isTemplate?: boolean;
  previewImage?: string;
}

export const DraggableWidget: React.FC<DraggableWidgetProps> = ({ 
  type, 
  icon: Icon, 
  label, 
  isTemplate, 
  previewImage 
}) => {
  const [localPreviewMode, setLocalPreviewMode] = React.useState<'desktop' | 'mobile'>('desktop');

  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: `sidebar-${type}`,
    data: {
      type,
      isSidebarItem: true,
      isTemplate: isTemplate || false,
    },
  });

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    zIndex: 100,
  } : undefined;

  if (isTemplate) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        {...listeners}
        {...attributes}
        className={cn(
          "group relative w-full rounded-2xl overflow-hidden border border-slate-100 bg-slate-50 transition-all cursor-grab active:cursor-grabbing hover:shadow-xl hover:border-indigo-400",
          localPreviewMode === 'desktop' ? 'aspect-[4/3]' : 'aspect-[2/3] w-[70%] mx-auto',
          isDragging ? 'opacity-50 ring-2 ring-indigo-500' : ''
        )}
      >
        {/* Responsive Preview Toggles */}
        <div className="absolute top-2 right-2 flex bg-white/90 backdrop-blur-md p-1 rounded-xl shadow-sm z-30 opacity-0 group-hover:opacity-100 transition-opacity">
           <button 
             onMouseDown={(e) => { e.stopPropagation(); setLocalPreviewMode('desktop'); }}
             className={cn("p-1.5 rounded-lg transition-colors", localPreviewMode === 'desktop' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:bg-slate-50')}
           >
              <Icons.Monitor className="w-3 h-3" />
           </button>
           <button 
             onMouseDown={(e) => { e.stopPropagation(); setLocalPreviewMode('mobile'); }}
             className={cn("p-1.5 rounded-lg transition-colors", localPreviewMode === 'mobile' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:bg-slate-50')}
           >
              <Icons.Smartphone className="w-3 h-3" />
           </button>
        </div>

        {previewImage ? (
          <img 
            src={previewImage} 
            alt={label} 
            className={cn(
              "w-full h-full grayscale-[0.3] group-hover:grayscale-0 transition-all duration-500",
              localPreviewMode === 'mobile' ? 'object-cover object-left' : 'object-cover'
            )} 
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-slate-100">
             <Icon className="w-8 h-8 text-slate-300" />
          </div>
        )}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent p-4 pt-10">
           <span className="text-[10px] font-black text-white uppercase tracking-[0.2em]">{label} {localPreviewMode === 'mobile' ? '• Mobile' : ''}</span>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`
        flex flex-col items-center justify-center p-4 rounded-2xl border border-slate-100 
        bg-white hover:bg-indigo-50/50 hover:border-indigo-200 transition-all cursor-grab active:cursor-grabbing
        group shadow-sm hover:shadow-md
        ${isDragging ? 'opacity-50 ring-2 ring-indigo-500' : ''}
      `}
    >
      <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center mb-3 group-hover:bg-white transition-colors shadow-sm">
        <Icon className="w-5 h-5 text-slate-400 group-hover:text-indigo-600 transition-colors" />
      </div>
      <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest text-center">{label}</span>
    </div>
  );
};
