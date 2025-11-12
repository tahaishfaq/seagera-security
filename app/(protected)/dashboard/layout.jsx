import { PortalHeader } from "@/components/portal-header"
import { PortalSidebar } from "@/components/portal-sidebar"
import { MobileNav } from "@/components/mobile-nav"

export default function PortalLayout({ children }) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <PortalHeader />
      <div className="flex flex-1">
        <PortalSidebar />
        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-7xl p-6 lg:p-8">{children}</div>
        </main>
      </div>
      <MobileNav />
    </div>
  )
}
