"use client"

import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Trophy, Users, Calendar, Award, TrendingUp, Star } from "lucide-react"
import Link from "next/link"

// Mock team data
const teams = [
  {
    id: "fulful",
    name: "Fulful",
    color: "blue",
    description: "Known for their excellence in classical arts and strategic sports gameplay",
    stats: {
      position: 1,
      points: 245,
      participants: 85,
      programmesParticipated: 28,
      wins: 8,
      podiumFinishes: 15,
    },
    recentAchievements: [
      { programme: "Classical Dance", position: 1, points: 10 },
      { programme: "Debate Competition", position: 2, points: 7 },
      { programme: "Poetry Recitation", position: 2, points: 7 },
    ],
    strengths: ["Classical Arts", "Debate", "Academic Events"],
    captain: "Ahmed Al-Rashid",
    motto: "Excellence through Unity",
  },
  {
    id: "kafur",
    name: "Kafur",
    color: "green",
    description: "Renowned for their competitive spirit and outstanding performance in sports",
    stats: {
      position: 2,
      points: 230,
      participants: 78,
      programmesParticipated: 26,
      wins: 7,
      podiumFinishes: 14,
    },
    recentAchievements: [
      { programme: "Debate Competition", position: 1, points: 10 },
      { programme: "Football Tournament", position: 1, points: 10 },
      { programme: "Basketball", position: 2, points: 7 },
    ],
    strengths: ["Sports", "Team Events", "Leadership"],
    captain: "Omar Hassan",
    motto: "Strength in Competition",
  },
  {
    id: "zanjabeel",
    name: "Zanjabeel",
    color: "purple",
    description: "Celebrated for their creativity in arts and innovative approaches to challenges",
    stats: {
      position: 3,
      points: 215,
      participants: 87,
      programmesParticipated: 30,
      wins: 6,
      podiumFinishes: 13,
    },
    recentAchievements: [
      { programme: "Poetry Recitation", position: 1, points: 10 },
      { programme: "Art Exhibition", position: 1, points: 10 },
      { programme: "Creative Writing", position: 2, points: 7 },
    ],
    strengths: ["Creative Arts", "Innovation", "Cultural Events"],
    captain: "Fatima Al-Zahra",
    motto: "Creativity Knows No Bounds",
  },
]

const getTeamColorClasses = (color: string) => {
  switch (color) {
    case "blue":
      return {
        bg: "bg-blue-50",
        border: "border-blue-200",
        text: "text-blue-800",
        accent: "bg-blue-500",
      }
    case "green":
      return {
        bg: "bg-green-50",
        border: "border-green-200",
        text: "text-green-800",
        accent: "bg-green-500",
      }
    case "purple":
      return {
        bg: "bg-purple-50",
        border: "border-purple-200",
        text: "text-purple-800",
        accent: "bg-purple-500",
      }
    default:
      return {
        bg: "bg-gray-50",
        border: "border-gray-200",
        text: "text-gray-800",
        accent: "bg-gray-500",
      }
  }
}

const maxPoints = Math.max(...teams.map((t) => t.stats.points))

