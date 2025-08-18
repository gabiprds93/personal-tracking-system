import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Edit, Trash2, Calendar } from "lucide-react";
import { cn } from '@/lib/utils';
import { GoalCardProps } from '../goals.types';

/**
 * GoalCard displays a single goal with its progress, status, and actions
 * 
 * @param goal - The goal data to display
 * @param isSelected - Whether this goal is currently selected
 * @param onSelect - Callback fired when goal is selected
 * @param onEdit - Callback fired when edit button is clicked
 * @param onDelete - Callback fired when delete button is clicked
 * @param category - Category information for the goal
 * @param status - Status information for the goal
 * @param daysRemaining - Number of days remaining until target date
 * @param className - Additional CSS classes
 */
const GoalCard: React.FC<GoalCardProps> = ({ 
  goal,
  isSelected,
  onSelect,
  onEdit,
  onDelete,
  category,
  status,
  daysRemaining,
  className,
  ...props 
}) => {
  const Icon = category?.icon;

  const handleCardClick = () => {
    onSelect(goal);
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit(goal);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete(goal.id);
  };

  const getDaysRemainingText = () => {
    if (daysRemaining > 0) {
      return `${daysRemaining} días restantes`;
    } else if (daysRemaining === 0) {
      return "Vence hoy";
    } else {
      return `Venció hace ${Math.abs(daysRemaining)} días`;
    }
  };

  return (
    <Card
      className={cn(
        "cursor-pointer transition-all duration-200 hover:shadow-md",
        isSelected ? "ring-2 ring-primary/20 bg-primary/5" : "",
        className
      )}
      onClick={handleCardClick}
      {...props}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className={cn("w-10 h-10 rounded-lg border flex items-center justify-center", category?.color)}>
              {Icon && <Icon className="w-5 h-5" />}
            </div>
            <div className="flex-1">
              <CardTitle className="text-lg font-sans">{goal.title}</CardTitle>
              <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{goal.description}</p>
            </div>
          </div>
          <div className="flex gap-1">
            <Button variant="ghost" size="sm" onClick={handleEdit}>
              <Edit className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={handleDelete}>
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <Badge className={status.color}>{status.name}</Badge>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="w-4 h-4" />
              <span>{getDaysRemainingText()}</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Progreso</span>
              <span className="font-medium">{goal.progress}%</span>
            </div>
            <Progress value={goal.progress} className="h-2" />
          </div>

          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>
              {goal.milestones.filter((m) => m.completed).length} de {goal.milestones.length} hitos
            </span>
            <span>{goal.notes.length} notas</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

GoalCard.displayName = 'GoalCard';

export default GoalCard;