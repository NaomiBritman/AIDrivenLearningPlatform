import { useState } from 'react';
import { signInUser } from '../services/userService';

// Hook לניהול תהליך התחברות עם שמירת נתוני המשתמש ב-localStorage
export const useSignIn = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const signIn = async (id: string) => {
        if (!id.trim()) {
            setError('ID is required');
            return false;
        }
        
        setLoading(true);
        setError('');
        try {
            const res = await signInUser(id);
            // שמירת נתוני המשתמש וה-JWT token לשימוש בבקשות עתידיות
            localStorage.setItem('user_id', res.data.id);
            localStorage.setItem('user_name', res.data.name);
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('role', res.data.role);
            return true;
        } catch {
            setError('User not found. Please sign up first.');
            return false;
        } finally {
            setLoading(false);
        }
    };

    return { signIn, loading, error };
};