export default function TeamsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Team Profiles</h1>
          <p className="text-xl text-muted-foreground mb-6 text-pretty">
            Meet the three competing teams in our Arts & Sports Fest
          </p>
        </div>

        {/* Teams Grid */}
        <div className="grid gap-8 lg:grid-cols-3">
          {teams.map((team) => {
            const colors = getTeamColorClasses(team.color)
            return (
              <Card
                key={team.id}
                className={`${colors.bg} ${colors.border} border-2 hover:shadow-lg transition-shadow`}
              >
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-12 h-12 rounded-full ${colors.accent} flex items-center justify-center text-white font-bold text-xl`}
                      >
                        {team.name.charAt(0)}
                      </div>
                      <div>
                        <CardTitle className={`text-2xl ${colors.text}`}>{team.name}</CardTitle>
                        <Badge variant="outline" className={colors.text}>
                          #{team.stats.position} Position
                        </Badge>
                      </div>
                    </div>
                    <Trophy
                      className={`h-8 w-8 ${team.stats.position === 1 ? "text-yellow-500" : "text-muted-foreground"}`}
                    />
                  </div>

                  <CardDescription className="text-pretty">{team.description}</CardDescription>

                  <div className="text-center p-3 rounded-lg bg-white/50">
                    <p className="font-medium italic">"{team.motto}"</p>
                    <p className="text-sm text-muted-foreground mt-1">Team Captain: {team.captain}</p>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* Points Progress */}
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="font-medium">Total Points</span>
                      <span className="font-bold">{team.stats.points}</span>
                    </div>
                    <Progress value={(team.stats.points / maxPoints) * 100} className="h-3" />
                  </div>

                  {/* Key Stats */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 rounded-lg bg-white/50">
                      <Users className="h-5 w-5 mx-auto mb-1 text-muted-foreground" />
                      <div className="font-bold">{team.stats.participants}</div>
                      <div className="text-xs text-muted-foreground">Participants</div>
                    </div>
                    <div className="text-center p-3 rounded-lg bg-white/50">
                      <Trophy className="h-5 w-5 mx-auto mb-1 text-muted-foreground" />
                      <div className="font-bold">{team.stats.wins}</div>
                      <div className="text-xs text-muted-foreground">Wins</div>
                    </div>
                    <div className="text-center p-3 rounded-lg bg-white/50">
                      <Calendar className="h-5 w-5 mx-auto mb-1 text-muted-foreground" />
                      <div className="font-bold">{team.stats.programmesParticipated}</div>
                      <div className="text-xs text-muted-foreground">Events</div>
                    </div>
                    <div className="text-center p-3 rounded-lg bg-white/50">
                      <Award className="h-5 w-5 mx-auto mb-1 text-muted-foreground" />
                      <div className="font-bold">{team.stats.podiumFinishes}</div>
                      <div className="text-xs text-muted-foreground">Podiums</div>
                    </div>
                  </div>

                  {/* Strengths */}
                  <div>
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <Star className="h-4 w-4" />
                      Team Strengths
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {team.strengths.map((strength) => (
                        <Badge key={strength} variant="secondary" className="text-xs">
                          {strength}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Recent Achievements */}
                  <div>
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <TrendingUp className="h-4 w-4" />
                      Recent Results
                    </h4>
                    <div className="space-y-2">
                      {team.recentAchievements.slice(0, 3).map((achievement, index) => (
                        <div key={index} className="flex items-center justify-between text-sm p-2 rounded bg-white/50">
                          <span className="text-pretty">{achievement.programme}</span>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-xs">
                              {achievement.position === 1 ? "1st" : achievement.position === 2 ? "2nd" : "3rd"}
                            </Badge>
                            <span className="font-medium">+{achievement.points}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button asChild className="w-full">
                    <Link href={`/leaderboard`}>View Full Performance</Link>
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Team Comparison */}
        <Card className="mt-12">
          <CardHeader>
            <CardTitle>Team Comparison</CardTitle>
            <CardDescription>Head-to-head statistics across all teams</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Team</th>
                    <th className="text-center p-2">Position</th>
                    <th className="text-center p-2">Points</th>
                    <th className="text-center p-2">Participants</th>
                    <th className="text-center p-2">Wins</th>
                    <th className="text-center p-2">Events</th>
                    <th className="text-center p-2">Win Rate</th>
                  </tr>
                </thead>
                <tbody>
                  {teams.map((team) => {
                    const colors = getTeamColorClasses(team.color)
                    const winRate = Math.round((team.stats.wins / team.stats.programmesParticipated) * 100)
                    return (
                      <tr key={team.id} className="border-b hover:bg-muted/50">
                        <td className="p-2">
                          <div className="flex items-center gap-2">
                            <div className={`w-6 h-6 rounded-full ${colors.accent}`} />
                            <span className="font-medium">{team.name}</span>
                          </div>
                        </td>
                        <td className="text-center p-2">
                          <Badge variant={team.stats.position === 1 ? "default" : "secondary"}>
                            #{team.stats.position}
                          </Badge>
                        </td>
                        <td className="text-center p-2 font-bold">{team.stats.points}</td>
                        <td className="text-center p-2">{team.stats.participants}</td>
                        <td className="text-center p-2">{team.stats.wins}</td>
                        <td className="text-center p-2">{team.stats.programmesParticipated}</td>
                        <td className="text-center p-2">{winRate}%</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
