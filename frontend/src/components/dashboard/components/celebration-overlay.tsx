'use client';

import React from 'react';
import { CelebrationOverlayProps } from '../dashboard.types';

/**
 * CelebrationOverlay displays an animated celebration when habits are completed
 * 
 * @param isVisible - Whether the celebration overlay is visible
 * @param points - Number of points earned (optional, defaults to 15)
 */
const CelebrationOverlay: React.FC<CelebrationOverlayProps> = ({
  isVisible,
  points = 15,
}) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
      <div className="animate-bounce text-6xl">🎉</div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mt-16">
        <div className="bg-primary text-primary-foreground px-4 py-2 rounded-full font-bold animate-pulse">
          +{points} puntos
        </div>
      </div>
    </div>
  );
};

CelebrationOverlay.displayName = 'CelebrationOverlay';

export default CelebrationOverlay;