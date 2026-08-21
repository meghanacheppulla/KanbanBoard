import { useState } from 'react';
import { ArrowRight, LockKeyhole, Mail } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Login({ onSwitch }) {
  const [values, setValues] = useState({ email: '', password: '' }); const [error, setError] = useState(''); const { authenticate } = useAuth();
  async function submit(e) { e.preventDefault(); setError(''); try { await authenticate('login', values); } catch (err) { setError(err.response?.data?.message || 'Unable to sign in'); } }
  return <AuthShell eyebrow="Welcome back" title="Make work feel lighter." copy="Your team’s clearest view of what matters next." onSwitch={onSwitch} switchText="Create an account" switchLabel="New to Taskflow?">
    <form onSubmit={submit} className="auth-form"><label><span>Email</span><div className="input-wrap"><Mail size={17}/><input type="email" required value={values.email} onChange={e => setValues({ ...values, email: e.target.value })} placeholder="you@company.com" /></div></label><label><span>Password</span><div className="input-wrap"><LockKeyhole size={17}/><input type="password" required value={values.password} onChange={e => setValues({ ...values, password: e.target.value })} placeholder="Your password" /></div></label>{error && <p className="form-error">{error}</p>}<button className="primary-button" type="submit">Sign in <ArrowRight size={17}/></button></form>
  </AuthShell>;
}
function AuthShell({ eyebrow, title, copy, children, onSwitch, switchText, switchLabel }) { return <main className="auth-page"><section className="auth-visual"><div className="brand-mark">tf<span>/</span></div><div className="visual-copy"><p className="eyebrow">The calm way to ship</p><h1>Bring order<br/>to the busy.</h1><div className="mini-note">◎ &nbsp; 12 projects moving forward</div></div><div className="visual-footer">TASKFLOW / 2026</div></section><section className="auth-panel"><div className="auth-content"><div className="mobile-brand">tf<span>/</span></div><p className="eyebrow">{eyebrow}</p><h2>{title}</h2><p className="auth-copy">{copy}</p>{children}<p className="switch-line">{switchLabel} <button onClick={onSwitch}>{switchText}</button></p></div></section></main>; }
