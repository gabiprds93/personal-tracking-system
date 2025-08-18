import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { TrendingUp } from "lucide-react";
import { cn } from '@/lib/utils';
import { CompletionTrendChartProps } from '../analytics.types';

/**
 * CompletionTrendChart displays the habit completion rate trend over time
 * 
 * @param data - Array of habit trend data points
 * @param className - Additional CSS classes
 */
const CompletionTrendChart: React.FC<CompletionTrendChartProps> = ({ 
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
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5" />
          Tendencia de Completación
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" tickFormatter={formatDate} tick={{ fontSize: 12 }} />
            <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} />
            <Tooltip
              labelFormatter={(value) => formatDate(value)}
              formatter={(value) => [`${value}%`, "Tasa de Completación"]}
            />
            <Area
              type="monotone"
              dataKey="rate"
              stroke="hsl(var(--primary))"
              fill="hsl(var(--primary))"
              fillOpacity={0.2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

CompletionTrendChart.displayName = 'CompletionTrendChart';

export default CompletionTrendChart;