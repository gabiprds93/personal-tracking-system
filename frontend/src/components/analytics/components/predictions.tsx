import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from '@/lib/utils';
import { PredictionsProps } from '../analytics.types';

/**
 * Predictions displays AI-driven predictions and upcoming milestones
 * 
 * @param predictions - Prediction data with items
 * @param milestones - Array of milestone data
 * @param className - Additional CSS classes
 */
const Predictions: React.FC<PredictionsProps> = ({ 
  predictions,
  milestones,
  className,
  ...props 
}) => {
  return (
    <Card className={cn("", className)} {...props}>
      <CardHeader>
        <CardTitle>Predicciones y Metas</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-4 border rounded-lg">
          <h4 className="font-medium mb-2">{predictions.title}</h4>
          <p className="text-sm text-muted-foreground mb-2">
            {predictions.description}
          </p>
          <ul className="text-sm space-y-1">
            {predictions.items.map((item, index) => (
              <li key={index}>• {item}</li>
            ))}
          </ul>
        </div>

        <div className="p-4 border rounded-lg">
          <h4 className="font-medium mb-2">Próximos Hitos</h4>
          <div className="space-y-2">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-sm">{milestone.name}</span>
                <span className="text-sm text-muted-foreground">{milestone.remaining}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

Predictions.displayName = 'Predictions';

export default Predictions;