import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Clock } from "lucide-react";
import { cn } from '@/lib/utils';
import { TimePatternChartProps } from '../analytics.types';

/**
 * TimePatternChart displays habit completion patterns by time of day
 * 
 * @param data - Array of time of day data
 * @param className - Additional CSS classes
 */
const TimePatternChart: React.FC<TimePatternChartProps> = ({ 
  data,
  className,
  ...props 
}) => {
  const formatHour = (hour: string) => {
    return hour.replace(":00", "h");
  };

  return (
    <Card className={cn("", className)} {...props}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="w-5 h-5" />
          Patrones Horarios
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="hour" tickFormatter={formatHour} />
            <YAxis />
            <Tooltip
              labelFormatter={(value) => `${value}`}
              formatter={(value) => [`${value} hábitos`, "Completados"]}
            />
            <Bar dataKey="habits" fill="hsl(var(--chart-2))" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

TimePatternChart.displayName = 'TimePatternChart';

export default TimePatternChart;