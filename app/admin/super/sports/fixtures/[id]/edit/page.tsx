"use client"

import { ProtectedRoute } from "@/components/auth/protected-route"
import { AdminHeader } from "@/components/admin/admin-header"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { FixtureForm } from "@/components/sports/fixture-form"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function EditFixturePage() {
  const params = useParams<{ id: string }>()
  const router = useRouter()
  const [fixture, setFixture] = useState<any>(null)

  useEffect(() => {
    const load = async () => {
      const res = await fetch(`/api/sports/fixtures/${params.id}`)
      const json = await res.json()
      setFixture(json.data)
    }
    load()
  }, [params.id])

  const handleSubmit = async (values: any) => {
    await fetch(`/api/sports/fixtures/${params.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", "x-role": "super-admin" },
      body: JSON.stringify(values),
    })
    router.push("/admin/super/sports/fixtures")
  }

  return (
    <ProtectedRoute requiredRole="super-admin">
      <div className="min-h-screen bg-background">
        <AdminHeader />
        <div className="flex">
          <AdminSidebar />
          <main className="flex-1 p-6 space-y-6">
            <h1 className="text-2xl font-bold">Edit Fixture</h1>
            {fixture && <FixtureForm initialValues={fixture} onSubmit={handleSubmit} submitLabel="Save Changes" />}
          </main>
        </div>
      </div>
    </ProtectedRoute>
  )
}


