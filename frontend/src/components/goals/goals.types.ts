import { ReactNode, HTMLAttributes } from 'react';

// Core interfaces
export interface Goal {
  id: number;
  title: string;
  description: string;
  category: string;
  targetDate: string;
  progress: number;
  status: GoalStatus;
  createdAt: string;
  milestones: Milestone[];
  notes: Note[];
}

export interface Milestone {
  id: number;
  title: string;
  completed: boolean;
  completedAt: string | null;
}

export interface Note {
  id: number;
  content: string;
  date: string;
}

export interface GoalCategory {
  id: string;
  name: string;
  icon: any; // Lucide icon component
  color: string;
}

export interface GoalStatusInfo {
  id: GoalStatus;
  name: string;
  color: string;
}

// Form data interfaces
export interface GoalFormData {
  title: string;
  description: string;
  category: string;
  targetDate: string;
  milestones: string[];
}

export interface GoalFormErrors {
  title?: string;
  description?: string;
  category?: string;
  targetDate?: string;
  milestones?: string;
}

// Type definitions
export type GoalStatus = 'active' | 'completed' | 'paused' | 'overdue';
export type CategoryFilter = 'all' | string;
export type StatusFilter = 'all' | GoalStatus;

// Component props interfaces
export interface GoalsHeaderProps extends HTMLAttributes<HTMLElement> {
  onAddGoal: () => void;
  className?: string;
}

export interface GoalsFiltersProps extends HTMLAttributes<HTMLDivElement> {
  searchTerm: string;
  selectedCategory: CategoryFilter;
  selectedStatus: StatusFilter;
  onSearchChange: (term: string) => void;
  onCategoryChange: (category: CategoryFilter) => void;
  onStatusChange: (status: StatusFilter) => void;
  categories: GoalCategory[];
  statuses: GoalStatusInfo[];
  className?: string;
}

export interface GoalsListProps extends HTMLAttributes<HTMLDivElement> {
  goals: Goal[];
  selectedGoal: Goal | null;
  onSelectGoal: (goal: Goal) => void;
  onEditGoal: (goal: Goal) => void;
  onDeleteGoal: (id: number) => void;
  onAddGoal: () => void;
  className?: string;
}

export interface GoalCardProps extends HTMLAttributes<HTMLDivElement> {
  goal: Goal;
  isSelected: boolean;
  onSelect: (goal: Goal) => void;
  onEdit: (goal: Goal) => void;
  onDelete: (id: number) => void;
  category: GoalCategory;
  status: GoalStatusInfo;
  daysRemaining: number;
  className?: string;
}

export interface GoalDetailsProps extends HTMLAttributes<HTMLDivElement> {
  goal: Goal | null;
  onToggleMilestone: (goalId: number, milestoneId: number) => void;
  onAddNote: (goalId: number, content: string) => void;
  className?: string;
}

export interface GoalFormProps {
  isOpen: boolean;
  goal: Goal | null;
  formData: GoalFormData;
  formErrors: GoalFormErrors;
  categories: GoalCategory[];
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  onFormChange: (data: Partial<GoalFormData>) => void;
}

export interface EmptyStateProps extends HTMLAttributes<HTMLDivElement> {
  searchTerm: string;
  selectedCategory: CategoryFilter;
  selectedStatus: StatusFilter;
  onAddGoal: () => void;
  className?: string;
}

export interface GoalStatsProps extends HTMLAttributes<HTMLDivElement> {
  goals: Goal[];
  className?: string;
}

// Hook interfaces
export interface UseGoalsReturn {
  state: GoalsState;
  actions: GoalsActions;
}

export interface GoalsState {
  loading: boolean;
  goals: Goal[];
  filteredGoals: Goal[];
  selectedGoal: Goal | null;
  searchTerm: string;
  selectedCategory: CategoryFilter;
  selectedStatus: StatusFilter;
  isDialogOpen: boolean;
  editingGoal: Goal | null;
  formData: GoalFormData;
  formErrors: GoalFormErrors;
  categories: GoalCategory[];
  statuses: GoalStatusInfo[];
}

export interface GoalsActions {
  // Search and filter actions
  setSearchTerm: (term: string) => void;
  setSelectedCategory: (category: CategoryFilter) => void;
  setSelectedStatus: (status: StatusFilter) => void;
  
  // Goal selection actions
  setSelectedGoal: (goal: Goal | null) => void;
  
  // Dialog actions
  openDialog: () => void;
  closeDialog: () => void;
  
  // Goal actions
  addGoal: (goalData: GoalFormData) => void;
  editGoal: (goal: Goal) => void;
  updateGoal: (goalData: GoalFormData) => void;
  deleteGoal: (id: number) => void;
  
  // Milestone actions
  toggleMilestone: (goalId: number, milestoneId: number) => void;
  
  // Note actions
  addNote: (goalId: number, content: string) => void;
  
  // Form actions
  submitForm: (e: React.FormEvent) => void;
  updateFormData: (data: Partial<GoalFormData>) => void;
  resetForm: () => void;
  validateForm: () => boolean;
  
  // Utility actions
  getGoalStatus: (goal: Goal) => GoalStatusInfo;
  getDaysRemaining: (targetDate: string) => number;
  getCategoryInfo: (categoryId: string) => GoalCategory | undefined;
}

// Utility types for goal creation and updates
export type CreateGoalData = Omit<Goal, 'id' | 'createdAt' | 'progress' | 'status' | 'milestones' | 'notes'> & {
  milestones: string[];
};

export type UpdateGoalData = Partial<Goal> & { id: number };

// Filter and sort types
export type GoalSortBy = 'title' | 'category' | 'progress' | 'targetDate' | 'created';
export type SortOrder = 'asc' | 'desc';

// Configuration types
export interface GoalsConfig {
  defaultCategory: CategoryFilter;
  defaultStatus: StatusFilter;
  maxMilestones: number;
  dateFormat: string;
}