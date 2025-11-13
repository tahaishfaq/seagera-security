import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import RequestServiceForm from '@/components/request-service-form'
import { fetchServices } from '@/lib/frappe-client'
import { requireServerUser } from '@/lib/server-auth'

export default async function RequestServicePage() {
  const { user, profile } = await requireServerUser()
  const services = await fetchServices().catch(() => [])

  const customerId = profile?.name ?? user?.name ?? ''
  const customerName = profile?.customer_name ?? user?.full_name ?? user?.name ?? ''

  return (
    <div className="space-y-6">
      <Button variant="ghost" size="sm" asChild className="rounded-lg">
        <Link href="/dashboard/services">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Services
        </Link>
      </Button>

      <div>
        <h1 className="text-balance text-3xl font-bold tracking-tight text-foreground lg:text-4xl">
          Request New Service
        </h1>
        <p className="mt-2 text-pretty text-base text-muted-foreground lg:text-lg">
          Add additional security services to your account
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <RequestServiceForm services={services} customerId={customerId} customerName={customerName} />

        <div className="space-y-6">
          <Card className="rounded-2xl border-primary/20 bg-primary/5">
            <CardHeader>
              <CardTitle className="text-lg">What Happens Next?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm leading-relaxed">
              <div>
                <p className="font-semibold text-foreground">1. Request Review</p>
                <p className="text-muted-foreground">Our team reviews your service request within 4 hours</p>
              </div>
              <div>
                <p className="font-semibold text-foreground">2. Consultation Call</p>
                <p className="text-muted-foreground">We'll call to discuss your needs and answer questions</p>
              </div>
              <div>
                <p className="font-semibold text-foreground">3. Custom Quote</p>
                <p className="text-muted-foreground">Receive a detailed quote tailored to your requirements</p>
              </div>
              <div>
                <p className="font-semibold text-foreground">4. Site Assessment</p>
                <p className="text-muted-foreground">Optional on-site visit to finalize service details</p>
              </div>
              <div>
                <p className="font-semibold text-foreground">5. Service Activation</p>
                <p className="text-muted-foreground">Once approved, we'll schedule installation and setup</p>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle className="text-lg">Need Help Choosing?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm leading-relaxed">
              <p className="text-muted-foreground">
                Not sure which services are right for you? Our security consultants can help.
              </p>
              <Button variant="outline" size="lg" className="h-11 w-full rounded-xl bg-transparent">
                Schedule Consultation
              </Button>
            </CardContent>
          </Card>

          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle className="text-lg">Questions?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm leading-relaxed">
              <p className="text-muted-foreground">Contact our sales team for immediate assistance:</p>
              <div className="space-y-2">
                <p className="font-semibold text-foreground">
                  <a href="tel:1-800-555-0200" className="hover:text-primary">
                    1-800-555-0200
                  </a>
                </p>
                <p className="font-semibold text-foreground">
                  <a href="mailto:sales@secureguard.com" className="hover:text-primary">
                    sales@secureguard.com
                  </a>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
