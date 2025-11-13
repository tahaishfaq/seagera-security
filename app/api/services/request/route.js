import { NextResponse } from 'next/server'
import { z } from 'zod'

import { requestService } from '@/lib/frappe-client'

const ServiceRequestSchema = z.object({
  customer: z.string().min(1, 'Customer is required'),
  service: z.string().min(1, 'Service is required'),
  schedule_date: z.string().optional().nullable(),
  note: z.string().optional().nullable(),
  desired_start_date: z.string().optional().nullable(),
  address: z.string().optional().nullable(),
  city: z.string().optional().nullable(),
  state: z.string().optional().nullable(),
  zip: z.string().optional().nullable(),
  property_type: z.string().optional().nullable(),
  approx_square_fooot: z.string().optional().nullable(),
  estimated_budget: z.string().optional().nullable(),
})

export async function POST(request) {
  try {
    const body = await request.json()
    const payload = ServiceRequestSchema.parse(body)

    const frappeResponse = await requestService({
      ...payload,
      status: 'Pending',
    })

    return NextResponse.json({ success: true, data: frappeResponse ?? null })
  } catch (error) {
    console.error('Service request error:', error)

    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.flatten() }, { status: 400 })
    }

    const message = error?.message ?? 'Unable to submit service request.'
    return NextResponse.json({ error: message }, { status: 400 })
  }
}
