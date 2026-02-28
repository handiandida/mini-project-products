import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "../types/auth.types";

interface AuthState {
  user: User | null;
  token: string | null;
  login: (data: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,

      login: (data) => {
        set({
          user: data,
          token: data.accessToken,
        });
      },

      logout: () => {
        set({
          user: null,
          token: null,
        });
      },
    }),
    {
      name: "auth-storage",
    },
  ),
);
