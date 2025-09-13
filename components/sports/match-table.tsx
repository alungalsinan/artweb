"use client"

import { useEffect, useMemo, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Fixture } from "@/lib/sports/types"

interface MatchTableProps {
  isAdmin?: boolean
}

export function MatchTable({ isAdmin = true }: MatchTableProps) {
  const [fixtures, setFixtures] = useState<Fixture[]>([])
  const [loading, setLoading] = useState(true)

  const fetchFixtures = async () => {
    setLoading(true)
    const res = await fetch("/api/sports/fixtures")
    const json = await res.json()
    setFixtures(json.data || [])
    setLoading(false)
  }

  useEffect(() => {
    fetchFixtures()
  }, [])

  const byStatus = useMemo(() => {
    return {
      upcoming: fixtures.filter((f) => f.status === "upcoming"),
      ongoing: fixtures.filter((f) => f.status === "ongoing"),
      completed: fixtures.filter((f) => f.status === "completed"),
    }
  }, [fixtures])

  const updateStatus = async (id: string, status: "ongoing" | "paused" | "completed") => {
    await fetch(`/api/sports/matches/${id}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", "x-role": "super-admin" },
      body: JSON.stringify({ status }),
    })
    fetchFixtures()
  }

  return (
    <Card>
      <CardContent className="p-4 space-y-6">
        {loading ? (
          <div>Loading fixtures...</div>
        ) : (
          <div className="space-y-6">
            {(["upcoming", "ongoing", "completed"] as const).map((group) => (
              <div key={group} className="space-y-2">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-semibold capitalize">{group}</h3>
                  <Badge variant="outline">{byStatus[group].length}</Badge>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
                  {byStatus[group].map((fx) => (
                    <div key={fx.id} className="border rounded p-3 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="font-medium">{fx.sport}</div>
                        <Badge variant="secondary" className="capitalize">{fx.status}</Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">{fx.category} • {new Date(fx.scheduledAt).toLocaleString()}</div>
                      <div className="text-sm">{fx.team1Id} vs {fx.team2Id}</div>
                      <div className="text-sm">Venue: {fx.venue}</div>
                      {fx.score && (
                        <div className="text-sm font-semibold">Score: {fx.score.team1} - {fx.score.team2}</div>
                      )}
                      {isAdmin && (
                        <div className="flex gap-2 pt-2">
                          {fx.status === "upcoming" && (
                            <Button size="sm" variant="outline" onClick={() => updateStatus(fx.id, "ongoing")}>Start</Button>
                          )}
                          {fx.status === "ongoing" && (
                            <>
                              <Button size="sm" variant="outline" onClick={() => updateStatus(fx.id, "completed")}>Complete</Button>
                              <Button size="sm" variant="outline" onClick={() => updateStatus(fx.id, "paused")}>Pause</Button>
                            </>
                          )}
                          {fx.status === "paused" && (
                            <Button size="sm" variant="outline" onClick={() => updateStatus(fx.id, "ongoing")}>Resume</Button>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}


