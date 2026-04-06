import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AuthUser } from "@/libs/types/user";

interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  setUser: (user: AuthUser) => void;
  clearUser: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,

      setUser: (user) => {
        // ✅ No cookie logic here — handled in auth.ts via API
        set({ user, isAuthenticated: true });
      },

      clearUser: () => {
        // ✅ No cookie logic here — handled in auth.ts via API
        set({ user: null, isAuthenticated: false });
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);
