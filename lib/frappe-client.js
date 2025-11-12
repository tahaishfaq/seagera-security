import 'server-only'

import { Buffer } from 'node:buffer'
import { cookies } from 'next/headers'

const DEFAULT_COOKIE_NAME = 'sid'

const FRAPPE_BASE_URL = process.env.FRAPPE_BASE_URL
const FRAPPE_SESSION_COOKIE = process.env.FRAPPE_SESSION_COOKIE_NAME ?? DEFAULT_COOKIE_NAME

function assertEnv() {
  if (!FRAPPE_BASE_URL) {
    throw new Error('FRAPPE_BASE_URL is not defined. Please set it in your environment.')
  }
}

async function frappeFetch(path, options = {}, sid) {
  assertEnv()

  const targetUrl = new URL(path, FRAPPE_BASE_URL).toString()
  const headersInit = new Headers(options.headers ?? {})

  headersInit.set('Accept', 'application/json')
  if (options.body && !headersInit.has('Content-Type') && !(options.body instanceof FormData)) {
    headersInit.set('Content-Type', 'application/json')
  }

  if (sid) {
    headersInit.set('Cookie', `${FRAPPE_SESSION_COOKIE}=${sid}`)
  }

  const response = await fetch(targetUrl, {
    ...options,
    headers: headersInit,
    redirect: 'manual',
  })

  if (!response.ok) {
    let message = `Frappe request failed with status ${response.status}`
    try {
      const data = await response.json()
      message = data?.message ?? data?._server_messages ?? message
    } catch {
      // ignore json parse errors
    }
    throw new Error(message)
  }

  return response
}

function parseSetCookie(cookie) {
  const parts = cookie.split(';').map((part) => part.trim())
  const [nameValue, ...attributes] = parts
  const [name, value] = nameValue.split('=')
  if (!name || typeof value === 'undefined') {
    return null
  }

  const attrMap = attributes.reduce((acc, attr) => {
    const [attrName, attrValue] = attr.split('=')
    if (attrName) {
      acc[attrName.toLowerCase()] = attrValue ?? ''
    }
    return acc
  }, {})

  const result = {
    name,
    value,
  }

  if (attrMap['max-age']) {
    const parsed = Number.parseInt(attrMap['max-age'], 10)
    if (!Number.isNaN(parsed)) {
      result.maxAge = parsed
    }
  }

  if (attrMap.expires) {
    const expiresDate = new Date(attrMap.expires)
    if (!Number.isNaN(expiresDate.getTime())) {
      result.expires = expiresDate
    }
  }

  return result
}

function getSetCookieArray(response) {
  const anyHeaders = response.headers

  if (typeof anyHeaders.getSetCookie === 'function') {
    return anyHeaders.getSetCookie()
  }

  if (typeof anyHeaders.raw === 'function') {
    const rawHeaders = anyHeaders.raw()
    return rawHeaders?.['set-cookie'] ?? []
  }

  const header = response.headers.get('set-cookie')
  return header ? [header] : []
}

export async function frappeLogin(email, password) {
  const response = await frappeFetch('/api/method/seagera_portal.api.login_customer', {
    method: 'POST',
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  })

  const payload = await response.json()
  const message = payload?.message

  const setCookies = getSetCookieArray(response)
  const sidCookie = setCookies
    .map((cookie) => parseSetCookie(cookie))
    .find((cookie) => cookie?.name === FRAPPE_SESSION_COOKIE)

  if (!sidCookie || !sidCookie.value) {
    throw new Error('Login succeeded but did not receive a session cookie from Frappe.')
  }

  const user = await fetchCurrentUser(sidCookie.value)

  return {
    sid: sidCookie.value,
    cookieAttributes: {
      maxAge: sidCookie.maxAge,
      expires: sidCookie.expires,
    },
    user,
    message,
  }
}

export async function frappeLogout(sid) {
  await frappeFetch('/api/method/logout', { method: 'GET' }, sid)
}

export async function fetchCurrentUser(sid) {
  const cookieValue = sid ?? readCookieFromHeaders()

  if (!cookieValue) {
    throw new Error('Missing session cookie')
  }

  const userIdResponse = await frappeFetch('/api/method/frappe.auth.get_logged_user', { method: 'GET' }, cookieValue)
  const userIdPayload = await userIdResponse.json()
  const userId = userIdPayload?.message

  if (!userId) {
    throw new Error('Unable to determine logged in user')
  }

  const userResponse = await frappeFetch(
    `/api/resource/User/${encodeURIComponent(userId)}?fields=${encodeURIComponent(
      JSON.stringify(['name', 'full_name', 'email', 'user_image', 'user_type'])
    )}`,
    { method: 'GET' },
    cookieValue
  )

  const userPayload = await userResponse.json()
  const user = userPayload?.data

  if (!user) {
    throw new Error('Unable to load user profile from Frappe')
  }

  return {
    name: user.name,
    full_name: user.full_name ?? null,
    email: user.email,
    user_image: user.user_image,
    user_type: user.user_type,
  }
}

