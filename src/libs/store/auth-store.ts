import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthUser } from '@/libs/types/user';

interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;

  // Actions
  setUser: (user: AuthUser) => void;
  clearUser: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,

      setUser: (user) =>
        set({
          user,
          isAuthenticated: true,
        }),

      clearUser: () =>
        set({
          user: null,
          isAuthenticated: false,
        }),
    }),
    {
      name: 'auth-storage', // key in localStorage
      partialize: (state) => ({
        // Only persist user, not actions
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);