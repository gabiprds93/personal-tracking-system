import { Tracking, TrackingItem, ProgressStats } from '@/types';

/**
 * Calcula las estadísticas de progreso para un seguimiento
 */
export const calculateProgressStats = (tracking: Tracking): ProgressStats => {
  const totalItems = tracking.items.length;
  const completedItems = tracking.items.filter(item => item.status === 'completed').length;
  const completionRate = totalItems > 0 ? (completedItems / totalItems) * 100 : 0;
  
  // Calcular racha actual
  const currentStreak = calculateCurrentStreak(tracking.items);
  
  // Calcular mejor racha histórica
  const bestStreak = Math.max(...tracking.items.map(item => item.bestStreak), 0);
  
  // Calcular progreso semanal (últimas 7 semanas)
  const weeklyProgress = calculateWeeklyProgress(tracking.items);
  
  // Calcular progreso mensual (últimos 12 meses)
  const monthlyProgress = calculateMonthlyProgress(tracking.items);
  
  return {
    totalItems,
    completedItems,
    completionRate,
    currentStreak,
    bestStreak,
    weeklyProgress,
    monthlyProgress
  };
};

/**
 * Calcula la racha actual de completado
 */
export const calculateCurrentStreak = (items: TrackingItem[]): number => {
  if (items.length === 0) return 0;
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  let streak = 0;
  let currentDate = new Date(today);
  
  // Buscar hacia atrás desde hoy
  for (let i = 0; i < 365; i++) { // Máximo 1 año hacia atrás
    const dayItems = items.filter(item => {
      const itemDate = new Date(item.createdAt);
      itemDate.setHours(0, 0, 0, 0);
      return itemDate.getTime() === currentDate.getTime();
    });
    
    const hasCompleted = dayItems.some(item => item.status === 'completed');
    
    if (hasCompleted) {
      streak++;
    } else {
      break; // Romper la racha si no hay completado
    }
    
    currentDate.setDate(currentDate.getDate() - 1);
  }
  
  return streak;
};

/**
 * Calcula el progreso semanal de las últimas 7 semanas
 */
export const calculateWeeklyProgress = (items: TrackingItem[]): number[] => {
  const weeklyProgress: number[] = [];
  const today = new Date();
  
  for (let week = 0; week < 7; week++) {
    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() - (today.getDay() + 7 * week));
    weekStart.setHours(0, 0, 0, 0);
    
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);
    weekEnd.setHours(23, 59, 59, 999);
    
    const weekItems = items.filter(item => {
      const itemDate = new Date(item.createdAt);
      return itemDate >= weekStart && itemDate <= weekEnd;
    });
    
    const completedItems = weekItems.filter(item => item.status === 'completed').length;
    const totalItems = weekItems.length;
    const progress = totalItems > 0 ? (completedItems / totalItems) * 100 : 0;
    
    weeklyProgress.unshift(progress); // Agregar al inicio para orden cronológico
  }
  
  return weeklyProgress;
};

/**
 * Calcula el progreso mensual de los últimos 12 meses
 */
export const calculateMonthlyProgress = (items: TrackingItem[]): number[] => {
  const monthlyProgress: number[] = [];
  const today = new Date();
  
  for (let month = 0; month < 12; month++) {
    const monthStart = new Date(today.getFullYear(), today.getMonth() - month, 1);
    const monthEnd = new Date(today.getFullYear(), today.getMonth() - month + 1, 0, 23, 59, 59, 999);
    
    const monthItems = items.filter(item => {
      const itemDate = new Date(item.createdAt);
      return itemDate >= monthStart && itemDate <= monthEnd;
    });
    
    const completedItems = monthItems.filter(item => item.status === 'completed').length;
    const totalItems = monthItems.length;
    const progress = totalItems > 0 ? (completedItems / totalItems) * 100 : 0;
    
    monthlyProgress.unshift(progress); // Agregar al inicio para orden cronológico
  }
  
  return monthlyProgress;
};

/**
 * Calcula estadísticas generales de todos los seguimientos
 */
export const calculateOverallStats = (trackings: Tracking[]) => {
  const activeTrackings = trackings.filter(t => t.isActive);
  const totalTrackings = activeTrackings.length;
  
  let totalItems = 0;
  let totalCompleted = 0;
  let overallCompletionRate = 0;
  
  activeTrackings.forEach(tracking => {
    const stats = calculateProgressStats(tracking);
    totalItems += stats.totalItems;
    totalCompleted += stats.completedItems;
  });
  
  if (totalItems > 0) {
    overallCompletionRate = (totalCompleted / totalItems) * 100;
  }
  
  return {
    totalTrackings,
    totalItems,
    totalCompleted,
    overallCompletionRate
  };
};

/**
 * Obtiene los items pendientes para hoy
 */
export const getTodayPendingItems = (trackings: Tracking[]): TrackingItem[] => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const pendingItems: TrackingItem[] = [];
  
  trackings.forEach(tracking => {
    if (!tracking.isActive) return;
    
    tracking.items.forEach(item => {
      const itemDate = new Date(item.createdAt);
      itemDate.setHours(0, 0, 0, 0);
      
      if (itemDate.getTime() === today.getTime() && item.status === 'pending') {
        pendingItems.push(item);
      }
    });
  });
  
  return pendingItems;
};

/**
 * Obtiene los items completados hoy
 */
export const getTodayCompletedItems = (trackings: Tracking[]): TrackingItem[] => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const completedItems: TrackingItem[] = [];
  
  trackings.forEach(tracking => {
    if (!tracking.isActive) return;
    
    tracking.items.forEach(item => {
      const itemDate = new Date(item.createdAt);
      itemDate.setHours(0, 0, 0, 0);
      
      if (itemDate.getTime() === today.getTime() && item.status === 'completed') {
        completedItems.push(item);
      }
    });
  });
  
  return completedItems;
};
