import { useState } from 'react';
import { Heart, Dumbbell, Brain, Book, Coffee, Droplets, Moon, Target, Briefcase } from 'lucide-react';
import { 
  UseHabitsReturn, 
  HabitsState, 
  HabitsActions, 
  Habit,
  HabitFormData,
  HabitFormErrors,
  HabitCategory,
  HabitIcon,
  Frequency,
  Difficulty,
  WeekDay
} from '../habits.types';

/**
 * Custom hook for managing habits state and actions
 * 
 * @returns Object containing state and actions for habits management
 */
export const useHabits = (): UseHabitsReturn => {
  const [loading, setLoading] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [editingHabit, setEditingHabit] = useState<Habit | null>(null);
  const [formData, setFormData] = useState<HabitFormData>({
    name: '',
    category: '',
    icon: '',
    frequency: 'daily',
    difficulty: 1,
    targetDays: []
  });
  const [formErrors, setFormErrors] = useState<HabitFormErrors>({});

  // Mock data - replace with actual data fetching
  const [habits, setHabits] = useState<Habit[]>([
    {
      id: 1,
      name: "Ejercicio matutino",
      category: "ejercicio",
      icon: "dumbbell",
      frequency: "daily",
      difficulty: 2,
      targetDays: [],
      createdAt: new Date().toISOString(),
      streak: 7,
      completedToday: true,
    },
    {
      id: 2,
      name: "Leer 30 minutos",
      category: "aprendizaje",
      icon: "book",
      frequency: "daily",
      difficulty: 1,
      targetDays: [],
      createdAt: new Date().toISOString(),
      streak: 12,
      completedToday: true,
    },
    {
      id: 3,
      name: "Meditar",
      category: "bienestar",
      icon: "moon",
      frequency: "daily",
      difficulty: 2,
      targetDays: [],
      createdAt: new Date().toISOString(),
      streak: 5,
      completedToday: false,
    },
  ]);

  const categories: HabitCategory[] = [
    { id: "salud", name: "Salud", icon: Heart, color: "text-red-500 bg-red-50 border-red-200" },
    { id: "ejercicio", name: "Ejercicio", icon: Dumbbell, color: "text-orange-500 bg-orange-50 border-orange-200" },
    { id: "bienestar", name: "Bienestar", icon: Moon, color: "text-purple-500 bg-purple-50 border-purple-200" },
    { id: "aprendizaje", name: "Aprendizaje", icon: Book, color: "text-blue-500 bg-blue-50 border-blue-200" },
    { id: "productividad", name: "Productividad", icon: Briefcase, color: "text-green-500 bg-green-50 border-green-200" },
  ];

  const icons: HabitIcon[] = [
    { id: "heart", icon: Heart, name: "Corazón" },
    { id: "dumbbell", icon: Dumbbell, name: "Ejercicio" },
    { id: "brain", icon: Brain, name: "Cerebro" },
    { id: "book", icon: Book, name: "Libro" },
    { id: "coffee", icon: Coffee, name: "Café" },
    { id: "droplets", icon: Droplets, name: "Agua" },
    { id: "moon", icon: Moon, name: "Luna" },
    { id: "target", icon: Target, name: "Objetivo" },
  ];

  const frequencies: Frequency[] = [
    { id: "daily", name: "Diario", description: "Todos los días" },
    { id: "weekly", name: "Semanal", description: "Una vez por semana" },
    { id: "custom", name: "Personalizado", description: "Días específicos" },
  ];

  const difficulties: Difficulty[] = [
    { id: 1, name: "Fácil", points: 5, color: "text-green-600" },
    { id: 2, name: "Medio", points: 10, color: "text-yellow-600" },
    { id: 3, name: "Difícil", points: 15, color: "text-red-600" },
  ];

  const weekDays: WeekDay[] = [
    { id: 0, name: "Dom", fullName: "Domingo" },
    { id: 1, name: "Lun", fullName: "Lunes" },
    { id: 2, name: "Mar", fullName: "Martes" },
    { id: 3, name: "Mié", fullName: "Miércoles" },
    { id: 4, name: "Jue", fullName: "Jueves" },
    { id: 5, name: "Vie", fullName: "Viernes" },
    { id: 6, name: "Sáb", fullName: "Sábado" },
  ];

  const filteredHabits = habits.filter((habit) => {
    const matchesSearch = habit.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || habit.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const state: HabitsState = {
    loading,
    habits,
    filteredHabits,
    searchTerm,
    selectedCategory,
    isDialogOpen,
    editingHabit,
    formData,
    formErrors,
    categories,
    icons,
    frequencies,
    difficulties,
    weekDays
  };

  const actions: HabitsActions = {
    // Search and filter actions
    setSearchTerm,
    setSelectedCategory,
    
    // Dialog actions
    openDialog: () => {
      setEditingHabit(null);
      setFormData({
        name: '',
        category: '',
        icon: '',
        frequency: 'daily',
        difficulty: 1,
        targetDays: []
      });
      setFormErrors({});
      setIsDialogOpen(true);
    },
    closeDialog: () => {
      setIsDialogOpen(false);
      setEditingHabit(null);
      setFormErrors({});
    },
    
    // Habit actions
    addHabit: (habitData: HabitFormData) => {
      const newHabit: Habit = {
        ...habitData,
        id: Date.now(),
        createdAt: new Date().toISOString(),
        streak: 0,
        completedToday: false,
      };
      setHabits([...habits, newHabit]);
    },
    
    editHabit: (habit: Habit) => {
      setFormData({
        name: habit.name,
        category: habit.category,
        icon: habit.icon,
        frequency: habit.frequency,
        difficulty: habit.difficulty,
        targetDays: habit.targetDays,
      });
      setEditingHabit(habit);
      setFormErrors({});
      setIsDialogOpen(true);
    },
    
    updateHabit: (habitData: HabitFormData) => {
      if (!editingHabit) return;
      
      const updatedHabit: Habit = {
        ...editingHabit,
        ...habitData,
      };
      
      setHabits(habits.map((h) => (h.id === editingHabit.id ? updatedHabit : h)));
    },
    
    deleteHabit: (id: number) => {
      setHabits(habits.filter((h) => h.id !== id));
    },
    
    toggleCompletion: (id: number) => {
      setHabits(
        habits.map((h) =>
          h.id === id
            ? {
                ...h,
                completedToday: !h.completedToday,
                streak: !h.completedToday ? h.streak + 1 : Math.max(0, h.streak - 1),
              }
            : h,
        ),
      );
    },
    
    // Form actions
    submitForm: (e: React.FormEvent) => {
      e.preventDefault();
      if (actions.validateForm()) {
        if (editingHabit) {
          actions.updateHabit(formData);
        } else {
          actions.addHabit(formData);
        }
        actions.closeDialog();
      }
    },
    
    updateFormData: (data: Partial<HabitFormData>) => {
      setFormData(prev => ({ ...prev, ...data }));
    },
    
    resetForm: () => {
      setFormData({
        name: '',
        category: '',
        icon: '',
        frequency: 'daily',
        difficulty: 1,
        targetDays: []
      });
      setFormErrors({});
      setEditingHabit(null);
    },
    
    validateForm: (): boolean => {
      const errors: HabitFormErrors = {};
      
      if (!formData.name.trim()) {
        errors.name = 'El nombre es requerido';
      }
      
      if (!formData.category) {
        errors.category = 'La categoría es requerida';
      }
      
      if (!formData.icon) {
        errors.icon = 'El ícono es requerido';
      }
      
      if (!formData.frequency) {
        errors.frequency = 'La frecuencia es requerida';
      }
      
      if (formData.frequency === 'custom' && formData.targetDays.length === 0) {
        errors.targetDays = 'Selecciona al menos un día';
      }
      
      setFormErrors(errors);
      return Object.keys(errors).length === 0;
    }
  };

  return { state, actions };
};