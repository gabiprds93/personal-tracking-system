import { Request, Response } from 'express';
import { prisma } from '@/config/database';
import { ApiResponse, TimeRange, UserStats, HabitTrendData, CategoryData, KeyMetric } from '@/types';

export const getUserStats = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: 'User not authenticated',
      });
    }

    const userId = req.user.id;

    // Since we can't get habit points directly from completions anymore,
    // we'll calculate based on all habits and their completion counts
    const allHabits = await prisma.habit.findMany({
      where: { 
        userId,
        isActive: true 
      },
      select: { id: true, points: true }
    });

    // For simplicity, calculate total points based on current habit points
    // multiplied by their completion counts (approximation)
    const totalPoints = allHabits.reduce((sum, habit) => {
      return sum + habit.points * 10; // Assuming average 10 completions per habit
    }, 0);

    // Get today's completions
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const todayCompletions = await prisma.habitCompletion.count({
      where: {
        userId,
        completedAt: {
          gte: today,
          lt: tomorrow,
        },
      },
    });

    const todayTotal = await prisma.habit.count({
      where: {
        userId,
        isActive: true,
      },
    });

    // Calculate streak
    const streak = await calculateStreak(userId);

    // Get completion rate (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const completionsLast30Days = await prisma.habitCompletion.count({
      where: {
        userId,
        completedAt: {
          gte: thirtyDaysAgo,
        },
      },
    });

    const totalPossibleCompletions = await prisma.habit.count({
      where: {
        userId,
        isActive: true,
      },
    }) * 30;

    const completionRate = totalPossibleCompletions > 0 
      ? Math.round((completionsLast30Days / totalPossibleCompletions) * 100)
      : 0;

    // Get completed goals count
    const goalsCompleted = await prisma.goal.count({
      where: {
        userId,
        status: 'COMPLETED',
      },
    });

    // Get badges count
    const badgesEarned = await prisma.userBadge.count({
      where: { userId },
    });

    // Get user join date
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { createdAt: true },
    });

    const userStats: UserStats = {
      totalPoints: totalPoints,
      level: Math.floor(totalPoints / 100) + 1,
      currentStreak: streak,
      longestStreak: streak, // TODO: Implement longest streak calculation
      completionRate,
      todayCompleted: todayCompletions,
      todayTotal,
      habitsCompleted: completionsLast30Days,
      goalsCompleted,
      badgesEarned,
      joinedDate: user?.createdAt.toISOString() || new Date().toISOString(),
    };

    const response: ApiResponse<UserStats> = {
      success: true,
      data: userStats,
    };

    res.json(response);
  } catch (error) {
    console.error('Get user stats error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
    });
  }
};

export const getHabitTrends = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: 'User not authenticated',
      });
    }

    const { timeRange = '30d' } = req.query;
    const userId = req.user.id;

    const days = getDaysFromTimeRange(timeRange as TimeRange);
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const completions = await prisma.habitCompletion.findMany({
      where: {
        userId,
        completedAt: {
          gte: startDate,
        },
      },
    });

    // Group by date
    const dailyData: { [key: string]: { completed: number; total: number } } = {};

    // Initialize all dates in range
    for (let i = 0; i < days; i++) {
      const date = new Date(startDate);
      date.setDate(date.getDate() + i);
      const dateKey = date.toISOString().split('T')[0];
      dailyData[dateKey] = { completed: 0, total: 0 };
    }

    // Count completions per day
    completions.forEach(completion => {
      const dateKey = completion.completedAt.toISOString().split('T')[0];
      if (dailyData[dateKey]) {
        dailyData[dateKey].completed++;
      }
    });

    // Get total habits per day
    const activeHabits = await prisma.habit.count({
      where: {
        userId,
        isActive: true,
      },
    });

    Object.keys(dailyData).forEach(dateKey => {
      dailyData[dateKey].total = activeHabits;
    });

    const trendData: HabitTrendData[] = Object.entries(dailyData).map(([date, data]) => ({
      date,
      completed: data.completed,
      total: data.total,
      rate: data.total > 0 ? Math.round((data.completed / data.total) * 100) : 0,
    }));

    const response: ApiResponse<HabitTrendData[]> = {
      success: true,
      data: trendData,
    };

    res.json(response);
  } catch (error) {
    console.error('Get habit trends error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
    });
  }
};

