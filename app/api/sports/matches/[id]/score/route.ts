import { NextResponse } from "next/server"
import { SportsStore } from "@/lib/sports/store"
import { ScoreUpdateSchema } from "@/lib/schemas/sports"
import { getServerUserFromHeaders, requireSuperAdmin } from "@/lib/auth/server"

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const user = getServerUserFromHeaders(req.headers)
    requireSuperAdmin(user)

    const body = await req.json()
    const score = ScoreUpdateSchema.parse(body)
    const updated = await SportsStore.updateScore(params.id, score)
    if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 })
    return NextResponse.json({ data: updated })
  } catch (error: any) {
    const status = error?.status || (error?.name === "ZodError" ? 400 : 500)
    return NextResponse.json({ error: error.message || "Failed to update score" }, { status })
  }
}


