'use client';

import React, { useState } from 'react';
import { useBuilderStore } from '../../lib/builderStore';
import { 
  Settings, 
  Palette, 
  Layout as LayoutIcon, 
  Type, 
  MousePointer2, 
  Box, 
  ChevronRight, 
  Monitor, 
  Tablet, 
  Smartphone,
  Undo2,
  Redo2,
  Save,
  Download,
  Eye
} from 'lucide-react';
import { cn } from '../../lib/style-utils';

export const StylePanel: React.FC = () => {
  const { 
    selectedElementId, 
    canvas, 
    updateWidget, 
    updateSection, 
    updateColumn,
    responsiveMode,
    setResponsiveMode,
    undo,
    redo,
    history
  } = useBuilderStore();

  const [activeTab, setActiveTab] = useState<'content' | 'style' | 'advanced'>('style');

  // Find the selected element in the tree
  let selectedElement: any = null;
  let elementType: 'section' | 'column' | 'widget' | null = null;

  for (const section of canvas) {
    if (section.id === selectedElementId) {
      selectedElement = section;
      elementType = 'section';
      break;
    }
    for (const column of section.columns) {
      if (column.id === selectedElementId) {
        selectedElement = column;
        elementType = 'column';
        break;
      }
      for (const widget of column.widgets) {
        if (widget.id === selectedElementId) {
          selectedElement = widget;
          elementType = 'widget';
          break;
        }
      }
    }
  }

  if (!selectedElement) {
    return (
      <aside className="w-80 h-full border-l border-gray-200 bg-white flex flex-col p-8 items-center justify-center text-center">
        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-6 border border-slate-100 shadow-sm">
           <MousePointer2 className="w-8 h-8 text-slate-300" />
        </div>
        <h3 className="text-md font-bold text-slate-800 mb-2">No Element Selected</h3>
        <p className="text-sm text-slate-400 leading-relaxed px-4">
          Click on any element on the canvas to edit its properties, styles, and animations.
        </p>
      </aside>
    );
  }

  const handleUpdate = (updates: any) => {
    if (elementType === 'section') updateSection(selectedElementId!, updates);
    if (elementType === 'column') {
        const sectionId = canvas.find(s => s.columns.some(c => c.id === selectedElementId))?.id;
        if (sectionId) updateColumn(sectionId, selectedElementId!, updates);
    }
    if (elementType === 'widget') updateWidget(selectedElementId!, updates);
  };

  const handleStyleChange = (path: string, value: any) => {
     const currentStyle = selectedElement.style || {};
     const breakpointStyle = currentStyle[responsiveMode] || {};
     
     const newStyle = {
        ...currentStyle,
        [responsiveMode]: {
           ...breakpointStyle,
           [path]: value
        }
     };
     handleUpdate({ style: newStyle });
  };

  return (
    <aside className="w-80 h-full border-l border-gray-200 bg-white flex flex-col overflow-hidden shadow-[-10px_0_30px_rgba(0,0,0,0.02)]">
      {/* Toolbar / Responsive Toggles */}
      <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-slate-50/50">
        <div className="flex gap-2">
           <button 
             onClick={undo}
             disabled={history.past.length === 0}
             className="p-2 hover:bg-white rounded-lg text-slate-400 hover:text-indigo-600 disabled:opacity-30 transition-all border border-transparent hover:border-slate-200"
           >
              <Undo2 className="w-4 h-4" />
           </button>
           <button 
             onClick={redo}
             disabled={history.future.length === 0}
             className="p-2 hover:bg-white rounded-lg text-slate-400 hover:text-indigo-600 disabled:opacity-30 transition-all border border-transparent hover:border-slate-200"
           >
              <Redo2 className="w-4 h-4" />
           </button>
        </div>
        <div className="flex bg-slate-200/50 p-1 rounded-xl border border-slate-200/50">
           <button 
             onClick={() => setResponsiveMode('desktop')}
             className={cn("p-1.5 rounded-lg transition-all", responsiveMode === 'desktop' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-400')}
           >
              <Monitor className="w-3.5 h-3.5" />
           </button>
           <button 
             onClick={() => setResponsiveMode('tablet')}
             className={cn("p-1.5 rounded-lg transition-all", responsiveMode === 'tablet' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-400')}
           >
              <Tablet className="w-3.5 h-3.5" />
           </button>
           <button 
             onClick={() => setResponsiveMode('mobile')}
             className={cn("p-1.5 rounded-lg transition-all", responsiveMode === 'mobile' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-400')}
           >
              <Smartphone className="w-3.5 h-3.5" />
           </button>
        </div>
      </div>

      {/* Selected Element Header */}
      <div className="p-5 border-b border-gray-100 flex items-center gap-4">
         <div className="w-10 h-10 rounded-2xl bg-indigo-50 flex items-center justify-center border border-indigo-100 text-indigo-600">
            {elementType === 'widget' ? <Box className="w-5 h-5" /> : <LayoutIcon className="w-5 h-5" />}
         </div>
         <div>
            <h4 className="text-sm font-black text-slate-800 uppercase tracking-wider">{selectedElement.type || elementType}</h4>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{responsiveMode} EDITING</span>
         </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-100 p-1 bg-slate-50/30">
        <button 
          onClick={() => setActiveTab('content')}
          className={cn("flex-1 py-3 text-xs font-black uppercase tracking-widest transition-all", activeTab === 'content' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-slate-400 hover:text-slate-600')}
        >
          Content
        </button>
        <button 
          onClick={() => setActiveTab('style')}
          className={cn("flex-1 py-3 text-xs font-black uppercase tracking-widest transition-all", activeTab === 'style' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-slate-400 hover:text-slate-600')}
        >
          Style
        </button>
        <button 
          onClick={() => setActiveTab('advanced')}
          className={cn("flex-1 py-3 text-xs font-black uppercase tracking-widest transition-all", activeTab === 'advanced' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-slate-400 hover:text-slate-600')}
        >
          Advanced
        </button>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-5 space-y-8 scrollbar-thin scrollbar-thumb-slate-200">
         {activeTab === 'style' && (
            <>
               {/* Background Section */}
               <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                     <Palette className="w-4 h-4 text-indigo-500" />
                     <h5 className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">Background</h5>
                  </div>
                  <div className="space-y-2">
                     <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Color</label>
                     <div className="flex items-center gap-3">
                        <input 
                           type="color" 
                           value={selectedElement.style?.[responsiveMode]?.backgroundColor || '#ffffff'} 
                           onChange={(e) => handleStyleChange('backgroundColor', e.target.value)}
                           className="w-10 h-10 rounded-xl cursor-pointer border-none p-0 outline-none overflow-hidden" 
                        />
                        <input 
                           type="text" 
                           value={selectedElement.style?.[responsiveMode]?.backgroundColor || ''} 
                           onChange={(e) => handleStyleChange('backgroundColor', e.target.value)}
                           className="flex-1 h-10 px-4 text-sm bg-slate-50 border border-slate-100 rounded-xl outline-none focus:ring-1 focus:ring-indigo-500" 
                           placeholder="#000000"
                        />
                     </div>
                  </div>
               </div>

               {/* Spacing Section */}
               <div className="space-y-4 pt-4 border-t border-slate-50">
                  <div className="flex items-center gap-2 mb-4">
                     <LayoutIcon className="w-4 h-4 text-indigo-500" />
                     <h5 className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">Padding</h5>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                     {['top', 'bottom', 'left', 'right'].map((side) => (
                        <div key={side} className="space-y-1">
                           <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{side}</label>
                           <input 
                              type="text" 
                              value={selectedElement.style?.[responsiveMode]?.padding?.[side] || ''} 
                              onChange={(e) => handleStyleChange('padding', { ...selectedElement.style?.[responsiveMode]?.padding, [side]: e.target.value })}
                              className="w-full h-10 px-4 text-sm bg-slate-50 border border-slate-100 rounded-xl outline-none focus:ring-1 focus:ring-indigo-500" 
                           />
                        </div>
                     ))}
                  </div>
               </div>

               {/* Margin Section */}
               <div className="space-y-4 pt-4 border-t border-slate-50">
                  <div className="flex items-center gap-2 mb-4">
                     <Box className="w-4 h-4 text-indigo-500" />
                     <h5 className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">Margin</h5>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                     {['top', 'bottom', 'left', 'right'].map((side) => (
                        <div key={side} className="space-y-1">
                           <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{side}</label>
                           <input 
                              type="text" 
                              value={selectedElement.style?.[responsiveMode]?.margin?.[side] || '0px'} 
                              onChange={(e) => handleStyleChange('margin', { ...selectedElement.style?.[responsiveMode]?.margin, [side]: e.target.value })}
                              className="w-full h-10 px-4 text-sm bg-slate-50 border border-slate-100 rounded-xl outline-none focus:ring-1 focus:ring-indigo-500" 
                           />
                        </div>
                     ))}
                  </div>
               </div>

               {/* Column Width Control */}
               {elementType === 'column' && (
                  <div className="space-y-4 pt-4 border-t border-slate-50">
                     <div className="flex items-center gap-2 mb-4">
                        <LayoutIcon className="w-4 h-4 text-indigo-500" />
                        <h5 className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">Column Width</h5>
                     </div>
                     <div className="flex bg-slate-100 p-1 rounded-xl">
                        {['25%', '33.33%', '50%', '100%'].map((w) => (
                           <button 
                             key={w}
                             onClick={() => handleUpdate({ width: w })}
                             className={cn("flex-1 py-2 rounded-lg text-[10px] font-bold transition-all", selectedElement.width === w ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-400')}
                           >
                              {w}
                           </button>
                        ))}
                     </div>
                  </div>
               )}

               {/* Typography Section (if widget contains text) */}
               <div className="space-y-4 pt-4 border-t border-slate-50">
                  <div className="flex items-center gap-2 mb-4">
                     <Type className="w-4 h-4 text-indigo-500" />
                     <h5 className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">Typography</h5>
                  </div>
                  <div className="space-y-2">
                     <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Font Size</label>
                     <input 
                        type="text" 
                        value={selectedElement.style?.[responsiveMode]?.fontSize || ''} 
                        onChange={(e) => handleStyleChange('fontSize', e.target.value)}
                        className="w-full h-10 px-4 text-sm bg-slate-50 border border-slate-100 rounded-xl outline-none focus:ring-1 focus:ring-indigo-500" 
                        placeholder="24px"
                     />
                  </div>
                  <div className="space-y-2">
                     <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Text Align</label>
                     <div className="flex bg-slate-100 p-1 rounded-xl">
                        {['left', 'center', 'right', 'justify'].map((align) => (
                           <button 
                             key={align}
                             onClick={() => handleStyleChange('textAlign', align)}
                             className={cn("flex-1 py-2 rounded-lg text-xs font-bold uppercase transition-all", selectedElement.style?.[responsiveMode]?.textAlign === align ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-400')}
                           >
                              {align[0]}
                           </button>
                        ))}
                     </div>
                  </div>
               </div>
            </>
         )}

         {activeTab === 'content' && (
            <div className="space-y-6">
                <div className="flex items-center gap-2 mb-4">
                   <Settings className="w-4 h-4 text-indigo-500" />
                   <h5 className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">Widget Props</h5>
                </div>
                {/* Dynamically render props inputs based on widget type */}
                <div className="p-8 border-2 border-dashed border-slate-100 rounded-3xl flex flex-col items-center justify-center text-center">
                   <span className="text-xs text-slate-300 font-bold uppercase tracking-widest mb-2">Editor for {selectedElement.type}</span>
                   <p className="text-[10px] text-slate-400 leading-relaxed italic">JSON Editor interface coming soon. Use Style tab for layout.</p>
                </div>
            </div>
         )}
      </div>

      {/* Bottom Actions */}
      <div className="p-4 grid grid-cols-2 gap-3 border-t border-slate-100 bg-slate-50/20">
         <button className="flex items-center justify-center gap-2 py-3 rounded-2xl border border-slate-200 text-slate-600 font-black text-[10px] uppercase tracking-widest hover:bg-white transition-all shadow-sm">
            <Eye className="w-3.5 h-3.5" /> Preview
         </button>
         <button className="flex items-center justify-center gap-2 py-3 rounded-2xl bg-indigo-600 text-white font-black text-[10px] uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100">
            <Save className="w-3.5 h-3.5" /> Publish
         </button>
      </div>
    </aside>
  );
};
