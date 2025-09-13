"use client"

import { ProtectedRoute } from "@/components/auth/protected-route"
import { AdminHeader } from "@/components/admin/admin-header"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { DashboardStats } from "@/components/admin/dashboard-stats"
import { RecentActivity } from "@/components/admin/recent-activity"
import { useAuth } from "@/components/auth/auth-provider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Users, Trophy, Plus, BarChart3 } from "lucide-react"
import Link from "next/link"

// Mock system overview data
const systemOverview = {
  festProgress: 35,
  categoriesActive: 6,
  teamsParticipating: 3,
  totalEvents: 45,
  completedEvents: 12,
  pendingResults: 8,
}

const teamOverview = [
  { name: "Fulful", participants: 85, programmes: 28, points: 245, color: "bg-blue-500" },
  { name: "Kafur", participants: 78, programmes: 26, points: 230, color: "bg-green-500" },
  { name: "Zanjabeel", participants: 87, programmes: 30, points: 215, color: "bg-purple-500" },
]

export default function SuperAdminDashboard() {
  const { user } = useAuth()

  return (
    <ProtectedRoute requiredRole="super-admin">
      <div className="min-h-screen bg-background">
        <AdminHeader />
        <div className="flex">
          <AdminSidebar />
          <main className="flex-1 p-6">
            <div className="space-y-6">
              {/* Header */}
              <div>
                <h1 className="text-3xl font-bold">Super Admin Dashboard</h1>
                <p className="text-muted-foreground">
                  Welcome back, {user?.name}! Complete control over the fest management system.
                </p>
              </div>

              {/* Stats */}
              <DashboardStats role="super-admin" />

              {/* System Overview */}
              <div className="grid gap-6 lg:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Fest Progress</CardTitle>
                    <CardDescription>Overall completion status</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Overall Progress</span>
                        <span>{systemOverview.festProgress}%</span>
                      </div>
                      <Progress value={systemOverview.festProgress} className="h-2" />
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Completed Events</p>
                        <p className="text-2xl font-bold">{systemOverview.completedEvents}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Pending Results</p>
                        <p className="text-2xl font-bold">{systemOverview.pendingResults}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Team Overview</CardTitle>
                    <CardDescription>Current standings and participation</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {teamOverview.map((team, index) => (
                        <div key={team.name} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                          <div className="flex items-center gap-3">
                            <div className={`w-3 h-3 rounded-full ${team.color}`} />
                            <div>
                              <p className="font-medium">{team.name}</p>
                              <p className="text-sm text-muted-foreground">
                                {team.participants} participants • {team.programmes} programmes
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-bold">{team.points} pts</p>
                            <p className="text-sm text-muted-foreground">#{index + 1}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid gap-6 lg:grid-cols-2">
                {/* Recent Activity */}
                <RecentActivity role="super-admin" />

                {/* Quick Actions */}
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                    <CardDescription>Common administrative tasks</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-3">
                      <Button asChild className="justify-start h-12">
                        <Link href="/admin/super/programmes">
                          <Plus className="h-4 w-4 mr-2" />
                          Create New Programme
                        </Link>
                      </Button>
                      <Button asChild variant="outline" className="justify-start h-12 bg-transparent">
                        <Link href="/admin/super/results">
                          <Trophy className="h-4 w-4 mr-2" />
                          Publish Results
                        </Link>
                      </Button>
                      <Button asChild variant="outline" className="justify-start h-12 bg-transparent">
                        <Link href="/admin/super/teams">
                          <Users className="h-4 w-4 mr-2" />
                          Manage Teams
                        </Link>
                      </Button>
                      <Button asChild variant="outline" className="justify-start h-12 bg-transparent">
                        <Link href="/admin/super/leaderboard">
                          <BarChart3 className="h-4 w-4 mr-2" />
                          View Leaderboard
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  )
}
