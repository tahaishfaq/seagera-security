import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FileText, Download, Search, Eye } from "lucide-react"

// Mock data - organized by category
const documentCategories = [
  {
    category: "Service Agreements",
    documents: [
      {
        id: 1,
        name: "Master Service Agreement 2024",
        description: "Primary service contract and terms",
        type: "PDF",
        size: "2.4 MB",
        date: "Jan 15, 2024",
      },
      {
        id: 2,
        name: "24/7 Monitoring Service Agreement",
        description: "Terms specific to monitoring services",
        type: "PDF",
        size: "1.8 MB",
        date: "Jan 15, 2024",
      },
      {
        id: 3,
        name: "Access Control Service Agreement",
        description: "Terms for access control system services",
        type: "PDF",
        size: "1.5 MB",
        date: "Feb 1, 2024",
      },
    ],
  },
  {
    category: "Security Reports",
    documents: [
      {
        id: 4,
        name: "Monthly Security Report - March 2024",
        description: "Incident summary and activity log",
        type: "PDF",
        size: "3.2 MB",
        date: "Apr 1, 2024",
      },
      {
        id: 5,
        name: "Monthly Security Report - February 2024",
        description: "Incident summary and activity log",
        type: "PDF",
        size: "2.9 MB",
        date: "Mar 1, 2024",
      },
      {
        id: 6,
        name: "Monthly Security Report - January 2024",
        description: "Incident summary and activity log",
        type: "PDF",
        size: "3.1 MB",
        date: "Feb 1, 2024",
      },
    ],
  },
  {
    category: "Installation & Setup",
    documents: [
      {
        id: 7,
        name: "Camera Installation Report",
        description: "Installation details and camera locations",
        type: "PDF",
        size: "4.5 MB",
        date: "Jan 20, 2024",
      },
      {
        id: 8,
        name: "Access Control System Setup Guide",
        description: "User guide for access control system",
        type: "PDF",
        size: "2.1 MB",
        date: "Feb 5, 2024",
      },
      {
        id: 9,
        name: "Mobile App User Guide",
        description: "Instructions for using the security mobile app",
        type: "PDF",
        size: "1.2 MB",
        date: "Jan 15, 2024",
      },
    ],
  },
  {
    category: "Policies & Procedures",
    documents: [
      {
        id: 10,
        name: "Emergency Response Procedures",
        description: "What to do in case of security emergencies",
        type: "PDF",
        size: "1.7 MB",
        date: "Jan 15, 2024",
      },
      {
        id: 11,
        name: "Privacy Policy",
        description: "How we handle your data and privacy",
        type: "PDF",
        size: "890 KB",
        date: "Jan 1, 2024",
      },
      {
        id: 12,
        name: "Service Level Agreement (SLA)",
        description: "Our commitments and response times",
        type: "PDF",
        size: "1.1 MB",
        date: "Jan 15, 2024",
      },
    ],
  },
]

export default function DocumentsPage() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-balance text-3xl font-bold tracking-tight text-foreground lg:text-4xl">Documents</h1>
        <p className="mt-2 text-pretty text-base text-muted-foreground lg:text-lg">
          Access your service agreements, reports, and guides
        </p>
      </div>

      {/* Search */}
      <Card className="rounded-2xl">
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search documents by name or description..."
              className="h-12 rounded-xl pl-10 text-base"
            />
          </div>
        </CardContent>
      </Card>

      {/* Document Categories */}
      <div className="space-y-6">
        {documentCategories.map((category, categoryIndex) => (
          <Card key={categoryIndex} className="rounded-2xl">
            <CardHeader>
              <CardTitle className="text-xl">{category.category}</CardTitle>
              <CardDescription className="text-base">{category.documents.length} documents</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {category.documents.map((doc) => (
                  <div
                    key={doc.id}
                    className="flex flex-col gap-4 rounded-xl border border-border bg-muted/30 p-4 transition-shadow hover:shadow-md sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                        <FileText className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground">{doc.name}</h3>
                        <p className="mt-1 text-sm text-muted-foreground">{doc.description}</p>
                        <div className="mt-2 flex flex-wrap gap-3 text-xs text-muted-foreground">
                          <span>{doc.type}</span>
                          <span>•</span>
                          <span>{doc.size}</span>
                          <span>•</span>
                          <span>{doc.date}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 sm:flex-col lg:flex-row">
                      <Button variant="outline" size="sm" className="flex-1 rounded-lg bg-transparent sm:flex-none">
                        <Eye className="mr-2 h-4 w-4" />
                        View
                      </Button>
                      <Button variant="ghost" size="sm" className="flex-1 rounded-lg sm:flex-none">
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Help Card */}
      <Card className="rounded-2xl bg-muted/30">
        <CardHeader>
          <CardTitle className="text-xl">Need a specific document?</CardTitle>
          <CardDescription className="text-base">Can't find what you're looking for?</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
            If you need a document that's not listed here, please contact your account manager or open a support ticket.
            We can provide custom reports, historical documents, or any other files you need.
          </p>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Button asChild variant="outline" className="rounded-xl bg-card">
              <a href="/dashboard/contact">Contact Account Manager</a>
            </Button>
            <Button asChild variant="outline" className="rounded-xl bg-card">
              <a href="/dashboard/tickets/new">Open Support Ticket</a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
