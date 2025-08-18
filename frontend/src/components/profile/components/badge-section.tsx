'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Medal, Lock } from "lucide-react";
import { cn } from '@/lib/utils';
import { BadgeSectionProps } from '../profile.types';

/**
 * BadgeSection displays unlocked and locked badges in a grid layout
 * 
 * @param unlockedBadges - Array of unlocked badges
 * @param lockedBadges - Array of locked badges
 * @param onBadgeClick - Callback when a badge is clicked
 * @param className - Additional CSS classes
 */
const BadgeSection: React.FC<BadgeSectionProps> = ({
  unlockedBadges,
  lockedBadges,
  onBadgeClick,
  className,
  ...props
}) => {
  return (
    <div 
      className={cn("grid grid-cols-1 md:grid-cols-2 gap-6", className)}
      {...props}
    >
      {/* Unlocked Badges */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Medal className="w-5 h-5 text-yellow-500" />
            Insignias Desbloqueadas ({unlockedBadges.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            {unlockedBadges.map((badge) => (
              <div
                key={badge.id}
                className="p-3 border rounded-lg bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200 cursor-pointer hover:shadow-sm transition-shadow"
                onClick={() => onBadgeClick?.(badge)}
              >
                <div className="text-center">
                  <div className="text-3xl mb-2">{badge.icon}</div>
                  <h4 className="font-medium text-sm">{badge.name}</h4>
                  <p className="text-xs text-muted-foreground mt-1">{badge.requirement}</p>
                  {badge.unlockedAt && (
                    <Badge variant="secondary" className="mt-2 text-xs">
                      {new Date(badge.unlockedAt).toLocaleDateString("es-ES")}
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Locked Badges */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="w-5 h-5 text-gray-500" />
            Por Desbloquear ({lockedBadges.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            {lockedBadges.map((badge) => (
              <div 
                key={badge.id} 
                className="p-3 border rounded-lg bg-gray-50 border-gray-200 opacity-75"
              >
                <div className="text-center">
                  <div className="text-3xl mb-2 grayscale">{badge.icon}</div>
                  <h4 className="font-medium text-sm text-gray-600">{badge.name}</h4>
                  <p className="text-xs text-gray-500 mt-1">{badge.requirement}</p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-2 text-xs bg-transparent"
                    onClick={() => onBadgeClick?.(badge)}
                  >
                    Ver Progreso
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

BadgeSection.displayName = 'BadgeSection';

export default BadgeSection;