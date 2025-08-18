import React from 'react';
import { Button } from "@/components/ui/button";
import { Plus, Target } from "lucide-react";
import { cn } from '@/lib/utils';
import { HabitsGridProps, EmptyStateProps } from '../habits.types';
import HabitCard from './habit-card';

/**
 * EmptyState component for when no habits are found
 */
const EmptyState: React.FC<EmptyStateProps> = ({ 
  searchTerm, 
  selectedCategory, 
  onAddHabit,
  className,
  ...props 
}) => (
  <div className={cn("text-center py-12", className)} {...props}>
    <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
      <Target className="w-8 h-8 text-muted-foreground" />
    </div>
    <h3 className="text-lg font-medium mb-2">No se encontraron hábitos</h3>
    <p className="text-muted-foreground mb-4">
      {searchTerm || selectedCategory !== "all"
        ? "Intenta ajustar tus filtros de búsqueda"
        : "Comienza creando tu primer hábito"}
    </p>
    <Button onClick={onAddHabit}>
      <Plus className="w-4 h-4 mr-2" />
      Crear Hábito
    </Button>
  </div>
);

/**
 * HabitsGrid displays habits in a responsive grid layout
 * 
 * @param habits - Array of habits to display
 * @param onEditHabit - Callback fired when edit habit is clicked
 * @param onDeleteHabit - Callback fired when delete habit is clicked
 * @param onToggleCompletion - Callback fired when habit completion is toggled
 * @param onAddHabit - Callback fired when add habit is clicked
 * @param className - Additional CSS classes
 */
const HabitsGrid: React.FC<HabitsGridProps> = ({ 
  habits, 
  onEditHabit, 
  onDeleteHabit, 
  onToggleCompletion, 
  onAddHabit,
  className,
  ...props
}) => {
  if (habits.length === 0) {
    return (
      <EmptyState 
        searchTerm=""
        selectedCategory="all"
        onAddHabit={onAddHabit}
      />
    );
  }

  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", className)} {...props}>
      {habits.map((habit) => (
        <HabitCard
          key={habit.id}
          habit={habit}
          onEdit={onEditHabit}
          onDelete={onDeleteHabit}
          onToggleCompletion={onToggleCompletion}
        />
      ))}
    </div>
  );
};

HabitsGrid.displayName = 'HabitsGrid';

export default HabitsGrid;