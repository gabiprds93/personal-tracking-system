'use client';

import React from 'react';
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Trophy } from "lucide-react";
import { cn } from '@/lib/utils';
import { RecentAchievementsProps } from '../dashboard.types';

/**
 * RecentAchievements displays recent badge achievements with a link to view all
 * 
 * @param badges - Array of recent badges/achievements
 * @param className - Additional CSS classes to apply
 */
const RecentAchievements: React.FC<RecentAchievementsProps> = ({
  badges,
  className,
  ...props
}) => {
  return (
    <Card className={cn("", className)} {...props}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Star className="w-5 h-5" />
          Logros Recientes
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {badges.map((badge, index) => (
          <div
            key={index}
            className="flex items-center gap-3 p-3 bg-accent/10 rounded-lg border border-accent/20"
          >
            <div className="text-2xl">{badge.icon}</div>
            <div>
              <p className="font-medium text-sm">{badge.name}</p>
              <p className="text-xs text-muted-foreground">{badge.description}</p>
            </div>
          </div>
        ))}
        <Link href="/profile">
          <Button variant="outline" className="w-full gap-2 bg-transparent">
            <Trophy className="w-4 h-4" />
            Ver Todos los Logros
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

RecentAchievements.displayName = 'RecentAchievements';

export default RecentAchievements;