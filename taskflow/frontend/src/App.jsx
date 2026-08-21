import { useState } from 'react';
import { useAuth } from './context/AuthContext';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './pages/Dashboard';
import './styles.css';
export default function App() { const { user, loading } = useAuth(); const [mode, setMode] = useState('login'); if (loading) return <div className="loading">Loading your workspace...</div>; return user ? <Dashboard /> : mode === 'login' ? <Login onSwitch={() => setMode('signup')} /> : <Signup onSwitch={() => setMode('login')} />; }
