import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, AlertCircle, Phone } from "lucide-react"
import Link from "next/link"

const services = [
  "24/7 Security Monitoring",
  "Mobile Patrol Service",
  "Access Control System",
  "CCTV Installation & Maintenance",
  "Security Consultation",
  "Alarm Response Service",
]

const issueTypes = [
  "Equipment Malfunction",
  "Service Interruption",
  "Access Issue",
  "Billing Question",
  "Technical Support",
  "General Inquiry",
]

export default function NewTicketPage() {
  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Button variant="ghost" size="sm" asChild className="rounded-lg">
        <Link href="/dashboard/tickets">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Tickets
        </Link>
      </Button>

      {/* Page Header */}
      <div>
        <h1 className="text-balance text-3xl font-bold tracking-tight text-foreground lg:text-4xl">
          Open Support Ticket
        </h1>
        <p className="mt-2 text-pretty text-base text-muted-foreground lg:text-lg">
          Get help with issues or questions about your security services
        </p>
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

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Form */}
        <div className="lg:col-span-2">
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <AlertCircle className="h-5 w-5" />
                Ticket Details
              </CardTitle>
              <CardDescription className="text-base">Provide details about your issue or question</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="service" className="text-base">
                    Related Service
                  </Label>
                  <Select>
                    <SelectTrigger id="service" className="h-12 rounded-xl text-base">
                      <SelectValue placeholder="Select the service this issue relates to" />
                    </SelectTrigger>
                    <SelectContent>
                      {services.map((service) => (
                        <SelectItem key={service} value={service}>
                          {service}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="issueType" className="text-base">
                    Issue Type
                  </Label>
                  <Select>
                    <SelectTrigger id="issueType" className="h-12 rounded-xl text-base">
                      <SelectValue placeholder="What type of issue are you experiencing?" />
                    </SelectTrigger>
                    <SelectContent>
                      {issueTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject" className="text-base">
                    Subject
                  </Label>
                  <Input
                    id="subject"
                    type="text"
                    placeholder="Brief description of the issue"
                    className="h-12 rounded-xl text-base"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="priority" className="text-base">
                    Priority Level
                  </Label>
                  <Select>
                    <SelectTrigger id="priority" className="h-12 rounded-xl text-base">
                      <SelectValue placeholder="How urgent is this issue?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low - General question or minor issue</SelectItem>
                      <SelectItem value="medium">Medium - Issue affecting operations</SelectItem>
                      <SelectItem value="high">High - Critical issue requiring immediate attention</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-base">
                    Detailed Description
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Please describe the issue in detail. Include any error messages, when the issue started, and steps you've already taken..."
                    className="min-h-[200px] rounded-xl text-base"
                    required
                  />
                  <p className="text-sm text-muted-foreground">
                    The more details you provide, the faster we can resolve your issue
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-base">
                    Contact Phone Number
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="(555) 123-4567"
                    className="h-12 rounded-xl text-base"
                    required
                  />
                  <p className="text-sm text-muted-foreground">In case we need to call you about this issue</p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <Button type="submit" size="lg" className="h-12 flex-1 rounded-xl text-base">
                    Submit Ticket
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="lg"
                    asChild
                    className="h-12 rounded-xl text-base sm:w-auto bg-transparent"
                  >
                    <Link href="/dashboard/tickets">Cancel</Link>
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          <Card className="rounded-2xl border-primary/20 bg-primary/5">
            <CardHeader>
              <CardTitle className="text-lg">Response Times</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm leading-relaxed">
              <div>
                <p className="font-semibold text-foreground">High Priority</p>
                <p className="text-muted-foreground">Response within 1 hour</p>
              </div>
              <div>
                <p className="font-semibold text-foreground">Medium Priority</p>
                <p className="text-muted-foreground">Response within 4 hours</p>
              </div>
              <div>
                <p className="font-semibold text-foreground">Low Priority</p>
                <p className="text-muted-foreground">Response within 1 business day</p>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle className="text-lg">Before You Submit</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm leading-relaxed">
              <p className="text-muted-foreground">Check if your question is answered in our FAQ section:</p>
              <Button variant="outline" size="lg" asChild className="h-11 w-full rounded-xl bg-transparent">
                <Link href="/dashboard/faq">View FAQ</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border-destructive/20 bg-destructive/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Phone className="h-5 w-5" />
                24/7 Emergency Line
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm leading-relaxed">
              <p className="text-muted-foreground">For immediate security emergencies:</p>
              <Button size="lg" className="h-11 w-full rounded-xl bg-destructive hover:bg-destructive/90">
                <a href="tel:1-800-555-0100">Call 1-800-555-0100</a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
