# SentinelSphere Security Portal

This project is a Next.js 15 customer portal that integrates with an existing Frappe backend for authentication. It proxies all auth-sensitive traffic through Next.js API routes, keeps session cookies `httpOnly`, and hydrates client state from a secure server-side source.

> **Tech note**  
> The application is now authored in plain JavaScript (`.js` / `.jsx`). Only the generated shadcn UI components under `components/ui` continue to use TypeScript for type-safety and can evolve independently.

## Prerequisites

- Node.js 20+
- npm 10+
- A reachable Frappe instance with login, logout, and user endpoints enabled

## Environment Variables

Create a `.env.local` at the project root:

```
FRAPPE_BASE_URL=https://your-frappe-domain
# Optional overrides
# FRAPPE_SESSION_COOKIE_NAME=sid
```

- `FRAPPE_BASE_URL` is required and should point to the upstream Frappe deployment.
- `FRAPPE_SESSION_COOKIE_NAME` defaults to `sid` and only needs to be set if your Frappe instance issues a different session cookie name.

## Installation & Development

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`.

## Authentication Flow

1. `POST /api/auth/register` proxies to `seagera_portal.api.register_customer`, persists the session (`sid`), and seeds the store with the newly created user + customer profile.
2. `POST /api/auth/login` proxies credentials to Frappe (`/api/method/login`), captures the `sid` cookie, and returns sanitized user and profile data.
3. `POST /api/auth/logout` calls Frappe logout and deletes the browser cookie.
4. `GET /api/auth/session` checks the cookie server-side and, if valid, rehydrates the user, roles, and customer profile. Non-portal users are rejected with `403`.

### Server Helpers

- `getServerUser()` in `lib/server-auth.js` — returns the current user, roles, and customer profile or `null` without exposing session data to the client.
- `requireServerUser()` — redirects to `/login` when unauthenticated or unauthorized.

### Client State

- `stores/auth-store.js` stores `authenticated`, `loading`, `user`, `profile`, and `roles` in Zustand (persisted to `sessionStorage`).
- `components/auth-provider.jsx` hydrates the store on boot by calling `/api/auth/session`.
- `lib/fetch-with-auth.js` wraps `fetch` and always sends credentials to Next API routes.

### UI Examples

- `app/(auth)/login/page.jsx` — login form that calls the proxy endpoint, handles unauthorized roles with a shadcn toast, and hydrates the store.
- `app/(auth)/register/page.jsx` — customer onboarding flow that automatically signs the user in after successful registration.
- `app/(protected)/dashboard/page.jsx` — server component protected by `requireServerUser()` that personalises the hero with profile data.
- `app/(protected)/dashboard/tickets/*` — ticket management (list, detail, create) for customers.
- `components/logout-button.jsx` — POSTs to `/api/auth/logout`.

### Route Protection

- `middleware.js` redirects unauthenticated users away from `/dashboard` (and child routes) and prevents authenticated users from visiting `/login`.
- Server components should call `requireServerUser()` to enforce auth before rendering sensitive content.

## Security Notes

- Cookies are `HttpOnly`, `Secure`, `SameSite=Lax`, `Path=/`.
- Frappe credentials and raw cookies never reach the browser; only sanitized user data is returned.
- CSRF: SameSite Lax mitigates standard CSRF. For additional protection, pair with CSRF tokens on mutating routes if needed.
- All upstream calls stay server-side; no Frappe API keys are embedded in client bundles.

## Testing

Manual smoke tests:

1. `npm run dev`
2. Visit `/login`, attempt invalid credentials → expect error message.
3. Log in with valid credentials → should redirect to `/dashboard`.
4. Refresh `/dashboard` to confirm server-side protection works.
5. Click “Sign out” → expect redirect to `/login` and access revoked.

Automated testing (optional):

- Add integration tests with Playwright or Cypress to cover login, session persistence, and logout if needed.

## Troubleshooting

- Missing `FRAPPE_BASE_URL` → login route throws `500`.
- Invalid session cookie → `/api/auth/session` returns `{ authenticated: false }` and clears the cookie.
- Middleware uses cookie presence to gate routes; ensure your Frappe domain and Next.js domain share the same top-level domain when deployed.

