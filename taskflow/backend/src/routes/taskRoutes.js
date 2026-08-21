import { Router } from 'express';
import { createTask, deleteTask, updateTask } from '../controllers/taskController.js';
import { protect } from '../middleware/authMiddleware.js';
const router = Router();
router.use(protect); router.post('/', createTask); router.patch('/:id', updateTask); router.delete('/:id', deleteTask);
export default router;
