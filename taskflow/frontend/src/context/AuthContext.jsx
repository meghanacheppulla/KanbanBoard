import { createContext, useContext, useEffect, useState } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); const [loading, setLoading] = useState(true);
  useEffect(() => { api.get('/auth/me').then(({ data }) => setUser(data.user)).catch(() => {}).finally(() => setLoading(false)); }, []);
  const authenticate = async (mode, values) => { const { data } = await api.post(`/auth/${mode}`, values); localStorage.setItem('taskflow-token', data.token); setUser(data.user); };
  const logout = () => { localStorage.removeItem('taskflow-token'); setUser(null); };
  return <AuthContext.Provider value={{ user, loading, authenticate, logout }}>{children}</AuthContext.Provider>;
}
export const useAuth = () => useContext(AuthContext);
