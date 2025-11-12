'use server'

import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

import { fetchCurrentUser, fetchCustomerProfile, getSessionCookieName } from '@/lib/frappe-client'

export async function GET() {
  const cookieStore = await cookies()
  const cookieName = getSessionCookieName()
  const sid = cookieStore.get(cookieName)?.value

  if (!sid) {
    return NextResponse.json({ authenticated: false, user: null })
  }

  try {
    const user = await fetchCurrentUser(sid)
    if (!user?.email) {
      throw new Error('Missing user email')
    }

    const profile = await fetchCustomerProfile(sid, { email: user.email })
    if (!profile) {
      throw new Error('Not authorized')
    }

    return NextResponse.json({ authenticated: true, user, profile, roles: ['Portal Customer'] })
  } catch (error) {
    console.error('Session validation error:', error)
    const status = error?.message === 'Not authorized' ? 403 : 401
    const response = NextResponse.json({ authenticated: false, user: null, profile: null, roles: [] }, { status })
    response.cookies.delete(cookieName)
    return response
  }
}

