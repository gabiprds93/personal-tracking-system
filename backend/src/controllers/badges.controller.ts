import { Request, Response } from 'express';
import { prisma } from '../config/database';
import { ApiResponse, AuthUser } from '../types';

// Extend Express Request to include user
declare global {
  namespace Express {
    interface Request {
      user?: AuthUser;
    }
  }
}

export const getRecentBadges = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: 'User not authenticated',
      });
    }

    // Get recent badges for the user
    const userBadges = await prisma.userBadge.findMany({
      where: {
        userId: req.user.id,
      },
      include: {
        badge: true,
      },
      orderBy: {
        unlockedAt: 'desc',
      },
      take: 5, // Get last 5 badges
    });

    // Transform to the format expected by frontend
    const badges = userBadges.map(userBadge => ({
      name: userBadge.badge.name,
      description: userBadge.badge.description,
      icon: userBadge.badge.icon,
      unlockedAt: userBadge.unlockedAt,
    }));

    const response: ApiResponse = {
      success: true,
      data: badges,
    };

    return res.json(response);
  } catch (error) {
    console.error('Get recent badges error:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error',
    });
  }
};

export const getAllBadges = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: 'User not authenticated',
      });
    }

    // Get all badges and check which ones the user has
    const allBadges = await prisma.badge.findMany({
      where: {
        isActive: true,
      },
      orderBy: {
        category: 'asc',
      },
    });

    const userBadges = await prisma.userBadge.findMany({
      where: {
        userId: req.user.id,
      },
      include: {
        badge: true,
      },
    });

    const userBadgeIds = new Set(userBadges.map(ub => ub.badgeId));

    const badges = allBadges.map(badge => ({
      id: badge.id,
      name: badge.name,
      description: badge.description,
      icon: badge.icon,
      category: badge.category,
      points: badge.points,
      unlocked: userBadgeIds.has(badge.id),
      unlockedAt: userBadges.find(ub => ub.badgeId === badge.id)?.unlockedAt || null,
    }));

    const response: ApiResponse = {
      success: true,
      data: badges,
    };

    return res.json(response);
  } catch (error) {
    console.error('Get all badges error:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error',
    });
  }
};