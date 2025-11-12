import Image from "next/image"
import Link from "next/link"
import { UserCircle2, ShieldCheck, CalendarCheck, TicketCheck } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { StatusPill } from "@/components/status-pill"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import LogoutButton from "@/components/logout-button"
import { requireServerUser } from "@/lib/server-auth"
import { Plus, Ticket, FileText, Download, ExternalLink } from "lucide-react"

// Mock data - in real app, this would come from API
const activeServices = [
  {
    id: 1,
    name: "24/7 Security Monitoring",
    category: "Surveillance",
    status: "active",
    startDate: "Jan 15, 2024",
    endDate: "Jan 15, 2025",
  },
  {
    id: 2,
    name: "Access Control System",
    category: "Physical Security",
    status: "active",
    startDate: "Feb 1, 2024",
    endDate: "Feb 1, 2025",
  },
  {
    id: 3,
    name: "Mobile Patrol Service",
    category: "On-Site Security",
    status: "paused",
    startDate: "Mar 10, 2024",
    endDate: "Mar 10, 2025",
  },
]

const recentTickets = [
  {
    id: 1,
    subject: "Camera 3 offline in parking lot",
    status: "open",
    created: "2 days ago",
  },
  {
    id: 2,
    subject: "Access card not working",
    status: "closed",
    created: "1 week ago",
  },
  {
    id: 3,
    subject: "Request patrol schedule change",
    status: "in-progress",
    created: "3 days ago",
  },
]

const documents = [
  { id: 1, name: "Service Agreement 2024", type: "PDF" },
  { id: 2, name: "Emergency Procedures Guide", type: "PDF" },
  { id: 3, name: "Monthly Security Report - March", type: "PDF" },
]

const faqs = [
  {
    question: "How do I request additional security services?",
    answer:
      'You can request extra services by clicking the "Request Extra Service" button on your dashboard or by visiting the Services page. Fill out the form with your requirements, and our team will respond within 24 hours.',
  },
  {
    question: "What should I do in case of an emergency?",
    answer:
      "In case of an emergency, immediately call our 24/7 office at 1-800-555-0100. Our emergency response team is available around the clock to assist you. For non-urgent matters, you can open a ticket through the portal.",
  },
  {
    question: "How can I view my service history?",
    answer:
      "Navigate to the Services page to see all your current and past services. Each service card shows detailed information including status, dates, and related documents. You can also filter services by status or category.",
  },
  {
    question: "Can I pause my security service temporarily?",
    answer:
      "Yes, you can request to pause your service by opening a ticket or contacting your account manager directly. Please provide at least 48 hours notice for service modifications. Some services may have minimum contract requirements.",
  },
]

