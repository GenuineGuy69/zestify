import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Base API URL (Update if deployed)
const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5000') + '/api/auth';

export const useAuthStore = create(
    persist(
        (set) => ({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,

            login: async (email, password) => {
                set({ isLoading: true, error: null });
                try {
                    const response = await fetch(`${API_URL}/login`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ email, password }),
                    });

                    const data = await response.json();

                    if (!response.ok) {
                        throw new Error(data.message || 'Login failed');
                    }

                    set({
                        user: data.user,
                        token: data.token,
                        isAuthenticated: true,
                        isLoading: false
                    });
                    return true;
                } catch (error) {
                    set({ error: error.message, isLoading: false });
                    return false;
                }
            },

            register: async (firstName, lastName, email, password) => {
                set({ isLoading: true, error: null });
                try {
                    const response = await fetch(`${API_URL}/register`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ firstName, lastName, email, password }),
                    });

                    const data = await response.json();

                    if (!response.ok) {
                        throw new Error(data.message || 'Registration failed');
                    }

                    set({
                        user: data.user,
                        token: data.token,
                        isAuthenticated: true,
                        isLoading: false
                    });
                    return true;
                } catch (error) {
                    set({ error: error.message, isLoading: false });
                    return false;
                }
            },

            logout: () => {
                set({ user: null, token: null, isAuthenticated: false });
            },
        }),
        {
            name: 'auth-storage',
            partialize: (state) => ({ token: state.token, user: state.user, isAuthenticated: state.isAuthenticated }),
        }
    )
);
