import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Users, Trophy, BarChart3, Award, CheckCircle } from "lucide-react"

interface DashboardStatsProps {
  role: "team-admin" | "super-admin"
  team?: string
}

// Mock data - in real app this would come from API
const mockStats = {
  "super-admin": {
    totalProgrammes: 45,
    totalParticipants: 250,
    completedEvents: 12,
    activeRegistrations: 180,
  },
  "team-admin": {
    fulful: { registeredParticipants: 85, programmes: 28, points: 245, position: 1 },
    kafur: { registeredParticipants: 78, programmes: 26, points: 230, position: 2 },
    zanjabeel: { registeredParticipants: 87, programmes: 30, points: 215, position: 3 },
  },
}

export function DashboardStats({ role, team }: DashboardStatsProps) {
  if (role === "super-admin") {
    const stats = mockStats["super-admin"]
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Programmes</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalProgrammes}</div>
            <p className="text-xs text-muted-foreground">Arts & Sports combined</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Participants</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalParticipants}</div>
            <p className="text-xs text-muted-foreground">Across all teams</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Events</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.completedEvents}</div>
            <p className="text-xs text-muted-foreground">Results published</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Registrations</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeRegistrations}</div>
            <p className="text-xs text-muted-foreground">Pending events</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Team Admin Stats
  const teamStats = team ? mockStats["team-admin"][team as keyof (typeof mockStats)["team-admin"]] : null
  if (!teamStats) return null

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Team Position</CardTitle>
          <Trophy className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">#{teamStats.position}</div>
          <p className="text-xs text-muted-foreground">Current ranking</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Points</CardTitle>
          <Award className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{teamStats.points}</div>
          <p className="text-xs text-muted-foreground">Points earned</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Participants</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{teamStats.registeredParticipants}</div>
          <p className="text-xs text-muted-foreground">Registered members</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Programmes</CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{teamStats.programmes}</div>
          <p className="text-xs text-muted-foreground">Participating in</p>
        </CardContent>
      </Card>
    </div>
  )
}
