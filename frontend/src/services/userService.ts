import api from './api';

export const registerUser = (data: { id: string; name: string; phone: string }) =>
    api.post('/users', data);

export const signInUser = (id: string) =>
    api.post(`/users/signin/${id}`, {});
