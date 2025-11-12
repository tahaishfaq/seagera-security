'use client'

import { useEffect } from 'react'

import { fetchWithAuth } from '@/lib/fetch-with-auth'
import { useAuthStore } from '@/stores/auth-store'

export default function AuthProvider({ children }) {
  const setSession = useAuthStore((state) => state.setSession)
  const setLoading = useAuthStore((state) => state.setLoading)
  const clear = useAuthStore((state) => state.clear)

  useEffect(() => {
    let isMounted = true

    async function hydrate() {
      try {
        setLoading(true)
        const session = await fetchWithAuth('/api/auth/session')
        if (isMounted) {
          setSession(session)
        }
      } catch (error) {
        console.error('Failed to hydrate auth session', error)
        if (isMounted) {
          clear()
        }
      }
    }

    hydrate()

    return () => {
      isMounted = false
    }
  }, [clear, setLoading, setSession])

  return <>{children}</>
}