export default async function DashboardPage() {
  const { user, profile, roles } = await requireServerUser()
  const displayName = user.full_name || profile?.customer_name || user.name

  return (
    <div className="space-y-8">
      {/* Authenticated hero */}
      <div className="rounded-3xl border border-border bg-card/70 p-6 shadow-sm">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div className="flex flex-1 items-center gap-4">
            {user.user_image ? (
              <div className="relative h-16 w-16 overflow-hidden rounded-full border border-border">
                <Image src={user.user_image} alt={displayName} fill sizes="64px" className="object-cover" />
              </div>
            ) : (
              <div className="flex h-16 w-16 items-center justify-center rounded-full border border-border bg-muted">
                <UserCircle2 className="h-10 w-10 text-muted-foreground" />
              </div>
            )}
      <div>
              <p className="text-sm font-medium uppercase tracking-wide text-muted-foreground">Authenticated Analyst</p>
              <h1 className="text-3xl font-semibold text-foreground lg:text-4xl">{displayName}</h1>
              <p className="mt-1 text-sm text-muted-foreground">{user.email}</p>
            </div>
          </div>
          <div className="flex flex-col items-stretch justify-end gap-3 sm:flex-row">
            <div className="flex items-center gap-3 rounded-2xl border border-border bg-background/80 px-4 py-3 text-sm text-muted-foreground">
              <ShieldCheck className="h-4 w-4 text-primary" />
              <span>Role: {roles?.join(', ') || user.user_type || "Customer"}</span>
            </div>
            <LogoutButton />
          </div>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-border bg-background/70 p-4">
            <div className="flex items-center gap-3">
              <CalendarCheck className="h-5 w-5 text-primary" />
              <p className="text-sm font-semibold text-foreground">Next Security Review</p>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">Scheduled for May 12, 2025 at 14:00 UTC</p>
          </div>
          <div className="rounded-2xl border border-border bg-background/70 p-4">
            <div className="flex items-center gap-3">
              <TicketCheck className="h-5 w-5 text-primary" />
              <p className="text-sm font-semibold text-foreground">Open Tickets</p>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">3 active investigations awaiting your review</p>
          </div>
          <div className="rounded-2xl border border-border bg-background/70 p-4">
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-5 w-5 text-primary" />
              <p className="text-sm font-semibold text-foreground">Portal Access</p>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">Last login recorded moments ago from your current session</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <Card className="rounded-2xl border-2">
        <CardHeader>
          <CardTitle className="text-xl">Quick Actions</CardTitle>
          <CardDescription className="text-base">Common tasks you can perform</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="h-14 flex-1 rounded-xl text-base">
              <Link href="/dashboard/services/request">
                <Plus className="mr-2 h-5 w-5" />
                Request Extra Service
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-14 flex-1 rounded-xl text-base bg-transparent">
              <Link href="/dashboard/tickets/new">
                <Ticket className="mr-2 h-5 w-5" />
                Open Ticket
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Active Services */}
      <div>
        <h2 className="mb-4 text-2xl font-bold text-foreground">Your Active Services</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {activeServices.map((service) => (
            <Card key={service.id} className="rounded-2xl transition-shadow hover:shadow-lg">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg leading-tight">{service.name}</CardTitle>
                    <CardDescription className="mt-1 text-sm">{service.category}</CardDescription>
                  </div>
                  <StatusPill status={service.status} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex justify-between">
                    <span>Start Date:</span>
                    <span className="font-medium text-foreground">{service.startDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>End Date:</span>
                    <span className="font-medium text-foreground">{service.endDate}</span>
                  </div>
                </div>
                <Button asChild variant="link" className="mt-4 h-auto p-0 text-base">
                  <Link href={`/dashboard/services/${service.id}`}>
                    View Details
                    <ExternalLink className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Recent Tickets */}
      <Card className="rounded-2xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl">Recent Tickets</CardTitle>
              <CardDescription className="text-base">Your latest support requests</CardDescription>
            </div>
            <Button asChild variant="outline" className="rounded-xl bg-transparent">
              <Link href="/dashboard/tickets">View All</Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentTickets.map((ticket) => (
              <div
                key={ticket.id}
                className="flex flex-col gap-3 rounded-xl border border-border bg-muted/30 p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex-1">
                  <p className="font-medium text-foreground">{ticket.subject}</p>
                  <p className="mt-1 text-sm text-muted-foreground">Created {ticket.created}</p>
                </div>
                <div className="flex items-center gap-3">
                  <StatusPill status={ticket.status} />
                  <Button asChild variant="ghost" size="sm" className="rounded-lg">
                    <Link href={`/dashboard/tickets/${ticket.id}`}>View</Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Helpful Documents */}
      <Card className="rounded-2xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl">Helpful Documents</CardTitle>
              <CardDescription className="text-base">Important files and reports</CardDescription>
            </div>
            <Button asChild variant="outline" className="rounded-xl bg-transparent">
              <Link href="/dashboard/docs">View All</Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {documents.map((doc) => (
              <div
                key={doc.id}
                className="flex items-center justify-between rounded-xl border border-border bg-muted/30 p-4"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{doc.name}</p>
                    <p className="text-sm text-muted-foreground">{doc.type}</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="rounded-lg">
                  <Download className="h-4 w-4" />
                  <span className="sr-only">Download {doc.name}</span>
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* FAQ Preview */}
      <Card className="rounded-2xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl">Frequently Asked Questions</CardTitle>
              <CardDescription className="text-base">Quick answers to common questions</CardDescription>
            </div>
            <Button asChild variant="outline" className="rounded-xl bg-transparent">
              <Link href="/dashboard/faq">View All</Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-base font-medium hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-base leading-relaxed text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  )
}
