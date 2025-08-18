import { ReactNode, HTMLAttributes } from 'react';

// Core interfaces
export interface Habit {
  id: string;
  name: string;
  category: string;
  icon: string;
  frequency: string;
  difficulty: number;
  targetDays: number[];
  createdAt: string;
  streak: number;
  completedToday: boolean;
}

export interface HabitCategory {
  id: string;
  name: string;
  icon: any; // Lucide icon component
  color: string;
}

export interface HabitIcon {
  id: string;
  icon: any; // Lucide icon component
  name: string;
}

export interface Frequency {
  id: string;
  name: string;
  description: string;
}

export interface Difficulty {
  id: number;
  name: string;
  points: number;
  color: string;
}

export interface WeekDay {
  id: number;
  name: string;
  fullName: string;
}

// Form data interfaces
export interface HabitFormData {
  name: string;
  category: string;
  icon: string;
  frequency: string;
  difficulty: number;
  targetDays: number[];
}

export interface HabitFormErrors {
  name?: string;
  category?: string;
  icon?: string;
  frequency?: string;
  difficulty?: string;
  targetDays?: string;
}

// Component props interfaces
export interface HabitsHeaderProps extends HTMLAttributes<HTMLElement> {
  onAddHabit: () => void;
  className?: string;
}

export interface HabitsFiltersProps extends HTMLAttributes<HTMLDivElement> {
  searchTerm: string;
  selectedCategory: string;
  onSearchChange: (term: string) => void;
  onCategoryChange: (category: string) => void;
  className?: string;
}

export interface HabitsGridProps extends HTMLAttributes<HTMLDivElement> {
  habits: Habit[];
  onEditHabit: (habit: Habit) => void;
  onDeleteHabit: (id: string) => void;
  onToggleCompletion: (id: string) => void;
  onAddHabit: () => void;
  className?: string;
}

export interface HabitCardProps extends HTMLAttributes<HTMLDivElement> {
  habit: Habit;
  onEdit: (habit: Habit) => void;
  onDelete: (id: string) => void;
  onToggleCompletion: (id: string) => void;
  className?: string;
}

export interface HabitFormProps {
  isOpen: boolean;
  habit: Habit | null;
  formData: HabitFormData;
  formErrors: HabitFormErrors;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  onFormChange: (data: Partial<HabitFormData>) => void;
}

export interface EmptyStateProps extends HTMLAttributes<HTMLDivElement> {
  searchTerm: string;
  selectedCategory: string;
  onAddHabit: () => void;
  className?: string;
}

// Hook interfaces
export interface UseHabitsReturn {
  state: HabitsState;
  actions: HabitsActions;
}

export interface HabitsState {
  loading: boolean;
  habits: Habit[];
  filteredHabits: Habit[];
  searchTerm: string;
  selectedCategory: string;
  isDialogOpen: boolean;
  editingHabit: Habit | null;
  formData: HabitFormData;
  formErrors: HabitFormErrors;
  categories: HabitCategory[];
  icons: HabitIcon[];
  frequencies: Frequency[];
  difficulties: Difficulty[];
  weekDays: WeekDay[];
}

export interface HabitsActions {
  // Search and filter actions
  setSearchTerm: (term: string) => void;
  setSelectedCategory: (category: string) => void;
  
  // Dialog actions
  openDialog: () => void;
  closeDialog: () => void;
  
  // Habit actions
  addHabit: (habitData: HabitFormData) => void;
  editHabit: (habit: Habit) => void;
  updateHabit: (habitData: HabitFormData) => void;
  deleteHabit: (id: string) => void;
  toggleCompletion: (id: string) => void;
  
  // Form actions
  submitForm: (e: React.FormEvent) => void;
  updateFormData: (data: Partial<HabitFormData>) => void;
  resetForm: () => void;
  validateForm: () => boolean;
}

// Utility type for habit creation
export type CreateHabitData = Omit<Habit, 'id' | 'createdAt' | 'streak' | 'completedToday'>;

// Utility type for habit update
export type UpdateHabitData = Partial<Habit> & { id: string };

// Filter types
export type HabitFilter = 'all' | 'completed' | 'pending' | 'streak';
export type CategoryFilter = 'all' | string;

// Sort types
export type HabitSortBy = 'name' | 'category' | 'streak' | 'difficulty' | 'created';
export type SortOrder = 'asc' | 'desc';