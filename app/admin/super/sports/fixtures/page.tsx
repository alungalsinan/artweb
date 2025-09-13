"use client"

import { ProtectedRoute } from "@/components/auth/protected-route"
import { AdminHeader } from "@/components/admin/admin-header"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { MatchTable } from "@/components/sports/match-table"

export default function SuperAdminSportsFixturesPage() {
  return (
    <ProtectedRoute requiredRole="super-admin">
      <div className="min-h-screen bg-background">
        <AdminHeader />
        <div className="flex">
          <AdminSidebar />
          <main className="flex-1 p-6 space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold">Sports Fixtures</h1>
              <Button asChild>
                <Link href="/admin/super/sports/fixtures/create">Create Fixture</Link>
              </Button>
            </div>
            <MatchTable isAdmin />
          </main>
        </div>
      </div>
    </ProtectedRoute>
  )
}


