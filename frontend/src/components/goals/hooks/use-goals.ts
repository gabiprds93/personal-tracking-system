import { useState, useEffect, useCallback } from 'react';
import { Target, TrendingUp, BookOpen, Award } from 'lucide-react';
import { differenceInDays, parseISO } from 'date-fns';
import { goalsApi } from '@/lib/api';
import { 
  UseGoalsReturn, 
  GoalsState, 
  GoalsActions, 
  Goal,
  GoalFormData,
  GoalFormErrors,
  GoalCategory,
  GoalStatusInfo,
  CategoryFilter,
  StatusFilter
} from '../goals.types';

/**
 * Custom hook for managing goals state and actions
 * 
 * @returns Object containing state and actions for goals management
 */
export const useGoals = (): UseGoalsReturn => {
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('all');
  const [selectedStatus, setSelectedStatus] = useState<StatusFilter>('all');
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [editingGoal, setEditingGoal] = useState<Goal | null>(null);
  const [formData, setFormData] = useState<GoalFormData>({
    title: '',
    description: '',
    category: '',
    targetDate: '',
    milestones: ['', '', '', '']
  });
  const [formErrors, setFormErrors] = useState<GoalFormErrors>({});
  const [goals, setGoals] = useState<Goal[]>([]);

  // Load goals from API
  const loadGoals = useCallback(async () => {
    try {
      setLoading(true);
      const response = await goalsApi.getAll();
      
      if (response.success && response.data && Array.isArray(response.data)) {
        // Transform backend data to frontend format
        const transformedGoals = response.data.map((goal: any) => ({
          ...goal,
          id: goal.id,
          targetDate: goal.targetDate.split('T')[0], // Convert to YYYY-MM-DD format
          createdAt: goal.createdAt.split('T')[0],
          milestones: goal.milestones || [],
          notes: goal.notes || []
        }));
        setGoals(transformedGoals);
      }
    } catch (error) {
      console.error('Error loading goals:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadGoals();
  }, [loadGoals]);

  const categories: GoalCategory[] = [
    { id: "salud", name: "Salud", icon: Target, color: "text-red-500 bg-red-50 border-red-200" },
    { id: "carrera", name: "Carrera", icon: TrendingUp, color: "text-blue-500 bg-blue-50 border-blue-200" },
    { id: "aprendizaje", name: "Aprendizaje", icon: BookOpen, color: "text-purple-500 bg-purple-50 border-purple-200" },
    { id: "personal", name: "Personal", icon: Award, color: "text-green-500 bg-green-50 border-green-200" },
    { id: "financiero", name: "Financiero", icon: TrendingUp, color: "text-yellow-500 bg-yellow-50 border-yellow-200" },
  ];

  const statuses: GoalStatusInfo[] = [
    { id: "active", name: "Activa", color: "bg-blue-100 text-blue-800" },
    { id: "completed", name: "Completada", color: "bg-green-100 text-green-800" },
    { id: "paused", name: "Pausada", color: "bg-yellow-100 text-yellow-800" },
    { id: "overdue", name: "Vencida", color: "bg-red-100 text-red-800" },
  ];

  const getGoalStatus = (goal: Goal): GoalStatusInfo => {
    if (goal.status === "completed") return statuses.find(s => s.id === "completed")!;
    if (goal.status === "paused") return statuses.find(s => s.id === "paused")!;

    const today = new Date();
    const targetDate = parseISO(goal.targetDate);
    const isOverdue = today > targetDate && goal.progress < 100;

    return isOverdue ? statuses.find(s => s.id === "overdue")! : statuses.find(s => s.id === "active")!;
  };

  const getDaysRemaining = (targetDate: string): number => {
    const today = new Date();
    const target = parseISO(targetDate);
    return differenceInDays(target, today);
  };

  const getCategoryInfo = (categoryId: string): GoalCategory | undefined => {
    return categories.find(c => c.id === categoryId);
  };

  const filteredGoals = goals.filter((goal) => {
    const matchesSearch =
      goal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      goal.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || goal.category === selectedCategory;
    const goalStatus = getGoalStatus(goal);
    const matchesStatus = selectedStatus === "all" || goalStatus.id === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const state: GoalsState = {
    loading,
    goals,
    filteredGoals,
    selectedGoal,
    searchTerm,
    selectedCategory,
    selectedStatus,
    isDialogOpen,
    editingGoal,
    formData,
    formErrors,
    categories,
    statuses
  };

  const actions: GoalsActions = {
    // Search and filter actions
    setSearchTerm,
    setSelectedCategory,
    setSelectedStatus,
    
    // Goal selection actions
    setSelectedGoal,
    
    // Dialog actions
    openDialog: () => {
      setEditingGoal(null);
      setFormData({
        title: '',
        description: '',
        category: '',
        targetDate: '',
        milestones: ['', '', '', '']
      });
      setFormErrors({});
      setIsDialogOpen(true);
    },
    closeDialog: () => {
      setIsDialogOpen(false);
      setEditingGoal(null);
      setFormErrors({});
    },
    
    // Goal actions
    addGoal: async (goalData: GoalFormData) => {
      try {
        const goalPayload = {
          title: goalData.title,
          description: goalData.description,
          category: goalData.category,
          targetDate: new Date(goalData.targetDate).toISOString(),
          milestones: goalData.milestones.filter(m => m.trim())
        };
        
        const response = await goalsApi.create(goalPayload);
        if (response.success) {
          loadGoals(); // Reload goals after creation
        }
      } catch (error) {
        console.error('Error creating goal:', error);
      }
    },
    
    editGoal: (goal: Goal) => {
      setFormData({
        title: goal.title,
        description: goal.description,
        category: goal.category,
        targetDate: goal.targetDate,
        milestones: [
          ...goal.milestones.map((m) => m.title),
          ...Array(Math.max(0, 4 - goal.milestones.length)).fill(""),
        ].slice(0, 4),
      });
      setEditingGoal(goal);
      setFormErrors({});
      setIsDialogOpen(true);
    },
    
    updateGoal: async (goalData: GoalFormData) => {
      if (!editingGoal) return;
      
      try {
        const goalPayload = {
          title: goalData.title,
          description: goalData.description,
          category: goalData.category,
          targetDate: new Date(goalData.targetDate).toISOString(),
        };
        
        const response = await goalsApi.update(editingGoal.id.toString(), goalPayload);
        if (response.success) {
          loadGoals(); // Reload goals after update
        }
      } catch (error) {
        console.error('Error updating goal:', error);
      }
    },
    
    deleteGoal: async (id: number) => {
      try {
        const response = await goalsApi.delete(id.toString());
        if (response.success) {
          loadGoals(); // Reload goals after deletion
          if (selectedGoal?.id === id) {
            setSelectedGoal(null);
          }
        }
      } catch (error) {
        console.error('Error deleting goal:', error);
      }
    },
    
    // Milestone actions
    toggleMilestone: async (goalId: number, milestoneId: number) => {
      // Optimistic update - update UI immediately
      setGoals(prevGoals => 
        prevGoals.map(goal => 
          goal.id === goalId 
            ? {
                ...goal,
                milestones: goal.milestones.map(milestone =>
                  milestone.id === milestoneId
                    ? { ...milestone, completed: !milestone.completed }
                    : milestone
                )
              }
            : goal
        )
      );

      // Update selectedGoal if it's the current goal
      if (selectedGoal?.id === goalId) {
        setSelectedGoal(prevGoal => {
          if (!prevGoal) return null;
          return {
            ...prevGoal,
            milestones: prevGoal.milestones.map(milestone =>
              milestone.id === milestoneId
                ? { ...milestone, completed: !milestone.completed }
                : milestone
            )
          };
        });
      }

      try {
        const response = await goalsApi.toggleMilestone(goalId.toString(), milestoneId.toString());
        if (!response.success) {
          // Revert optimistic update on failure
          loadGoals();
        }
      } catch (error) {
        console.error('Error toggling milestone:', error);
        // Revert optimistic update on error
        loadGoals();
      }
    },
    
    // Note actions
    addNote: async (goalId: number, content: string) => {
      if (!content.trim()) return;

      try {
        const response = await goalsApi.addNote(goalId.toString(), { content });
        if (response.success) {
          loadGoals(); // Reload goals after adding note
        }
      } catch (error) {
        console.error('Error adding note:', error);
      }
    },
    
    // Form actions
    submitForm: (e: React.FormEvent) => {
      e.preventDefault();
      if (actions.validateForm()) {
        if (editingGoal) {
          actions.updateGoal(formData);
        } else {
          actions.addGoal(formData);
        }
        actions.closeDialog();
      }
    },
    
    updateFormData: (data: Partial<GoalFormData>) => {
      setFormData(prev => ({ ...prev, ...data }));
    },
    
    resetForm: () => {
      setFormData({
        title: '',
        description: '',
        category: '',
        targetDate: '',
        milestones: ['', '', '', '']
      });
      setFormErrors({});
      setEditingGoal(null);
    },
    
    validateForm: (): boolean => {
      const errors: GoalFormErrors = {};
      
      if (!formData.title.trim()) {
        errors.title = 'El título es requerido';
      }
      
      if (!formData.category) {
        errors.category = 'La categoría es requerida';
      }
      
      if (!formData.targetDate) {
        errors.targetDate = 'La fecha límite es requerida';
      }
      
      setFormErrors(errors);
      return Object.keys(errors).length === 0;
    },
    
    // Utility actions
    getGoalStatus,
    getDaysRemaining,
    getCategoryInfo
  };

  return { state, actions };
};