"use client"

import { useEffect, useMemo, useState } from "react"
import { Navigation } from "@/components/navigation"
import { TeamLeaderboard } from "@/components/leaderboard/team-leaderboard"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Trophy, TrendingUp, Users, Calendar } from "lucide-react"

type ApiStanding = {
  teamId: string
  teamName: string
  points: number
  wins: number
  draws: number
  losses: number
  goalsFor: number
  goalsAgainst: number
  goalDifference: number
}

export default function LeaderboardPage() {
  const [standings, setStandings] = useState<ApiStanding[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      const res = await fetch("/api/leaderboard")
      const json = await res.json()
      setStandings(json.data || [])
      setLoading(false)
    }
    load()
  }, [])

  const teamStats = useMemo(
    () =>
      standings.map((s, index) => ({
        name: s.teamName,
        points: s.points,
        position: index + 1,
        participants: 0,
        programmesWon: s.wins,
        programmesParticipated: s.wins + s.draws + s.losses,
        recentResults: [],
      })),
    [standings],
  )

  const overallStats = useMemo(
    () => ({
      totalParticipants: 0,
      totalProgrammes: standings.reduce((sum, s) => sum + s.wins + s.draws + s.losses, 0),
      completedEvents: standings.reduce((sum, s) => sum + s.wins + s.draws + s.losses, 0),
      totalPoints: standings.reduce((sum, s) => sum + s.points, 0),
    }),
    [standings],
  )

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Team Leaderboard</h1>
          <p className="text-xl text-muted-foreground mb-6 text-pretty">
            Live rankings and team performance in the Arts & Sports Fest
          </p>
        </div>

        {/* Overall Stats */}
        <div className="grid gap-4 md:grid-cols-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Participants</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{overallStats.totalParticipants}</div>
              <p className="text-xs text-muted-foreground">Across all teams</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Programmes</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{overallStats.totalProgrammes}</div>
              <p className="text-xs text-muted-foreground">Arts & Sports combined</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed Events</CardTitle>
              <Trophy className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{overallStats.completedEvents}</div>
              <p className="text-xs text-muted-foreground">Results published</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Points</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{overallStats.totalPoints}</div>
              <p className="text-xs text-muted-foreground">Points awarded</p>
            </CardContent>
          </Card>
        </div>

        {/* Current Standings */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-primary" />
              Current Team Standings
            </CardTitle>
            <CardDescription>Real-time rankings based on programme results and points earned</CardDescription>
          </CardHeader>
          <CardContent>
            <TeamLeaderboard teams={teamStats as any} showDetails={true} />
          </CardContent>
        </Card>

        {/* Points System */}
        <Card>
          <CardHeader>
            <CardTitle>Points System</CardTitle>
            <CardDescription>How points are awarded for each position</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="flex items-center gap-3 p-4 rounded-lg bg-yellow-50 border border-yellow-200">
                <Trophy className="h-6 w-6 text-yellow-500" />
                <div>
                  <p className="font-medium">First Place</p>
                  <p className="text-sm text-muted-foreground">10 Points</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-lg bg-gray-50 border border-gray-200">
                <Trophy className="h-6 w-6 text-gray-400" />
                <div>
                  <p className="font-medium">Second Place</p>
                  <p className="text-sm text-muted-foreground">7 Points</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-lg bg-amber-50 border border-amber-200">
                <Trophy className="h-6 w-6 text-amber-600" />
                <div>
                  <p className="font-medium">Third Place</p>
                  <p className="text-sm text-muted-foreground">5 Points</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
