import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from '@/lib/utils';
import { KeyMetricsProps, MetricCardProps } from '../analytics.types';

/**
 * MetricCard displays a single key metric with icon and change indicator
 */
const MetricCard: React.FC<MetricCardProps> = ({ 
  metric,
  className,
  ...props 
}) => {
  const Icon = metric.icon;
  
  const getChangeColor = () => {
    switch (metric.changeType) {
      case 'positive':
        return 'text-green-600';
      case 'negative':
        return 'text-red-600';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <Card className={cn("", className)} {...props}>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <Icon className={cn("w-4 h-4", metric.iconColor)} />
          {metric.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{metric.value}</div>
        <p className={cn("text-xs", getChangeColor())}>{metric.change}</p>
      </CardContent>
    </Card>
  );
};

/**
 * KeyMetrics displays a grid of key performance metrics
 * 
 * @param metrics - Array of metrics to display
 * @param className - Additional CSS classes
 */
const KeyMetrics: React.FC<KeyMetricsProps> = ({ 
  metrics,
  className,
  ...props 
}) => {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4", className)} {...props}>
      {metrics.map((metric) => (
        <MetricCard key={metric.id} metric={metric} />
      ))}
    </div>
  );
};

KeyMetrics.displayName = 'KeyMetrics';

export default KeyMetrics;