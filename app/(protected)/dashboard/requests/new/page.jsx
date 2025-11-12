import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, FileText } from "lucide-react"
import Link from "next/link"

const services = [
  "24/7 Security Monitoring",
  "Mobile Patrol Service",
  "Access Control System",
  "CCTV Installation & Maintenance",
  "Security Consultation",
  "Alarm Response Service",
]

export default function NewRequestPage() {
  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Button variant="ghost" size="sm" asChild className="rounded-lg">
        <Link href="/dashboard/requests">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Requests
        </Link>
      </Button>

      {/* Page Header */}
      <div>
        <h1 className="text-balance text-3xl font-bold tracking-tight text-foreground lg:text-4xl">
          New Service Request
        </h1>
        <p className="mt-2 text-pretty text-base text-muted-foreground lg:text-lg">
          Request modifications or additions to your existing services
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Form */}
        <div className="lg:col-span-2">
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <FileText className="h-5 w-5" />
                Request Details
              </CardTitle>
              <CardDescription className="text-base">
                Provide details about your service modification request
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="service" className="text-base">
                    Related Service
                  </Label>
                  <Select>
                    <SelectTrigger id="service" className="h-12 rounded-xl text-base">
                      <SelectValue placeholder="Select the service this request relates to" />
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
                  <Label htmlFor="subject" className="text-base">
                    Request Subject
                  </Label>
                  <Input
                    id="subject"
                    type="text"
                    placeholder="Brief description of your request"
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
                      <SelectValue placeholder="Select priority level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low - Can wait 1-2 weeks</SelectItem>
                      <SelectItem value="medium">Medium - Needed within a week</SelectItem>
                      <SelectItem value="high">High - Needed within 2-3 days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-base">
                    Detailed Description
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Provide a detailed description of what you need. Include any specific requirements, locations, or timing considerations..."
                    className="min-h-[200px] rounded-xl text-base"
                    required
                  />
                  <p className="text-sm text-muted-foreground">
                    Be as specific as possible to help us process your request quickly
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact" className="text-base">
                    Preferred Contact Method
                  </Label>
                  <Select>
                    <SelectTrigger id="contact" className="h-12 rounded-xl text-base">
                      <SelectValue placeholder="How should we contact you?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="phone">Phone Call</SelectItem>
                      <SelectItem value="both">Email and Phone</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <Button type="submit" size="lg" className="h-12 flex-1 rounded-xl text-base">
                    Submit Request
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="lg"
                    asChild
                    className="h-12 rounded-xl text-base sm:w-auto bg-transparent"
                  >
                    <Link href="/dashboard/requests">Cancel</Link>
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
              <CardTitle className="text-lg">What to Expect</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm leading-relaxed">
              <div>
                <p className="font-semibold text-foreground">1. Review</p>
                <p className="text-muted-foreground">Our team will review your request within 1 business day</p>
              </div>
              <div>
                <p className="font-semibold text-foreground">2. Assessment</p>
                <p className="text-muted-foreground">We'll assess feasibility and provide a quote if applicable</p>
              </div>
              <div>
                <p className="font-semibold text-foreground">3. Approval</p>
                <p className="text-muted-foreground">Once approved, we'll schedule implementation</p>
              </div>
              <div>
                <p className="font-semibold text-foreground">4. Completion</p>
                <p className="text-muted-foreground">You'll receive confirmation when the work is complete</p>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle className="text-lg">Need Help?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm leading-relaxed">
              <p className="text-muted-foreground">
                Not sure what to request? Our support team can help you determine the best solution.
              </p>
              <Button variant="outline" size="lg" className="h-11 w-full rounded-xl bg-transparent">
                Contact Support
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
