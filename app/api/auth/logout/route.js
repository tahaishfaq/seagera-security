import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

import { frappeLogout, getSessionCookieName } from '@/lib/frappe-client'

export async function POST() {
  const cookieStore = await cookies()
  const cookieName = getSessionCookieName()
  const sid = cookieStore.get(cookieName)?.value

  if (sid) {
    try {
      await frappeLogout(sid)
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  const response = NextResponse.json({ authenticated: false, user: null, profile: null, roles: [] })
  response.cookies.delete(cookieName)

  return response
}

