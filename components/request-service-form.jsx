'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { ShieldCheck, Building2, Calendar } from 'lucide-react'

import { useToast } from '@/hooks/use-toast'
import { fetchWithAuth } from '@/lib/fetch-with-auth'
import { cn } from '@/lib/utils'

const BUDGET_OPTIONS = [
  { value: 'under5k', label: 'Under $5,000/month' },
  { value: '5k-10k', label: '$5,000 - $10,000/month' },
  { value: '10k-25k', label: '$10,000 - $25,000/month' },
  { value: '25k-50k', label: '$25,000 - $50,000/month' },
  { value: 'over50k', label: 'Over $50,000/month' },
  { value: 'flexible', label: 'Flexible/Need Quote' },
]

const PROPERTY_TYPES = [
  { value: 'office', label: 'Office Building' },
  { value: 'retail', label: 'Retail Store' },
  { value: 'warehouse', label: 'Warehouse/Distribution' },
  { value: 'industrial', label: 'Industrial Facility' },
  { value: 'residential', label: 'Residential Complex' },
  { value: 'other', label: 'Other' },
]

export default function RequestServiceForm({
  services,
  customerId,
  customerName,
  className,
}) {
  const router = useRouter()
  const { toast } = useToast()

  const [selectedService, setSelectedService] = useState('')
  const [desiredStartDate, setDesiredStartDate] = useState('')
  const [scheduleDate, setScheduleDate] = useState('')
  const [notes, setNotes] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [zip, setZip] = useState('')
  const [propertyType, setPropertyType] = useState('')
  const [squareFeet, setSquareFeet] = useState('')
  const [estimatedBudget, setEstimatedBudget] = useState('')
  const [siteVisit, setSiteVisit] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (!selectedService && services.length) {
      setSelectedService(services[0].name)
    }
  }, [services, selectedService])

  const serviceLookup = useMemo(() => {
    return new Map(services.map((service) => [service.name, service]))
  }, [services])

  async function handleSubmit(event) {
    event.preventDefault()

    if (!customerId) {
      toast({
        title: 'Missing customer information',
        description: 'Please refresh the page and try again.',
        variant: 'destructive',
      })
      return
    }

    if (!selectedService) {
      toast({
        title: 'Select a service',
        description: 'Please choose the service you want to request.',
        variant: 'destructive',
      })
      return
    }

    try {
      setSubmitting(true)

      const payload = {
        customer: customerId,
        service: selectedService,
        schedule_date: scheduleDate || desiredStartDate || null,
        note: buildNotes(),
        status: 'Pending',
        desired_start_date: desiredStartDate || null,
        address: address || null,
        city: city || null,
        state: state || null,
        zip: zip || null,
        property_type: propertyType || null,
        approx_square_fooot: squareFeet || null,
        estimated_budget: estimatedBudget || null,
      }

      const response = await fetchWithAuth('/api/services/request', {
        method: 'POST',
        body: JSON.stringify(payload),
      })

      if (response?.success) {
        toast({
          title: 'Request submitted',
          description: 'We received your service request and will follow up shortly.',
        })
        router.push('/dashboard/services')
        router.refresh()
        return
      }

      const errorMessage = response?.error ?? 'Unable to submit service request.'
      throw new Error(errorMessage)
    } catch (error) {
      console.error('Service request failed', error)
      toast({
        title: 'Service request failed',
        description: error instanceof Error ? error.message : 'Unable to submit service request.',
        variant: 'destructive',
      })
    } finally {
      setSubmitting(false)
    }
  }

  function buildNotes() {
    const service = serviceLookup.get(selectedService)
    const baseNotes = [notes]

    if (siteVisit) {
      baseNotes.push('Customer requested an on-site assessment.')
    }

    if (customerName) {
      baseNotes.push(`Submitted by ${customerName}`)
    }

    if (service?.service_name) {
      baseNotes.push(`Service label: ${service.service_name}`)
    }

    return baseNotes.filter(Boolean).join('\n') || null
  }

  return (
    <form onSubmit={handleSubmit} className={cn('space-y-6 lg:col-span-2', className)}>
      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <ShieldCheck className="h-5 w-5" />
            Select Service
          </CardTitle>
          <CardDescription className="text-base">
            Choose the service you would like to add to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          {services.length ? (
            <RadioGroup value={selectedService} onValueChange={setSelectedService}>
              {services.map((service) => (
                <label
                  key={service.name}
                  htmlFor={`service-${service.name}`}
                  className="flex items-start gap-3 rounded-2xl border border-border p-4 transition hover:border-primary/40 hover:shadow-sm"
                >
                  <RadioGroupItem id={`service-${service.name}`} value={service.name} className="mt-1" />
                  <div className="space-y-1">
                    <p className="text-base font-semibold leading-tight text-foreground">
                      {service.service_name ?? service.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {service.description ?? 'No description provided.'}
                    </p>
                    <div className="text-sm text-muted-foreground">
                      <span className="font-medium text-foreground">Category:</span> {service.category ?? 'General'}
                    </div>
                  </div>
                </label>
              ))}
            </RadioGroup>
          ) : (
            <p className="text-sm text-muted-foreground">
              No services are available right now. Please contact support for assistance.
            </p>
          )}
        </CardContent>
      </Card>

      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <Building2 className="h-5 w-5" />
            Service Location
          </CardTitle>
          <CardDescription className="text-base">
            Tell us where these services will be provided
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
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
                value={address}
                onChange={(event) => setAddress(event.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="city" className="text-base">
                City
              </Label>
              <Input
                id="city"
                type="text"
                placeholder="City"
                className="h-12 rounded-xl text-base"
                value={city}
                onChange={(event) => setCity(event.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="state" className="text-base">
                State
              </Label>
              <Input
                id="state"
                type="text"
                placeholder="State"
                className="h-12 rounded-xl text-base"
                value={state}
                onChange={(event) => setState(event.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="zip" className="text-base">
                ZIP Code
              </Label>
              <Input
                id="zip"
                type="text"
                placeholder="12345"
                className="h-12 rounded-xl text-base"
                value={zip}
                onChange={(event) => setZip(event.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="propertyType" className="text-base">
              Property Type
            </Label>
            <Select value={propertyType} onValueChange={setPropertyType}>
              <SelectTrigger id="propertyType" className="h-12 rounded-xl text-base">
                <SelectValue placeholder="Select property type" />
              </SelectTrigger>
              <SelectContent>
                {PROPERTY_TYPES.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="squareFeet" className="text-base">
              Approximate Square Footage
            </Label>
            <Input
              id="squareFeet"
              type="number"
              placeholder="5000"
              className="h-12 rounded-xl text-base"
              value={squareFeet}
              onChange={(event) => setSquareFeet(event.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <Calendar className="h-5 w-5" />
            Service Details
          </CardTitle>
          <CardDescription className="text-base">Tell us more about your needs</CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="desiredStartDate" className="text-base">
                Desired Start Date
              </Label>
              <Input
                id="desiredStartDate"
                type="date"
                className="h-12 rounded-xl text-base"
                value={desiredStartDate}
                onChange={(event) => setDesiredStartDate(event.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="scheduleDate" className="text-base">
                Preferred Schedule Date
              </Label>
              <Input
                id="scheduleDate"
                type="date"
                className="h-12 rounded-xl text-base"
                value={scheduleDate}
                onChange={(event) => setScheduleDate(event.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="requirements" className="text-base">
              Special Requirements or Notes
            </Label>
            <Textarea
              id="requirements"
              placeholder="Please describe any specific requirements, concerns, or questions you have about these services..."
              className="min-h-[150px] rounded-xl text-base"
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="budget" className="text-base">
              Estimated Budget Range
            </Label>
            <Select value={estimatedBudget} onValueChange={setEstimatedBudget}>
              <SelectTrigger id="budget" className="h-12 rounded-xl text-base">
                <SelectValue placeholder="Select your budget range" />
              </SelectTrigger>
              <SelectContent>
                {BUDGET_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-start gap-2">
            <Checkbox
              id="siteVisit"
              checked={siteVisit}
              onCheckedChange={(checked) => setSiteVisit(Boolean(checked))}
            />
            <label htmlFor="siteVisit" className="text-sm leading-relaxed text-foreground">
              I would like to schedule a site visit for a detailed security assessment
            </label>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button type="submit" size="lg" className="h-12 flex-1 rounded-xl text-base" disabled={submitting || !services.length}>
              {submitting ? 'Submitting request…' : 'Submit Service Request'}
            </Button>
            <Button
              type="button"
              variant="outline"
              size="lg"
              asChild
              className="h-12 rounded-xl text-base sm:w-auto bg-transparent"
              disabled={submitting}
            >
              <Link href="/dashboard/services">Cancel</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  )
}
