import { NextResponse } from "next/server"
import { ProgrammeCreateSchema, ProgrammeUpdateSchema } from "@/lib/schemas/programmes"
import { ProgrammeStore } from "@/lib/programmes/store"
import { getServerUserFromHeaders, requireSuperAdmin } from "@/lib/auth/server"

export async function GET() {
  const data = await ProgrammeStore.list()
  return NextResponse.json({ data })
}

export async function POST(req: Request) {
  try {
    const user = getServerUserFromHeaders(req.headers)
    requireSuperAdmin(user)
    const body = await req.json()
    const parsed = ProgrammeCreateSchema.parse(body)
    const created = await ProgrammeStore.upsert({ ...parsed, id: `prog-${Date.now()}` })
    return NextResponse.json({ data: created }, { status: 201 })
  } catch (e: any) {
    const status = e?.status || (e?.name === "ZodError" ? 400 : 500)
    return NextResponse.json({ error: e?.message || "Failed" }, { status })
  }
}

export async function PATCH(req: Request) {
  try {
    const user = getServerUserFromHeaders(req.headers)
    requireSuperAdmin(user)
    const body = await req.json()
    const { id, ...rest } = body
    if (!id) return NextResponse.json({ error: "id required" }, { status: 400 })
    const parsed = ProgrammeUpdateSchema.parse(rest)
    const updated = await ProgrammeStore.update(id, parsed)
    if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 })
    return NextResponse.json({ data: updated })
  } catch (e: any) {
    const status = e?.status || (e?.name === "ZodError" ? 400 : 500)
    return NextResponse.json({ error: e?.message || "Failed" }, { status })
  }
}


