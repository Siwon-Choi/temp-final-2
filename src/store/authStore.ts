import { create } from 'zustand'

type AuthState = {
  isAuthenticated: boolean
  isInitialized: boolean
  isRegistered: boolean
  setAuthState: (value: {
    isAuthenticated: boolean
    isRegistered?: boolean
  }) => void
  clearAuth: () => void
  markInitialized: () => void
}

export const useAuthStore = create<AuthState>()((set) => ({
  isAuthenticated: false,
  isInitialized: false,
  isRegistered: false,

  setAuthState: ({ isAuthenticated, isRegistered = true }) =>
    set({
      isAuthenticated,
      isRegistered,
    }),

  clearAuth: () =>
    set({
      isAuthenticated: false,
      isRegistered: false,
    }),

  markInitialized: () => set({ isInitialized: true }),
}))
