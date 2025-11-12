import 'server-only'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { fetchCurrentUser, fetchCustomerProfile, getSessionCookieName } from '@/lib/frappe-client'

export async function getServerUser() {
  try {
    const cookieStore = await cookies()
    const sid = cookieStore.get(getSessionCookieName())?.value
    if (!sid) {
      return null
    }

    const user = await fetchCurrentUser(sid)
    if (!user?.email) {
      return null
    }

    const profile = await fetchCustomerProfile(sid, { email: user.email })
    if (!profile) {
      return null
    }

    return {
      user,
      roles: ['Portal Customer'],
      profile,
    }
  } catch (error) {
    console.error('Failed to fetch server user', error)
    return null
  }
}

export async function requireServerUser(redirectPath = '/login') {
  const context = await getServerUser()
  if (!context) {
    redirect(redirectPath)
  }
  return context
}

