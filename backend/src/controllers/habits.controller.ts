import { Request, Response } from 'express';
import { z } from 'zod';
import { prisma } from '../config/database';
import { ApiResponse, CreateHabitRequest, UpdateHabitRequest, Habit, AuthUser } from '../types';

// Extend Express Request to include user
declare global {
  namespace Express {
    interface Request {
      user?: AuthUser;
    }
  }
}

const createHabitSchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().optional(),
  category: z.string().min(1).max(50),
  icon: z.string().optional(),
  points: z.number().int().min(1).max(100).default(10),
  difficulty: z.number().int().min(1).max(3).default(2),
  frequency: z.enum(['daily', 'weekly', 'monthly']).default('daily'),
  targetDays: z.array(z.number().int().min(0).max(6)).default([]),
});

const updateHabitSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  description: z.string().optional(),
  category: z.string().min(1).max(50).optional(),
  icon: z.string().optional(),
  points: z.number().int().min(1).max(100).optional(),
  difficulty: z.number().int().min(1).max(3).optional(),
  frequency: z.enum(['daily', 'weekly', 'monthly']).optional(),
  targetDays: z.array(z.number().int().min(0).max(6)).optional(),
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
    const { name, description, category, icon, points, difficulty, frequency, targetDays } = validatedData;

    const habit = await prisma.habit.create({
      data: {
        userId: req.user.id,
        name,
        description: description || null,
        category,
        icon: icon || null,
        points,
        difficulty,
        frequency,
        targetDays,
      },
    });

    const response: ApiResponse<Habit> = {
      success: true,
      data: habit as Habit,
      message: 'Habit created successfully',
    };

    return res.status(201).json(response);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        error: 'Validation error',
        details: error.errors,
      });
    }

    console.error('Create habit error:', error);
    return res.status(500).json({
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

    // Get today's date range for completion check
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const habits = await prisma.habit.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });

    // Check completion status using HabitCompletion table
    const habitsWithCompletionStatus = await Promise.all(
      habits.map(async (habit) => {
        const completion = await prisma.habitCompletion.findFirst({
          where: {
            habitId: habit.id,
            userId: req.user!.id,
            completedAt: {
              gte: today,
              lt: tomorrow,
            },
          },
        });

        return {
          ...habit,
          completed: !!completion,
        };
      })
    );

    const response: ApiResponse<Habit[]> = {
      success: true,
      data: habitsWithCompletionStatus as Habit[],
    };

    return res.json(response);
  } catch (error) {
    console.error('Get habits error:', error);
    return res.status(500).json({
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
    
    if (!id) {
      return res.status(400).json({
        success: false,
        error: 'Habit ID is required',
      });
    }

    // Validate ObjectId format for MongoDB
    if (!/^[0-9a-fA-F]{24}$/.test(id)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid habit ID format',
      });
    }

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

    return res.json(response);
  } catch (error) {
    console.error('Get habit error:', error);
    return res.status(500).json({
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
    
    if (!id) {
      return res.status(400).json({
        success: false,
        error: 'Habit ID is required',
      });
    }

    // Validate ObjectId format for MongoDB
    if (!/^[0-9a-fA-F]{24}$/.test(id)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid habit ID format',
      });
    }

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

    // Filter out undefined values for Prisma
    const updateData = Object.fromEntries(
      Object.entries(validatedData).filter(([_, value]) => value !== undefined)
    );

    const updatedHabit = await prisma.habit.update({
      where: { id },
      data: updateData,
    });

    const response: ApiResponse<Habit> = {
      success: true,
      data: updatedHabit as Habit,
      message: 'Habit updated successfully',
    };

    return res.json(response);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        error: 'Validation error',
        details: error.errors,
      });
    }

    console.error('Update habit error:', error);
    return res.status(500).json({
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
    
    if (!id) {
      return res.status(400).json({
        success: false,
        error: 'Habit ID is required',
      });
    }

    // Validate ObjectId format for MongoDB
    if (!/^[0-9a-fA-F]{24}$/.test(id)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid habit ID format',
      });
    }

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

    return res.json(response);
  } catch (error) {
    console.error('Delete habit error:', error);
    return res.status(500).json({
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
    
    if (!id) {
      return res.status(400).json({
        success: false,
        error: 'Habit ID is required',
      });
    }

    // Validate ObjectId format for MongoDB
    if (!/^[0-9a-fA-F]{24}$/.test(id)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid habit ID format',
      });
    }

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

    // Check if already completed today using HabitCompletion table
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

    // Create completion record and update habit streak in a transaction
    let completion;
    let updatedHabit;
    
    try {
      const result = await prisma.$transaction(async (tx) => {
        // Create the completion record
        const newCompletion = await tx.habitCompletion.create({
          data: {
            habitId: id,
            userId: req.user.id,
            completedAt: new Date(),
            notes: notes || null,
          },
        });

        // Update habit streak
        const updated = await tx.habit.update({
          where: { id },
          data: {
            streak: {
              increment: 1,
            },
          },
        });

        return { completion: newCompletion, habit: updated };
      });

      completion = result.completion;
      updatedHabit = result.habit;
    } catch (error) {
      console.error('Error completing habit:', error);
      return res.status(500).json({
        success: false,
        error: 'Failed to complete habit',
      });
    }

    const response: ApiResponse = {
      success: true,
      data: {
        completion,
        habit: updatedHabit,
      },
      message: 'Habit completed successfully',
    };

    return res.status(201).json(response);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        error: 'Validation error',
        details: error.errors,
      });
    }

    console.error('Complete habit error:', error);
    return res.status(500).json({
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
    });

    // Check completion status using HabitCompletion table
    const habitsWithCompletionStatus = await Promise.all(
      habits.map(async (habit) => {
        const completion = await prisma.habitCompletion.findFirst({
          where: {
            habitId: habit.id,
            userId: req.user!.id,
            completedAt: {
              gte: today,
              lt: tomorrow,
            },
          },
        });

        return {
          ...habit,
          completed: !!completion,
        };
      })
    );

    const response: ApiResponse<Habit[]> = {
      success: true,
      data: habitsWithCompletionStatus as Habit[],
    };

    return res.json(response);
  } catch (error) {
    console.error('Get today habits error:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error',
    });
  }
};
