// Local storage utilities for persisting data
const STORAGE_KEYS = {
  HABITS: 'personal-tracker-habits',
  GOALS: 'personal-tracker-goals',
  USER_STATS: 'personal-tracker-user-stats',
  ANALYTICS: 'personal-tracker-analytics'
} as const

export class LocalStorage {
  private static isClient = typeof window !== 'undefined'

  static get<T>(key: string): T | null {
    if (!this.isClient) return null
    
    try {
      const item = window.localStorage.getItem(key)
      if (!item) return null
      return JSON.parse(item)
    } catch (error) {
      console.error('Error reading from localStorage:', error)
      return null
    }
  }

  static set<T>(key: string, value: T): boolean {
    if (!this.isClient) return false
    
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
      return true
    } catch (error) {
      console.error('Error writing to localStorage:', error)
      return false
    }
  }

  static remove(key: string): boolean {
    if (!this.isClient) return false
    
    try {
      window.localStorage.removeItem(key)
      return true
    } catch (error) {
      console.error('Error removing from localStorage:', error)
      return false
    }
  }

  static clear(): boolean {
    if (!this.isClient) return false
    
    try {
      window.localStorage.clear()
      return true
    } catch (error) {
      console.error('Error clearing localStorage:', error)
      return false
    }
  }
}

// Type-safe storage functions for specific data
export const HabitsStorage = {
  get: () => LocalStorage.get<any[]>(STORAGE_KEYS.HABITS) || [],
  set: (habits: any[]) => LocalStorage.set(STORAGE_KEYS.HABITS, habits),
  clear: () => LocalStorage.remove(STORAGE_KEYS.HABITS)
}

export const GoalsStorage = {
  get: () => LocalStorage.get<any[]>(STORAGE_KEYS.GOALS) || [],
  set: (goals: any[]) => LocalStorage.set(STORAGE_KEYS.GOALS, goals),
  clear: () => LocalStorage.remove(STORAGE_KEYS.GOALS)
}

export const UserStatsStorage = {
  get: () => LocalStorage.get<any>(STORAGE_KEYS.USER_STATS) || {
    totalPoints: 0,
    level: 1,
    currentStreak: 0,
    longestStreak: 0,
    completionRate: 0,
    habitsCompleted: 0,
    goalsCompleted: 0,
    badgesEarned: 0,
    joinedDate: new Date().toISOString()
  },
  set: (stats: any) => LocalStorage.set(STORAGE_KEYS.USER_STATS, stats),
  clear: () => LocalStorage.remove(STORAGE_KEYS.USER_STATS)
}

export const AnalyticsStorage = {
  get: () => LocalStorage.get<any>(STORAGE_KEYS.ANALYTICS) || {
    dailyData: [],
    weeklyData: [],
    monthlyData: []
  },
  set: (analytics: any) => LocalStorage.set(STORAGE_KEYS.ANALYTICS, analytics),
  clear: () => LocalStorage.remove(STORAGE_KEYS.ANALYTICS)
}