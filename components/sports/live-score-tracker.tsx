"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Play, Pause, RotateCcw } from "lucide-react"
import type { Score } from "@/lib/sports/types"

interface LiveMatch {
  id: string
  sport: string
  team1: string
  team2: string
  score: {
    team1: number
    team2: number
  }
  time: string
  status: "ongoing" | "paused" | "completed"
}

interface LiveScoreTrackerProps {
  match: LiveMatch
  isAdmin?: boolean
  pollIntervalMs?: number
  onScoreUpdate?: (matchId: string, score: { team1: number; team2: number }) => void
}

export function LiveScoreTracker({ match, isAdmin = false, pollIntervalMs = 7000, onScoreUpdate }: LiveScoreTrackerProps) {
  const [localScore, setLocalScore] = useState(match.score)
  const [timer, setTimer] = useState(match.time)
  const [isRunning, setIsRunning] = useState(match.status === "ongoing")

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isRunning && isAdmin) {
      interval = setInterval(() => {
        setTimer((prev) => {
          const [minutes, seconds] = prev.split(":").map(Number)
          const totalSeconds = minutes * 60 + seconds + 1
          const newMinutes = Math.floor(totalSeconds / 60)
          const newSeconds = totalSeconds % 60
          return `${newMinutes.toString().padStart(2, "0")}:${newSeconds.toString().padStart(2, "0")}`
        })
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isRunning, isAdmin])

  // Public polling for updated score
  useEffect(() => {
    if (isAdmin) return
    let interval: NodeJS.Timeout
    const poll = async () => {
      try {
        const res = await fetch(`/api/sports/fixtures/${match.id}`)
        const json = await res.json()
        if (json?.data?.score) setLocalScore(json.data.score as Score)
      } catch {}
    }
    poll()
    interval = setInterval(poll, pollIntervalMs)
    return () => clearInterval(interval)
  }, [match.id, isAdmin, pollIntervalMs])

  const handleScoreChange = (team: "team1" | "team2", increment: number) => {
    const newScore = {
      ...localScore,
      [team]: Math.max(0, localScore[team] + increment),
    }
    setLocalScore(newScore)
    if (isAdmin) {
      // Optimistic update then push to API if no handler provided
      if (onScoreUpdate) onScoreUpdate(match.id, newScore)
      else {
        void fetch(`/api/sports/matches/${match.id}/score`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json", "x-role": "super-admin" },
          body: JSON.stringify(newScore),
        })
      }
    }
  }

  const toggleTimer = () => {
    setIsRunning(!isRunning)
  }

  const resetTimer = () => {
    setTimer("00:00")
    setIsRunning(false)
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl">{match.sport}</CardTitle>
          <Badge
            variant="secondary"
            className={
              match.status === "ongoing"
                ? "bg-red-100 text-red-800"
                : match.status === "paused"
                ? "bg-yellow-100 text-yellow-800"
                : match.status === "completed"
                ? "bg-gray-100 text-gray-800"
                : "bg-blue-100 text-blue-800"
            }
          >
            {match.status.toUpperCase()}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Timer */}
        <div className="text-center">
          <div className="text-3xl font-bold text-primary">{timer}</div>
          {isAdmin && (
            <div className="flex justify-center gap-2 mt-2">
              <Button size="sm" variant="outline" onClick={toggleTimer}>
                {isRunning ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </Button>
              <Button size="sm" variant="outline" onClick={resetTimer}>
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>

        {/* Score Display */}
        <div className="grid grid-cols-3 gap-4 items-center">
          {/* Team 1 */}
          <div className="text-center">
            <h3 className="font-semibold text-lg mb-2">{match.team1}</h3>
            <div className="text-4xl font-bold text-primary">{localScore.team1}</div>
            {isAdmin && (
              <div className="flex justify-center gap-1 mt-2">
                <Button size="sm" variant="outline" onClick={() => handleScoreChange("team1", -1)}>
                  -
                </Button>
                <Button size="sm" variant="outline" onClick={() => handleScoreChange("team1", 1)}>
                  +
                </Button>
              </div>
            )}
          </div>

          {/* VS */}
          <div className="text-center">
            <div className="text-2xl font-bold text-muted-foreground">VS</div>
          </div>

          {/* Team 2 */}
          <div className="text-center">
            <h3 className="font-semibold text-lg mb-2">{match.team2}</h3>
            <div className="text-4xl font-bold text-primary">{localScore.team2}</div>
            {isAdmin && (
              <div className="flex justify-center gap-1 mt-2">
                <Button size="sm" variant="outline" onClick={() => handleScoreChange("team2", -1)}>
                  -
                </Button>
                <Button size="sm" variant="outline" onClick={() => handleScoreChange("team2", 1)}>
                  +
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Admin Controls */}
        {isAdmin && (
          <div className="border-t pt-4 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="team1-score">Set {match.team1} Score</Label>
                <Input
                  id="team1-score"
                  type="number"
                  value={localScore.team1}
                  onChange={(e) => setLocalScore((prev) => ({ ...prev, team1: Number.parseInt(e.target.value) || 0 }))}
                />
              </div>
              <div>
                <Label htmlFor="team2-score">Set {match.team2} Score</Label>
                <Input
                  id="team2-score"
                  type="number"
                  value={localScore.team2}
                  onChange={(e) => setLocalScore((prev) => ({ ...prev, team2: Number.parseInt(e.target.value) || 0 }))}
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {match.status === "upcoming" && (
                <Button
                  size="sm"
                  variant="default"
                  onClick={async () => {
                    await fetch(`/api/sports/matches/${match.id}/status`, {
                      method: "PATCH",
                      headers: { "Content-Type": "application/json", "x-role": "super-admin" },
                      body: JSON.stringify({ status: "ongoing" }),
                    })
                  }}
                >
                  Start Match
                </Button>
              )}
              {match.status === "ongoing" && (
                <>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={async () => {
                      await fetch(`/api/sports/matches/${match.id}/status`, {
                        method: "PATCH",
                        headers: { "Content-Type": "application/json", "x-role": "super-admin" },
                        body: JSON.stringify({ status: "paused" }),
                      })
                    }}
                  >
                    Pause
                  </Button>
                  <Button
                    size="sm"
                    variant="default"
                    onClick={async () => {
                      await fetch(`/api/sports/matches/${match.id}/status`, {
                        method: "PATCH",
                        headers: { "Content-Type": "application/json", "x-role": "super-admin" },
                        body: JSON.stringify({ status: "completed" }),
                      })
                    }}
                  >
                    Complete
                  </Button>
                </>
              )}
              {match.status === "paused" && (
                <Button
                  size="sm"
                  variant="default"
                  onClick={async () => {
                    await fetch(`/api/sports/matches/${match.id}/status`, {
                      method: "PATCH",
                      headers: { "Content-Type": "application/json", "x-role": "super-admin" },
                      body: JSON.stringify({ status: "ongoing" }),
                    })
                  }}
                >
                  Resume
                </Button>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
