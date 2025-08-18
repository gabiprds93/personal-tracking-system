'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import { cn } from '@/lib/utils';
import { Badge as BadgeType } from '../profile.types';

export interface RecentAchievementsProps extends React.HTMLAttributes<HTMLDivElement> {
  badges: BadgeType[];
  className?: string;
}

/**
 * RecentAchievements displays the most recent unlocked achievements
 * 
 * @param badges - Array of unlocked badges to show
 * @param className - Additional CSS classes
 */
const RecentAchievements: React.FC<RecentAchievementsProps> = ({
  badges,
  className,
  ...props
}) => {
  // Show only the first 3 recent achievements
  const recentBadges = badges.slice(0, 3);

  return (
    <Card className={cn("", className)} {...props}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Star className="w-5 h-5" />
          Logros Recientes
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {recentBadges.map((badge) => (
            <div 
              key={badge.id} 
              className="flex items-center gap-3 p-3 bg-accent/10 rounded-lg"
            >
              <div className="text-3xl">{badge.icon}</div>
              <div className="flex-1">
                <h4 className="font-medium">{badge.name}</h4>
                <p className="text-sm text-muted-foreground">{badge.description}</p>
              </div>
              {badge.unlockedAt && (
                <Badge variant="secondary">
                  {new Date(badge.unlockedAt).toLocaleDateString("es-ES", {
                    day: "numeric",
                    month: "short",
                  })}
                </Badge>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

RecentAchievements.displayName = 'RecentAchievements';

export default RecentAchievements;