import { useState, useEffect, useCallback } from 'react';
import { DashboardState, DashboardActions, UseDashboardReturn, UserStats, Habit, Badge } from '../dashboard.types';
import { dashboardApi } from '@/lib/api';
import { useStatsRefresh } from '@/context/stats-context';

const motivationalMessages = [
  "El progreso, no la perfección",
  "Cada día cuenta",
  "Pequeños pasos, grandes cambios",
  "Tu futuro yo te lo agradecerá",
  "La constancia vence al talento",
  "Hoy es el día perfecto para empezar",
];

export const useDashboard = (): UseDashboardReturn => {
  // Stats refresh context (optional)
  let triggerRefresh: (() => void) | undefined;
  try {
    const context = useStatsRefresh();
    triggerRefresh = context.triggerRefresh;
  } catch (error) {
    // Hook is being used outside of StatsProvider context
    // This is fine, it will just not trigger global refresh
  }

  const [state, setState] = useState<DashboardState>({
    mounted: false,
    currentMessageIndex: 0,
    celebrationVisible: false,
    userStats: {
      totalPoints: 0,
      level: 1,
      currentStreak: 0,
      longestStreak: 0,
      completionRate: 0,
      todayCompleted: 0,
      todayTotal: 0,
    },
    todayHabits: [],
    recentBadges: [],
  });
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load dashboard data
  const loadDashboardData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Load dashboard data and recent badges in parallel
      const [dashboardData, recentBadgesResponse] = await Promise.all([
        dashboardApi.getDashboardData(),
        dashboardApi.getRecentBadges()
      ]);
      
      const { userStats, todayHabits } = dashboardData;
      const recentBadges = recentBadgesResponse.data || [];
      
      console.log('📊 Dashboard data loaded:', {
        userStats: !!userStats,
        todayHabits: Array.isArray(todayHabits) ? todayHabits.length : 0,
        recentBadges: Array.isArray(recentBadges) ? recentBadges.length : 0,
        badgesData: recentBadges
      });
      
      setState(prev => ({
        ...prev,
        userStats: (userStats as UserStats) || prev.userStats,
        todayHabits: (todayHabits as Habit[]) || prev.todayHabits,
        recentBadges: (recentBadges as Badge[]) || prev.recentBadges,
        mounted: true,
      }));
    } catch (error) {
      console.error('Error loading dashboard data:', error);
      setError('Error loading dashboard data');
      // Keep mounted true even on error to show the UI
      setState(prev => ({ ...prev, mounted: true }));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadDashboardData();
    
    // Set up motivational message rotation
    const interval = setInterval(() => {
      setState(prev => ({
        ...prev,
        currentMessageIndex: (prev.currentMessageIndex + 1) % motivationalMessages.length
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, [loadDashboardData]);

  const actions: DashboardActions = {
    toggleHabit: useCallback(async (habitId: string) => {
      try {
        // Optimistic update
        setState(prev => ({
          ...prev,
          todayHabits: prev.todayHabits.map(habit =>
            habit.id === habitId ? { ...habit, completed: !habit.completed } : habit
          ),
          celebrationVisible: true,
        }));

        // Make API call to toggle habit
        await dashboardApi.toggleHabitCompletion(habitId);
        
        // Refresh data to get updated stats
        await loadDashboardData();

        // Trigger global stats refresh for sidebar and other components
        if (triggerRefresh) {
          triggerRefresh();
        }

        // Hide celebration after 2 seconds
        setTimeout(() => {
          setState(prev => ({ ...prev, celebrationVisible: false }));
        }, 2000);
      } catch (error) {
        console.error('Error toggling habit:', error);
        // Revert optimistic update on error
        setState(prev => ({
          ...prev,
          todayHabits: prev.todayHabits.map(habit =>
            habit.id === habitId ? { ...habit, completed: !habit.completed } : habit
          ),
          celebrationVisible: false,
        }));
        setError('Error updating habit');
      }
    }, [loadDashboardData]),

    showCelebration: useCallback(() => {
      setState(prev => ({ ...prev, celebrationVisible: true }));
      setTimeout(() => {
        setState(prev => ({ ...prev, celebrationVisible: false }));
      }, 2000);
    }, []),
    
    refreshData: useCallback(() => {
      loadDashboardData();
    }, [loadDashboardData]),
  };

  return { state, actions, loading, error };
};