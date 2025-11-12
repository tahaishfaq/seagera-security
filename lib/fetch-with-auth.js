export async function fetchWithAuth(input, init = {}) {
  const { parseJson, ...requestInit } = init
  const headers = new Headers(requestInit.headers ?? {})
  if (!headers.has('Accept')) {
    headers.set('Accept', 'application/json')
  }
  if (!headers.has('Content-Type') && requestInit.body && !(requestInit.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json')
  }

  const response = await fetch(input, {
    ...requestInit,
    headers,
    credentials: 'include',
  })

  const payload = parseJson === false ? null : await safeParseJson(response)

  if (!response.ok) {
    const errorMessage =
      (payload && typeof payload === 'object' && 'error' in payload && payload.error) ||
      `Request failed with status ${response.status}`
    throw new Error(String(errorMessage))
  }

  return payload
}

async function safeParseJson(response) {
  const contentType = response.headers.get('content-type') ?? ''
  if (!contentType.includes('application/json')) {
    return null
  }

  try {
    return await response.json()
  } catch {
    return null
  }
}

