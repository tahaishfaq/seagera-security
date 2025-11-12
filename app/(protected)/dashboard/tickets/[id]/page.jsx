import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { StatusPill } from "@/components/status-pill"
import { ArrowLeft, Calendar, Clock, User, AlertCircle, MessageSquare, CheckCircle2 } from "lucide-react"
import Link from "next/link"
import { Textarea } from "@/components/ui/textarea"

// Mock data - in real app, fetch based on params.id
const ticket = {
  id: 1,
  subject: "Camera 3 offline in parking lot",
  service: "24/7 Security Monitoring",
  status: "open",
  priority: "high",
  created: "Mar 20, 2024",
  updated: "2 hours ago",
  description:
    "Camera 3 in the north parking lot appears to be offline. The feed is not showing in our monitoring dashboard and we're unable to view any footage from this camera. This is a critical area that needs constant surveillance.",
  reportedBy: "Sarah Johnson",
  email: "sarah.johnson@company.com",
  assignedTo: "Technical Support Team",
  responses: [
    {
      id: 1,
      author: "Support Team",
      role: "Support Agent",
      date: "Mar 20, 2024",
      time: "10:45 AM",
      message:
        "Thank you for reporting this issue. We've received your ticket and our technical team has been notified. We're investigating the camera connectivity issue.",
    },
    {
      id: 2,
      author: "Technical Team",
      role: "Technician",
      date: "Mar 20, 2024",
      time: "11:30 AM",
      message:
        "We've identified a network connectivity issue affecting Camera 3. A technician is being dispatched to your location and should arrive within 2 hours to resolve the issue.",
    },
    {
      id: 3,
      author: "Sarah Johnson",
      role: "Customer",
      date: "Mar 20, 2024",
      time: "11:45 AM",
      message:
        "Thank you for the quick response. I'll make sure someone is available to provide access to the camera location.",
    },
  ],
}

export default function TicketDetailPage() {
  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Button variant="ghost" size="sm" asChild className="rounded-lg">
        <Link href="/dashboard/tickets">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Tickets
        </Link>
      </Button>

      {/* Ticket Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-balance text-3xl font-bold tracking-tight text-foreground">{ticket.subject}</h1>
            <StatusPill status={ticket.status} />
            {ticket.priority === "high" && (
              <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-1 text-sm font-medium text-red-700">
                High Priority
              </span>
            )}
          </div>
          <p className="text-base text-muted-foreground">Ticket #{ticket.id}</p>
        </div>
        <Button size="lg" variant="outline" className="h-12 rounded-xl text-base bg-transparent">
          <CheckCircle2 className="mr-2 h-5 w-5" />
          Mark as Resolved
        </Button>
      </div>

      {/* Priority Alert for High Priority Tickets */}
      {ticket.priority === "high" && (
        <Card className="rounded-2xl border-destructive/50 bg-destructive/5">
          <CardContent className="flex items-start gap-4 pt-6">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-destructive/20">
              <AlertCircle className="h-5 w-5 text-destructive" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground">High Priority Issue</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                This ticket has been marked as high priority and our team is working to resolve it as quickly as
                possible. For immediate assistance, call{" "}
                <a href="tel:1-800-555-0100" className="font-semibold text-foreground hover:text-primary">
                  1-800-555-0100
                </a>
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="space-y-6 lg:col-span-2">
          {/* Ticket Details */}
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <AlertCircle className="h-5 w-5" />
                Issue Description
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <p className="leading-relaxed text-muted-foreground">{ticket.description}</p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <h3 className="mb-1 text-sm font-semibold text-foreground">Related Service</h3>
                  <p className="text-muted-foreground">{ticket.service}</p>
                </div>
                <div>
                  <h3 className="mb-1 text-sm font-semibold text-foreground">Assigned To</h3>
                  <p className="text-muted-foreground">{ticket.assignedTo}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Responses Timeline */}
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <MessageSquare className="h-5 w-5" />
                Ticket Responses
              </CardTitle>
              <CardDescription className="text-base">Communication history for this ticket</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {ticket.responses.map((response) => (
                <div key={response.id} className="rounded-xl border border-border bg-muted/30 p-4">
                  <div className="mb-2 flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-foreground">{response.author}</p>
                        <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                          {response.role}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {response.date} at {response.time}
                      </p>
                    </div>
                  </div>
                  <p className="leading-relaxed text-foreground">{response.message}</p>
                </div>
              ))}

              {/* Add Response Form */}
              <div className="space-y-3 rounded-xl border-2 border-dashed border-border bg-muted/20 p-4">
                <h4 className="font-semibold text-foreground">Add a Response</h4>
                <Textarea
                  placeholder="Type your response or provide additional information..."
                  className="min-h-[100px] rounded-xl text-base"
                />
                <Button size="lg" className="h-11 rounded-xl">
                  Post Response
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Ticket Info */}
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle className="text-lg">Ticket Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <Calendar className="mt-0.5 h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-semibold text-foreground">Created</p>
                  <p className="text-sm text-muted-foreground">{ticket.created}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="mt-0.5 h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-semibold text-foreground">Last Updated</p>
                  <p className="text-sm text-muted-foreground">{ticket.updated}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <User className="mt-0.5 h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-semibold text-foreground">Reported By</p>
                  <p className="text-sm text-muted-foreground">{ticket.reportedBy}</p>
                  <p className="text-sm text-muted-foreground">{ticket.email}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" size="lg" className="h-11 w-full justify-start rounded-xl bg-transparent">
                Escalate Ticket
              </Button>
              <Button variant="outline" size="lg" className="h-11 w-full justify-start rounded-xl bg-transparent">
                Request Callback
              </Button>
              <Button variant="outline" size="lg" className="h-11 w-full justify-start rounded-xl bg-transparent">
                View Related Tickets
              </Button>
            </CardContent>
          </Card>

          {/* Emergency Contact */}
          <Card className="rounded-2xl border-destructive/20 bg-destructive/5">
            <CardHeader>
              <CardTitle className="text-lg">Need Immediate Help?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm leading-relaxed">
              <p className="text-muted-foreground">For urgent security issues, call our 24/7 emergency line:</p>
              <Button size="lg" className="h-11 w-full rounded-xl bg-destructive hover:bg-destructive/90">
                <a href="tel:1-800-555-0100" className="flex items-center">
                  Call 1-800-555-0100
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
