import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

import {
  fetchCustomerProfile,
  getSessionCookieName,
  updateCustomerProfile,
  uploadFile,
} from '@/lib/frappe-client'

export async function POST(request) {
  try {
    const cookieStore = await cookies()
    const cookieName = getSessionCookieName()
    const sid = cookieStore.get(cookieName)?.value

    if (!sid) {
      return NextResponse.json({ error: 'Not authenticated.' }, { status: 401 })
    }

    const body = await request.json()
    const { profileId, profile_image: profileImage, ...rest } = body ?? {}

    if (!profileId) {
      return NextResponse.json({ error: 'Missing profile id.' }, { status: 400 })
    }

    const payload = { ...rest }

    if (profileImage?.data && profileImage?.filename && profileImage?.type) {
      const uploadResult = await uploadFile(sid, profileImage)
      if (uploadResult?.file_url) {
        payload.profile_image = uploadResult.file_url
      }
    }

    const updatedProfile = await updateCustomerProfile(sid, profileId, payload)
    const profile =
      updatedProfile?.name === profileId
        ? updatedProfile
        : await fetchCustomerProfile(sid, { profileId })

    return NextResponse.json({
      profile,
    })
  } catch (error) {
    console.error('Profile update error:', error)
    return NextResponse.json({ error: error?.message ?? 'Unable to update profile.' }, { status: 400 })
  }
}

