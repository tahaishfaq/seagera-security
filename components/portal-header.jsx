import Image from "next/image"
import Link from "next/link"
import { ChevronDown, Phone, UserCircle2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import LogoutButton from "@/components/logout-button"
import { getServerUser } from "@/lib/server-auth"

export async function PortalHeader() {
  const context = await getServerUser()
  const user = context?.user ?? null
  const profile = context?.profile ?? null
  const roles = context?.roles ?? []
  const displayName = user?.full_name ?? profile?.customer_name ?? user?.name ?? "Security Analyst"
  const email = user?.email ?? profile?.email ?? ""
  const baseUrl = process.env.FRAPPE_BASE_URL ?? ""

  const resolveAvatar = (value) => {
    if (!value) return ""
    if (value.startsWith("http://") || value.startsWith("https://")) {
      return value
    }
    if (!baseUrl) {
      return value
    }
    try {
      return new URL(value, baseUrl || "https://placeholder.local").toString()
    } catch {
      return value
    }
  }

  const avatar =
    resolveAvatar(profile?.profile_image) ||
    resolveAvatar(user?.user_image) ||
    ""

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card/80 backdrop-blur">
      <div className="flex h-16 items-center justify-between px-6 lg:px-8">
        <Link href="/dashboard" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-foreground">
            <span className="font-sans text-lg font-bold text-background">SG</span>
          </div>
          <div className="hidden flex-col sm:flex">
            <span className="font-sans text-lg font-semibold text-foreground">Seagera Security</span>
            <span className="text-xs text-muted-foreground">Security Operations Center</span>
          </div>
        </Link>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 rounded-2xl border border-border bg-background/80 px-4 py-1">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <Phone className="h-5 w-5 text-primary" />
            </div>
            <div className="hidden flex-col sm:flex">
              <span className="text-xs font-medium text-muted-foreground">24/7 Command Center</span>
              <a href="tel:1-800-555-0100" className="text-sm font-semibold text-foreground hover:text-primary">
                1-800-555-0100
              </a>
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-3 rounded-full border-border bg-background/60 py-6">
                {avatar ? (
                  <div className="relative h-8 w-8 overflow-hidden rounded-full border border-border">
                    <Image src={avatar} alt={displayName} fill sizes="32px" className="object-cover" />
                  </div>
                ) : (
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-muted">
                    <UserCircle2 className="h-5 w-5 text-muted-foreground" />
                  </div>
                )}
                <div className="hidden flex-col items-start sm:flex">
                  <span className="text-sm font-semibold leading-tight text-foreground">{displayName}</span>
                  {email ? <span className="text-xs text-muted-foreground">{email}</span> : null}
                </div>
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div className="flex flex-col">
                  <span className="font-medium">{displayName}</span>
                  {email ? <span className="text-xs text-muted-foreground">{email}</span> : null}
                  {roles.length ? (
                    <span className="text-xs text-muted-foreground">{roles.join(', ')}</span>
                  ) : null}
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/dashboard">Overview</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/dashboard/profile">Profile settings</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <LogoutButton className="w-full justify-start rounded-md border-0 px-2 py-2 text-sm font-medium text-destructive hover:bg-destructive/10 hover:text-destructive" />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
