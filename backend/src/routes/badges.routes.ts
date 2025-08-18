import { Router } from 'express';
import {
  getRecentBadges,
  getAllBadges,
} from '@/controllers/badges.controller';
import { authenticateToken } from '@/middleware/auth';

const router = Router();

// All routes require authentication
router.use(authenticateToken);

// Badge operations
router.get('/recent', getRecentBadges);
router.get('/', getAllBadges);

export default router;