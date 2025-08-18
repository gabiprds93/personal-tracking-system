import React from 'react';
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { cn } from '@/lib/utils';
import { GoalsHeaderProps } from '../goals.types';

/**
 * GoalsHeader displays the main header for the goals page
 * 
 * @param onAddGoal - Callback fired when add goal button is clicked
 * @param className - Additional CSS classes
 */
const GoalsHeader: React.FC<GoalsHeaderProps> = ({ 
  onAddGoal, 
  className,
  ...props 
}) => {
  return (
    <header className={cn("border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50", className)} {...props}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold font-sans">Seguimiento de Metas</h1>
            <p className="text-muted-foreground font-serif">Gestiona tus objetivos SMART y hitos importantes</p>
          </div>
          <Button className="gap-2" onClick={onAddGoal}>
            <Plus className="w-4 h-4" />
            Nueva Meta
          </Button>
        </div>
      </div>
    </header>
  );
};

GoalsHeader.displayName = 'GoalsHeader';

export default GoalsHeader;