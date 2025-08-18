import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { cn } from '@/lib/utils';
import { WeeklyComparisonChartProps } from '../analytics.types';

/**
 * WeeklyComparisonChart displays a comparison between current and previous month
 * 
 * @param data - Array of weekly comparison data
 * @param className - Additional CSS classes
 */
const WeeklyComparisonChart: React.FC<WeeklyComparisonChartProps> = ({ 
  data,
  className,
  ...props 
}) => {
  return (
    <Card className={cn("", className)} {...props}>
      <CardHeader>
        <CardTitle>Comparación Semanal</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="week" />
            <YAxis domain={[0, 100]} />
            <Tooltip formatter={(value) => `${value}%`} />
            <Legend />
            <Bar dataKey="thisMonth" fill="hsl(var(--primary))" name="Este Mes" />
            <Bar dataKey="lastMonth" fill="hsl(var(--muted))" name="Mes Anterior" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

WeeklyComparisonChart.displayName = 'WeeklyComparisonChart';

export default WeeklyComparisonChart;