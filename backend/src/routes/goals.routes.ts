import { Router } from 'express';
import {
  createGoal,
  getGoals,
  getGoal,
  updateGoal,
  deleteGoal,
  createMilestone,
  toggleMilestone,
  createNote,
} from '@/controllers/goals.controller';
import { authenticateToken } from '@/middleware/auth';

const router = Router();

// All routes require authentication
router.use(authenticateToken);

// CRUD operations
router.post('/', createGoal);
router.get('/', getGoals);
router.get('/:id', getGoal);
router.put('/:id', updateGoal);
router.delete('/:id', deleteGoal);

// Milestones
router.post('/:goalId/milestones', createMilestone);
router.put('/:goalId/milestones/:milestoneId/toggle', toggleMilestone);

// Notes
router.post('/:goalId/notes', createNote);

export default router;
