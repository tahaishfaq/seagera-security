import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Download, FileText, Plus } from "lucide-react"
import { format } from "date-fns"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { StatusPill } from "@/components/status-pill"
import { ContactCard } from "@/components/contact-card"
import { fetchServiceByName } from "@/lib/frappe-client"
import { requireServerUser } from "@/lib/server-auth"

function normalizeDate(value) {
  if (!value) return "N/A"
  const date = new Date(value)
  if (Number.isNaN(date.valueOf())) return value
  return format(date, "PPP")
}

export default async function ServiceDetailPage({ params }) {
  await requireServerUser()
  const id = (await params)?.id
  const service = await fetchServiceByName(id).catch(() => null)

  if (!service) {
    notFound()
  }

  const isActive = Boolean(service.is_active)

  return (
    <div className="space-y-8">
      {/* Back Button */}
      <Button asChild variant="ghost" className="rounded-xl">
        <Link href="/dashboard/services">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Services
        </Link>
      </Button>

      {/* Service Hero */}
      <div className="rounded-2xl border-2 border-border bg-linear-to-br from-card to-muted/30 p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex-1 space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <StatusPill status={isActive ? "active" : "ended"} className="text-base px-4 py-2" />
              <span className="text-sm text-muted-foreground">{service.category ?? "Uncategorized"}</span>
            </div>
            <h1 className="text-balance text-3xl font-bold tracking-tight text-foreground lg:text-4xl">
              {service.service_name ?? service.name}
            </h1>
            <p className="text-pretty text-base leading-relaxed text-muted-foreground lg:text-lg">
              {service.description ?? "No description has been provided for this service."}
            </p>
            <div className="flex flex-wrap gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Start Date: </span>
                <span className="font-semibold text-foreground">{normalizeDate(service.start_date)}</span>
              </div>
              <div>
                <span className="text-muted-foreground">End Date: </span>
                <span className="font-semibold text-foreground">{normalizeDate(service.end_date)}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Price: </span>
                <span className="font-semibold text-foreground">
                  {service.price
                    ? Intl.NumberFormat(undefined, { style: "currency", currency: "USD" }).format(Number(service.price))
                    : "Contact us"}
                </span>
              </div>
            </div>
          </div>
          <Button size="lg" className="h-14 rounded-xl text-base lg:w-auto">
            <Plus className="mr-2 h-5 w-5" />
            Request Extra Service
          </Button>
        </div>
      </div>

      {/* Main Content with Sidebar */}
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4 rounded-xl h-auto p-1">
              <TabsTrigger value="overview" className="rounded-lg text-sm py-2.5">
                Overview
              </TabsTrigger>
              <TabsTrigger value="requests" className="rounded-lg text-sm py-2.5">
                Requests
              </TabsTrigger>
              <TabsTrigger value="tickets" className="rounded-lg text-sm py-2.5">
                Tickets
              </TabsTrigger>
              <TabsTrigger value="documents" className="rounded-lg text-sm py-2.5">
                Documents
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-6 space-y-6">
              <Card className="rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-xl">Service Features</CardTitle>
                  <CardDescription className="text-base">
                    {service.description ? "What's included in this service" : "Service overview"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="leading-relaxed text-muted-foreground">
                    {service.description ?? "No additional details provided for this service yet."}
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="requests" className="mt-6">
              <Card className="rounded-2xl">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-xl">Service Requests</CardTitle>
                      <CardDescription className="text-base">
                        Requests related to this service will appear here
                      </CardDescription>
                    </div>
                    <Button size="sm" className="rounded-xl">
                      <Plus className="mr-2 h-4 w-4" />
                      New Request
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex flex-col gap-3 rounded-xl border border-border bg-muted/30 p-4 text-sm text-muted-foreground">
                      No requests have been logged for this service yet.
                      </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="tickets" className="mt-6">
              <Card className="rounded-2xl">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-xl">Support Tickets</CardTitle>
                      <CardDescription className="text-base">
                        Tickets related to this service will appear here
                      </CardDescription>
                    </div>
                    <Button size="sm" className="rounded-xl">
                      <Plus className="mr-2 h-4 w-4" />
                      New Ticket
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex flex-col gap-3 rounded-xl border border-border bg-muted/30 p-4 text-sm text-muted-foreground">
                      No tickets have been recorded for this service yet.
                      </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="documents" className="mt-6">
              <Card className="rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-xl">Service Documents</CardTitle>
                  <CardDescription className="text-base">Files and reports for this service will appear here</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 rounded-xl border border-border bg-muted/30 p-4 text-sm text-muted-foreground">
                    No documents uploaded yet.
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <ContactCard
            name="Sarah Johnson"
            title="Senior Account Manager"
            phone="1-800-555-0123"
            email="sarah.johnson@secureshield.com"
            avatar="/professional-woman-diverse.png"
          />

          <Card className="rounded-2xl bg-muted/50">
            <CardHeader>
              <CardTitle className="text-lg">Need Help?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm leading-relaxed text-muted-foreground">
                Have questions about this service? Contact your account manager or call our 24/7 office.
              </p>
              <Button asChild variant="outline" className="w-full rounded-xl bg-card">
                <Link href="/dashboard/faq">View FAQ</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
