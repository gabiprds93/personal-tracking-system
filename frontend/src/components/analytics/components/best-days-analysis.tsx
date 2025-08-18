import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from '@/lib/utils';
import { BestDaysAnalysisProps } from '../analytics.types';

/**
 * BestDaysAnalysis displays success rates by day of the week
 * 
 * @param data - Array of day analysis data
 * @param className - Additional CSS classes
 */
const BestDaysAnalysis: React.FC<BestDaysAnalysisProps> = ({ 
  data,
  className,
  ...props 
}) => {
  return (
    <Card className={cn("", className)} {...props}>
      <CardHeader>
        <CardTitle>Mejores Días de la Semana</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {data.map((item) => (
            <div key={item.day} className="flex items-center gap-3">
              <div className="w-20 text-sm font-medium">{item.day}</div>
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div 
                  className={cn("h-2 rounded-full", item.color)} 
                  style={{ width: `${item.rate}%` }} 
                />
              </div>
              <div className="w-12 text-sm font-medium text-right">{item.rate}%</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

BestDaysAnalysis.displayName = 'BestDaysAnalysis';

export default BestDaysAnalysis;