export const getCategoryDistribution = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: 'User not authenticated',
      });
    }

    const userId = req.user.id;

    const habits = await prisma.habit.findMany({
      where: {
        userId,
        isActive: true,
      },
    });

    const categoryData: { [key: string]: number } = {};

    // Get completions for last 30 days for all habits
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const completions = await prisma.habitCompletion.findMany({
      where: {
        userId,
        completedAt: {
          gte: thirtyDaysAgo,
        },
      },
    });

    // Count completions by category
    for (const habit of habits) {
      if (!categoryData[habit.category]) {
        categoryData[habit.category] = 0;
      }
      // Count how many times this habit was completed in the last 30 days
      const habitCompletions = completions.filter(c => c.habitId === habit.id);
      categoryData[habit.category] += habitCompletions.length;
    }

    const distribution: CategoryData[] = Object.entries(categoryData).map(([name, value]) => ({
      name,
      value,
      color: getCategoryColor(name),
    }));

    const response: ApiResponse<CategoryData[]> = {
      success: true,
      data: distribution,
    };

    res.json(response);
  } catch (error) {
    console.error('Get category distribution error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
    });
  }
};

export const getKeyMetrics = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: 'User not authenticated',
      });
    }

    const userId = req.user.id;

    // Today's completions
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const todayCompletions = await prisma.habitCompletion.count({
      where: {
        userId,
        completedAt: {
          gte: today,
          lt: tomorrow,
        },
      },
    });

    // Current streak
    const currentStreak = await calculateStreak(userId);

    // Weekly average
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    const weeklyCompletions = await prisma.habitCompletion.count({
      where: {
        userId,
        completedAt: {
          gte: weekAgo,
        },
      },
    });

    const weeklyAverage = Math.round(weeklyCompletions / 7);

    // Total points - simplified calculation
    const allUserHabits = await prisma.habit.findMany({
      where: { 
        userId,
        isActive: true 
      },
      select: { points: true }
    });

    const totalPoints = allUserHabits.reduce((sum, habit) => {
      return sum + habit.points * 10; // Assuming average 10 completions per habit
    }, 0);

    const metrics: KeyMetric[] = [
      {
        id: 'today-completions',
        title: 'Today\'s Completions',
        value: todayCompletions,
        change: '+2',
        changeType: 'positive',
        icon: 'check-circle',
        iconColor: 'text-green-500',
      },
      {
        id: 'current-streak',
        title: 'Current Streak',
        value: currentStreak,
        change: '+1',
        changeType: 'positive',
        icon: 'flame',
        iconColor: 'text-orange-500',
      },
      {
        id: 'weekly-average',
        title: 'Weekly Average',
        value: weeklyAverage,
        change: '-1',
        changeType: 'negative',
        icon: 'trending-up',
        iconColor: 'text-blue-500',
      },
      {
        id: 'total-points',
        title: 'Total Points',
        value: totalPoints,
        change: '+15',
        changeType: 'positive',
        icon: 'star',
        iconColor: 'text-yellow-500',
      },
    ];

    const response: ApiResponse<KeyMetric[]> = {
      success: true,
      data: metrics,
    };

    res.json(response);
  } catch (error) {
    console.error('Get key metrics error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
    });
  }
};

// Helper functions
async function calculateStreak(userId: string): Promise<number> {
  const completions = await prisma.habitCompletion.findMany({
    where: { userId },
    orderBy: { completedAt: 'desc' },
    distinct: ['completedAt'],
  });

  if (completions.length === 0) return 0;

  let streak = 0;
  let currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  for (const completion of completions) {
    const completionDate = new Date(completion.completedAt);
    completionDate.setHours(0, 0, 0, 0);

    const diffTime = Math.abs(currentDate.getTime() - completionDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays <= 1) {
      streak++;
      currentDate = completionDate;
    } else {
      break;
    }
  }

  return streak;
}

function getDaysFromTimeRange(timeRange: TimeRange): number {
  switch (timeRange) {
    case '7d': return 7;
    case '30d': return 30;
    case '90d': return 90;
    case '1y': return 365;
    default: return 30;
  }
}

function getCategoryColor(category: string): string {
  const colors = [
    '#3B82F6', '#EF4444', '#10B981', '#F59E0B',
    '#8B5CF6', '#EC4899', '#06B6D4', '#84CC16',
  ];
  
  const index = category.charCodeAt(0) % colors.length;
  return colors[index];
}
