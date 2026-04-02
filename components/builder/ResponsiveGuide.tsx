'use client';

import React from 'react';
import { Smartphone, Info } from 'lucide-react';

/**
 * Device Specifications Display Component
 * Shows dimensions and specs for the current mobile preview
 */
export const DeviceSpecsDisplay: React.FC<{ deviceModel: string }> = ({ deviceModel }) => {
  const specs: Record<string, { width: number; height: number; name: string; diagonal: string }> = {
    iphone14: {
      width: 390,
      height: 844,
      name: 'iPhone 14',
      diagonal: '6.1"',
    },
    iphone15: {
      width: 393,
      height: 852,
      name: 'iPhone 15',
      diagonal: '6.1"',
    },
    iphone17pro: {
      width: 410,
      height: 882,
      name: 'iPhone 17 Pro',
      diagonal: '6.3"',
    },
  };

  const spec = specs[deviceModel] || specs.iphone17pro;

  return (
    <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg p-4 border border-slate-200">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0">
          <Info className="w-5 h-5 text-indigo-600 mt-0.5" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-slate-900 text-sm flex items-center gap-2 mb-2">
            <Smartphone className="w-4 h-4" />
            {spec.name}
          </h3>
          <div className="grid grid-cols-3 gap-3 text-xs">
            <div>
              <p className="text-slate-500 mb-1">Width</p>
              <p className="font-mono font-bold text-slate-900">{spec.width}px</p>
            </div>
            <div>
              <p className="text-slate-500 mb-1">Height</p>
              <p className="font-mono font-bold text-slate-900">{spec.height}px</p>
            </div>
            <div>
              <p className="text-slate-500 mb-1">Screen</p>
              <p className="font-mono font-bold text-slate-900">{spec.diagonal}</p>
            </div>
          </div>
          <p className="text-slate-500 text-xs mt-2">
            Safe area padding: 16px on mobile devices
          </p>
        </div>
      </div>
    </div>
  );
};

/**
 * Responsive Tips Component
 * Shows tips for mobile responsive design
 */
export const ResponsiveTips: React.FC = () => {
  const tips = [
    {
      title: 'Touch Targets',
      desc: 'Minimum 44x44px for tap-friendly interactions',
    },
    {
      title: 'Font Sizes',
      desc: '14px+ for body, 16px+ for inputs to prevent zoom',
    },
    {
      title: 'Padding & Margins',
      desc: '16px minimum on mobile, 20px on tablet',
    },
    {
      title: 'Safe Areas',
      desc: 'Avoid placing critical content under notch or home bar',
    },
  ];

  return (
    <div className="space-y-2">
      <h4 className="text-sm font-semibold text-slate-900 mb-3">Responsive Design Tips</h4>
      {tips.map((tip, idx) => (
        <div key={idx} className="flex gap-2 p-2 bg-indigo-50 rounded border border-indigo-100">
          <div className="w-1.5 h-1.5 rounded-full bg-indigo-600 mt-1 flex-shrink-0" />
          <div className="flex-1 text-xs">
            <p className="font-semibold text-indigo-900">{tip.title}</p>
            <p className="text-indigo-700/70">{tip.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default {
  DeviceSpecsDisplay,
  ResponsiveTips,
};
