import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Flag, CheckSquare, CheckCircle2, BookOpen, Target } from "lucide-react";
import { format, parseISO } from "date-fns";
import { es } from "date-fns/locale";
import { cn } from '@/lib/utils';
import { GoalDetailsProps } from '../goals.types';

/**
 * GoalDetails displays detailed information about a selected goal
 * 
 * @param goal - The selected goal to display details for
 * @param onToggleMilestone - Callback fired when a milestone is toggled
 * @param onAddNote - Callback fired when a new note is added
 * @param className - Additional CSS classes
 */
const GoalDetails: React.FC<GoalDetailsProps> = ({ 
  goal,
  onToggleMilestone,
  onAddNote,
  className,
  ...props 
}) => {
  const handleNoteKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && goal) {
      const target = e.target as HTMLInputElement;
      onAddNote(goal.id, target.value);
      target.value = "";
    }
  };

  if (!goal) {
    return (
      <Card className={cn("sticky top-24", className)} {...props}>
        <CardContent className="p-6 text-center">
          <Target className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">Selecciona una meta para ver sus detalles, hitos y notas</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn("sticky top-24", className)} {...props}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Flag className="w-5 h-5" />
          Detalles de la Meta
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="font-medium mb-2">{goal.title}</h3>
          <p className="text-sm text-muted-foreground">{goal.description}</p>
        </div>

        <div className="space-y-3">
          <h4 className="font-medium flex items-center gap-2">
            <CheckSquare className="w-4 h-4" />
            Hitos ({goal.milestones.filter((m) => m.completed).length}/{goal.milestones.length})
          </h4>
          {goal.milestones.map((milestone) => (
            <div key={milestone.id} className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="w-6 h-6 p-0"
                onClick={() => onToggleMilestone(goal.id, milestone.id)}
              >
                <CheckCircle2
                  className={cn(
                    "w-4 h-4",
                    milestone.completed 
                      ? "text-primary fill-current" 
                      : "text-muted-foreground"
                  )}
                />
              </Button>
              <span 
                className={cn(
                  "text-sm",
                  milestone.completed 
                    ? "line-through text-muted-foreground" 
                    : ""
                )}
              >
                {milestone.title}
              </span>
            </div>
          ))}
        </div>

        <div className="space-y-3">
          <h4 className="font-medium flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            Notas y Reflexiones
          </h4>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {goal.notes.map((note) => (
              <div key={note.id} className="p-2 bg-muted/50 rounded text-sm">
                <p>{note.content}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {format(parseISO(note.date), "dd MMM yyyy", { locale: es })}
                </p>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <Input
              placeholder="Agregar nota..."
              onKeyPress={handleNoteKeyPress}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

GoalDetails.displayName = 'GoalDetails';

export default GoalDetails;