import React from 'react';
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { cn } from '@/lib/utils';
import { HabitsHeaderProps } from '../habits.types';

/**
 * HabitsHeader displays the main header for the habits page
 * 
 * @param onAddHabit - Callback fired when add habit button is clicked
 * @param className - Additional CSS classes
 */
const HabitsHeader: React.FC<HabitsHeaderProps> = ({ 
  onAddHabit, 
  className,
  ...props 
}) => {
  return (
    <header className={cn("border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50", className)} {...props}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold font-sans">Gestión de Hábitos</h1>
            <p className="text-muted-foreground font-serif">Administra y personaliza tus hábitos diarios</p>
          </div>
          <Button className="gap-2" onClick={onAddHabit}>
            <Plus className="w-4 h-4" />
            Nuevo Hábito
          </Button>
        </div>
      </div>
    </header>
  );
};

HabitsHeader.displayName = 'HabitsHeader';

export default HabitsHeader;