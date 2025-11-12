import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Search, HelpCircle, Phone, Mail } from "lucide-react"
import Link from "next/link"

// Mock data - organized by category
const faqCategories = [
  {
    category: "Getting Started",
    questions: [
      {
        question: "How do I access my customer portal?",
        answer:
          "You can access your customer portal by visiting our website and clicking the 'Portal Login' button. Use the credentials provided in your welcome email. If you haven't received your login information, please contact your account manager.",
      },
      {
        question: "What services are included in my security package?",
        answer:
          "Your specific services are listed on your Dashboard under 'Your Active Services'. Each service card shows the service name, category, status, and contract dates. Click on any service to view detailed information about what's included.",
      },
      {
        question: "How do I update my contact information?",
        answer:
          "To update your contact information, navigate to 'Your Contact' page and click the 'Update Information' button. You can also contact your account manager directly to make changes to your account details.",
      },
    ],
  },
  {
    category: "Services & Requests",
    questions: [
      {
        question: "How do I request additional security services?",
        answer:
          'You can request extra services by clicking the "Request Extra Service" button on your dashboard or by visiting the Services page. Fill out the form with your requirements, and our team will respond within 24 hours with a quote and timeline.',
      },
      {
        question: "Can I pause my security service temporarily?",
        answer:
          "Yes, you can request to pause your service by opening a ticket or contacting your account manager directly. Please provide at least 48 hours notice for service modifications. Some services may have minimum contract requirements or fees associated with pausing.",
      },
      {
        question: "How long does it take to process a service request?",
        answer:
          "Standard service requests are typically reviewed within 24 business hours. Complex requests requiring site visits or equipment installation may take 3-5 business days. You'll receive email notifications as your request progresses through each stage.",
      },
      {
        question: "What's the difference between a request and a ticket?",
        answer:
          "Requests are for adding or modifying services (like adding cameras or changing patrol schedules). Tickets are for reporting issues, asking questions, or getting support for existing services. Use requests for changes, tickets for problems.",
      },
    ],
  },
  {
    category: "Support & Emergencies",
    questions: [
      {
        question: "What should I do in case of an emergency?",
        answer:
          "In case of an emergency, immediately call our 24/7 office at 1-800-555-0100. Our emergency response team is available around the clock to assist you. For non-urgent matters, you can open a ticket through the portal.",
      },
      {
        question: "How quickly will someone respond to my ticket?",
        answer:
          "High-priority tickets receive responses within 2 hours during business hours. Standard tickets are typically answered within 24 hours. Emergency issues should always be reported by phone to our 24/7 office for immediate assistance.",
      },
      {
        question: "Can I track the status of my support ticket?",
        answer:
          "Yes, you can view all your tickets on the Tickets page. Each ticket shows its current status (Open, Pending, or Closed) and the last update time. You'll also receive email notifications when there are updates to your tickets.",
      },
      {
        question: "Who is my account manager and how do I contact them?",
        answer:
          "Your assigned account manager's information is available on the 'Your Contact' page and in the sidebar of your service detail pages. You can reach them via phone or email during their listed office hours.",
      },
    ],
  },
  {
    category: "Billing & Contracts",
    questions: [
      {
        question: "Where can I view my service agreements?",
        answer:
          "All your service agreements and contracts are available in the Documents section. You can also find service-specific documents by navigating to a service detail page and clicking the 'Documents' tab.",
      },
      {
        question: "How do I update my billing information?",
        answer:
          "To update billing information, please contact your account manager directly or call our billing department at 1-800-555-0150. For security reasons, billing changes cannot be made through the portal.",
      },
      {
        question: "When will my service contract renew?",
        answer:
          "Your service end dates are shown on each service card on your Dashboard and Services pages. We'll send renewal notices 60 days before your contract expires. Contact your account manager to discuss renewal terms.",
      },
    ],
  },
  {
    category: "Technical Questions",
    questions: [
      {
        question: "How do I access my security camera feeds?",
        answer:
          "If your service includes camera access, you can view live feeds through our mobile app or web portal. Download links and login instructions are available in your service documents. Contact support if you need assistance setting up access.",
      },
      {
        question: "What should I do if my access card isn't working?",
        answer:
          "First, try cleaning the card and ensuring you're using it correctly at the reader. If it still doesn't work, open a support ticket or call our 24/7 office. We can deactivate the old card and issue a replacement within 24 hours.",
      },
      {
        question: "How often are security reports generated?",
        answer:
          "Standard security reports are generated monthly and posted to your Documents section within 5 business days of month-end. Custom reporting schedules can be arranged through your account manager for an additional fee.",
      },
    ],
  },
]

export default function FAQPage() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-balance text-3xl font-bold tracking-tight text-foreground lg:text-4xl">
          Frequently Asked Questions
        </h1>
        <p className="mt-2 text-pretty text-base text-muted-foreground lg:text-lg">
          Find answers to common questions about our services
        </p>
      </div>

      {/* Search */}
      <Card className="rounded-2xl">
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input type="search" placeholder="Search for answers..." className="h-12 rounded-xl pl-10 text-base" />
          </div>
        </CardContent>
      </Card>

      {/* FAQ Categories */}
      <div className="space-y-6">
        {faqCategories.map((category, categoryIndex) => (
          <Card key={categoryIndex} className="rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <HelpCircle className="h-5 w-5 text-primary" />
                {category.category}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {category.questions.map((faq, faqIndex) => (
                  <AccordionItem key={faqIndex} value={`item-${categoryIndex}-${faqIndex}`}>
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
        ))}
      </div>

      {/* Still Need Help */}
      <Card className="rounded-2xl border-2 bg-muted/30">
        <CardHeader>
          <CardTitle className="text-xl">Still need help?</CardTitle>
          <CardDescription className="text-base">Our team is here to assist you</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex items-start gap-4 rounded-xl border border-border bg-card p-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                <Phone className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground">Call Us</h3>
                <p className="mt-1 text-sm text-muted-foreground">24/7 emergency support</p>
                <a
                  href="tel:1-800-555-0100"
                  className="mt-2 inline-block text-base font-semibold text-primary hover:underline"
                >
                  1-800-555-0100
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-xl border border-border bg-card p-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                <Mail className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground">Open a Ticket</h3>
                <p className="mt-1 text-sm text-muted-foreground">Get help from our support team</p>
                <Button asChild variant="link" className="mt-1 h-auto p-0 text-base font-semibold">
                  <Link href="/dashboard/tickets/new">Create Ticket</Link>
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
