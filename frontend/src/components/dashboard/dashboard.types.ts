import { ReactNode, HTMLAttributes } from 'react';

export interface UserStats {
  totalPoints: number;
  level: number;
  currentStreak: number;
  longestStreak: number;
  completionRate: number;
  todayCompleted: number;
  todayTotal: number;
  habitsCompleted?: number;
  goalsCompleted?: number;
  badgesEarned?: number;
  joinedDate?: string;
}

export interface Habit {
  id: string;
  name: string;
  completed?: boolean;
  category: string;
  points: number;
  description?: string | null;
  icon?: string | null;
  difficulty?: number;
  frequency?: string;
  targetDays?: number[];
  streak?: number;
  isActive?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
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
  onHabitToggle: (habitId: string) => void;
  className?: string;
}

export interface RecentAchievementsProps extends HTMLAttributes<HTMLDivElement> {
  badges: Badge[];
  className?: string;
}

export interface DashboardHeaderProps extends HTMLAttributes<HTMLElement> {
  className?: string;
}

export interface CelebrationOverlayProps {
  isVisible: boolean;
  points?: number;
}

export interface UseDashboardReturn {
  state: DashboardState;
  actions: DashboardActions;
  loading: boolean;
  error: string | null;
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
  toggleHabit: (habitId: string) => void;
  showCelebration: () => void;
  refreshData: () => void;
}