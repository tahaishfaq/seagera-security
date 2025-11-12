import { NextResponse } from 'next/server'
import { z } from 'zod'

import {
  fetchCustomerProfile,
  fetchCurrentUser,
  getSessionCookieName,
  registerCustomer,
} from '@/lib/frappe-client'

const RegisterSchema = z.object({
  customer_name: z.string().min(1),
  company_name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(8),
  phone: z.string().min(1),
  address: z.string().min(1),
})

export async function POST(request) {
  try {
    const body = await request.json()
    const payload = RegisterSchema.parse(body)

    const registerResult = await registerCustomer(payload)
    const message = registerResult?.message ?? {}

    const sid = registerResult?.sid ?? message.sid
    if (!sid) {
      throw new Error('Missing session token from register response.')
    }

    const user = registerResult?.user ?? (await fetchCurrentUser(sid))

    let profile = null
    if (message.profile_id) {
      profile = await fetchCustomerProfile(sid, { profileId: message.profile_id })
    }
    if (!profile && (user?.email || payload.email)) {
      profile = await fetchCustomerProfile(sid, { email: user?.email ?? payload.email })
    }

    const cookieName = getSessionCookieName()
    const roles = Array.isArray(message.roles) ? message.roles : []
    if (!roles.includes('Portal Customer')) {
      return NextResponse.json(
        { error: 'You are not authorized to access this portal.' },
        { status: 403 }
      )
    }

    const response = NextResponse.json({
      authenticated: true,
      user,
      profile: profile ?? null,
      roles,
    })

    response.cookies.set({
      name: cookieName,
      value: sid,
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      path: '/',
      ...(registerResult.cookieAttributes?.maxAge
        ? { maxAge: registerResult.cookieAttributes.maxAge }
        : registerResult.cookieAttributes?.expires
        ? { expires: registerResult.cookieAttributes.expires }
        : {}),
    })

    return response
  } catch (error) {
    console.error('Register error:', error)

    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.flatten() }, { status: 400 })
    }

    return NextResponse.json({ error: error?.message ?? 'Unable to register customer.' }, { status: 400 })
  }
}

