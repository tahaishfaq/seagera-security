"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Ticket,
  HelpCircle,
  FolderOpen,
  User,
  Settings,
  Shield,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Services", href: "/dashboard/services", icon: Shield },
  { name: "Tickets", href: "/dashboard/tickets", icon: Ticket },
  { name: "FAQ", href: "/dashboard/faq", icon: HelpCircle },
  { name: "Documents", href: "/dashboard/docs", icon: FolderOpen },
  { name: "Your Contact", href: "/dashboard/contact", icon: User },
  { name: "Profile", href: "/dashboard/profile", icon: Settings },
]

export function PortalSidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <aside
      className={cn(
        "sticky top-16 hidden h-[calc(100vh-4rem)] border-r border-border bg-card/80 backdrop-blur lg:flex lg:flex-col lg:gap-y-2.5 py-2.5",
        collapsed ? "w-20" : "w-64"
      )}
    >
      <div className={cn("flex items-center justify-end px-4", collapsed ? "justify-center" : "")}>
      
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full text-muted-foreground hover:text-foreground"
          onClick={() => setCollapsed((prev) => !prev)}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>
      <nav className="flex-1 overflow-y-auto px-2 space-y-2.5 py-3">
        {navigation.map((item) => {
          const isRootDashboard = item.href === "/dashboard"
          const isActive = isRootDashboard
            ? pathname === "/dashboard"
            : pathname === item.href || pathname.startsWith(item.href + "/")
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-xl p-3 text-sm font-medium transition-colors",
                "hover:bg-accent hover:text-accent-foreground",
                "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                isActive ? "bg-primary text-primary-foreground" : "text-muted-foreground",
                collapsed ? "justify-center px-3" : ""
              )}
            >
              <item.icon className="h-5 w-5" />
              {!collapsed ? <span className="truncate">{item.name}</span> : null}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
