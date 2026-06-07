import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRegister } from '../hooks/useRegister';

export default function SignUpPage() {
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const { register, loading, error } = useRegister();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const ok = await register(id, name, phone);
        if (ok) navigate('/customer');
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2>Sign Up</h2>
                <form onSubmit={handleSubmit}>
                    <input className="input" placeholder="ID (9 digits)" value={id} onChange={e => setId(e.target.value)} required />
                    <input className="input" placeholder="Full Name" value={name} onChange={e => setName(e.target.value)} required />
                    <input className="input" placeholder="Phone" value={phone} onChange={e => setPhone(e.target.value)} required />
                    {error && <p className="error-msg">{error}</p>}
                    <button className="btn-primary" type="submit" disabled={loading}>{loading ? 'Loading...' : 'Sign Up'}</button>
                </form>
                <p>Already have an account? <span className="auth-link" onClick={() => navigate('/signin')}>Sign In</span></p>
            </div>
        </div>
    );
}
