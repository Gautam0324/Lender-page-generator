'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export const ListWidget = ({ props }: { props: any }) => {
  const items = props.items || ['High-quality implementation', 'Responsive design controls', 'Real-time drag and drop'];

  return (
    <ul className="space-y-4 p-2">
      {items.map((item: string, i: number) => (
        <li key={i} className="flex items-start gap-4 group">
          <div className="w-7 h-7 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center shrink-0 group-hover:bg-indigo-600 group-hover:border-indigo-600 transition-all duration-300">
             <span className="text-xs font-black text-indigo-500 group-hover:text-white">✓</span>
          </div>
          <span className="text-gray-700 leading-relaxed font-medium pt-0.5">{item}</span>
        </li>
      ))}
    </ul>
  );
};

export const AccordionWidget = ({ props }: { props: any }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const items = props.items || [
    { title: 'How does it work?', content: 'This visual page builder allows you to drag widgets from the sidebar and drop them onto the canvas. You can then style them in real-time.' },
    { title: 'Is it responsive?', content: 'Yes, absolutely. You can toggle between desktop, tablet, and mobile breakpoints to override styles for different screen sizes.' }
  ];

  return (
    <div className="space-y-3">
      {items.map((item: any, i: number) => (
        <div key={i} className="border border-slate-100 rounded-2xl overflow-hidden bg-white shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
          <button 
            className="w-full flex items-center justify-between p-5 text-left hover:bg-slate-50 transition-all font-bold text-slate-800"
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
          >
            <span className="text-sm md:text-base leading-snug">{item.title}</span>
            <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-500 ${openIndex === i ? 'rotate-180 text-indigo-500' : ''}`} />
          </button>
          <div 
            className={`transition-all duration-500 ease-in-out overflow-hidden ${openIndex === i ? 'max-h-[500px] border-t border-slate-50 opacity-100' : 'max-h-0 opacity-0'}`}
          >
            <div className="p-6 text-slate-600 text-sm md:text-base leading-relaxed bg-slate-50/30">
               {item.content}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export const TabsWidget = ({ props }: { props: any }) => {
  const [activeTab, setActiveTab] = useState(0);
  const items = props.items || [
    { label: 'Tab One', content: 'Content for the first tab section.' },
    { label: 'Tab Two', content: 'Content for the second tab section.' },
    { label: 'Tab Three', content: 'Content for the third tab section.' }
  ];

  return (
    <div className="w-full border border-slate-100 rounded-3xl overflow-hidden bg-white shadow-sm">
      <div className="flex border-b border-slate-100 bg-slate-50/50 p-2 gap-2">
        {items.map((item: any, i: number) => (
          <button
            key={i}
            className={`flex-1 px-4 py-3 text-sm font-bold rounded-2xl transition-all duration-300 ${
              activeTab === i 
                ? 'bg-white text-indigo-600 shadow-sm ring-1 ring-slate-100' 
                : 'text-slate-400 hover:text-slate-600'
            }`}
            onClick={() => setActiveTab(i)}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div className="p-8 text-slate-600 min-h-[120px] leading-relaxed animate-in fade-in transition-opacity duration-500">
         {items[activeTab].content}
      </div>
    </div>
  );
};
