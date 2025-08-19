// Core types that match frontend interfaces
export interface User {
  id: string;
  email: string;
  username: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
  timezone: string;
  language: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserStats {
  totalPoints: number;
  level: number;
  currentStreak: number;
  longestStreak: number;
  completionRate: number;
  todayCompleted: number;
  todayTotal: number;
  habitsCompleted: number;
  goalsCompleted: number;
  joinedDate: string;
}

export interface Habit {
  id: string;
  userId: string;
  name: string;
  description: string | null;
  category: string;
  icon: string | null;
  points: number;
  difficulty: number;
  frequency: string;
  targetDays: number[];
  streak: number;
  isActive: boolean;
  completed?: boolean; // For frontend compatibility
  createdAt: Date;
  updatedAt: Date;
}

export interface HabitCompletion {
  id: string;
  habitId: string;
  userId: string;
  completedAt: Date;
  notes?: string;
}

export interface Goal {
  id: string;
  userId: string;
  title: string;
  description?: string | null;
  category: string;
  targetDate: Date;
  progress: number;
  status: GoalStatus;
  createdAt: Date;
  updatedAt: Date;
  milestones?: Milestone[];
  notes?: Note[];
}

export interface Milestone {
  id: string;
  goalId: string;
  title: string;
  completed: boolean;
  completedAt?: Date | null;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Note {
  id: string;
  userId: string;
  goalId?: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  requirement: string;
  points: number;
  isActive: boolean;
  unlocked?: boolean; // For frontend compatibility
  unlockedAt?: Date; // For frontend compatibility
  createdAt: Date;
  updatedAt: Date;
}

export interface UserBadge {
  id: string;
  userId: string;
  badgeId: string;
  unlockedAt: Date;
  badge?: Badge;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  tasks?: ChallengeTask[];
}

export interface ChallengeTask {
  id: string;
  challengeId: string;
  title: string;
  target: number;
  points: number;
  order: number;
  completed?: number; // For frontend compatibility
  createdAt: Date;
  updatedAt: Date;
}

export interface UserChallenge {
  id: string;
  userId: string;
  challengeId: string;
  progress: number;
  completed: boolean;
  completedAt?: Date;
  joinedAt: Date;
  challenge?: Challenge;
}

export interface UserAnalytics {
  id: string;
  userId: string;
  date: Date;
  totalPoints: number;
  habitsCompleted: number;
  goalsCompleted: number;
  streak: number;
  completionRate: number;
  createdAt: Date;
  updatedAt: Date;
}

// Analytics types for frontend compatibility
export interface HabitTrendData {
  date: string;
  completed: number;
  total: number;
  rate: number;
}

export interface CategoryData {
  name: string;
  value: number;
  color: string;
}

export interface WeeklyComparisonData {
  week: string;
  thisMonth: number;
  lastMonth: number;
}

export interface TimeOfDayData {
  hour: string;
  habits: number;
}

export interface StreakData {
  date: string;
  streak: number;
}

export interface HeatmapData {
  date: string;
  count: number;
  day: number;
  week: number;
}

export interface DayAnalysis {
  day: string;
  rate: number;
  color: string;
}

export interface KeyMetric {
  id: string;
  title: string;
  value: string | number;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
  icon: string;
  iconColor: string;
}

export interface InsightCard {
  id: string;
  type: 'pattern' | 'recommendation' | 'improvement' | 'strength';
  title: string;
  description: string;
  bgColor: string;
  borderColor: string;
  textColor: string;
  icon: string;
}

export interface PredictionData {
  title: string;
  description: string;
  items: string[];
}

export interface MilestoneData {
  name: string;
  remaining: string;
}

// Import GoalStatus from Prisma to avoid enum conflicts
import { GoalStatus } from '@prisma/client';

// Re-export for consistency
export { GoalStatus };

export type TimeRange = '7d' | '30d' | '90d' | '1y';
export type MetricType = 'completion' | 'streak' | 'consistency' | 'performance';
export type TabValue = 'overview' | 'trends' | 'patterns' | 'insights';

// Request/Response types
export interface CreateUserRequest {
  email: string;
  username: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface CreateHabitRequest {
  name: string;
  description?: string;
  category: string;
  points?: number;
  frequency?: string;
}

export interface UpdateHabitRequest {
  name?: string;
  description?: string;
  category?: string;
  points?: number;
  frequency?: string;
  isActive?: boolean;
}

export interface CreateGoalRequest {
  title: string;
  description?: string;
  category: string;
  targetDate: string;
  milestones?: string[];
}

export interface UpdateGoalRequest {
  title?: string;
  description?: string;
  category?: string;
  targetDate?: string;
  progress?: number;
  status?: GoalStatus;
}

export interface CreateMilestoneRequest {
  title: string;
  order?: number;
}

export interface CreateNoteRequest {
  content: string;
  goalId?: string;
}

export interface CompleteHabitRequest {
  notes?: string;
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Auth types
export interface AuthUser {
  id: string;
  email: string;
  username: string;
  firstName?: string;
  lastName?: string;
}

export interface JwtPayload {
  userId: string;
  email: string;
  username: string;
  iat?: number;
  exp?: number;
}
