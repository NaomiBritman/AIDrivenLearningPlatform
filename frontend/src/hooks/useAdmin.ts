import { useState, useEffect } from 'react';
import { getAllPromptsWithUsers } from '../services/promptService';

// Hook לטעינת נתוני מנהל - כל השאלות ותשובות במערכת
export const useAdmin = () => {
    const [prompts, setPrompts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getAllPromptsWithUsers()
            .then(res => setPrompts(res.data))
            .catch(err => console.error('Failed to load admin data:', err))
            .finally(() => setLoading(false));
    }, []);

    return { prompts, loading };
};
