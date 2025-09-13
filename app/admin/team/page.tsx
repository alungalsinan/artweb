"use client"

import { ProtectedRoute } from "@/components/auth/protected-route"
import { AdminHeader } from "@/components/admin/admin-header"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { DashboardStats } from "@/components/admin/dashboard-stats"
import { RecentActivity } from "@/components/admin/recent-activity"
import { useAuth } from "@/components/auth/auth-provider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Users, Trophy, Plus } from "lucide-react"
import Link from "next/link"

// Mock upcoming events
const upcomingEvents = [
  {
    id: 1,
    name: "Classical Dance",
    category: "Aliya",
    date: "March 20, 2024",
    time: "10:00 AM",
    venue: "Main Auditorium",
    participants: 3,
  },
  {
    id: 2,
    name: "Poetry Recitation",
    category: "Thanawiyya",
    date: "March 21, 2024",
    time: "2:00 PM",
    venue: "Conference Hall",
    participants: 2,
  },
  {
    id: 3,
    name: "Football Tournament",
    category: "Kulliyya",
    date: "March 25, 2024",
    time: "9:00 AM",
    venue: "Sports Ground",
    participants: 11,
  },
]

export default function TeamAdminDashboard() {
  const { user } = useAuth()

  return (
    <ProtectedRoute requiredRole="team-admin">
      <div className="min-h-screen bg-background">
        <AdminHeader />
        <div className="flex">
          <AdminSidebar />
          <main className="flex-1 p-6">
            <div className="space-y-6">
              {/* Header */}
              <div>
                <h1 className="text-3xl font-bold">Team Dashboard</h1>
                <p className="text-muted-foreground">
                  Welcome back, {user?.name}! Manage your team's participation in the fest.
                </p>
              </div>

              {/* Stats */}
              <DashboardStats role="team-admin" team={user?.team} />

              <div className="grid gap-6 lg:grid-cols-2">
                {/* Upcoming Events */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Upcoming Events</CardTitle>
                        <CardDescription>Your team's scheduled programmes</CardDescription>
                      </div>
                      <Button asChild size="sm">
                        <Link href="/admin/team/programmes">
                          <Calendar className="h-4 w-4 mr-2" />
                          View All
                        </Link>
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {upcomingEvents.map((event) => (
                        <div key={event.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                          <div>
                            <p className="font-medium">{event.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {event.date} at {event.time}
                            </p>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="outline">{event.category}</Badge>
                              <span className="text-xs text-muted-foreground">{event.venue}</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center gap-1 text-sm">
                              <Users className="h-4 w-4" />
                              {event.participants}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Activity */}
                <RecentActivity role="team-admin" team={user?.team} />
              </div>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Common tasks for team management</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-3">
                    <Button asChild className="h-20 flex-col gap-2">
                      <Link href="/admin/team/register">
                        <Plus className="h-6 w-6" />
                        Register Participant
                      </Link>
                    </Button>
                    <Button asChild variant="outline" className="h-20 flex-col gap-2 bg-transparent">
                      <Link href="/admin/team/participants">
                        <Users className="h-6 w-6" />
                        View Team Members
                      </Link>
                    </Button>
                    <Button asChild variant="outline" className="h-20 flex-col gap-2 bg-transparent">
                      <Link href="/admin/team/results">
                        <Trophy className="h-6 w-6" />
                        Check Results
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  )
}
