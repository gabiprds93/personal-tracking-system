import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, Clock, Repeat, CheckCircle2 } from "lucide-react";
import { cn } from '@/lib/utils';
import { HabitCardProps } from '../habits.types';

/**
 * HabitCard displays a single habit with its details and actions
 * 
 * @param habit - The habit data to display
 * @param onEdit - Callback fired when edit button is clicked
 * @param onDelete - Callback fired when delete button is clicked
 * @param onToggleCompletion - Callback fired when completion is toggled
 * @param className - Additional CSS classes
 */
const HabitCard: React.FC<HabitCardProps> = ({ 
  habit,
  onEdit,
  onDelete,
  onToggleCompletion,
  className,
  ...props 
}) => {
  // These would come from the parent component with actual data
  const getCategoryInfo = (categoryId: string) => {
    const categories = [
      { id: "salud", name: "Salud", color: "text-red-500 bg-red-50 border-red-200" },
      { id: "ejercicio", name: "Ejercicio", color: "text-orange-500 bg-orange-50 border-orange-200" },
      { id: "bienestar", name: "Bienestar", color: "text-purple-500 bg-purple-50 border-purple-200" },
      { id: "aprendizaje", name: "Aprendizaje", color: "text-blue-500 bg-blue-50 border-blue-200" },
      { id: "productividad", name: "Productividad", color: "text-green-500 bg-green-50 border-green-200" },
    ];
    return categories.find(c => c.id === categoryId);
  };

  const getDifficultyInfo = (difficultyId: number) => {
    const difficulties = [
      { id: 1, name: "Fácil", points: 5, color: "text-green-600" },
      { id: 2, name: "Medio", points: 10, color: "text-yellow-600" },
      { id: 3, name: "Difícil", points: 15, color: "text-red-600" },
    ];
    return difficulties.find(d => d.id === difficultyId);
  };

  const categoryInfo = getCategoryInfo(habit.category);
  const difficultyInfo = getDifficultyInfo(habit.difficulty);

  const getFrequencyText = (frequency: string) => {
    switch (frequency) {
      case "daily":
        return "Diario";
      case "weekly":
        return "Semanal";
      case "custom":
        return "Personalizado";
      default:
        return frequency;
    }
  };

  return (
    <Card
      className={cn(
        "relative transition-all duration-200 hover:shadow-md",
        habit.completedToday ? "ring-2 ring-primary/20 bg-primary/5" : "",
        className
      )}
      {...props}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className={cn("w-10 h-10 rounded-lg border flex items-center justify-center", categoryInfo?.color)}>
              {/* Icon would be rendered here based on habit.icon */}
              <div className="w-5 h-5 bg-current rounded opacity-60" />
            </div>
            <div>
              <CardTitle className="text-lg font-sans">{habit.name}</CardTitle>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="secondary" className="text-xs">
                  {categoryInfo?.name}
                </Badge>
                <span className={cn("text-xs font-medium", difficultyInfo?.color)}>
                  +{difficultyInfo?.points} pts
                </span>
              </div>
            </div>
          </div>
          <div className="flex gap-1">
            <Button variant="ghost" size="sm" onClick={() => onEdit(habit)}>
              <Edit className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={() => onDelete(habit.id)}>
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                {getFrequencyText(habit.frequency)}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Repeat className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium">{habit.streak} días</span>
            </div>
          </div>

          <Button
            variant={habit.completedToday ? "default" : "outline"}
            className="w-full gap-2"
            onClick={() => onToggleCompletion(habit.id)}
            disabled={habit.completedToday}
          >
            <CheckCircle2 className={cn("w-4 h-4", habit.completedToday ? "fill-current" : "")} />
            {habit.completedToday ? "Completado hoy" : "Marcar como completado"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

HabitCard.displayName = 'HabitCard';

export default HabitCard;