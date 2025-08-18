import { useState, useEffect, useCallback } from 'react';
import { DashboardState, DashboardActions, UseDashboardReturn } from '../dashboard.types';

const motivationalMessages = [
  "El progreso, no la perfección",
  "Cada día cuenta",
  "Pequeños pasos, grandes cambios",
  "Tu futuro yo te lo agradecerá",
  "La constancia vence al talento",
  "Hoy es el día perfecto para empezar",
];

export const useDashboard = (): UseDashboardReturn => {
  const [state, setState] = useState<DashboardState>({
    mounted: false,
    currentMessageIndex: 0,
    celebrationVisible: false,
    userStats: {
      totalPoints: 2847,
      level: 12,
      currentStreak: 7,
      longestStreak: 23,
      completionRate: 87,
      todayCompleted: 4,
      todayTotal: 6,
    },
    todayHabits: [
      { id: 1, name: "Ejercicio matutino", completed: true, category: "Salud", points: 15 },
      { id: 2, name: "Leer 30 minutos", completed: true, category: "Aprendizaje", points: 10 },
      { id: 3, name: "Meditar", completed: true, category: "Bienestar", points: 12 },
      { id: 4, name: "Beber 8 vasos de agua", completed: true, category: "Salud", points: 8 },
      { id: 5, name: "Escribir en diario", completed: false, category: "Bienestar", points: 10 },
      { id: 6, name: "Estudiar programación", completed: false, category: "Aprendizaje", points: 20 },
    ],
    recentBadges: [
      { name: "Racha de Fuego", description: "7 días consecutivos", icon: "🔥" },
      { name: "Multitarea", description: "5+ hábitos en un día", icon: "⚡" },
      { name: "Madrugador", description: "Ejercicio antes de las 7am", icon: "🌅" },
    ],
  });

  useEffect(() => {
    setState(prev => ({ ...prev, mounted: true }));
    
    const interval = setInterval(() => {
      setState(prev => ({
        ...prev,
        currentMessageIndex: (prev.currentMessageIndex + 1) % motivationalMessages.length
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const actions: DashboardActions = {
    toggleHabit: useCallback((habitId: number) => {
      setState(prev => ({
        ...prev,
        todayHabits: prev.todayHabits.map(habit =>
          habit.id === habitId ? { ...habit, completed: !habit.completed } : habit
        ),
        celebrationVisible: true,
      }));

      // Hide celebration after 2 seconds
      setTimeout(() => {
        setState(prev => ({ ...prev, celebrationVisible: false }));
      }, 2000);
    }, []),

    showCelebration: useCallback(() => {
      setState(prev => ({ ...prev, celebrationVisible: true }));
      setTimeout(() => {
        setState(prev => ({ ...prev, celebrationVisible: false }));
      }, 2000);
    }, []),
  };

  return { state, actions };
};