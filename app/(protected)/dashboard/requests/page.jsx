import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { StatusPill } from "@/components/status-pill"
import { Search, Plus, ExternalLink } from "lucide-react"
import Link from "next/link"

// Mock data
const requests = [
  {
    id: 1,
    subject: "Add camera to loading dock",
    service: "24/7 Security Monitoring",
    status: "pending",
    updated: "Mar 15, 2024",
    description: "Request to install additional camera coverage in loading dock area",
  },
  {
    id: 2,
    subject: "Extend monitoring hours",
    service: "24/7 Security Monitoring",
    status: "closed",
    updated: "Feb 28, 2024",
    description: "Request to extend monitoring coverage to include weekends",
  },
  {
    id: 3,
    subject: "Additional patrol rounds",
    service: "Mobile Patrol Service",
    status: "open",
    updated: "Mar 18, 2024",
    description: "Request for extra patrol rounds during evening hours",
  },
  {
    id: 4,
    subject: "Access card replacement",
    service: "Access Control System",
    status: "closed",
    updated: "Mar 10, 2024",
    description: "Request new access cards for 5 employees",
  },
  {
    id: 5,
    subject: "Security assessment",
    service: "Security Consultation",
    status: "pending",
    updated: "Mar 20, 2024",
    description: "Request comprehensive security assessment for new building wing",
  },
]

export default function RequestsPage() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-balance text-3xl font-bold tracking-tight text-foreground lg:text-4xl">
            Service Requests
          </h1>
          <p className="mt-2 text-pretty text-base text-muted-foreground lg:text-lg">
            View and manage your service requests
          </p>
        </div>
        <Button asChild size="lg" className="h-12 rounded-xl text-base">
          <Link href="/dashboard/requests/new">
            <Plus className="mr-2 h-5 w-5" />
            New Request
          </Link>
        </Button>
      </div>

      {/* Search */}
      <Card className="rounded-2xl">
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search requests by subject or service..."
              className="h-12 rounded-xl pl-10 text-base"
            />
          </div>
        </CardContent>
      </Card>

      {/* Requests List */}
      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle className="text-xl">All Requests</CardTitle>
          <CardDescription className="text-base">Your service modification requests</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {requests.map((request) => (
              <div
                key={request.id}
                className="flex flex-col gap-4 rounded-xl border border-border bg-muted/30 p-5 transition-shadow hover:shadow-md"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex-1 space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-lg font-semibold text-foreground">{request.subject}</h3>
                      <StatusPill status={request.status} />
                    </div>
                    <p className="text-sm text-muted-foreground">{request.description}</p>
                    <div className="flex flex-wrap gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Service: </span>
                        <span className="font-medium text-foreground">{request.service}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Updated: </span>
                        <span className="font-medium text-foreground">{request.updated}</span>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="rounded-lg bg-transparent sm:mt-0">
                    <Link href={`/dashboard/requests/${request.id}`} className="flex items-center">
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

      {/* Empty State (hidden when there are requests) */}
      {requests.length === 0 && (
        <Card className="rounded-2xl">
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
              <Plus className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="mb-2 text-xl font-semibold text-foreground">No requests yet</h3>
            <p className="mb-6 max-w-md text-base text-muted-foreground">
              You haven't submitted any service requests. Click the button below to request additional services or
              modifications.
            </p>
            <Button asChild size="lg" className="h-12 rounded-xl text-base">
              <Link href="/dashboard/requests/new">
                <Plus className="mr-2 h-5 w-5" />
                Create Your First Request
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
