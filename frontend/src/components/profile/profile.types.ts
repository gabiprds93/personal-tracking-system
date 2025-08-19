import { ReactNode, HTMLAttributes } from 'react';

export interface Level {
  level: number;
  name: string;
  minPoints: number;
  maxPoints: number;
  color: string;
  bgColor: string;
}


export interface UserStats {
  totalPoints: number;
  level: number;
  currentStreak: number;
  longestStreak: number;
  completionRate: number;
  habitsCompleted: number;
  goalsCompleted: number;
  joinedDate: string;
}

export interface ChallengeTask {
  id: number;
  title: string;
  completed: number;
  target: number;
  points: number;
}

export interface WeeklyChallengeData {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  progress: number;
  tasks: ChallengeTask[];
  reward: {
    points: number;
    badge: string;
    icon: string;
  };
}

export interface ProfileHeaderProps extends HTMLAttributes<HTMLElement> {
  userStats: UserStats;
  currentLevel: Level;
  className?: string;
}

export interface LevelProgressProps extends HTMLAttributes<HTMLDivElement> {
  currentLevel: Level;
  nextLevel: Level | null;
  userStats: UserStats;
  progressToNext: number;
  className?: string;
}

export interface QuickStatsProps extends HTMLAttributes<HTMLDivElement> {
  userStats: UserStats;
  className?: string;
}


export interface WeeklyChallengeProps extends HTMLAttributes<HTMLDivElement> {
  challenge: WeeklyChallengeData;
  className?: string;
}

export interface StatsGridProps extends HTMLAttributes<HTMLDivElement> {
  userStats: UserStats;
  className?: string;
}


export interface UseProfileReturn {
  state: ProfileState;
  actions: ProfileActions;
}

export interface ProfileState {
  loading: boolean;
  error: string | null;
  userStats: UserStats;
  levels: Level[];
  weeklyChallenge: WeeklyChallengeData;
  currentLevel: Level;
  nextLevel: Level | null;
  progressToNext: number;
}

export interface ProfileActions {
  getCurrentLevel: (points: number) => Level;
  getNextLevel: (points: number) => Level | null;
  refreshData: () => void;
}