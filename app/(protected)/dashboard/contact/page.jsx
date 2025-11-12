import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Phone, Mail, Clock, MapPin, MessageSquare, Calendar } from "lucide-react"
import Link from "next/link"

export default function ContactPage() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-balance text-3xl font-bold tracking-tight text-foreground lg:text-4xl">Your Contact</h1>
        <p className="mt-2 text-pretty text-base text-muted-foreground lg:text-lg">
          Get in touch with your dedicated account manager
        </p>
      </div>

      {/* Account Manager Card */}
      <Card className="rounded-2xl border-2">
        <CardHeader>
          <CardTitle className="text-2xl">Your Account Manager</CardTitle>
          <CardDescription className="text-base">Your dedicated point of contact</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-8 lg:flex-row">
            {/* Profile Section */}
            <div className="flex flex-col items-center gap-4 lg:items-start">
              <Avatar className="h-32 w-32 border-4 border-border">
                <AvatarImage src="/professional-woman-diverse.png" alt="Sarah Johnson" />
                <AvatarFallback className="bg-primary text-3xl text-primary-foreground">SJ</AvatarFallback>
              </Avatar>
              <div className="text-center lg:text-left">
                <h2 className="text-2xl font-bold text-foreground">Sarah Johnson</h2>
                <p className="mt-1 text-lg text-muted-foreground">Senior Account Manager</p>
                <p className="mt-2 text-sm text-muted-foreground">Serving you since January 2024</p>
              </div>
            </div>

            {/* Contact Information */}
            <div className="flex-1 space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                {/* Phone */}
                <div className="flex items-start gap-4 rounded-xl border border-border bg-muted/30 p-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">Direct Phone</h3>
                    <a
                      href="tel:1-800-555-0123"
                      className="mt-1 block text-lg font-semibold text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded"
                    >
                      1-800-555-0123
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4 rounded-xl border border-border bg-muted/30 p-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">Email</h3>
                    <a
                      href="mailto:sarah.johnson@secureshield.com"
                      className="mt-1 block break-all text-sm font-semibold text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded"
                    >
                      sarah.johnson@secureshield.com
                    </a>
                  </div>
                </div>

                {/* Office Hours */}
                <div className="flex items-start gap-4 rounded-xl border border-border bg-muted/30 p-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">Office Hours</h3>
                    <p className="mt-1 text-sm text-muted-foreground">Monday - Friday</p>
                    <p className="text-sm font-semibold text-foreground">9:00 AM - 5:00 PM EST</p>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-4 rounded-xl border border-border bg-muted/30 p-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">Office Location</h3>
                    <p className="mt-1 text-sm text-muted-foreground">SecureShield HQ</p>
                    <p className="text-sm text-muted-foreground">New York, NY</p>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg" className="h-12 flex-1 rounded-xl text-base">
                  <a href="mailto:sarah.johnson@secureshield.com">
                    <MessageSquare className="mr-2 h-5 w-5" />
                    Send Email
                  </a>
                </Button>
                <Button asChild variant="outline" size="lg" className="h-12 flex-1 rounded-xl text-base bg-transparent">
                  <a href="tel:1-800-555-0123">
                    <Phone className="mr-2 h-5 w-5" />
                    Call Now
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 24/7 Emergency Contact */}
      <Card className="rounded-2xl border-2 border-destructive/50 bg-destructive/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary ring-4 ring-destructive">
              <Phone className="h-5 w-5 text-primary-foreground" />
            </div>
            24/7 Emergency Office
          </CardTitle>
          <CardDescription className="text-base">For urgent security matters and emergencies</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-base leading-relaxed text-muted-foreground">
              Our emergency response team is available around the clock to handle urgent security situations. If you
              have an immediate security concern or emergency, please call this number instead of waiting for a response
              from your account manager.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="tel:1-800-555-0100"
                className="text-2xl font-bold text-foreground hover:text-primary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded"
              >
                1-800-555-0100
              </a>
              <span className="text-sm text-muted-foreground">Available 24 hours a day, 7 days a week</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Additional Support Options */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Open a Ticket */}
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle className="text-xl">Open a Support Ticket</CardTitle>
            <CardDescription className="text-base">For non-urgent questions and issues</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm leading-relaxed text-muted-foreground">
              If your question isn't urgent, you can open a support ticket and our team will respond within 24 hours
              during business days.
            </p>
            <Button asChild variant="outline" className="w-full rounded-xl text-base bg-transparent">
              <Link href="/dashboard/tickets/new">
                <MessageSquare className="mr-2 h-5 w-5" />
                Open Ticket
              </Link>
            </Button>
          </CardContent>
        </Card>

        {/* Schedule a Meeting */}
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle className="text-xl">Schedule a Meeting</CardTitle>
            <CardDescription className="text-base">Book time with your account manager</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm leading-relaxed text-muted-foreground">
              Need to discuss your services in detail? Schedule a call or video meeting with Sarah at a time that works
              for you.
            </p>
            <Button asChild variant="outline" className="w-full rounded-xl text-base bg-transparent">
              <a href="mailto:sarah.johnson@secureshield.com?subject=Meeting Request">
                <Calendar className="mr-2 h-5 w-5" />
                Request Meeting
              </a>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* About Your Account Manager */}
      <Card className="rounded-2xl bg-muted/30">
        <CardHeader>
          <CardTitle className="text-xl">About Your Account Manager</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-base leading-relaxed text-muted-foreground">
            Sarah Johnson has over 10 years of experience in security services management and specializes in commercial
            security solutions. She's dedicated to ensuring your security needs are met and is available to answer any
            questions about your services, help with requests, or discuss ways to enhance your security setup. Sarah
            typically responds to emails within 4 business hours and is available for calls during her office hours.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
