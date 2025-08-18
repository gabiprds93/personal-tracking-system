import { Router } from 'express';
import {
  getUserStats,
  getHabitTrends,
  getCategoryDistribution,
  getKeyMetrics,
} from '@/controllers/analytics.controller';
import { authenticateToken } from '@/middleware/auth';

const router = Router();

// All routes require authentication
router.use(authenticateToken);

// Analytics endpoints
router.get('/stats', getUserStats);
router.get('/trends', getHabitTrends);
router.get('/categories', getCategoryDistribution);
router.get('/metrics', getKeyMetrics);

export default router;
