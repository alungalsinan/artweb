"use client"

import type React from "react"

import { useAuth } from "./auth-provider"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredRole?: "team-admin" | "super-admin"
  requiredTeam?: string
}

export function ProtectedRoute({ children, requiredRole, requiredTeam }: ProtectedRouteProps) {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card>
          <CardContent className="p-6 text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
            <p>Loading...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!user) {
    return null
  }

  // Check role permissions
  if (requiredRole && user.role !== requiredRole && user.role !== "super-admin") {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card>
          <CardContent className="p-6 text-center">
            <h2 className="text-xl font-bold mb-2">Access Denied</h2>
            <p className="text-muted-foreground">You don't have permission to access this page.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Check team permissions for team admins
  if (requiredTeam && user.role === "team-admin" && user.team !== requiredTeam) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card>
          <CardContent className="p-6 text-center">
            <h2 className="text-xl font-bold mb-2">Team Access Only</h2>
            <p className="text-muted-foreground">This page is restricted to {requiredTeam} team members.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return <>{children}</>
}
