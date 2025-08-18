import React from 'react';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter } from "lucide-react";
import { cn } from '@/lib/utils';
import { HabitsFiltersProps } from '../habits.types';

/**
 * HabitsFilters provides search and category filtering for habits
 * 
 * @param searchTerm - Current search term
 * @param selectedCategory - Current selected category
 * @param onSearchChange - Callback fired when search term changes
 * @param onCategoryChange - Callback fired when category selection changes
 * @param className - Additional CSS classes
 */
const HabitsFilters: React.FC<HabitsFiltersProps> = ({ 
  searchTerm, 
  selectedCategory, 
  onSearchChange, 
  onCategoryChange,
  className,
  ...props
}) => {
  const categories = [
    { id: "all", name: "Todas las categorías" },
    { id: "salud", name: "Salud" },
    { id: "ejercicio", name: "Ejercicio" },
    { id: "bienestar", name: "Bienestar" },
    { id: "aprendizaje", name: "Aprendizaje" },
    { id: "productividad", name: "Productividad" },
  ];

  return (
    <div className={cn("flex flex-col sm:flex-row gap-4 mb-6", className)} {...props}>
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          placeholder="Buscar hábitos..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>
      <Select value={selectedCategory} onValueChange={onCategoryChange}>
        <SelectTrigger className="w-full sm:w-48">
          <Filter className="w-4 h-4 mr-2" />
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {categories.map((category) => (
            <SelectItem key={category.id} value={category.id}>
              {category.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

HabitsFilters.displayName = 'HabitsFilters';

export default HabitsFilters;