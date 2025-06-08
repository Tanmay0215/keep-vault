import { create } from 'zustand';
import Cookies from 'js-cookie';

interface AuthState {
  isAuthenticated: boolean;
  setAuth: () => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: Cookies.get('token') !== undefined,
  setAuth: () => {
    set({ isAuthenticated: true });
  },
  clearAuth: () => {
    set({ isAuthenticated: false });
  },
}));
