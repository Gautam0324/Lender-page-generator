'use client';

import React, { useState } from 'react';
import { useBuilderStore } from '../../lib/builderStore';
import { Section } from './Section';
import { DeviceSpecsDisplay } from './ResponsiveGuide';
import { cn } from '../../lib/style-utils';
import { X, Smartphone } from 'lucide-react';

interface MobilePreviewProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobilePreview: React.FC<MobilePreviewProps> = ({ isOpen, onClose }) => {
  const { canvas } = useBuilderStore();
  const [deviceModel, setDeviceModel] = useState<'iphone14' | 'iphone17pro' | 'iphone15'>('iphone17pro');

  const getDeviceSpecs = (model: string) => {
    const specs: Record<string, { width: number; height: number; radius: string; borderWidth: string; notchWidth: string }> = {
      iphone14: { width: 390, height: 844, radius: '3rem', borderWidth: '12px', notchWidth: '150px' },
      iphone15: { width: 393, height: 852, radius: '3.2rem', borderWidth: '13px', notchWidth: '155px' },
      iphone17pro: { width: 410, height: 882, radius: '3.5rem', borderWidth: '14px', notchWidth: '160px' },
    };
    return specs[model] || specs.iphone17pro;
  };

  const specs = getDeviceSpecs(deviceModel);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-hidden">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full flex flex-col max-h-[95vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-slate-100">
          <div className="flex items-center gap-3">
            <Smartphone className="w-5 h-5 text-indigo-600" />
            <h2 className="text-lg font-bold text-slate-900">Mobile Preview</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-200 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-slate-600" />
          </button>
        </div>

        {/* Device Selector */}
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex gap-3">
          <button
            onClick={() => setDeviceModel('iphone14')}
            className={cn(
              'px-4 py-2 rounded-lg text-xs font-bold transition-all',
              deviceModel === 'iphone14'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
            )}
          >
            iPhone 14
          </button>
          <button
            onClick={() => setDeviceModel('iphone15')}
            className={cn(
              'px-4 py-2 rounded-lg text-xs font-bold transition-all',
              deviceModel === 'iphone15'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
            )}
          >
            iPhone 15
          </button>
          <button
            onClick={() => setDeviceModel('iphone17pro')}
            className={cn(
              'px-4 py-2 rounded-lg text-xs font-bold transition-all',
              deviceModel === 'iphone17pro'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
            )}
          >
            iPhone 17 Pro
          </button>
        </div>

        {/* Mobile Device Preview */}
        <div className="flex-1 overflow-auto bg-gradient-to-b from-slate-100 to-slate-50 p-6 flex items-center justify-center gap-8">
          {/* Device Frame */}
          <div className="relative" style={{ width: `${specs.width}px`, height: `${specs.height}px` }}>
            {/* Mobile Notch */}
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 h-7 bg-black rounded-b-3xl z-[100] flex items-center justify-center gap-3"
              style={{ width: specs.notchWidth }}
            >
              <div className="w-8 h-1 bg-slate-800 rounded-full" />
              <div className="w-1.5 h-1.5 rounded-full bg-slate-800" />
            </div>

            {/* Device Screen */}
            <div
              className={cn(
                'absolute inset-0 bg-white overflow-hidden shadow-[0_20px_60px_-20px_rgba(0,0,0,0.3)]',
                `rounded-[${specs.radius}]`
              )}
              style={{
                borderRadius: specs.radius,
                border: `${specs.borderWidth} solid #000`,
              }}
            >
              {/* Safe Area Content */}
              <div className="h-full overflow-y-auto scrollbar-hide pt-12 pb-8">
                {canvas.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center px-6 text-center">
                    <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                      <Smartphone className="w-6 h-6 text-slate-400" />
                    </div>
                    <p className="text-sm font-bold text-slate-600 mb-2">Empty Preview</p>
                    <p className="text-xs text-slate-400">Build your page to see preview</p>
                  </div>
                ) : (
                  <div className="min-h-full">
                    {canvas.map((section) => (
                      <Section key={section.id} section={section} />
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Home Bar */}
            <div
              className="absolute -bottom-2 left-1/2 -translate-x-1/2 h-1 bg-black rounded-full opacity-80"
              style={{ width: '120px' }}
            />
          </div>

          {/* Device Specs Sidebar */}
          <div className="w-64 bg-white rounded-lg border border-slate-200 p-4 overflow-y-auto max-h-full">
            <DeviceSpecsDisplay deviceModel={deviceModel} />
            <div className="mt-6 space-y-4">
              <div>
                <h4 className="text-sm font-semibold text-slate-900 mb-3">Quick Tips</h4>
                <ul className="space-y-2 text-xs text-slate-600">
                  <li className="flex gap-2">
                    <span className="text-indigo-600 font-bold">•</span>
                    <span>Touch targets should be 44×44px minimum</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-indigo-600 font-bold">•</span>
                    <span>Use 16px+ font size for inputs</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-indigo-600 font-bold">•</span>
                    <span>Leave 16px padding from edges</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-indigo-600 font-bold">•</span>
                    <span>Test all content fits in safe area</span>
                  </li>
                </ul>
              </div>
              <div className="pt-4 border-t border-slate-200">
                <p className="text-xs text-slate-500">
                  iPhone 17 Pro dimensions: {specs.width}×{specs.height}px with Dynamic Island
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
