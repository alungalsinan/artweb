// Lightweight server-side auth utility for route handlers
// Uses the same mock session stored in localStorage on the client, but for server-side we accept
// an "x-role" and optional "x-team" header to simulate role-based gating for now.

export type ServerUser = {
  role: "team-admin" | "super-admin"
  team?: string
}

export function getServerUserFromHeaders(headers: Headers): ServerUser | null {
  const role = headers.get("x-role") as ServerUser["role"] | null
  const team = headers.get("x-team") || undefined
  if (!role) return null
  if (role !== "team-admin" && role !== "super-admin") return null
  return { role, team }
}

export function requireSuperAdmin(user: ServerUser | null) {
  if (!user || user.role !== "super-admin") {
    const err = new Error("Forbidden: super-admin only")
    ;(err as any).status = 403
    throw err
  }
}


