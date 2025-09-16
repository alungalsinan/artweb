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

export async function POST(req: Request) {
  const user = getServerUserFromHeaders(req.headers)
  if (!user || user.role !== "super-admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const dataDir = process.env.FEST_DATA_DIR && process.env.FEST_DATA_DIR.trim().length > 0 ? process.env.FEST_DATA_DIR : path.join(process.cwd(), "data")
  const resultsFilePath = path.join(dataDir, "arts-results.json")

  try {
    const newResult = await req.json()

    // Read existing results
    let artsResults: any[] = []
    try {
      const raw = await fs.readFile(resultsFilePath, "utf8")
      artsResults = JSON.parse(raw)
    } catch (e) {
      // File might not exist yet, which is fine
    }


    // Get programme details
    const programmesFilePath = path.join(dataDir, "programmes.json")
    const programmesRaw = await fs.readFile(programmesFilePath, "utf8")
    const programmes = JSON.parse(programmesRaw)
    const programme = programmes.find((p: any) => p.id === newResult.programmeId)

    if (!programme) {
      return NextResponse.json({ error: "Programme not found" }, { status: 404 })
    }

    const resultToSave = {
      id: `result-${Date.now()}`,
      programmeId: programme.id,
      programmeName: programme.name,
      category: programme.category,
      type: programme.type,
      date: programme.scheduledAt,
      venue: programme.venue,
      positions: {
        first: newResult.first,
        second: newResult.second,
        third: newResult.third,
      },
      publishedAt: new Date().toISOString(),
    }

    // Add new result and save
    artsResults.push(resultToSave)
    await fs.writeFile(resultsFilePath, JSON.stringify(artsResults, null, 2))

    return NextResponse.json({ data: resultToSave }, { status: 201 })
  } catch (error) {
    console.error("Failed to save result:", error)
    return NextResponse.json({ error: "Failed to save result" }, { status: 500 })
  }
}

