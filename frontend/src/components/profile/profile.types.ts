import { ReactNode, HTMLAttributes } from 'react';

export interface Level {
  level: number;
  name: string;
  minPoints: number;
  maxPoints: number;
  color: string;
  bgColor: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  requirement: string;
  unlocked: boolean;
  unlockedAt: string | null;
}

export interface UserStats {
  totalPoints: number;
  level: number;
  currentStreak: number;
  longestStreak: number;
  completionRate: number;
  habitsCompleted: number;
  goalsCompleted: number;
  badgesEarned: number;
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

export interface BadgeSectionProps extends HTMLAttributes<HTMLDivElement> {
  unlockedBadges: Badge[];
  lockedBadges: Badge[];
  onBadgeClick?: (badge: Badge) => void;
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

export interface CelebrationModalProps {
  isVisible: boolean;
  newBadge?: Badge | null;
}

export interface UseProfileReturn {
  state: ProfileState;
  actions: ProfileActions;
}

export interface ProfileState {
  userStats: UserStats;
  levels: Level[];
  availableBadges: Badge[];
  weeklyChallenge: WeeklyChallengeData;
  celebrationVisible: boolean;
  newBadgeUnlocked: Badge | null;
  currentLevel: Level;
  nextLevel: Level | null;
  progressToNext: number;
  unlockedBadges: Badge[];
  lockedBadges: Badge[];
}

export interface ProfileActions {
  triggerCelebration: (badge?: Badge) => void;
  getCurrentLevel: (points: number) => Level;
  getNextLevel: (points: number) => Level | null;
}