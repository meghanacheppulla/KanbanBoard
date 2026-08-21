# Taskflow

A collaborative Kanban workspace with JWT authentication, MongoDB persistence, and live board updates over Socket.IO.

## Run locally

1. Start MongoDB locally.
2. In `backend`, run `npm install`, then `npm run dev`.
3. In `frontend`, run `npm install`, then `npm run dev`.
4. Open http://localhost:5173.

The backend uses `backend/.env`; adjust `MONGO_URI`, `JWT_SECRET`, and ports as needed.
