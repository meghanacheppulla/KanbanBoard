import jwt from 'jsonwebtoken';

export function registerSocketHandlers(io) {
  io.use((socket, next) => {
    try { socket.userId = jwt.verify(socket.handshake.auth?.token, process.env.JWT_SECRET).id; next(); }
    catch { next(new Error('Unauthorized')); }
  });
  io.on('connection', (socket) => {
    socket.on('joinBoard', (boardId) => socket.join(`board:${boardId}`));
    socket.on('taskChanged', ({ boardId, task }) => socket.to(`board:${boardId}`).emit('taskChanged', task));
  });
}
