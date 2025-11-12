'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Shield, Phone, Eye, EyeOff } from 'lucide-react'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { fetchWithAuth } from '@/lib/fetch-with-auth'
import { useAuthStore } from '@/stores/auth-store'
import { useToast } from '@/hooks/use-toast'

const initialForm = {
  customer_name: '',
  company_name: '',
  email: '',
  password: '',
  phone: '',
  address: '',
}

export default function RegisterPage() {
  const [form, setForm] = useState(initialForm)
  const [submitting, setSubmitting] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const setSession = useAuthStore((state) => state.setSession)
  const router = useRouter()
  const { toast } = useToast()

  function handleChange(event) {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  async function handleSubmit(event) {
    event.preventDefault()

    try {
      setSubmitting(true)
      const response = await fetchWithAuth('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify(form),
      })

      setSession(response)
      router.push('/dashboard')
      router.refresh()
      toast({
        title: 'Registration successful',
        description: 'Your account has been created and you have been signed in.',
      })
    } catch (error) {
      console.error('Register failed', error)
      toast({
        title: 'Registration failed',
        description: error instanceof Error ? error.message : 'Unable to complete registration.',
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
        <div className="w-full max-w-2xl space-y-6">
          <div className="text-center">
            <h1 className="text-balance text-3xl font-bold tracking-tight text-foreground">Create your account</h1>
            <p className="mt-2 text-pretty text-base text-muted-foreground">
              Register to access the SecureGuard customer dashboard
            </p>
          </div>

          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle className="text-2xl">Registration Details</CardTitle>
              <CardDescription className="text-base">
                Tell us about yourself and your organization to get started.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-5" onSubmit={handleSubmit}>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="customer_name">Full name</Label>
                    <Input
                      id="customer_name"
                      name="customer_name"
                      placeholder="Taha Dev"
                      className="h-12 rounded-xl text-base"
                      value={form.customer_name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company_name">Company</Label>
                    <Input
                      id="company_name"
                      name="company_name"
                      placeholder="Your organization"
                      className="h-12 rounded-xl text-base"
                      value={form.company_name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="you@company.com"
                      className="h-12 rounded-xl text-base"
                      value={form.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      name="phone"
                      placeholder="123-123-123"
                      className="h-12 rounded-xl text-base"
                      value={form.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Create a secure password"
                      className="h-12 rounded-xl text-base pr-12"
                      value={form.password}
                      onChange={handleChange}
                      required
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

                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Textarea
                    id="address"
                    name="address"
                    rows={3}
                    placeholder="Building, street, and city"
                    className="rounded-xl text-base"
                    value={form.address}
                    onChange={handleChange}
                    required
                  />
                </div>

                <Button type="submit" size="lg" className="h-12 w-full rounded-xl text-base" disabled={submitting}>
                  {submitting ? 'Registering…' : 'Register'}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground">
                  Already have an account?{' '}
                  <Link href="/login" className="font-semibold text-primary hover:text-primary/80">
                    Sign in
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
