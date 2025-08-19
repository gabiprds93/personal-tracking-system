import { useState, useEffect, useCallback, useMemo } from 'react';
import { analyticsApi } from '@/lib/api';
import { useStatsRefresh } from '@/context/stats-context';
import { 
  UseProfileReturn, 
  ProfileState, 
  ProfileActions, 
  Level, 
  UserStats,
  WeeklyChallengeData
} from '../profile.types';

// Level system configuration
const levels: Level[] = [
  { level: 1, name: "Principiante", minPoints: 0, maxPoints: 99, color: "text-gray-600", bgColor: "bg-gray-100" },
  { level: 2, name: "Novato", minPoints: 100, maxPoints: 299, color: "text-green-600", bgColor: "bg-green-100" },
  { level: 3, name: "Aprendiz", minPoints: 300, maxPoints: 599, color: "text-blue-600", bgColor: "bg-blue-100" },
  { level: 4, name: "Competente", minPoints: 600, maxPoints: 999, color: "text-purple-600", bgColor: "bg-purple-100" },
  { level: 5, name: "Experto", minPoints: 1000, maxPoints: 1999, color: "text-orange-600", bgColor: "bg-orange-100" },
  { level: 6, name: "Maestro", minPoints: 2000, maxPoints: 3999, color: "text-red-600", bgColor: "bg-red-100" },
  { level: 7, name: "Leyenda", minPoints: 4000, maxPoints: 9999, color: "text-yellow-600", bgColor: "bg-yellow-100" },
  { level: 8, name: "Mítico", minPoints: 10000, maxPoints: 99999, color: "text-pink-600", bgColor: "bg-pink-100" },
];


// Weekly challenge
const weeklyChallenge: WeeklyChallengeData = {
  id: "week_12_2024",
  title: "Semana de Bienestar",
  description: "Enfócate en tu bienestar físico y mental esta semana",
  startDate: "2024-03-18",
  endDate: "2024-03-24",
  progress: 60,
  tasks: [
    { id: 1, title: "Medita 5 días", completed: 3, target: 5, points: 50 },
    { id: 2, title: "Ejercicio 4 días", completed: 2, target: 4, points: 60 },
    { id: 3, title: "8 horas de sueño 6 días", completed: 4, target: 6, points: 40 },
    { id: 4, title: "Leer 30 min diarios", completed: 5, target: 7, points: 35 },
  ],
  reward: {
    points: 200,
    badge: "Guerrero del Bienestar",
    icon: "🧘‍♀️",
  },
};

export const useProfile = (): UseProfileReturn => {
  // Stats refresh context (optional)
  let refreshTrigger = 0;
  try {
    const context = useStatsRefresh();
    refreshTrigger = context.refreshTrigger;
  } catch (error) {
    // Hook is being used outside of StatsProvider context
    // This is fine, it will just not auto-refresh
  }
  
  // Loading and error states
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Real data from API
  const [userStats, setUserStats] = useState<UserStats>({
    totalPoints: 0,
    level: 1,
    currentStreak: 0,
    longestStreak: 0,
    completionRate: 0,
    habitsCompleted: 0,
    goalsCompleted: 0,
    todayCompleted: 0,
    todayTotal: 0,
    joinedDate: new Date().toISOString(),
  });

  // Load profile data from API
  const loadProfileData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const statsResponse = await analyticsApi.getStats();

      if (statsResponse.success && statsResponse.data) {
        setUserStats(statsResponse.data as UserStats);
      }
    } catch (error) {
      console.error('Error loading profile data:', error);
      setError('Error loading profile data');
    } finally {
      setLoading(false);
    }
  }, []);

  // Load data on component mount and when refresh is triggered
  useEffect(() => {
    loadProfileData();
  }, [loadProfileData, refreshTrigger]);

  // Calculate current level info
  const getCurrentLevel = useCallback((points: number): Level => {
    for (let i = levels.length - 1; i >= 0; i--) {
      if (points >= levels[i].minPoints) {
        return levels[i];
      }
    }
    return levels[0];
  }, []);

  const getNextLevel = useCallback((points: number): Level | null => {
    const currentLevel = getCurrentLevel(points);
    const nextLevelIndex = levels.findIndex((l) => l.level === currentLevel.level) + 1;
    return nextLevelIndex < levels.length ? levels[nextLevelIndex] : null;
  }, [getCurrentLevel]);

  const currentLevel = useMemo(() => getCurrentLevel(userStats.totalPoints), [getCurrentLevel, userStats.totalPoints]);
  const nextLevel = useMemo(() => getNextLevel(userStats.totalPoints), [getNextLevel, userStats.totalPoints]);
  
  const progressToNext = useMemo(() => {
    if (!nextLevel) return 100;
    return ((userStats.totalPoints - currentLevel.minPoints) / (nextLevel.minPoints - currentLevel.minPoints)) * 100;
  }, [userStats.totalPoints, currentLevel, nextLevel]);


  const state: ProfileState = {
    loading,
    error,
    userStats,
    levels,
    weeklyChallenge,
    currentLevel,
    nextLevel,
    progressToNext,
  };

  const actions: ProfileActions = {
    getCurrentLevel,
    getNextLevel,
    refreshData: loadProfileData,
  };

  return { state, actions };
};