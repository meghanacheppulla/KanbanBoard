import Board from '../models/Board.js';
import Task from '../models/Task.js';

async function canAccess(boardId, userId) { return Board.exists({ _id: boardId, $or: [{ owner: userId }, { members: userId }] }); }

export async function createTask(req, res) {
  if (!(await canAccess(req.body.board, req.user.id))) return res.status(403).json({ message: 'Board access denied' });
  const task = await Task.create(req.body);
  res.status(201).json(await task.populate('assignee', 'name email'));
}

export async function updateTask(req, res) {
  const task = await Task.findById(req.params.id);
  if (!task || !(await canAccess(task.board, req.user.id))) return res.status(404).json({ message: 'Task not found' });
  Object.assign(task, req.body); await task.save();
  res.json(await task.populate('assignee', 'name email'));
}

export async function deleteTask(req, res) {
  const task = await Task.findById(req.params.id);
  if (!task || !(await canAccess(task.board, req.user.id))) return res.status(404).json({ message: 'Task not found' });
  await task.deleteOne(); res.status(204).end();
}
