import { Router } from 'express';
import { login, me, signup } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';
const router = Router();
router.post('/signup', signup); router.post('/login', login); router.get('/me', protect, me);
export default router;
