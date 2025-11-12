'use client'

import { useMemo } from 'react'

import { useAuthStore } from '@/stores/auth-store'

export function useAuth() {
  const authenticated = useAuthStore((state) => state.authenticated)
  const user = useAuthStore((state) => state.user)
  const loading = useAuthStore((state) => state.loading)
  const profile = useAuthStore((state) => state.profile)
  const roles = useAuthStore((state) => state.roles)

  return useMemo(
    () => ({
      authenticated,
      user,
      profile,
      roles,
      loading,
    }),
    [authenticated, loading, profile, roles, user]
  )
}

