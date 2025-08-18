import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from '@/lib/utils';
import { PersonalInsightsProps } from '../analytics.types';

/**
 * PersonalInsights displays AI-generated insights and recommendations
 * 
 * @param insights - Array of insight cards
 * @param className - Additional CSS classes
 */
const PersonalInsights: React.FC<PersonalInsightsProps> = ({ 
  insights,
  className,
  ...props 
}) => {
  return (
    <Card className={cn("", className)} {...props}>
      <CardHeader>
        <CardTitle>Insights Personalizados</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {insights.map((insight) => (
          <div 
            key={insight.id}
            className={cn(
              "p-4 border rounded-lg",
              insight.bgColor,
              insight.borderColor
            )}
          >
            <h4 className={cn("font-medium mb-2", insight.textColor)}>
              {insight.icon} {insight.title}
            </h4>
            <p className={cn("text-sm", insight.textColor)}>
              {insight.description}
            </p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

PersonalInsights.displayName = 'PersonalInsights';

export default PersonalInsights;