import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSignIn } from '../hooks/useSignIn';

export default function SignInPage() {
    const [id, setId] = useState('');
    const { signIn, loading, error } = useSignIn();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const ok = await signIn(id);
        if (ok) {
            const role = localStorage.getItem('role');
            navigate(role === 'Admin' ? '/admin' : '/customer');
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2>Sign In</h2>
                <form onSubmit={handleSubmit}>
                    <input className="input" placeholder="Your ID" value={id} onChange={e => setId(e.target.value)} required />
                    {error && <p className="error-msg">{error}</p>}
                    <button className="btn-primary" type="submit" disabled={loading}>{loading ? 'Loading...' : 'Sign In'}</button>
                </form>
                <p>No account? <span className="auth-link" onClick={() => navigate('/signup')}>Sign Up</span></p>
            </div>
        </div>
    );
}
