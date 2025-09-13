"use client"

import { ProtectedRoute } from "@/components/auth/protected-route"
import { AdminHeader } from "@/components/admin/admin-header"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useEffect, useState } from "react"

export default function SuperAdminLeaderboardPage() {
  const [data, setData] = useState<any[]>([])
  useEffect(() => {
    const load = async () => {
      const res = await fetch("/api/leaderboard")
      const json = await res.json()
      setData(json.data || [])
    }
    load()
  }, [])

  return (
    <ProtectedRoute requiredRole="super-admin">
      <div className="min-h-screen bg-background">
        <AdminHeader />
        <div className="flex">
          <AdminSidebar />
          <main className="flex-1 p-6 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Leaderboard (Merged)</CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="text-xs overflow-auto max-h-[60vh]">{JSON.stringify(data, null, 2)}</pre>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  )
}


