import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { PieChartIcon } from "lucide-react";
import { cn } from '@/lib/utils';
import { CategoryDistributionChartProps } from '../analytics.types';

/**
 * CategoryDistributionChart displays the distribution of habits by category
 * 
 * @param data - Array of category data with values and colors
 * @param className - Additional CSS classes
 */
const CategoryDistributionChart: React.FC<CategoryDistributionChartProps> = ({ 
  data,
  className,
  ...props 
}) => {
  return (
    <Card className={cn("", className)} {...props}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <PieChartIcon className="w-5 h-5" />
          Distribución por Categoría
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={120}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => `${value}%`} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

CategoryDistributionChart.displayName = 'CategoryDistributionChart';

export default CategoryDistributionChart;