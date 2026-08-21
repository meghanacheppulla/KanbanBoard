import { Router } from 'express';
import { createBoard, getBoard, listBoards } from '../controllers/boardController.js';
import { protect } from '../middleware/authMiddleware.js';
const router = Router();
router.use(protect); router.get('/', listBoards); router.post('/', createBoard); router.get('/:id', getBoard);
export default router;
