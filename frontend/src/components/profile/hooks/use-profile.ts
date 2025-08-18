import { useState, useCallback, useMemo } from 'react';
import { 
  UseProfileReturn, 
  ProfileState, 
  ProfileActions, 
  Level, 
  Badge,
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

// Badge definitions
const availableBadges: Badge[] = [
  {
    id: "streak_7",
    name: "Racha de Fuego",
    description: "Completa hábitos por 7 días consecutivos",
    icon: "🔥",
    category: "streaks",
    requirement: "7 días consecutivos",
    unlocked: true,
    unlockedAt: "2024-03-15",
  },
  {
    id: "streak_30",
    name: "Llama Eterna",
    description: "Mantén una racha de 30 días",
    icon: "🌟",
    category: "streaks",
    requirement: "30 días consecutivos",
    unlocked: false,
    unlockedAt: null,
  },
  {
    id: "streak_100",
    name: "Fénix Imparable",
    description: "Alcanza 100 días consecutivos",
    icon: "🦅",
    category: "streaks",
    requirement: "100 días consecutivos",
    unlocked: false,
    unlockedAt: null,
  },
  {
    id: "multitask",
    name: "Multitarea",
    description: "Completa 5+ hábitos en un solo día",
    icon: "⚡",
    category: "daily",
    requirement: "5+ hábitos en un día",
    unlocked: true,
    unlockedAt: "2024-03-10",
  },
  {
    id: "early_bird",
    name: "Madrugador",
    description: "Completa ejercicio antes de las 7am",
    icon: "🌅",
    category: "habits",
    requirement: "Ejercicio antes de 7am",
    unlocked: true,
    unlockedAt: "2024-03-08",
  },
  {
    id: "consistency",
    name: "Constancia",
    description: "Completa el 90% de hábitos en un mes",
    icon: "💎",
    category: "monthly",
    requirement: "90% completado mensual",
    unlocked: false,
    unlockedAt: null,
  },
  {
    id: "goal_crusher",
    name: "Destructor de Metas",
    description: "Completa 3 metas en un mes",
    icon: "🎯",
    category: "goals",
    requirement: "3 metas completadas",
    unlocked: false,
    unlockedAt: null,
  },
  {
    id: "perfectionist",
    name: "Perfeccionista",
    description: "Semana perfecta: 100% de hábitos",
    icon: "✨",
    category: "weekly",
    requirement: "Semana 100% perfecta",
    unlocked: false,
    unlockedAt: null,
  },
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
  const [userStats] = useState<UserStats>({
    totalPoints: 2847,
    level: 12,
    currentStreak: 7,
    longestStreak: 23,
    completionRate: 87,
    habitsCompleted: 156,
    goalsCompleted: 8,
    badgesEarned: 3,
    joinedDate: "2024-01-15",
  });

  const [celebrationVisible, setCelebrationVisible] = useState(false);
  const [newBadgeUnlocked, setNewBadgeUnlocked] = useState<Badge | null>(null);

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

  const unlockedBadges = useMemo(() => availableBadges.filter((badge) => badge.unlocked), []);
  const lockedBadges = useMemo(() => availableBadges.filter((badge) => !badge.unlocked), []);

  const triggerCelebration = useCallback((badge?: Badge) => {
    setCelebrationVisible(true);
    if (badge) setNewBadgeUnlocked(badge);
    setTimeout(() => {
      setCelebrationVisible(false);
      setNewBadgeUnlocked(null);
    }, 3000);
  }, []);

  const state: ProfileState = {
    userStats,
    levels,
    availableBadges,
    weeklyChallenge,
    celebrationVisible,
    newBadgeUnlocked,
    currentLevel,
    nextLevel,
    progressToNext,
    unlockedBadges,
    lockedBadges,
  };

  const actions: ProfileActions = {
    triggerCelebration,
    getCurrentLevel,
    getNextLevel,
  };

  return { state, actions };
};