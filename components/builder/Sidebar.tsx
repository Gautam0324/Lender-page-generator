'use client';

import React from 'react';
import { 
  Type, 
  Heading, 
  Image as ImageIcon, 
  Square, 
  Minus, 
  Layout, 
  Video, 
  MousePointer2, 
  MessageSquare, 
  MapPin, 
  Code,
  Layers,
  Settings,
  HelpCircle,
} from 'lucide-react';
import { DraggableWidget } from './DraggableWidget';
import { cn } from '../../lib/style-utils';

const WIDGET_GROUPS = [
  {
    title: 'Basic',
    widgets: [
      { type: 'heading', icon: Heading, label: 'Heading' },
      { type: 'text', icon: Type, label: 'Text Editor' },
      { type: 'image', icon: ImageIcon, label: 'Image' },
      { type: 'button', icon: MousePointer2, label: 'Button' },
      { type: 'video', icon: Video, label: 'Video' },
      { type: 'divider', icon: Minus, label: 'Divider' },
      { type: 'spacer', icon: Layout, label: 'Spacer' },
    ]
  },
  {
    title: 'Interactive',
    widgets: [
      { type: 'icon', icon: Square, label: 'Icon' },
      { type: 'list', icon: Layers, label: 'List' },
      { type: 'accordion', icon: Layers, label: 'Accordion' },
      { type: 'tabs', icon: Layers, label: 'Tabs' },
      { type: 'carousel', icon: Layout, label: 'Carousel' },
      { type: 'form', icon: MessageSquare, label: 'Form' },
    ]
  },
  {
    title: 'Advanced',
    widgets: [
      { type: 'map', icon: MapPin, label: 'Google Maps' },
      { type: 'html', icon: Code, label: 'HTML' },
    ]
  }
];

export const Sidebar: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState<'widgets' | 'templates' | 'global'>('widgets');

  return (
    <aside className="w-84 h-full border-r border-slate-100 bg-white flex flex-col overflow-hidden shadow-2xl relative z-40">
      {/* Sidebar Header */}
      <div className="p-6 border-b border-slate-50 bg-slate-50/30">
         <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-black shadow-lg shadow-indigo-100">L</div>
            <h2 className="text-sm font-black text-slate-800 uppercase tracking-[0.2em]">Components</h2>
         </div>
         {/* Tabs */}
         <div className="flex bg-slate-100/80 p-1 rounded-xl border border-slate-200/50">
            <button 
              onClick={() => setActiveTab('widgets')}
              className={cn("flex-1 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all", activeTab === 'widgets' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-400')}
            >
               Widgets
            </button>
            <button 
              onClick={() => setActiveTab('templates')}
              className={cn("flex-1 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all", activeTab === 'templates' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-400')}
            >
               Templates
            </button>
         </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
        {activeTab === 'widgets' && (
           <>
             {WIDGET_GROUPS.map((group) => (
               <div key={group.title} className="mb-8 last:mb-0">
                 <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                   <div className="w-1 h-1 rounded-full bg-indigo-500" />
                   {group.title}
                 </h3>
                 <div className="grid grid-cols-2 gap-3">
                   {group.widgets.map((widget) => (
                     <DraggableWidget key={widget.type} {...widget} />
                   ))}
                 </div>
               </div>
             ))}
           </>
        )}

        {activeTab === 'templates' && (
           <div className="space-y-4">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                 <div className="w-1 h-1 rounded-full bg-indigo-500" />
                 Ready-to-use Sections
              </h3>
              {/* Bathroom Relief Template Card */}
              <DraggableWidget 
                type="bathroom-relief" 
                label="Bathroom Relief" 
                isTemplate={true}
                icon={Layout}
                previewImage="https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&q=80"
              />
           </div>
        )}
      </div>

      {/* Help Footer */}
      <div className="p-4 border-t border-slate-50 bg-slate-50/50 flex justify-between items-center px-6">
        <div className="flex items-center gap-2 cursor-pointer group">
           <HelpCircle className="w-4 h-4 text-slate-300 group-hover:text-indigo-500 transition-colors" />
           <span className="text-[10px] font-bold text-slate-300 group-hover:text-slate-500 uppercase tracking-widest">Guide</span>
        </div>
        <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em]">v1.0</span>
      </div>
    </aside>
  );
};
