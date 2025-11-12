import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { StatusPill } from "@/components/status-pill"
import { Search, Plus, ExternalLink, AlertCircle } from "lucide-react"
import Link from "next/link"

// Mock data
const tickets = [
  {
    id: 1,
    subject: "Camera 3 offline in parking lot",
    service: "24/7 Security Monitoring",
    status: "open",
    priority: "high",
    created: "Mar 20, 2024",
    updated: "2 hours ago",
  },
  {
    id: 2,
    subject: "Access card not working",
    service: "Access Control System",
    status: "closed",
    priority: "medium",
    created: "Mar 15, 2024",
    updated: "1 week ago",
  },
  {
    id: 3,
    subject: "Request patrol schedule change",
    service: "Mobile Patrol Service",
    status: "in-progress",
    status: "in-progress",
    priority: "low",
    created: "Mar 18, 2024",
    updated: "3 days ago",
  },
  {
    id: 4,
    subject: "False alarm investigation",
    service: "24/7 Security Monitoring",
    status: "closed",
    priority: "medium",
    created: "Mar 10, 2024",
    updated: "1 week ago",
  },
  {
    id: 5,
    subject: "System maintenance notification",
    service: "Access Control System",
    status: "open",
    priority: "low",
    created: "Mar 22, 2024",
    updated: "1 day ago",
  },
]

export default function TicketsPage() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-balance text-3xl font-bold tracking-tight text-foreground lg:text-4xl">
            Support Tickets
          </h1>
          <p className="mt-2 text-pretty text-base text-muted-foreground lg:text-lg">
            Track and manage your support requests
          </p>
        </div>
        <Button asChild size="lg" className="h-12 rounded-xl text-base">
          <Link href="/dashboard/tickets/new">
            <Plus className="mr-2 h-5 w-5" />
            Open Ticket
          </Link>
        </Button>
      </div>

      {/* Emergency Notice */}
      <Card className="rounded-2xl border-destructive/50 bg-destructive/5">
        <CardContent className="flex items-start gap-4 pt-6">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-destructive/20">
            <AlertCircle className="h-5 w-5 text-destructive" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-foreground">For Emergencies</h3>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              If you have an urgent security emergency, please call our 24/7 office immediately at{" "}
              <a href="tel:1-800-555-0100" className="font-semibold text-foreground hover:text-primary">
                1-800-555-0100
              </a>
              . Do not wait for a ticket response.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Search */}
      <Card className="rounded-2xl">
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search tickets by subject or service..."
              className="h-12 rounded-xl pl-10 text-base"
            />
          </div>
        </CardContent>
      </Card>

      {/* Tickets List */}
      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle className="text-xl">All Tickets</CardTitle>
          <CardDescription className="text-base">Your support and issue tickets</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {tickets.map((ticket) => (
              <div
                key={ticket.id}
                className="flex flex-col gap-4 rounded-xl border border-border bg-muted/30 p-5 transition-shadow hover:shadow-md"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex-1 space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-lg font-semibold text-foreground">{ticket.subject}</h3>
                      <StatusPill status={ticket.status} />
                      {ticket.priority === "high" && (
                        <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-700">
                          High Priority
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Service: </span>
                        <span className="font-medium text-foreground">{ticket.service}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Created: </span>
                        <span className="font-medium text-foreground">{ticket.created}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Updated: </span>
                        <span className="font-medium text-foreground">{ticket.updated}</span>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="rounded-lg bg-transparent sm:mt-0">
                    <Link href={`/dashboard/tickets/${ticket.id}`} className="flex items-center">
                      View Details
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Empty State (hidden when there are tickets) */}
      {tickets.length === 0 && (
        <Card className="rounded-2xl">
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
              <Plus className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="mb-2 text-xl font-semibold text-foreground">No tickets yet</h3>
            <p className="mb-6 max-w-md text-base text-muted-foreground">
              You haven't opened any support tickets. If you're experiencing issues or have questions, click below to
              open a ticket.
            </p>
            <Button asChild size="lg" className="h-12 rounded-xl text-base">
              <Link href="/dashboard/tickets/new">
                <Plus className="mr-2 h-5 w-5" />
                Open Your First Ticket
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
