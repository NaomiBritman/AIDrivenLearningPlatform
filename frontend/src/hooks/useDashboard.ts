import { useState, useEffect } from 'react';
import { getCategories, getSubCategories } from '../services/categoryService';
import { submitPrompt } from '../services/promptService';

export interface Category { id: string; name: string; }
export interface SubCategory { id: string; name: string; category_id: string; }

// Hook מרכזי לניהול לוגיקת הלמידה - בחירת קטגוריות ושליחת prompts
export const useDashboard = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
    const [selectedSubCategory, setSelectedSubCategory] = useState<SubCategory | null>(null);
    const [promptText, setPromptText] = useState('');
    const [response, setResponse] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // טעינת קטגוריות בטעינת הרכיב
    useEffect(() => {
        getCategories().then(res => setCategories(res.data));
    }, []);

    // טעינת תת-קטגוריות כשנבחרת קטגוריה
    useEffect(() => {
        if (selectedCategory) {
            getSubCategories(selectedCategory.id).then(res => setSubCategories(res.data));
            setSelectedSubCategory(null);
        }
    }, [selectedCategory]);

    const submit = async () => {
        if (!selectedCategory || !selectedSubCategory || !promptText) return;
        setLoading(true);
        setError('');
        setResponse('');
        try {
            const user_id = localStorage.getItem('user_id') || '';
            const id = 'P' + Date.now().toString().slice(-8); 
            const res = await submitPrompt({
                id, user_id,
                category_id: selectedCategory.id,
                sub_category_id: selectedSubCategory.id,
                prompt: promptText,
                category_name: selectedCategory.name,
                sub_category_name: selectedSubCategory.name,
            });
            setResponse(res.data.response);
            setPromptText(''); // ניקוי השדה לאחר שליחה מוצלחת
        } catch (e: any) {
            setError(e.response?.data?.message || 'Error submitting prompt');
        } finally {
            setLoading(false);
        }
    };

    return {
        categories, subCategories, selectedCategory, setSelectedCategory,
        selectedSubCategory, setSelectedSubCategory,
        promptText, setPromptText, response, loading, error, submit
    };
};
