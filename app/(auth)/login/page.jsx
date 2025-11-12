'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { Shield, Phone, Eye, EyeOff } from 'lucide-react'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { fetchWithAuth } from '@/lib/fetch-with-auth'
import { useAuthStore } from '@/stores/auth-store'
import { useToast } from '@/hooks/use-toast'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const setSession = useAuthStore((state) => state.setSession)
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectTo = searchParams?.get('redirectTo') || '/dashboard'
  const { toast } = useToast()

  async function handleSubmit(event) {
    event.preventDefault()
    setError(null)

    try {
      setSubmitting(true)
      const response = await fetchWithAuth('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      })

      setSession(response)
      router.push(redirectTo)
      router.refresh()
    } catch (err) {
      console.error('Login failed', err)
      const message = err instanceof Error ? err.message : 'Unable to sign in'
      setError(message)
      toast({
        title: 'Authentication failed',
        description: message,
        variant: 'destructive',
      })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="border-b border-border bg-background">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-foreground">
              <Shield className="h-6 w-6 text-background" />
            </div>
            <span className="text-xl font-bold text-foreground">SecureGuard</span>
          </Link>
          <div className="flex items-center gap-3">
            <div className="relative flex h-12 w-12 items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-destructive opacity-20 blur-sm" />
              <div className="relative flex h-11 w-11 items-center justify-center rounded-full bg-foreground">
                <Phone className="h-5 w-5 text-background" />
              </div>
            </div>
            <div className="hidden flex-col sm:flex">
              <span className="text-xs font-medium text-muted-foreground">24/7 Emergency</span>
              <a href="tel:1-800-555-0100" className="text-sm font-bold text-foreground hover:text-primary">
                1-800-555-0100
              </a>
            </div>
          </div>
        </div>
      </header>

      <main className="flex flex-1 items-center justify-center p-6">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center">
            <h1 className="text-balance text-3xl font-bold tracking-tight text-foreground">Welcome Back</h1>
            <p className="mt-2 text-pretty text-base text-muted-foreground">Sign in to access your customer portal</p>
          </div>

          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle className="text-2xl">Sign In</CardTitle>
              <CardDescription className="text-base">Enter your credentials to continue</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-5" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-base">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@company.com"
                    className="h-12 rounded-xl text-base"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="text-base">
                      Password
                    </Label>
                    <Link href="/forgot-password" className="text-sm font-medium text-primary hover:text-primary/80">
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter your password"
                      className="h-12 rounded-xl text-base pr-12"
                      autoComplete="current-password"
                      required
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute inset-y-0 right-3 flex items-center text-muted-foreground transition-colors hover:text-foreground"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Checkbox id="remember" />
                  <label
                    htmlFor="remember"
                    className="text-sm font-medium leading-none text-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Remember me for 30 days
                  </label>
                </div>

                {error ? <p className="text-sm text-destructive">{error}</p> : null}

                <Button type="submit" size="lg" className="h-12 w-full rounded-xl text-base" disabled={submitting}>
                  {submitting ? 'Signing in…' : 'Sign In'}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground">
                  Don't have an account?{' '}
                  <Link href="/register" className="font-semibold text-primary hover:text-primary/80">
                    Create an account
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border-primary/20 bg-primary/5">
            <CardContent className="pt-6">
              <p className="text-center text-sm leading-relaxed text-muted-foreground">
                Need help accessing your account? Contact our support team at{' '}
                <a href="mailto:support@secureguard.com" className="font-semibold text-foreground hover:text-primary">
                  support@secureguard.com
                </a>
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

