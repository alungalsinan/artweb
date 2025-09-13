"use client"

import { ProtectedRoute } from "@/components/auth/protected-route"
import { AdminHeader } from "@/components/admin/admin-header"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { FixtureForm } from "@/components/sports/fixture-form"
import { useRouter } from "next/navigation"

export default function CreateFixturePage() {
  const router = useRouter()

  const handleSubmit = async (values: any) => {
    await fetch("/api/sports/fixtures", {
      method: "POST",
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
            <h1 className="text-2xl font-bold">Create Fixture</h1>
            <FixtureForm onSubmit={handleSubmit} />
          </main>
        </div>
      </div>
    </ProtectedRoute>
  )
}


