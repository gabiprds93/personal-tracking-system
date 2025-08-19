'use client';

import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Flame, CheckCircle2, Target } from "lucide-react";
import { cn } from '@/lib/utils';
import { QuickStatsProps } from '../profile.types';

/**
 * QuickStats displays a grid of key user metrics
 * 
 * @param userStats - User statistics object
 * @param className - Additional CSS classes
 */
const QuickStats: React.FC<QuickStatsProps> = ({
  userStats,
  className,
  ...props
}) => {
  const stats = [
    {
      icon: Flame,
      value: userStats.currentStreak,
      label: "Racha actual",
      color: "text-orange-500",
    },
    {
      icon: CheckCircle2,
      value: userStats.habitsCompleted,
      label: "Hábitos completados",
      color: "text-green-500",
    },
    {
      icon: Target,
      value: userStats.goalsCompleted,
      label: "Metas logradas",
      color: "text-blue-500",
    },
  ];

  return (
    <div 
      className={cn("grid grid-cols-1 md:grid-cols-3 gap-4", className)}
      {...props}
    >
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardContent className="p-4 text-center">
            <stat.icon className={cn("w-8 h-8 mx-auto mb-2", stat.color)} />
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">{stat.label}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

QuickStats.displayName = 'QuickStats';

export default QuickStats;