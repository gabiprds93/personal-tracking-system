import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import { cn } from '@/lib/utils';
import { ConsistencyHeatmapProps } from '../analytics.types';

/**
 * ConsistencyHeatmap displays a GitHub-style heatmap of habit consistency
 * 
 * @param data - Array of heatmap data points
 * @param getHeatmapColor - Function to get color based on count
 * @param className - Additional CSS classes
 */
const ConsistencyHeatmap: React.FC<ConsistencyHeatmapProps> = ({ 
  data,
  getHeatmapColor,
  className,
  ...props 
}) => {
  return (
    <Card className={cn("", className)} {...props}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          Mapa de Consistencia (últimos 3 meses)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="grid grid-cols-53 gap-1">
            {data.map((day, index) => (
              <div
                key={index}
                className={cn(
                  "w-3 h-3 rounded-sm border border-gray-200",
                  getHeatmapColor(day.count)
                )}
                title={`${day.date}: ${day.count} hábitos completados`}
              />
            ))}
          </div>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Menos</span>
            <div className="flex gap-1">
              {[0, 1, 2, 3, 4].map((level) => (
                <div
                  key={level}
                  className={cn(
                    "w-3 h-3 rounded-sm border border-gray-200",
                    getHeatmapColor(level)
                  )}
                />
              ))}
            </div>
            <span>Más</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

ConsistencyHeatmap.displayName = 'ConsistencyHeatmap';

export default ConsistencyHeatmap;