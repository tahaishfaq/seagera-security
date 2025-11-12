import { NextResponse } from 'next/server'

const PROTECTED_PATHS = ['/dashboard']
const AUTH_PATHS = ['/login']

function getSessionCookieName() {
  return process.env.FRAPPE_SESSION_COOKIE_NAME ?? 'sid'
}

export function middleware(request) {
  const { pathname } = request.nextUrl
  const sessionCookieName = getSessionCookieName()
  const hasSession = Boolean(request.cookies.get(sessionCookieName)?.value)

  if (PROTECTED_PATHS.some((path) => pathname.startsWith(path))) {
    if (!hasSession) {
      const loginUrl = new URL('/login', request.url)
      loginUrl.searchParams.set('redirectTo', pathname)
      return NextResponse.redirect(loginUrl)
    }
  }

  if (AUTH_PATHS.some((path) => pathname.startsWith(path)) && hasSession) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/login'],
}

