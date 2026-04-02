'use client';

import React from 'react';

export const VideoWidget = ({ props }: { props: any }) => {
  const url = props.url || 'https://www.youtube.com/embed/ScMzIvxBSi4';
  const title = props.title || 'Video Player';

  return (
    <div className="w-full relative aspect-video bg-black rounded-xl overflow-hidden group shadow-2xl border-4 border-gray-100">
      <iframe
        src={url}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute inset-0 w-full h-full"
      />
    </div>
  );
};

export const DividerWidget = ({ props }: { props: any }) => {
  const width = props.width || '100%';
  const thickness = props.thickness || '2px';
  const color = props.color || '#f1f5f9';
  const style = props.style || 'solid';

  return (
    <div className="flex justify-center w-full py-4">
      <div 
        style={{ 
          width, 
          borderTopWidth: thickness, 
          borderTopColor: color, 
          borderTopStyle: style as any 
        }} 
      />
    </div>
  );
};

export const SpacerWidget = ({ props }: { props: any }) => {
  const height = props.height || '40px';

  return <div style={{ height }} className="w-full transition-all" />;
};

import * as Icons from 'lucide-react';

export const IconWidget = ({ props }: { props: any }) => {
  const iconName = props.icon || 'Star';
  const size = props.size || 32;
  const color = props.color || '#3b82f6';

  // Capitalize first letter to match Lucide naming
  const formattedName = iconName.charAt(0).toUpperCase() + iconName.slice(1);
  const IconComponent = (Icons as any)[formattedName] || Icons.HelpCircle;

  return (
    <div className="flex justify-center p-2">
       <div 
         className="rounded-full flex items-center justify-center transition-all hover:scale-110 active:scale-95"
         style={{ color }}
       >
         <IconComponent size={size} strokeWidth={1.5} />
       </div>
    </div>
  );
};
