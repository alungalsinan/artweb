"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Trophy, Medal, Award, TrendingUp, Users, Calendar } from "lucide-react"

interface TeamStats {
  name: string
  points: number
  position: number
  participants: number
  programmesWon: number
  programmesParticipated: number
  recentResults: Array<{
    programme: string
    position: number
    points: number
  }>
}

interface TeamLeaderboardProps {
  teams: TeamStats[]
  showDetails?: boolean
}

export function TeamLeaderboard({ teams, showDetails = true }: TeamLeaderboardProps) {
  const getPositionIcon = (position: number) => {
    switch (position) {
      case 1:
        return <Trophy className="h-6 w-6 text-yellow-500" />
      case 2:
        return <Medal className="h-6 w-6 text-gray-400" />
      case 3:
        return <Award className="h-6 w-6 text-amber-600" />
      default:
        return (
          <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-sm font-bold">
            {position}
          </div>
        )
    }
  }

  const getTeamColor = (team: string) => {
    switch (team.toLowerCase()) {
      case "fulful":
        return "bg-blue-500"
      case "kafur":
        return "bg-green-500"
      case "zanjabeel":
        return "bg-purple-500"
      default:
        return "bg-gray-500"
    }
  }

  const getTeamBadgeColor = (team: string) => {
    switch (team.toLowerCase()) {
      case "fulful":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "kafur":
        return "bg-green-100 text-green-800 border-green-200"
      case "zanjabeel":
        return "bg-purple-100 text-purple-800 border-purple-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const maxPoints = Math.max(...teams.map((t) => t.points))

  return (
    <div className="space-y-4">
      {teams.map((team) => (
        <Card key={team.name} className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                {getPositionIcon(team.position)}
                <div>
                  <h3 className="text-xl font-bold">{team.name}</h3>
                  <Badge variant="outline" className={getTeamBadgeColor(team.name)}>
                    Team {team.name}
                  </Badge>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">{team.points}</div>
                <div className="text-sm text-muted-foreground">Total Points</div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-2">
                <span>Progress to Leader</span>
                <span>{Math.round((team.points / maxPoints) * 100)}%</span>
              </div>
              <Progress value={(team.points / maxPoints) * 100} className="h-2" />
            </div>

            {showDetails && (
              <>
                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Users className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="text-lg font-bold">{team.participants}</div>
                    <div className="text-xs text-muted-foreground">Participants</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Trophy className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="text-lg font-bold">{team.programmesWon}</div>
                    <div className="text-xs text-muted-foreground">Wins</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="text-lg font-bold">{team.programmesParticipated}</div>
                    <div className="text-xs text-muted-foreground">Events</div>
                  </div>
                </div>

                {/* Recent Results */}
                {team.recentResults.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                      <TrendingUp className="h-4 w-4" />
                      Recent Results
                    </h4>
                    <div className="space-y-2">
                      {team.recentResults.slice(0, 3).map((result, index) => (
                        <div key={index} className="flex items-center justify-between text-sm p-2 rounded bg-muted/50">
                          <span className="text-pretty">{result.programme}</span>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-xs">
                              {result.position === 1 ? "1st" : result.position === 2 ? "2nd" : "3rd"}
                            </Badge>
                            <span className="font-medium">+{result.points} pts</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
