'use client'

import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

const storage = createJSONStorage(() => sessionStorage)

export const useAuthStore = create(
  persist(
    (set) => ({
      authenticated: false,
      loading: true,
      user: null,
      profile: null,
      roles: [],
      setSession: ({ authenticated, user, profile, roles }) =>
        set({
          authenticated,
          user,
          profile: profile ?? null,
          roles: Array.isArray(roles) ? roles : [],
          loading: false,
        }),
      setLoading: (loading) => set({ loading }),
      clear: () =>
        set({
          authenticated: false,
          user: null,
          profile: null,
          roles: [],
          loading: false,
        }),
    }),
    {
      name: 'security-portal-auth',
      storage,
      partialize: (state) => ({
        authenticated: state.authenticated,
        user: state.user,
        profile: state.profile,
        roles: state.roles,
      }),
    }
  )
)

