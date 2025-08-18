'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Flame, Target, TrendingUp, Award } from "lucide-react";
import { cn } from '@/lib/utils';
import { MetricsGridProps } from '../dashboard.types';

/**
 * MetricsGrid displays key user statistics in a responsive grid layout
 * 
 * @param userStats - User statistics object containing metrics data
 * @param className - Additional CSS classes to apply
 */
const MetricsGrid: React.FC<MetricsGridProps> = ({
  userStats,
  className,
  ...props
}) => {
  const metrics = [
    {
      title: "Racha Actual",
      value: userStats.currentStreak,
      subtitle: "días consecutivos",
      icon: Flame,
      iconColor: "text-orange-500",
      isProgress: false,
    },
    {
      title: "Progreso Hoy",
      value: `${userStats.todayCompleted}/${userStats.todayTotal}`,
      subtitle: "",
      icon: Target,
      iconColor: "text-primary",
      isProgress: true,
      progressValue: (userStats.todayCompleted / userStats.todayTotal) * 100,
    },
    {
      title: "Tasa de Éxito",
      value: `${userStats.completionRate}%`,
      subtitle: "este mes",
      icon: TrendingUp,
      iconColor: "text-accent",
      isProgress: false,
    },
    {
      title: "Mejor Racha",
      value: userStats.longestStreak,
      subtitle: "días máximo",
      icon: Award,
      iconColor: "text-yellow-500",
      isProgress: false,
    },
  ];

  return (
    <div 
      className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4", className)}
      {...props}
    >
      {metrics.map((metric, index) => (
        <Card key={index} className={index === 0 ? "relative overflow-hidden" : ""}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <metric.icon className={cn("w-4 h-4", metric.iconColor)} />
              {metric.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-sans">{metric.value}</div>
            {metric.subtitle && (
              <p className="text-xs text-muted-foreground">{metric.subtitle}</p>
            )}
            {metric.isProgress && metric.progressValue !== undefined && (
              <Progress value={metric.progressValue} className="mt-2" />
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

MetricsGrid.displayName = 'MetricsGrid';

export default MetricsGrid;