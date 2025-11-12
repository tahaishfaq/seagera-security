import { NextResponse } from 'next/server'
import { z } from 'zod'

import { fetchCustomerProfile, frappeLogin, getSessionCookieName } from '@/lib/frappe-client'

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, 'Password is required'),
})

export async function POST(request) {
  try {
    const body = await request.json()
    const { email, password } = LoginSchema.parse(body)

    const loginResult = await frappeLogin(email, password)

    const profile =
      (await fetchCustomerProfile(loginResult.sid, { email: loginResult.user.email })) ?? null

    if (!profile) {
      return NextResponse.json(
        { error: 'You are not authorized to access this portal.' },
        { status: 403 }
      )
    }

    // ✅ Role check using loginResult.message.roles
    const userRoles = loginResult.message?.roles ?? []
    const hasPortalAccess = userRoles.includes('Portal Customer')

    if (!hasPortalAccess) {
      return NextResponse.json(
        { error: 'You are not authorized to access this portal.' },
        { status: 403 }
      )
    }

    // Success response
    const response = NextResponse.json({
      authenticated: true,
      user: loginResult.user,
      profile,
      roles: userRoles,
    })

    // Set session cookie
    response.cookies.set({
      name: getSessionCookieName(),
      value: loginResult.sid,
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      path: '/',
      ...(loginResult.cookieAttributes?.maxAge
        ? { maxAge: loginResult.cookieAttributes.maxAge }
        : loginResult.cookieAttributes?.expires
        ? { expires: loginResult.cookieAttributes.expires }
        : {}),
    })

    return response
  } catch (error) {
    console.error('Login error:', error)

    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.flatten() }, { status: 400 })
    }

    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
  }
}
