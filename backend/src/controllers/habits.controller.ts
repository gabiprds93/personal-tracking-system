import { Request, Response } from 'express';
import { z } from 'zod';
import { prisma } from '@/config/database';
import { ApiResponse, CreateHabitRequest, UpdateHabitRequest, Habit } from '@/types';

const createHabitSchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().optional(),
  category: z.string().min(1).max(50),
  points: z.number().int().min(1).max(100).default(10),
  frequency: z.enum(['daily', 'weekly', 'monthly']).default('daily'),
});

const updateHabitSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  description: z.string().optional(),
  category: z.string().min(1).max(50).optional(),
  points: z.number().int().min(1).max(100).optional(),
  frequency: z.enum(['daily', 'weekly', 'monthly']).optional(),
  isActive: z.boolean().optional(),
});

const completeHabitSchema = z.object({
  notes: z.string().optional(),
});

export const createHabit = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: 'User not authenticated',
      });
    }

    const validatedData = createHabitSchema.parse(req.body);
    const { name, description, category, points, frequency } = validatedData;

    const habit = await prisma.habit.create({
      data: {
        userId: req.user.id,
        name,
        description,
        category,
        points,
        frequency,
      },
    });

    const response: ApiResponse<Habit> = {
      success: true,
      data: habit,
      message: 'Habit created successfully',
    };

    res.status(201).json(response);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        error: 'Validation error',
        details: error.errors,
      });
    }

    console.error('Create habit error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
    });
  }
};

export const getHabits = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: 'User not authenticated',
      });
    }

    const { category, isActive } = req.query;

    const where: any = {
      userId: req.user.id,
    };

    if (category) {
      where.category = category;
    }

    if (isActive !== undefined) {
      where.isActive = isActive === 'true';
    }

    const habits = await prisma.habit.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });

    const response: ApiResponse<Habit[]> = {
      success: true,
      data: habits,
    };

    res.json(response);
  } catch (error) {
    console.error('Get habits error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
    });
  }
};

export const getHabit = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: 'User not authenticated',
      });
    }

    const { id } = req.params;

    const habit = await prisma.habit.findFirst({
      where: {
        id,
        userId: req.user.id,
      },
      include: {
        completions: {
          orderBy: { completedAt: 'desc' },
          take: 10,
        },
      },
    });

    if (!habit) {
      return res.status(404).json({
        success: false,
        error: 'Habit not found',
      });
    }

    const response: ApiResponse<Habit> = {
      success: true,
      data: habit,
    };

    res.json(response);
  } catch (error) {
    console.error('Get habit error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
    });
  }
};

export const updateHabit = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: 'User not authenticated',
      });
    }

    const { id } = req.params;
    const validatedData = updateHabitSchema.parse(req.body);

    const habit = await prisma.habit.findFirst({
      where: {
        id,
        userId: req.user.id,
      },
    });

    if (!habit) {
      return res.status(404).json({
        success: false,
        error: 'Habit not found',
      });
    }

    const updatedHabit = await prisma.habit.update({
      where: { id },
      data: validatedData,
    });

    const response: ApiResponse<Habit> = {
      success: true,
      data: updatedHabit,
      message: 'Habit updated successfully',
    };

    res.json(response);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        error: 'Validation error',
        details: error.errors,
      });
    }

    console.error('Update habit error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
    });
  }
};

export const deleteHabit = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: 'User not authenticated',
      });
    }

    const { id } = req.params;

    const habit = await prisma.habit.findFirst({
      where: {
        id,
        userId: req.user.id,
      },
    });

    if (!habit) {
      return res.status(404).json({
        success: false,
        error: 'Habit not found',
      });
    }

    await prisma.habit.delete({
      where: { id },
    });

    const response: ApiResponse = {
      success: true,
      message: 'Habit deleted successfully',
    };

    res.json(response);
  } catch (error) {
    console.error('Delete habit error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
    });
  }
};

export const completeHabit = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: 'User not authenticated',
      });
    }

    const { id } = req.params;
    const validatedData = completeHabitSchema.parse(req.body);
    const { notes } = validatedData;

    const habit = await prisma.habit.findFirst({
      where: {
        id,
        userId: req.user.id,
        isActive: true,
      },
    });

    if (!habit) {
      return res.status(404).json({
        success: false,
        error: 'Habit not found',
      });
    }

    // Check if already completed today
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const existingCompletion = await prisma.habitCompletion.findFirst({
      where: {
        habitId: id,
        userId: req.user.id,
        completedAt: {
          gte: today,
          lt: tomorrow,
        },
      },
    });

    if (existingCompletion) {
      return res.status(400).json({
        success: false,
        error: 'Habit already completed today',
      });
    }

    const completion = await prisma.habitCompletion.create({
      data: {
        habitId: id,
        userId: req.user.id,
        notes,
      },
    });

    const response: ApiResponse = {
      success: true,
      data: completion,
      message: 'Habit completed successfully',
    };

    res.status(201).json(response);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        error: 'Validation error',
        details: error.errors,
      });
    }

    console.error('Complete habit error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
    });
  }
};

export const getTodayHabits = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: 'User not authenticated',
      });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const habits = await prisma.habit.findMany({
      where: {
        userId: req.user.id,
        isActive: true,
      },
      include: {
        completions: {
          where: {
            completedAt: {
              gte: today,
              lt: tomorrow,
            },
          },
        },
      },
    });

    const habitsWithCompletionStatus = habits.map(habit => ({
      ...habit,
      completed: habit.completions.length > 0,
    }));

    const response: ApiResponse<Habit[]> = {
      success: true,
      data: habitsWithCompletionStatus,
    };

    res.json(response);
  } catch (error) {
    console.error('Get today habits error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
    });
  }
};
