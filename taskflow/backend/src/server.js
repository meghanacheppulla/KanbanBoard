import 'dotenv/config';
import http from 'http';
import express from 'express';
import cors from 'cors';
import { Server } from 'socket.io';
import { connectDatabase } from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import boardRoutes from './routes/boardRoutes.js';
import taskRoutes from './routes/taskRoutes.js';
import { registerSocketHandlers } from './sockets/socketHandler.js';

const app = express(); const server = http.createServer(app);
const io = new Server(server, { cors: { origin: process.env.CLIENT_URL || 'http://localhost:5173' } });
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173' })); app.use(express.json());
app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));
app.use('/api/auth', authRoutes); app.use('/api/boards', boardRoutes); app.use('/api/tasks', taskRoutes);
registerSocketHandlers(io);
const port = process.env.PORT || 5000;
connectDatabase().then(() => server.listen(port, () => console.log(`Taskflow API listening on ${port}`))).catch((error) => { console.error(error); process.exit(1); });
