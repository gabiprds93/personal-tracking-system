import { useState } from 'react';
import { Target, TrendingUp, BookOpen, Award } from 'lucide-react';
import { differenceInDays, parseISO } from 'date-fns';
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
  StatusFilter,
  GoalStatus
} from '../goals.types';

/**
 * Custom hook for managing goals state and actions
 * 
 * @returns Object containing state and actions for goals management
 */
export const useGoals = (): UseGoalsReturn => {
  const [loading, setLoading] = useState<boolean>(false);
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

  // Mock data - replace with actual data fetching
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: 1,
      title: "Aprender React Avanzado",
      description: "Dominar conceptos avanzados de React incluyendo hooks personalizados, context API y optimización de rendimiento",
      category: "aprendizaje",
      targetDate: "2024-06-30",
      progress: 65,
      status: "active",
      createdAt: "2024-01-15",
      milestones: [
        { id: 1, title: "Completar curso de hooks", completed: true, completedAt: "2024-02-15" },
        { id: 2, title: "Construir proyecto con Context API", completed: true, completedAt: "2024-03-10" },
        { id: 3, title: "Optimizar aplicación existente", completed: false, completedAt: null },
        { id: 4, title: "Crear tutorial para otros", completed: false, completedAt: null },
      ],
      notes: [
        { id: 1, content: "Excelente progreso con los hooks personalizados", date: "2024-02-20" },
        { id: 2, content: "Context API más complejo de lo esperado, pero muy útil", date: "2024-03-12" },
      ],
    },
    {
      id: 2,
      title: "Correr 10K en menos de 50 minutos",
      description: "Mejorar mi tiempo de carrera de 10K desde 55 minutos actuales hasta menos de 50 minutos",
      category: "salud",
      targetDate: "2024-05-15",
      progress: 40,
      status: "active",
      createdAt: "2024-02-01",
      milestones: [
        { id: 1, title: "Correr 5K sin parar", completed: true, completedAt: "2024-02-20" },
        { id: 2, title: "Completar primer 10K", completed: true, completedAt: "2024-03-05" },
        { id: 3, title: "Reducir tiempo a 52 minutos", completed: false, completedAt: null },
        { id: 4, title: "Alcanzar meta de 50 minutos", completed: false, completedAt: null },
      ],
      notes: [
        { id: 1, content: "Primera semana difícil, pero ya veo mejoras", date: "2024-02-08" },
        { id: 2, content: "¡Logré mi primer 10K! Tiempo: 54 minutos", date: "2024-03-05" },
      ],
    },
    {
      id: 3,
      title: "Ahorrar $10,000 para emergencias",
      description: "Crear un fondo de emergencia sólido ahorrando $500 mensuales durante 20 meses",
      category: "financiero",
      targetDate: "2025-01-31",
      progress: 25,
      status: "active",
      createdAt: "2024-01-01",
      milestones: [
        { id: 1, title: "Ahorrar primeros $1,000", completed: true, completedAt: "2024-02-28" },
        { id: 2, title: "Alcanzar $2,500", completed: true, completedAt: "2024-03-31" },
        { id: 3, title: "Llegar a $5,000", completed: false, completedAt: null },
        { id: 4, title: "Completar $10,000", completed: false, completedAt: null },
      ],
      notes: [{ id: 1, content: "Automaticé las transferencias, mucho más fácil", date: "2024-01-15" }],
    },
  ]);

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
    addGoal: (goalData: GoalFormData) => {
      const newGoal: Goal = {
        ...goalData,
        id: Date.now(),
        progress: 0,
        status: "active",
        createdAt: new Date().toISOString().split("T")[0],
        milestones: goalData.milestones
          .filter((m) => m.trim())
          .map((milestone, index) => ({
            id: index + 1,
            title: milestone,
            completed: false,
            completedAt: null,
          })),
        notes: [],
      };
      setGoals([...goals, newGoal]);
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
    
    updateGoal: (goalData: GoalFormData) => {
      if (!editingGoal) return;
      
      const updatedGoal: Goal = {
        ...editingGoal,
        ...goalData,
        milestones: goalData.milestones
          .filter((m) => m.trim())
          .map((milestone, index) => ({
            id: index + 1,
            title: milestone,
            completed: false,
            completedAt: null,
          }))
      };
      
      setGoals(goals.map((g) => (g.id === editingGoal.id ? updatedGoal : g)));
    },
    
    deleteGoal: (id: number) => {
      setGoals(goals.filter((g) => g.id !== id));
      if (selectedGoal?.id === id) {
        setSelectedGoal(null);
      }
    },
    
    // Milestone actions
    toggleMilestone: (goalId: number, milestoneId: number) => {
      setGoals(
        goals.map((goal) => {
          if (goal.id === goalId) {
            const updatedMilestones = goal.milestones.map((milestone) => {
              if (milestone.id === milestoneId) {
                return {
                  ...milestone,
                  completed: !milestone.completed,
                  completedAt: !milestone.completed ? new Date().toISOString().split("T")[0] : null,
                };
              }
              return milestone;
            });

            const completedCount = updatedMilestones.filter((m) => m.completed).length;
            const newProgress = Math.round((completedCount / updatedMilestones.length) * 100);

            return {
              ...goal,
              milestones: updatedMilestones,
              progress: newProgress,
              status: newProgress === 100 ? "completed" : goal.status,
            };
          }
          return goal;
        })
      );
    },
    
    // Note actions
    addNote: (goalId: number, content: string) => {
      if (!content.trim()) return;

      setGoals(
        goals.map((goal) => {
          if (goal.id === goalId) {
            return {
              ...goal,
              notes: [
                ...goal.notes,
                {
                  id: Date.now(),
                  content,
                  date: new Date().toISOString().split("T")[0],
                },
              ],
            };
          }
          return goal;
        })
      );
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