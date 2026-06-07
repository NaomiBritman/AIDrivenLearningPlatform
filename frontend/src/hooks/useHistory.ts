import { useState, useEffect } from 'react';
import { getUserHistory } from '../services/promptService';

export interface Prompt {
    id: string; prompt: string; response: string;
    category_id: string; sub_category_id: string; created_at: string;
}

// Hook לטעינת היסטוריית למידה של המשתמש המחובר
export const useHistory = () => {
    const [history, setHistory] = useState<Prompt[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const user_id = localStorage.getItem('user_id') || '';
        if (user_id) {
            getUserHistory(user_id)
                .then(res => setHistory(res.data))
                .catch(err => console.error('Failed to load history:', err))
                .finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, []);

    return { history, loading };
};
