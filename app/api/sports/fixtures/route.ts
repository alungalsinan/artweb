import { NextResponse } from "next/server"
import { SportsStore } from "@/lib/sports/store"
import { FixtureCreateSchema } from "@/lib/schemas/sports"
import { getServerUserFromHeaders, requireSuperAdmin } from "@/lib/auth/server"

export async function GET() {
  try {
    const fixtures = await SportsStore.listFixtures()
    return NextResponse.json({ data: fixtures })
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to fetch fixtures" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const user = getServerUserFromHeaders(req.headers)
    requireSuperAdmin(user)

    const body = await req.json()
    const parsed = FixtureCreateSchema.parse(body)
    const created = await SportsStore.createFixture(parsed as any)
    return NextResponse.json({ data: created }, { status: 201 })
  } catch (error: any) {
    const status = error?.status || (error?.name === "ZodError" ? 400 : 500)
    return NextResponse.json({ error: error.message || "Failed to create fixture" }, { status })
  }
}


