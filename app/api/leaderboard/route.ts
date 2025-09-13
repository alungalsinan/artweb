import { NextResponse } from "next/server"
import { promises as fs } from "fs"
import path from "path"
import { SportsStore } from "@/lib/sports/store"

// For now returns sports leaderboard. Integration with arts points can extend this by
// reading programme results and combining totals.
export async function GET() {
  try {
    const sportsStandings = await SportsStore.computeLeaderboard()

    // Merge arts points from data/arts-results.json if present
    const dataDir = process.env.FEST_DATA_DIR && process.env.FEST_DATA_DIR.trim().length > 0
      ? process.env.FEST_DATA_DIR
      : path.join(process.cwd(), "data")
    const artsFile = path.join(dataDir, "arts-results.json")
    let artsTotals: Record<string, number> = {}
    try {
      const raw = await fs.readFile(artsFile, "utf8")
      const results = JSON.parse(raw) as any[]
      for (const r of results) {
        for (const key of ["first", "second", "third"] as const) {
          const teamId = r?.positions?.[key]?.team
          const pts = r?.positions?.[key]?.points ?? 0
          if (!teamId) continue
          artsTotals[teamId] = (artsTotals[teamId] || 0) + pts
        }
      }
    } catch {}

    const merged = sportsStandings.map((s) => ({
      ...s,
      sportsPoints: s.points,
      artsPoints: artsTotals[s.teamId] || 0,
      points: s.points + (artsTotals[s.teamId] || 0),
    }))

    // Sort after merge
    merged.sort((a, b) => b.points - a.points || b.goalDifference - a.goalDifference || b.goalsFor - a.goalsFor)

    return NextResponse.json({ data: merged })
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to compute leaderboard" }, { status: 500 })
  }
}


