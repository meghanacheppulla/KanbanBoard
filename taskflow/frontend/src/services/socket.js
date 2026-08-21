import { io } from 'socket.io-client';
export const connectSocket = () => io(import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000', { auth: { token: localStorage.getItem('taskflow-token') } });
