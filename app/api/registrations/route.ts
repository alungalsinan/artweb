import { NextResponse } from "next/server"
import { RegistrationCreateSchema } from "@/lib/schemas/registrations"
import { RegistrationStore } from "@/lib/registrations/store"
import { getServerUserFromHeaders } from "@/lib/auth/server"

export async function GET(req: Request) {
  const user = getServerUserFromHeaders(req.headers)
  if (user?.role === "team-admin" && user.team) {
    const regs = await RegistrationStore.listByTeam(user.team)
    return NextResponse.json({ data: regs })
  }
  const data = await RegistrationStore.list()
  return NextResponse.json({ data })
}

export async function POST(req: Request) {
  try {
    const user = getServerUserFromHeaders(req.headers)
    if (!user || user.role !== "team-admin" || !user.team) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }
    const body = await req.json()
    const parsed = RegistrationCreateSchema.parse(body)
    const reg = {
      id: `reg-${Date.now()}`,
      ...parsed,
      teamId: user.team,
      createdAt: new Date().toISOString(),
    }
    const created = await RegistrationStore.create(reg)
    return NextResponse.json({ data: created }, { status: 201 })
  } catch (e: any) {
    const status = e?.status || (e?.name === "ZodError" ? 400 : 500)
    return NextResponse.json({ error: e?.message || "Failed" }, { status })
  }
}


