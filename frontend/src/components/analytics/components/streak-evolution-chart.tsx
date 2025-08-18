import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { cn } from '@/lib/utils';
import { StreakEvolutionChartProps } from '../analytics.types';

/**
 * StreakEvolutionChart displays the evolution of habit streaks over time
 * 
 * @param data - Array of streak data points
 * @param className - Additional CSS classes
 */
const StreakEvolutionChart: React.FC<StreakEvolutionChartProps> = ({ 
  data,
  className,
  ...props 
}) => {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("es-ES", { day: "numeric", month: "short" });
  };

  return (
    <Card className={cn("", className)} {...props}>
      <CardHeader>
        <CardTitle>Evolución de Rachas</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" tickFormatter={formatDate} />
            <YAxis />
            <Tooltip
              labelFormatter={(value) => formatDate(value)}
              formatter={(value) => [`${value} días`, "Racha"]}
            />
            <Line
              type="monotone"
              dataKey="streak"
              stroke="hsl(var(--chart-1))"
              strokeWidth={3}
              dot={{ fill: "hsl(var(--chart-1))", strokeWidth: 2, r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

StreakEvolutionChart.displayName = 'StreakEvolutionChart';

export default StreakEvolutionChart;