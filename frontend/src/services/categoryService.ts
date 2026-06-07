import api from './api';

export const getCategories = () => api.get('/categories');

export const getSubCategories = (category_id: string) =>
    api.get(`/sub-categories/category/${category_id}`);
