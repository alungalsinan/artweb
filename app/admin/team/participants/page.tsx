"use client"

import { useEffect, useState } from "react"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { AdminHeader } from "@/components/admin/admin-header"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function TeamParticipantsPage() {
  const [registrations, setRegistrations] = useState<any[]>([])
  useEffect(() => {
    const load = async () => {
      const res = await fetch("/api/registrations", { headers: { "x-role": "team-admin", "x-team": "fulful" } })
      const json = await res.json()
      setRegistrations(json.data || [])
    }
    load()
  }, [])

  return (
    <ProtectedRoute requiredRole="team-admin">
      <div className="min-h-screen bg-background">
        <AdminHeader />
        <div className="flex">
          <AdminSidebar />
          <main className="flex-1 p-6 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>My Team Registrations</CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="text-xs overflow-auto max-h-[60vh]">{JSON.stringify(registrations, null, 2)}</pre>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  )
}


