import Board from '../models/Board.js';
import Task from '../models/Task.js';

export async function listBoards(req, res) {
  const boards = await Board.find({ $or: [{ owner: req.user.id }, { members: req.user.id }] }).sort('-updatedAt');
  res.json(boards);
}

export async function createBoard(req, res) {
  const board = await Board.create({ title: req.body.title || 'Untitled board', description: req.body.description || '', owner: req.user.id, members: [req.user.id] });
  res.status(201).json(board);
}

export async function getBoard(req, res) {
  const board = await Board.findOne({ _id: req.params.id, $or: [{ owner: req.user.id }, { members: req.user.id }] });
  if (!board) return res.status(404).json({ message: 'Board not found' });
  const tasks = await Task.find({ board: board.id }).populate('assignee', 'name email').sort('-createdAt');
  res.json({ board, tasks });
}
