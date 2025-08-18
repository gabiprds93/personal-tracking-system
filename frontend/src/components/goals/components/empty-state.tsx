import React from 'react';
import { Button } from "@/components/ui/button";
import { Plus, Target } from "lucide-react";
import { cn } from '@/lib/utils';
import { EmptyStateProps } from '../goals.types';

/**
 * EmptyState component for when no goals are found
 * 
 * @param searchTerm - Current search term
 * @param selectedCategory - Current selected category filter
 * @param selectedStatus - Current selected status filter
 * @param onAddGoal - Callback fired when add goal button is clicked
 * @param className - Additional CSS classes
 */
const EmptyState: React.FC<EmptyStateProps> = ({ 
  searchTerm,
  selectedCategory,
  selectedStatus,
  onAddGoal,
  className,
  ...props 
}) => {
  const hasFilters = searchTerm || selectedCategory !== "all" || selectedStatus !== "all";

  return (
    <div className={cn("text-center py-12", className)} {...props}>
      <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
        <Target className="w-8 h-8 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-medium mb-2">No se encontraron metas</h3>
      <p className="text-muted-foreground mb-4">
        {hasFilters
          ? "Intenta ajustar tus filtros de búsqueda"
          : "Comienza creando tu primera meta SMART"}
      </p>
      <Button onClick={onAddGoal}>
        <Plus className="w-4 h-4 mr-2" />
        Crear Meta
      </Button>
    </div>
  );
};

EmptyState.displayName = 'EmptyState';

export default EmptyState;