'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  TrendingUp, 
  Flame, 
  Target, 
  Calendar, 
  Gift, 
  Award 
} from "lucide-react";
import { cn } from '@/lib/utils';
import { StatsGridProps } from '../profile.types';

/**
 * StatsGrid displays detailed statistics in a grid layout
 * 
 * @param userStats - User statistics object
 * @param className - Additional CSS classes
 */
const StatsGrid: React.FC<StatsGridProps> = ({
  userStats,
  className,
  ...props
}) => {
  // Format join date in a friendly way
  const formatJoinDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return date.toLocaleDateString('es-ES', options);
  };

  const stats = [
    {
      title: "Puntos Totales",
      value: userStats.totalPoints.toLocaleString(),
      subtitle: `Desde ${formatJoinDate(userStats.joinedDate)}`,
      icon: TrendingUp,
    },
    {
      title: "Mejor Racha",
      value: userStats.longestStreak,
      subtitle: "días consecutivos",
      icon: Flame,
    },
    {
      title: "Tasa de Éxito",
      value: `${userStats.completionRate}%`,
      subtitle: "promedio general",
      icon: Target,
    },
    {
      title: "Días Activo",
      value: "68",
      subtitle: "desde que te uniste",
      icon: Calendar,
    },
    {
      title: "Próxima Recompensa",
      value: "153",
      subtitle: "puntos restantes",
      icon: Gift,
    },
    {
      title: "Rango Global",
      value: "#247",
      subtitle: "de todos los usuarios",
      icon: Award,
    },
  ];

  return (
    <div 
      className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", className)}
      {...props}
    >
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <stat.icon className="w-4 h-4" />
              {stat.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">{stat.subtitle}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

StatsGrid.displayName = 'StatsGrid';

export default StatsGrid;