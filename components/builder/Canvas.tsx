'use client';

import React from 'react';
import { 
  DndContext, 
  DragOverlay, 
  closestCorners, 
  KeyboardSensor, 
  PointerSensor, 
  useSensor, 
  useSensors,
  DragEndEvent,
  useDroppable,
} from '@dnd-kit/core';
import { useBuilderStore } from '../../lib/builderStore';
import { Section } from './Section';
import { cn } from '../../lib/style-utils';
import { v4 as uuidv4 } from 'uuid';
import { getBathroomTemplate } from '../../lib/templates';

export const Canvas: React.FC = () => {
  const { canvas, addSection, addWidget, moveWidget, responsiveMode, selectElement, isPreviewMode } = useBuilderStore();
  
  const { setNodeRef, isOver } = useDroppable({
    id: 'canvas-root',
    data: {
      isCanvasRoot: true,
    },
  });

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor)
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeData = active.data.current;
    const overData = over.data.current;

    // Handle dropping from Sidebar
    if (activeData?.isSidebarItem) {
      const type = activeData.type;
      
      // If dropping directly on canvas root (create new section or template)
      if (overData?.isCanvasRoot) {
        if (activeData.isTemplate) {
          if (activeData.type === 'bathroom-relief') {
            addSection(getBathroomTemplate());
          }
          return;
        }

        const sectionId = uuidv4();
        const columnId = uuidv4();
        addSection({
          id: sectionId,
          columns: [{ 
            id: columnId, 
            width: '100%', 
            widgets: [{
              id: uuidv4(),
              type,
              props: {},
              style: { 
                desktop: {},
                mobile: {}
              }
            }], 
            style: { desktop: {}, mobile: {} } 
          }],
          style: { 
            desktop: { 
              padding: { top: '60px', bottom: '60px', left: '20px', right: '20px' },
              backgroundColor: '#ffffff'
            },
            mobile: {
              padding: { top: '40px', bottom: '40px', left: '16px', right: '16px' },
              backgroundColor: '#ffffff'
            }
          },
          containerWidth: 'boxed',
        });
        return;
      }

      // If dropping on a column
      if (overData?.type === 'column') {
        const { sectionId, columnId } = overData;
        addWidget(sectionId, columnId, {
          id: uuidv4(),
          type,
          props: {},
          style: { 
            desktop: {},
            mobile: {}
          },
        });
      }
    }
  };

  return (
    <DndContext 
      sensors={sensors} 
      collisionDetection={closestCorners}
      onDragEnd={handleDragEnd}
    >
      <div 
        className={cn(
          "flex-1 bg-slate-100/50 overflow-y-auto p-4 md:p-12 flex flex-col items-center transition-all duration-500",
          isPreviewMode ? "p-0" : ""
        )}
        onClick={() => selectElement(null)}
      >
        <div className={cn(
          "relative transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]",
          responsiveMode === 'mobile' ? 'mt-8 mb-20' : '',
          responsiveMode === 'tablet' ? 'mt-12 mb-12' : ''
        )}>
          {/* Mobile Notch */}
          {responsiveMode === 'mobile' && (
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-7 bg-slate-900 rounded-b-3xl z-[100] flex items-center justify-center gap-3 border-x border-b border-slate-700/50">
               <div className="w-12 h-1 bg-slate-800 rounded-full" />
               <div className="w-2 h-2 rounded-full bg-slate-800" />
            </div>
          )}

          {/* Device Shell */}
          <div 
            ref={setNodeRef}
            className={cn(
              "bg-white transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] relative shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)]",
              responsiveMode === 'desktop' ? 'w-full max-w-[1280px] min-h-[calc(100vh-160px)] rounded-xl border border-slate-200/50' : '',
              responsiveMode === 'tablet' ? 'w-[768px] h-[1024px] rounded-[3rem] border-[14px] border-slate-900 outline outline-4 outline-slate-200/50 -outline-offset-1' : '',
              responsiveMode === 'mobile' ? 'w-[410px] h-[882px] rounded-[3.5rem] border-[14px] border-slate-950 outline outline-4 outline-slate-200/50 -outline-offset-1' : '',
              isOver && canvas.length === 0 ? 'bg-indigo-50/50 border-indigo-400' : ''
            )}
          >
            {canvas.length === 0 ? (
              <div className={cn(
                "absolute inset-0 flex flex-col items-center justify-center text-slate-400 border-4 border-dashed border-slate-100 m-8 transition-all",
                responsiveMode === 'mobile' ? 'rounded-[2rem]' : 'rounded-3xl'
              )}>
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4 shadow-sm">
                  <svg className="w-8 h-8 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <p className="text-lg font-bold text-slate-500">Your canvas is empty</p>
                <p className="text-slate-400 mt-2 text-sm">Drag widgets from the sidebar to start</p>
              </div>
            ) : (
              <div className={cn(
                "h-full overflow-y-auto scrollbar-hide",
                responsiveMode !== 'desktop' ? 'rounded-[2rem]' : 'rounded-xl'
              )}>
                {canvas.map((section) => (
                  <Section key={section.id} section={section} />
                ))}
              </div>
            )}
          </div>

          {/* Mobile/Tablet Home Bar */}
          {(responsiveMode === 'mobile' || responsiveMode === 'tablet') && (
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-32 h-1.5 bg-slate-300 rounded-full opacity-40" />
          )}
        </div>
      </div>
      <DragOverlay>
        {/* We can add a preview of the widget being dragged here */}
      </DragOverlay>
    </DndContext>
  );
};
