import React from 'react';
import { getStorageItem } from '../store/localStorage';

interface AdSlotProps {
  slotId: 'belowHero' | 'sidebar' | 'aboveFooter';
  className?: string;
}

export const AdSlot: React.FC<AdSlotProps> = ({ slotId, className = '' }) => {
  const settings = getStorageItem('settings', {});
  const adConfig = settings.ads?.[slotId];

  if (!adConfig || !adConfig.enabled) return null;

  return (
    <div className={`ad-slot-container my-8 flex justify-center ${className}`} id={`ad-slot-${slotId}`}>
      {adConfig.type === 'html' ? (
        <div 
          dangerouslySetInnerHTML={{ __html: adConfig.code }} 
          className="w-full h-full flex justify-center"
        />
      ) : (
        <a 
          href={adConfig.linkUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="block hover:opacity-90 transition-opacity"
        >
          <img 
            src={adConfig.imageUrl} 
            alt="Advertisement" 
            className="max-w-full h-auto rounded-lg shadow-sm"
          />
        </a>
      )}
    </div>
  );
};
