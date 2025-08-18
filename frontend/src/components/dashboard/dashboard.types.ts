import { ReactNode, HTMLAttributes } from 'react';

export interface UserStats {
  totalPoints: number;
  level: number;
  currentStreak: number;
  longestStreak: number;
  completionRate: number;
  todayCompleted: number;
  todayTotal: number;
}

export interface Habit {
  id: number;
  name: string;
  completed: boolean;
  category: string;
  points: number;
}

export interface Badge {
  name: string;
  description: string;
  icon: string;
}

export interface MotivationalMessageProps extends HTMLAttributes<HTMLDivElement> {
  messages: string[];
  currentIndex: number;
  className?: string;
}

export interface MetricsGridProps extends HTMLAttributes<HTMLDivElement> {
  userStats: UserStats;
  className?: string;
}

export interface TodayHabitsProps extends HTMLAttributes<HTMLDivElement> {
  habits: Habit[];
  onHabitToggle: (habitId: number) => void;
  className?: string;
}

export interface RecentAchievementsProps extends HTMLAttributes<HTMLDivElement> {
  badges: Badge[];
  className?: string;
}

export interface CelebrationOverlayProps {
  isVisible: boolean;
  points?: number;
}

export interface UseDashboardReturn {
  state: DashboardState;
  actions: DashboardActions;
}

export interface DashboardState {
  mounted: boolean;
  currentMessageIndex: number;
  celebrationVisible: boolean;
  userStats: UserStats;
  todayHabits: Habit[];
  recentBadges: Badge[];
}

export interface DashboardActions {
  toggleHabit: (habitId: number) => void;
  showCelebration: () => void;
}