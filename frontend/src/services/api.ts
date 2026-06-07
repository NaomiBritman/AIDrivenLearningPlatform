import axios from 'axios';

// יצירת instance מרכזי של axios עם הגדרות בסיסיות
const api = axios.create({ baseURL: 'http://localhost:3000' });

// Interceptor להוספת JWT token אוטומטית לכל בקשה
api.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

export default api;
