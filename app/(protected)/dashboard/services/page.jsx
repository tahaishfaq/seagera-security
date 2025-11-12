import { format } from "date-fns"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { StatusPill } from "@/components/status-pill"
import { Search, Plus, ExternalLink } from "lucide-react"
import Link from "next/link"

import { fetchServices } from "@/lib/frappe-client"
import { requireServerUser } from "@/lib/server-auth"

function normalizeDate(value) {
  if (!value) return "N/A"
  const date = new Date(value)
  if (Number.isNaN(date.valueOf())) return value
  return format(date, "MMM d, yyyy")
}

export default async function ServicesPage() {
  await requireServerUser()
  const services = await fetchServices().catch(() => [])

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-balance text-3xl font-bold tracking-tight text-foreground lg:text-4xl">
            Your Services
          </h1>
          <p className="mt-2 text-pretty text-base text-muted-foreground lg:text-lg">
            View and manage all your security services
          </p>
        </div>
        <Button asChild size="lg" className="h-12 rounded-xl text-base">
          <Link href="/dashboard/services/request">
            <Plus className="mr-2 h-5 w-5" />
            Request Service
          </Link>
        </Button>
      </div>

      <Card className="rounded-2xl">
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search services by name or category..."
              className="h-12 rounded-xl pl-10 text-base"
            />
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        {services.map((service) => (
          <Card key={service.name} className="rounded-2xl transition-shadow hover:shadow-lg">
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <CardTitle className="text-xl leading-tight">{service.service_name ?? service.name}</CardTitle>
                  <CardDescription className="mt-2 text-base">{service.category ?? "Uncategorized"}</CardDescription>
                </div>
                <StatusPill status={service.is_active ? "active" : "ended"} />
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm leading-relaxed text-muted-foreground">
                {service.description ?? "No description provided."}
              </p>

              <div className="space-y-2 rounded-xl bg-muted/50 p-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Start Date:</span>
                  <span className="font-medium text-foreground">{normalizeDate(service.start_date)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">End Date:</span>
                  <span className="font-medium text-foreground">{normalizeDate(service.end_date)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Price:</span>
                  <span className="font-medium text-foreground">
                    {service.price ? Intl.NumberFormat(undefined, { style: "currency", currency: "USD" }).format(service.price) : "N/A"}
                  </span>
                </div>
              </div>

              <Button asChild variant="outline" className="w-full rounded-xl text-base bg-transparent">
                <Link href={`/dashboard/services/${encodeURIComponent(service.name)}`}>
                  View Full Details
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
