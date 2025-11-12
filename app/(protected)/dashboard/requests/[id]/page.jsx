import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { StatusPill } from "@/components/status-pill"
import { ArrowLeft, Calendar, Clock, User, FileText, MessageSquare } from "lucide-react"
import Link from "next/link"
import { Textarea } from "@/components/ui/textarea"

// Mock data - in real app, fetch based on params.id
const request = {
  id: 1,
  subject: "Add camera to loading dock",
  service: "24/7 Security Monitoring",
  status: "pending",
  created: "Mar 15, 2024",
  updated: "Mar 20, 2024",
  description:
    "We need to install an additional security camera in our loading dock area to improve coverage. The current setup has a blind spot near the east entrance that we'd like to address. This area sees frequent deliveries and we want to ensure complete visibility for security purposes.",
  requestedBy: "John Smith",
  email: "john.smith@company.com",
  priority: "medium",
  notes: [
    {
      id: 1,
      author: "Support Team",
      date: "Mar 16, 2024",
      time: "10:30 AM",
      message:
        "Thank you for your request. Our technical team will assess the location and provide a quote within 2 business days.",
    },
    {
      id: 2,
      author: "John Smith",
      date: "Mar 18, 2024",
      time: "2:15 PM",
      message: "Thanks! Looking forward to the assessment. Please let me know if you need access to the facility.",
    },
    {
      id: 3,
      author: "Technical Team",
      date: "Mar 20, 2024",
      time: "9:00 AM",
      message:
        "Site assessment completed. We can install a 4K PTZ camera with night vision. Quote sent to your email. Installation can be scheduled within 5 business days of approval.",
    },
  ],
}

export default function RequestDetailPage() {
  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Button variant="ghost" size="sm" asChild className="rounded-lg">
        <Link href="/dashboard/requests">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Requests
        </Link>
      </Button>

      {/* Request Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-balance text-3xl font-bold tracking-tight text-foreground">{request.subject}</h1>
            <StatusPill status={request.status} />
          </div>
          <p className="text-base text-muted-foreground">Request #{request.id}</p>
        </div>
        <Button size="lg" variant="outline" className="h-12 rounded-xl text-base bg-transparent">
          Cancel Request
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="space-y-6 lg:col-span-2">
          {/* Request Details */}
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <FileText className="h-5 w-5" />
                Request Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="mb-2 text-sm font-semibold text-foreground">Description</h3>
                <p className="leading-relaxed text-muted-foreground">{request.description}</p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <h3 className="mb-1 text-sm font-semibold text-foreground">Service Type</h3>
                  <p className="text-muted-foreground">{request.service}</p>
                </div>
                <div>
                  <h3 className="mb-1 text-sm font-semibold text-foreground">Priority</h3>
                  <span className="inline-flex items-center rounded-full bg-amber-100 px-2.5 py-0.5 text-sm font-medium capitalize text-amber-700">
                    {request.priority}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Activity Timeline */}
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <MessageSquare className="h-5 w-5" />
                Activity & Notes
              </CardTitle>
              <CardDescription className="text-base">Communication history for this request</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {request.notes.map((note) => (
                <div key={note.id} className="rounded-xl border border-border bg-muted/30 p-4">
                  <div className="mb-2 flex items-start justify-between">
                    <div>
                      <p className="font-semibold text-foreground">{note.author}</p>
                      <p className="text-sm text-muted-foreground">
                        {note.date} at {note.time}
                      </p>
                    </div>
                  </div>
                  <p className="leading-relaxed text-foreground">{note.message}</p>
                </div>
              ))}

              {/* Add Note Form */}
              <div className="space-y-3 rounded-xl border-2 border-dashed border-border bg-muted/20 p-4">
                <h4 className="font-semibold text-foreground">Add a Note</h4>
                <Textarea
                  placeholder="Type your message or question here..."
                  className="min-h-[100px] rounded-xl text-base"
                />
                <Button size="lg" className="h-11 rounded-xl">
                  Post Note
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Request Info */}
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle className="text-lg">Request Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <Calendar className="mt-0.5 h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-semibold text-foreground">Created</p>
                  <p className="text-sm text-muted-foreground">{request.created}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="mt-0.5 h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-semibold text-foreground">Last Updated</p>
                  <p className="text-sm text-muted-foreground">{request.updated}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <User className="mt-0.5 h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-semibold text-foreground">Requested By</p>
                  <p className="text-sm text-muted-foreground">{request.requestedBy}</p>
                  <p className="text-sm text-muted-foreground">{request.email}</p>
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
                Download Quote
              </Button>
              <Button variant="outline" size="lg" className="h-11 w-full justify-start rounded-xl bg-transparent">
                Schedule Installation
              </Button>
              <Button variant="outline" size="lg" className="h-11 w-full justify-start rounded-xl bg-transparent">
                Contact Support
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
