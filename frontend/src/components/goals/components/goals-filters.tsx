import React from 'react';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter } from "lucide-react";
import { cn } from '@/lib/utils';
import { GoalsFiltersProps } from '../goals.types';

/**
 * GoalsFilters provides search and filtering capabilities for goals
 * 
 * @param searchTerm - Current search term
 * @param selectedCategory - Current selected category filter
 * @param selectedStatus - Current selected status filter
 * @param onSearchChange - Callback fired when search term changes
 * @param onCategoryChange - Callback fired when category filter changes
 * @param onStatusChange - Callback fired when status filter changes
 * @param categories - Available goal categories
 * @param statuses - Available goal statuses
 * @param className - Additional CSS classes
 */
const GoalsFilters: React.FC<GoalsFiltersProps> = ({ 
  searchTerm,
  selectedCategory,
  selectedStatus,
  onSearchChange,
  onCategoryChange,
  onStatusChange,
  categories,
  statuses,
  className,
  ...props 
}) => {
  return (
    <div className={cn("flex flex-col sm:flex-row gap-4 mb-6", className)} {...props}>
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          placeholder="Buscar metas..."
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
          <SelectItem value="all">Todas las categorías</SelectItem>
          {categories.map((category) => (
            <SelectItem key={category.id} value={category.id}>
              {category.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      
      <Select value={selectedStatus} onValueChange={onStatusChange}>
        <SelectTrigger className="w-full sm:w-32">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos</SelectItem>
          {statuses.map((status) => (
            <SelectItem key={status.id} value={status.id}>
              {status.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

GoalsFilters.displayName = 'GoalsFilters';

export default GoalsFilters;