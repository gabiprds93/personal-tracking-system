import { Router } from 'express';
import {
  createHabit,
  getHabits,
  getHabit,
  updateHabit,
  deleteHabit,
  completeHabit,
  getTodayHabits,
} from '@/controllers/habits.controller';
import { authenticateToken } from '@/middleware/auth';

const router = Router();

// All routes require authentication
router.use(authenticateToken);

// CRUD operations
router.post('/', createHabit);
router.get('/', getHabits);
router.get('/today', getTodayHabits);
router.get('/:id', getHabit);
router.put('/:id', updateHabit);
router.delete('/:id', deleteHabit);

// Habit completion
router.post('/:id/complete', completeHabit);

export default router;