export async function readCookieFromHeaders() {
  const cookieStore = await cookies()
  return cookieStore.get(FRAPPE_SESSION_COOKIE)?.value
}

export function getSessionCookieName() {
  return FRAPPE_SESSION_COOKIE
}

export async function uploadFile(sid, file) {
  if (!file) {
    throw new Error('No file provided for upload.')
  }

  const { data, filename, type } = file
  if (!data || !filename || !type) {
    throw new Error('Incomplete file payload.')
  }

  const buffer = Buffer.from(
    data.includes('base64,') ? data.split('base64,')[1] : data,
    'base64'
  )

  const blob = new Blob([buffer], { type })

  const formData = new FormData()
  formData.append('file', blob, filename)

  const response = await frappeFetch('/api/method/upload_file', { method: 'POST', body: formData }, sid)
  const payload = await response.json().catch(() => null)

  if (!payload?.message) {
    throw new Error('Unable to upload file.')
  }

  return payload.message
}

export async function updateCustomerProfile(sid, profileId, data = {}) {
  if (!profileId) {
    throw new Error('Missing profile id')
  }

  const sanitized = Object.fromEntries(
    Object.entries(data).filter(
      ([, value]) => value !== undefined && value !== null && value !== ''
    )
  )

  const response = await frappeFetch(
    `/api/resource/Customer Profile/${encodeURIComponent(profileId)}`,
    {
      method: 'PUT',
      body: JSON.stringify(sanitized),
    },
    sid
  )

  const payload = await response.json().catch(() => null)
  if (!payload) {
    throw new Error('Unable to update customer profile.')
  }

  if (payload.data) {
    return payload.data
  }

  return payload
}

export async function fetchServices(providedSid) {
  const sid = providedSid ?? (await readCookieFromHeaders())
  if (!sid) {
    throw new Error('Missing session cookie')
  }

  const fields = ['name', 'service_name', 'category', 'description', 'price', 'is_active', 'start_date', 'end_date']
  const url = `/api/resource/Service?fields=${encodeURIComponent(JSON.stringify(fields))}&filters=${encodeURIComponent(JSON.stringify([['is_active', '=', '1']]))}`

  const response = await frappeFetch(url, { method: 'GET' }, sid)

  const payload = await response.json().catch(() => null)
  if (!payload) {
    return []
  }

  if (Array.isArray(payload.data)) {
    return payload.data
  }

  return []
}

export async function fetchServiceByName(name, providedSid) {
  if (!name) {
    throw new Error('Missing service name')
  }

  const sid = providedSid ?? (await readCookieFromHeaders())
  if (!sid) {
    throw new Error('Missing session cookie')
  }

  const fields = ['name', 'service_name', 'category', 'description', 'price', 'is_active', 'start_date', 'end_date']
  const url = `/api/resource/Service/${encodeURIComponent(name)}?fields=${encodeURIComponent(JSON.stringify(fields))}`

  const response = await frappeFetch(url, { method: 'GET' }, sid)
  const payload = await response.json().catch(() => null)

  if (!payload) {
    return null
  }

  if (payload.data) {
    return payload.data
  }

  return payload
}

export async function registerCustomer(payload) {
  const response = await frappeFetch('/api/method/seagera_portal.api.register_customer', {
    method: 'POST',
    body: JSON.stringify(payload),
  })

  const responsePayload = await response.json()
  const message = responsePayload?.message

  const setCookies = getSetCookieArray(response)
  const sidCookie = setCookies
    .map((cookie) => parseSetCookie(cookie))
    .find((cookie) => cookie?.name === FRAPPE_SESSION_COOKIE)

  if (!sidCookie || !sidCookie.value) {
    throw new Error('Registration succeeded but did not receive a session cookie from Frappe.')
  }

  const user = await fetchCurrentUser(sidCookie.value)

  return {
    sid: sidCookie.value,
    cookieAttributes: {
      maxAge: sidCookie.maxAge,
      expires: sidCookie.expires,
    },
    user,
    message,
  }
}



export async function fetchCustomerProfile(sid, { profileId, email } = {}) {
  if (!sid) {
    return null
  }

  let url = null

  if (profileId) {
    url = `/api/resource/Customer Profile/${encodeURIComponent(profileId)}?fields=${encodeURIComponent(
      JSON.stringify(['*'])
    )}`
  } else if (email) {
    const filters = encodeURIComponent(JSON.stringify([['user', '=', email]]))
    url = `/api/resource/Customer Profile?filters=${filters}&fields=${encodeURIComponent(
      JSON.stringify(['*'])
    )}`
  } else {
    return null
  }

  try {
    const response = await frappeFetch(url, { method: 'GET' }, sid)
    const payload = await response.json().catch(() => null)

    if (!payload) {
      return null
    }

    if (payload.data) {
      if (Array.isArray(payload.data)) {
        return payload.data[0] ?? null
      }
      return payload.data
    }

    return payload
  } catch (error) {
    console.error('Failed to fetch customer profile', error)
    return null
  }
}

