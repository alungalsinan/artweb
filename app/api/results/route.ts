import { NextResponse } from "next/server"
import { promises as fs } from "fs"
import path from "path"
import { SportsStore } from "@/lib/sports/store"
import { getServerUserFromHeaders } from "@/lib/auth/server"

export async function GET(req: Request) {
  const user = getServerUserFromHeaders(req.headers)
  const dataDir = process.env.FEST_DATA_DIR && process.env.FEST_DATA_DIR.trim().length > 0 ? process.env.FEST_DATA_DIR : path.join(process.cwd(), "data")

  // Sports results (completed matches)
  const sports = await SportsStore.listResults()

  // Arts results
  let arts: any[] = []
  try {
    const raw = await fs.readFile(path.join(dataDir, "arts-results.json"), "utf8")
    arts = JSON.parse(raw)
  } catch {}

  // Filter by team for team-admin
  if (user?.role === "team-admin" && user.team) {
    const team = user.team
    return NextResponse.json({
      data: {
        sports: sports.filter((r: any) => r.team1Id === team || r.team2Id === team),
        arts: arts.filter((r) => Object.values(r?.positions || {}).some((p: any) => p?.team === team)),
      },
    })
  }

  return NextResponse.json({ data: { sports, arts } })
}


