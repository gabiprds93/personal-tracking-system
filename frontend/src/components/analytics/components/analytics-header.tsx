import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from '@/lib/utils';
import { AnalyticsHeaderProps } from '../analytics.types';

/**
 * AnalyticsHeader displays the main header for the analytics page
 * 
 * @param timeRange - Current selected time range
 * @param onTimeRangeChange - Callback fired when time range changes
 * @param className - Additional CSS classes
 */
const AnalyticsHeader: React.FC<AnalyticsHeaderProps> = ({ 
  timeRange,
  onTimeRangeChange,
  className,
  ...props 
}) => {
  return (
    <header className={cn("border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50", className)} {...props}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold font-sans">Analytics y Reportes</h1>
            <p className="text-muted-foreground font-serif">Analiza tu progreso y descubre patrones en tus hábitos</p>
          </div>
          <div className="flex items-center gap-2">
            <Select value={timeRange} onValueChange={onTimeRangeChange}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">7 días</SelectItem>
                <SelectItem value="30d">30 días</SelectItem>
                <SelectItem value="90d">90 días</SelectItem>
                <SelectItem value="1y">1 año</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </header>
  );
};

AnalyticsHeader.displayName = 'AnalyticsHeader';

export default AnalyticsHeader;