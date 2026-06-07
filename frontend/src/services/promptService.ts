import api from './api';

export const submitPrompt = (data: {
    id: string; user_id: string; category_id: string;
    sub_category_id: string; prompt: string;
    category_name: string; sub_category_name: string;
}) => api.post('/prompts', data);

export const getUserHistory = (user_id: string) =>
    api.get(`/prompts/user/${user_id}`);

export const getAllPromptsWithUsers = () => api.get('/prompts/all');
