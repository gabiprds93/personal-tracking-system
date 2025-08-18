'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, CheckCircle2 } from "lucide-react";
import { cn } from '@/lib/utils';
import { TodayHabitsProps } from '../dashboard.types';

/**
 * TodayHabits displays today's habit list with completion tracking
 * 
 * @param habits - Array of today's habits
 * @param onHabitToggle - Callback fired when a habit is toggled
 * @param className - Additional CSS classes to apply
 */
const TodayHabits: React.FC<TodayHabitsProps> = ({
  habits,
  onHabitToggle,
  className,
  ...props
}) => {
  return (
    <Card className={cn("", className)} {...props}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          Hábitos de Hoy
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {habits.map((habit) => (
          <div
            key={habit.id}
            className={cn(
              "flex items-center gap-3 p-3 rounded-lg border transition-all duration-200 hover:shadow-sm",
              habit.completed
                ? "bg-primary/5 border-primary/20"
                : "bg-card border-border hover:border-primary/30"
            )}
          >
            <Button
              variant="ghost"
              size="sm"
              disabled={habit.completed}
              className={cn(
                "w-8 h-8 p-0",
                habit.completed ? "text-primary" : "text-muted-foreground"
              )}
              onClick={() => onHabitToggle(habit.id)}
            >
              <CheckCircle2 
                className={cn(
                  "w-5 h-5",
                  habit.completed ? "fill-current" : ""
                )} 
              />
            </Button>
            <div className="flex-1">
              <p 
                className={cn(
                  "font-medium",
                  habit.completed ? "line-through text-muted-foreground" : ""
                )}
              >
                {habit.name}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="secondary" className="text-xs">
                  {habit.category}
                </Badge>
                <span className="text-xs text-muted-foreground">
                  +{habit.points} puntos
                </span>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

TodayHabits.displayName = 'TodayHabits';

export default TodayHabits;