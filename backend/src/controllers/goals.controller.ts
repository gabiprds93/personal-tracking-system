import { Request, Response } from 'express';
import { z } from 'zod';
import { prisma } from '@/config/database';
import { ApiResponse, CreateGoalRequest, UpdateGoalRequest, Goal, GoalStatus } from '@/types';

const createGoalSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().optional(),
  category: z.string().min(1).max(50),
  targetDate: z.string().datetime(),
  milestones: z.array(z.string().min(1).max(100)).optional(),
});

const updateGoalSchema = z.object({
  title: z.string().min(1).max(200).optional(),
  description: z.string().optional(),
  category: z.string().min(1).max(50).optional(),
  targetDate: z.string().datetime().optional(),
  progress: z.number().int().min(0).max(100).optional(),
  status: z.nativeEnum(GoalStatus).optional(),
});

const createMilestoneSchema = z.object({
  title: z.string().min(1).max(100),
  order: z.number().int().min(0).optional(),
});

const createNoteSchema = z.object({
  content: z.string().min(1).max(1000),
});

export const createGoal = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: 'User not authenticated',
      });
    }

    const validatedData = createGoalSchema.parse(req.body);
    const { title, description, category, targetDate, milestones } = validatedData;

    const goal = await prisma.goal.create({
      data: {
        userId: req.user.id,
        title,
        description,
        category,
        targetDate: new Date(targetDate),
        milestones: {
          create: milestones?.map((milestone, index) => ({
            title: milestone,
            order: index,
          })) || [],
        },
      },
      include: {
        milestones: true,
      },
    });

    const response: ApiResponse<Goal> = {
      success: true,
      data: goal,
      message: 'Goal created successfully',
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

    console.error('Create goal error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
    });
  }
};

export const getGoals = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: 'User not authenticated',
      });
    }

    const { category, status, search } = req.query;

    const where: any = {
      userId: req.user.id,
    };

    if (category && category !== 'all') {
      where.category = category;
    }

    if (status && status !== 'all') {
      where.status = status;
    }

    if (search) {
      where.OR = [
        { title: { contains: search as string, mode: 'insensitive' } },
        { description: { contains: search as string, mode: 'insensitive' } },
      ];
    }

    const goals = await prisma.goal.findMany({
      where,
      include: {
        milestones: {
          orderBy: { order: 'asc' },
        },
        notes: {
          orderBy: { createdAt: 'desc' },
          take: 5,
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    const response: ApiResponse<Goal[]> = {
      success: true,
      data: goals,
    };

    res.json(response);
  } catch (error) {
    console.error('Get goals error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
    });
  }
};

export const getGoal = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: 'User not authenticated',
      });
    }

    const { id } = req.params;

    const goal = await prisma.goal.findFirst({
      where: {
        id,
        userId: req.user.id,
      },
      include: {
        milestones: {
          orderBy: { order: 'asc' },
        },
        notes: {
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    if (!goal) {
      return res.status(404).json({
        success: false,
        error: 'Goal not found',
      });
    }

    const response: ApiResponse<Goal> = {
      success: true,
      data: goal,
    };

    res.json(response);
  } catch (error) {
    console.error('Get goal error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
    });
  }
};

export const updateGoal = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: 'User not authenticated',
      });
    }

    const { id } = req.params;
    const validatedData = updateGoalSchema.parse(req.body);

    const goal = await prisma.goal.findFirst({
      where: {
        id,
        userId: req.user.id,
      },
    });

    if (!goal) {
      return res.status(404).json({
        success: false,
        error: 'Goal not found',
      });
    }

    const updateData: any = { ...validatedData };
    if (validatedData.targetDate) {
      updateData.targetDate = new Date(validatedData.targetDate);
    }

    const updatedGoal = await prisma.goal.update({
      where: { id },
      data: updateData,
      include: {
        milestones: {
          orderBy: { order: 'asc' },
        },
      },
    });

    const response: ApiResponse<Goal> = {
      success: true,
      data: updatedGoal,
      message: 'Goal updated successfully',
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

    console.error('Update goal error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
    });
  }
};

export const deleteGoal = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: 'User not authenticated',
      });
    }

    const { id } = req.params;

    const goal = await prisma.goal.findFirst({
      where: {
        id,
        userId: req.user.id,
      },
    });

    if (!goal) {
      return res.status(404).json({
        success: false,
        error: 'Goal not found',
      });
    }

    await prisma.goal.delete({
      where: { id },
    });

    const response: ApiResponse = {
      success: true,
      message: 'Goal deleted successfully',
    };

    res.json(response);
  } catch (error) {
    console.error('Delete goal error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
    });
  }
};

export const createMilestone = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: 'User not authenticated',
      });
    }

    const { goalId } = req.params;
    const validatedData = createMilestoneSchema.parse(req.body);
    const { title, order } = validatedData;

    const goal = await prisma.goal.findFirst({
      where: {
        id: goalId,
        userId: req.user.id,
      },
    });

    if (!goal) {
      return res.status(404).json({
        success: false,
        error: 'Goal not found',
      });
    }

    const milestone = await prisma.milestone.create({
      data: {
        goalId,
        title,
        order: order || 0,
      },
    });

    const response: ApiResponse = {
      success: true,
      data: milestone,
      message: 'Milestone created successfully',
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

    console.error('Create milestone error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
    });
  }
};

export const toggleMilestone = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: 'User not authenticated',
      });
    }

    const { goalId, milestoneId } = req.params;

    const goal = await prisma.goal.findFirst({
      where: {
        id: goalId,
        userId: req.user.id,
      },
    });

    if (!goal) {
      return res.status(404).json({
        success: false,
        error: 'Goal not found',
      });
    }

    const milestone = await prisma.milestone.findFirst({
      where: {
        id: milestoneId,
        goalId,
      },
    });

    if (!milestone) {
      return res.status(404).json({
        success: false,
        error: 'Milestone not found',
      });
    }

    const updatedMilestone = await prisma.milestone.update({
      where: { id: milestoneId },
      data: {
        completed: !milestone.completed,
        completedAt: !milestone.completed ? new Date() : null,
      },
    });

    // Update goal progress
    const allMilestones = await prisma.milestone.findMany({
      where: { goalId },
    });

    const completedMilestones = allMilestones.filter(m => m.completed).length;
    const progress = Math.round((completedMilestones / allMilestones.length) * 100);

    await prisma.goal.update({
      where: { id: goalId },
      data: { progress },
    });

    const response: ApiResponse = {
      success: true,
      data: updatedMilestone,
      message: 'Milestone updated successfully',
    };

    res.json(response);
  } catch (error) {
    console.error('Toggle milestone error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
    });
  }
};

export const createNote = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: 'User not authenticated',
      });
    }

    const { goalId } = req.params;
    const validatedData = createNoteSchema.parse(req.body);
    const { content } = validatedData;

    const goal = await prisma.goal.findFirst({
      where: {
        id: goalId,
        userId: req.user.id,
      },
    });

    if (!goal) {
      return res.status(404).json({
        success: false,
        error: 'Goal not found',
      });
    }

    const note = await prisma.note.create({
      data: {
        userId: req.user.id,
        goalId,
        content,
      },
    });

    const response: ApiResponse = {
      success: true,
      data: note,
      message: 'Note created successfully',
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

    console.error('Create note error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
    });
  }
};
