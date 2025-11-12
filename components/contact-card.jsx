import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Phone, Clock } from "lucide-react"

export function ContactCard({ name, title, phone, email, avatar, hours = "Mon-Fri, 9AM-5PM" }) {
  return (
    <Card className="rounded-2xl">
      <CardHeader>
        <CardTitle className="text-lg">Your Account Manager</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={avatar || "/placeholder.svg"} alt={name} />
            <AvatarFallback className="bg-primary text-lg text-primary-foreground">
              {name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold text-foreground">{name}</p>
            <p className="text-sm text-muted-foreground">{title}</p>
          </div>
        </div>

        <div className="space-y-3 border-t border-border pt-4">
          <a
            href={`tel:${phone}`}
            className="flex items-center gap-3 text-sm text-foreground hover:text-primary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-lg p-2 -m-2"
          >
            <Phone className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">{phone}</span>
          </a>
          <a
            href={`mailto:${email}`}
            className="flex items-center gap-3 text-sm text-foreground hover:text-primary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-lg p-2 -m-2"
          >
            <Mail className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">{email}</span>
          </a>
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>{hours}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
