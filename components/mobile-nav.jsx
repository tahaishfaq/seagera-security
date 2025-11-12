"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { LayoutDashboard, Shield, Ticket, HelpCircle, FolderOpen, User, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Services", href: "/dashboard/services", icon: Shield },
  { name: "Tickets", href: "/dashboard/tickets", icon: Ticket },
  { name: "FAQ", href: "/dashboard/faq", icon: HelpCircle },
  { name: "Documents", href: "/dashboard/docs", icon: FolderOpen },
  { name: "Your Contact", href: "/dashboard/contact", icon: User },
  { name: "Profile", href: "/dashboard/profile", icon: Settings },
]

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  return (
    <div className="lg:hidden">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
          <nav className="fixed inset-x-4 bottom-24 z-40 rounded-2xl border border-border bg-card p-4 shadow-xl">
            <div className="flex flex-col gap-1">
              {navigation.map((item) => {
                const isRootDashboard = item.href === "/dashboard"
                const isActive = isRootDashboard
                  ? pathname === "/dashboard"
                  : pathname === item.href || pathname.startsWith(item.href + "/")
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "flex items-center gap-3 rounded-xl px-4 py-3 text-base font-medium transition-colors",
                      "hover:bg-accent hover:text-accent-foreground",
                      "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                      isActive ? "bg-primary text-primary-foreground" : "text-muted-foreground",
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.name}
                  </Link>
                )
              })}
            </div>
          </nav>
        </>
      )}
    </div>
  )
}
