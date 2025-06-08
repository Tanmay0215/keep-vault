import axios from 'axios';
import { useAuthStore } from '../store/auth.store';

const BASE_URL = 'http://localhost:5000/api';

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Auth API calls
export const authAPI = {
  login: async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password });
    useAuthStore.getState().setAuth();
    return response.data;
  },
  register: async (username: string, email: string, password: string) => {
    const response = await api.post('/auth/register', {
      username,
      email,
      password,
    });
    useAuthStore.getState().setAuth();
    return response.data;
  },
  logout: async () => {
    const response = await api.post('/auth/logout');
    useAuthStore.getState().clearAuth();
    return response.data;
  },
  verifyToken: async () => {
    try {
      await api.get('/auth/verify');
      useAuthStore.getState().setAuth();
      return true;
    } catch {
      useAuthStore.getState().clearAuth();
      return false;
    }
  },
};

// Notes API calls
export const notesAPI = {
  createNote: async (title: string, content: string) => {
    const response = await api.post('/notes', { title, content });
    return response.data;
  },
  getAllNotes: async () => {
    const response = await api.get('/notes/user/');
    return response.data;
  },
  getNoteById: async (id: string) => {
    const response = await api.get(`/notes/${id}`);
    return response.data;
  },
  updateNote: async (id: string, title: string, content: string) => {
    const response = await api.put(`/notes/${id}`, { title, content });
    return response.data;
  },
  deleteNote: async (id: string) => {
    const response = await api.delete(`/notes/${id}`);
    return response.data;
  },
};
