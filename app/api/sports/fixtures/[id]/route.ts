import { NextResponse } from "next/server"
import { SportsStore } from "@/lib/sports/store"
import { FixtureUpdateSchema } from "@/lib/schemas/sports"
import { getServerUserFromHeaders, requireSuperAdmin } from "@/lib/auth/server"

export async function GET(_: Request, { params }: { params: { id: string } }) {
  try {
    const fixture = await SportsStore.getFixtureById(params.id)
    if (!fixture) return NextResponse.json({ error: "Not found" }, { status: 404 })
    return NextResponse.json({ data: fixture })
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to fetch fixture" }, { status: 500 })
  }
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const user = getServerUserFromHeaders(req.headers)
    requireSuperAdmin(user)

    const body = await req.json()
    const parsed = FixtureUpdateSchema.parse(body)
    const updated = await SportsStore.updateFixture(params.id, parsed as any)
    if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 })
    return NextResponse.json({ data: updated })
  } catch (error: any) {
    const status = error?.status || (error?.name === "ZodError" ? 400 : 500)
    return NextResponse.json({ error: error.message || "Failed to update fixture" }, { status })
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const user = getServerUserFromHeaders(req.headers)
    requireSuperAdmin(user)

    const ok = await SportsStore.deleteFixture(params.id)
    if (!ok) return NextResponse.json({ error: "Not found" }, { status: 404 })
    return NextResponse.json({ success: true })
  } catch (error: any) {
    const status = error?.status || 500
    return NextResponse.json({ error: error.message || "Failed to delete fixture" }, { status })
  }
}


