import { NextResponse } from "next/server"
import { SportsStore } from "@/lib/sports/store"

export async function GET() {
  try {
    const teams = await SportsStore.listTeams()
    return NextResponse.json({ data: teams })
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to fetch teams" }, { status: 500 })
  }
}


