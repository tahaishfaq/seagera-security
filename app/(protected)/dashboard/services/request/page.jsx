import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, ShieldCheck, Building2, Calendar } from "lucide-react"
import Link from "next/link"

const availableServices = [
  {
    id: "monitoring",
    name: "24/7 Security Monitoring",
    description: "Round-the-clock surveillance and alarm monitoring",
  },
  {
    id: "patrol",
    name: "Mobile Patrol Service",
    description: "Regular security patrols of your premises",
  },
  {
    id: "access",
    name: "Access Control System",
    description: "Electronic access management and card systems",
  },
  {
    id: "cctv",
    name: "CCTV Installation & Maintenance",
    description: "Professional camera installation and ongoing support",
  },
  {
    id: "consultation",
    name: "Security Consultation",
    description: "Expert security assessment and recommendations",
  },
  {
    id: "alarm",
    name: "Alarm Response Service",
    description: "Rapid response to security alarms",
  },
]

export default function RequestServicePage() {
  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Button variant="ghost" size="sm" asChild className="rounded-lg">
        <Link href="/dashboard/services">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Services
        </Link>
      </Button>

      {/* Page Header */}
      <div>
        <h1 className="text-balance text-3xl font-bold tracking-tight text-foreground lg:text-4xl">
          Request New Service
        </h1>
        <p className="mt-2 text-pretty text-base text-muted-foreground lg:text-lg">
          Add additional security services to your account
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Form */}
        <div className="space-y-6 lg:col-span-2">
          {/* Service Selection */}
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <ShieldCheck className="h-5 w-5" />
                Select Services
              </CardTitle>
              <CardDescription className="text-base">Choose the services you'd like to add</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {availableServices.map((service) => (
                  <div key={service.id} className="flex items-start space-x-3 rounded-xl border border-border p-4">
                    <Checkbox id={service.id} className="mt-1" />
                    <div className="flex-1">
                      <label
                        htmlFor={service.id}
                        className="cursor-pointer text-base font-semibold leading-none text-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {service.name}
                      </label>
                      <p className="mt-1 text-sm text-muted-foreground">{service.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Location Information */}
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <Building2 className="h-5 w-5" />
                Location Information
              </CardTitle>
              <CardDescription className="text-base">Where will these services be provided?</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="location" className="text-base">
                    Service Location
                  </Label>
                  <Select>
                    <SelectTrigger id="location" className="h-12 rounded-xl text-base">
                      <SelectValue placeholder="Select location or add new" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="main">Main Office - 123 Business Blvd</SelectItem>
                      <SelectItem value="warehouse">Warehouse - 456 Industrial Way</SelectItem>
                      <SelectItem value="new">Add New Location</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="address" className="text-base">
                      Street Address
                    </Label>
                    <Input
                      id="address"
                      type="text"
                      placeholder="123 Main Street"
                      className="h-12 rounded-xl text-base"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city" className="text-base">
                      City
                    </Label>
                    <Input id="city" type="text" placeholder="City" className="h-12 rounded-xl text-base" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state" className="text-base">
                      State
                    </Label>
                    <Input id="state" type="text" placeholder="State" className="h-12 rounded-xl text-base" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="zip" className="text-base">
                      ZIP Code
                    </Label>
                    <Input id="zip" type="text" placeholder="12345" className="h-12 rounded-xl text-base" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="propertyType" className="text-base">
                    Property Type
                  </Label>
                  <Select>
                    <SelectTrigger id="propertyType" className="h-12 rounded-xl text-base">
                      <SelectValue placeholder="Select property type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="office">Office Building</SelectItem>
                      <SelectItem value="retail">Retail Store</SelectItem>
                      <SelectItem value="warehouse">Warehouse/Distribution</SelectItem>
                      <SelectItem value="industrial">Industrial Facility</SelectItem>
                      <SelectItem value="residential">Residential Complex</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="squareFeet" className="text-base">
                    Approximate Square Footage
                  </Label>
                  <Input id="squareFeet" type="number" placeholder="5000" className="h-12 rounded-xl text-base" />
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Additional Details */}
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <Calendar className="h-5 w-5" />
                Service Details
              </CardTitle>
              <CardDescription className="text-base">Tell us more about your needs</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="startDate" className="text-base">
                    Desired Start Date
                  </Label>
                  <Input id="startDate" type="date" className="h-12 rounded-xl text-base" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="requirements" className="text-base">
                    Special Requirements or Notes
                  </Label>
                  <Textarea
                    id="requirements"
                    placeholder="Please describe any specific requirements, concerns, or questions you have about these services..."
                    className="min-h-[150px] rounded-xl text-base"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="budget" className="text-base">
                    Estimated Budget Range
                  </Label>
                  <Select>
                    <SelectTrigger id="budget" className="h-12 rounded-xl text-base">
                      <SelectValue placeholder="Select your budget range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="under5k">Under $5,000/month</SelectItem>
                      <SelectItem value="5k-10k">$5,000 - $10,000/month</SelectItem>
                      <SelectItem value="10k-25k">$10,000 - $25,000/month</SelectItem>
                      <SelectItem value="25k-50k">$25,000 - $50,000/month</SelectItem>
                      <SelectItem value="over50k">Over $50,000/month</SelectItem>
                      <SelectItem value="flexible">Flexible/Need Quote</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contactTime" className="text-base">
                    Best Time to Contact
                  </Label>
                  <Select>
                    <SelectTrigger id="contactTime" className="h-12 rounded-xl text-base">
                      <SelectValue placeholder="When should we reach out?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="morning">Morning (8 AM - 12 PM)</SelectItem>
                      <SelectItem value="afternoon">Afternoon (12 PM - 5 PM)</SelectItem>
                      <SelectItem value="evening">Evening (5 PM - 8 PM)</SelectItem>
                      <SelectItem value="anytime">Anytime</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-start space-x-2">
                  <Checkbox id="siteVisit" />
                  <label htmlFor="siteVisit" className="text-sm leading-relaxed text-foreground">
                    I would like to schedule a site visit for a detailed security assessment
                  </label>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <Button type="submit" size="lg" className="h-12 flex-1 rounded-xl text-base">
                    Submit Service Request
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="lg"
                    asChild
                    className="h-12 rounded-xl text-base sm:w-auto bg-transparent"
                  >
                    <Link href="/dashboard/services">Cancel</Link>
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
