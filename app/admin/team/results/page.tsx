"use client"

import { useEffect, useState } from "react"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { AdminHeader } from "@/components/admin/admin-header"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function TeamResultsPage() {
  const [data, setData] = useState<any>({ sports: [], arts: [] })
  useEffect(() => {
    const load = async () => {
      const res = await fetch("/api/results", { headers: { "x-role": "team-admin", "x-team": "fulful" } })
      const json = await res.json()
      setData(json.data || { sports: [], arts: [] })
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
                <CardTitle>My Team Results</CardTitle>
              </CardHeader>
              <CardContent>
                <h3 className="font-semibold mb-2">Sports</h3>
                <pre className="text-xs overflow-auto max-h-[30vh] mb-4">{JSON.stringify(data.sports, null, 2)}</pre>
                <h3 className="font-semibold mb-2">Arts</h3>
                <pre className="text-xs overflow-auto max-h-[30vh]">{JSON.stringify(data.arts, null, 2)}</pre>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  )
}


