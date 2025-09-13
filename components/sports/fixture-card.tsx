"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, MapPin, Users } from "lucide-react"

interface Fixture {
  id: string
  sport: string
  category: string
  team1: string
  team2: string
  date: string
  time: string
  venue: string
  status: "upcoming" | "ongoing" | "completed"
  score?: {
    team1: number
    team2: number
  }
}

interface FixtureCardProps {
  fixture: Fixture
  onViewDetails?: (fixture: Fixture) => void
}

export function FixtureCard({ fixture, onViewDetails }: FixtureCardProps) {
  const [teamInfo, setTeamInfo] = useState<Record<string, { name: string; logoUrl?: string; bio?: string }>>({})

  useEffect(() => {
    const loadTeams = async () => {
      try {
        const res = await fetch("/api/teams")
        const json = await res.json()
        const map: Record<string, { name: string; logoUrl?: string; bio?: string }> = {}
        for (const t of json.data || []) {
          map[t.id] = { name: t.name, logoUrl: t.logoUrl, bio: t.bio }
          map[t.slug || t.id] = { name: t.name, logoUrl: t.logoUrl, bio: t.bio }
        }
        setTeamInfo(map)
      } catch {}
    }
    loadTeams()
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming":
        return "bg-blue-100 text-blue-800"
      case "ongoing":
        return "bg-green-100 text-green-800"
      case "completed":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const t1 = teamInfo[fixture.team1] || { name: fixture.team1 }
  const t2 = teamInfo[fixture.team2] || { name: fixture.team2 }

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">{fixture.sport}</CardTitle>
          <Badge className={getStatusColor(fixture.status)}>
            {fixture.status.charAt(0).toUpperCase() + fixture.status.slice(1)}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">{fixture.category}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Teams */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-1">
            {t1.logoUrl && (
              <Image src={t1.logoUrl} alt={t1.name} width={32} height={32} className="rounded" />
            )}
            <div>
              <p className="font-medium">{t1.name}</p>
              {t1.bio && <p className="text-xs text-muted-foreground truncate max-w-[180px]">{t1.bio}</p>}
            </div>
          </div>
          <div className="text-center">
            <Users className="h-6 w-6 text-muted-foreground" />
            {fixture.score && (
              <p className="text-2xl font-bold text-primary">
                {fixture.score.team1} - {fixture.score.team2}
              </p>
            )}
          </div>
          <div className="flex items-center gap-3 flex-1 justify-end">
            <div className="text-right">
              <p className="font-medium">{t2.name}</p>
              {t2.bio && <p className="text-xs text-muted-foreground truncate max-w-[180px]">{t2.bio}</p>}
            </div>
            {t2.logoUrl && (
              <Image src={t2.logoUrl} alt={t2.name} width={32} height={32} className="rounded" />
            )}
          </div>
        </div>

        {/* Match Details */}
        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>{fixture.date}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>{fixture.time}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <span>{fixture.venue}</span>
          </div>
          {fixture.status === "completed" && (
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>Completed</span>
            </div>
          )}
        </div>

        {onViewDetails && (
          <Button variant="outline" className="w-full bg-transparent" onClick={() => onViewDetails(fixture)}>
            View Details
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
