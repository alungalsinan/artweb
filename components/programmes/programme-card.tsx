import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Users, Clock } from "lucide-react"
import Link from "next/link"

interface Programme {
  id: string
  name: string
  category: string
  type: "arts" | "sports"
  date: string
  time: string
  venue: string
  description: string
  maxParticipants?: number
  currentParticipants: number
  judges?: string[]
  registrationOpen: boolean
  language?: string
}

interface ProgrammeCardProps {
  programme: Programme
  showActions?: boolean
  userRole?: "team-admin" | "super-admin" | "public"
}

export function ProgrammeCard({ programme, showActions = false, userRole = "public" }: ProgrammeCardProps) {
  const getStatusBadge = () => {
    if (!programme.registrationOpen) {
      return <Badge variant="destructive">Registration Closed</Badge>
    }
    if (programme.maxParticipants && programme.currentParticipants >= programme.maxParticipants) {
      return <Badge variant="secondary">Full</Badge>
    }
    return <Badge variant="default">Registration Open</Badge>
  }

  const getTypeColor = (type: string) => {
    return type === "arts" ? "text-purple-600" : "text-blue-600"
  }

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <CardTitle className="text-lg">{programme.name}</CardTitle>
              <Badge variant="outline" className={getTypeColor(programme.type)}>
                {programme.type === "arts" ? "Arts" : "Sports"}
              </Badge>
            </div>
            <CardDescription className="text-pretty">{programme.description}</CardDescription>
          </div>
          {getStatusBadge()}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>{programme.date}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span>{programme.time}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span>{programme.venue}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span>
              {programme.currentParticipants}
              {programme.maxParticipants && `/${programme.maxParticipants}`} participants
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between gap-2">
          <Badge variant="secondary">{programme.category}</Badge>
          {programme.language && <Badge variant="outline">{programme.language}</Badge>}
        </div>

        {programme.judges && programme.judges.length > 0 && (
          <div className="text-sm">
            <p className="text-muted-foreground mb-1">Judges:</p>
            <p>{programme.judges.join(", ")}</p>
          </div>
        )}

        {showActions && (
          <div className="flex gap-2 pt-2">
            {userRole === "team-admin" && programme.registrationOpen && (
              <Button asChild size="sm">
                <Link href={`/admin/team/register?programme=${programme.id}`}>Register Participant</Link>
              </Button>
            )}
            {userRole === "super-admin" && (
              <>
                <Button asChild variant="outline" size="sm">
                  <Link href={`/admin/super/programmes/${programme.id}/edit`}>Edit</Link>
                </Button>
                <Button asChild variant="outline" size="sm">
                  <Link href={`/admin/super/programmes/${programme.id}/participants`}>View Participants</Link>
                </Button>
              </>
            )}
            <Button asChild variant="ghost" size="sm">
              <Link href={`/programmes/${programme.id}`}>View Details</Link>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
