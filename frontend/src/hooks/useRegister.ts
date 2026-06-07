import { useState } from 'react';
import { registerUser } from '../services/userService';

// Hook לניהול תהליך הרשמה עם שמירת נתוני המשתמש ב-localStorage
export const useRegister = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const register = async (id: string, name: string, phone: string) => {
        if (!id.trim() || !name.trim() || !phone.trim()) {
            setError('All fields are required');
            return false;
        }
        
        setLoading(true);
        setError('');
        try {
            const res = await registerUser({ id, name, phone });
            // שמירת נתוני המשתמש וה-JWT token לשימוש בבקשות עתידיות
            localStorage.setItem('user_id', res.data.id);
            localStorage.setItem('user_name', res.data.name);
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('role', res.data.role);
            return true;
        } catch (e: any) {
            setError(e.response?.data?.error || 'Registration failed');
            return false;
        } finally {
            setLoading(false);
        }
    };

    return { register, loading, error };
};
