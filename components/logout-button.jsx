'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

import { cn } from '@/lib/utils'
import { fetchWithAuth } from '@/lib/fetch-with-auth'
import { useAuthStore } from '@/stores/auth-store'

export default function LogoutButton({ className, children }) {
  const [submitting, setSubmitting] = useState(false)
  const clear = useAuthStore((state) => state.clear)
  const router = useRouter()

  async function handleLogout() {
    try {
      setSubmitting(true)
      await fetchWithAuth('/api/auth/logout', { method: 'POST' })
      clear()
      router.push('/login')
      router.refresh()
    } catch (error) {
      console.error('Logout failed', error)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={submitting}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-destructive hover:text-destructive disabled:opacity-60',
        className
      )}
    >
      {submitting ? 'Signing out…' : children ?? 'Sign out'}
    </button>
  )
}

