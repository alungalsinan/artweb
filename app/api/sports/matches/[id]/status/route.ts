import { NextResponse } from "next/server"
import { SportsStore } from "@/lib/sports/store"
import { MatchStatusUpdateSchema } from "@/lib/schemas/sports"
import { getServerUserFromHeaders, requireSuperAdmin } from "@/lib/auth/server"

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const user = getServerUserFromHeaders(req.headers)
    requireSuperAdmin(user)

    const body = await req.json()
    const { status } = MatchStatusUpdateSchema.parse(body)

    let updated
    if (status === "ongoing") updated = await SportsStore.startMatch(params.id)
    else if (status === "paused") updated = await SportsStore.pauseMatch(params.id)
    else if (status === "completed") updated = await SportsStore.completeMatch(params.id)
    else return NextResponse.json({ error: "Invalid status" }, { status: 400 })

    if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 })
    return NextResponse.json({ data: updated })
  } catch (error: any) {
    const status = error?.status || (error?.name === "ZodError" ? 400 : 500)
    return NextResponse.json({ error: error.message || "Failed to update status" }, { status })
  }
}


