import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Calendar, Trophy, UserPlus, Award } from "lucide-react"

interface RecentActivityProps {
  role: "team-admin" | "super-admin"
  team?: string
}

// Mock activity data
const mockActivities = {
  "super-admin": [
    {
      id: 1,
      type: "programme_created",
      title: "New programme created",
      description: "Classical Dance competition added to Aliya category",
      time: "2 hours ago",
      icon: Calendar,
    },
    {
      id: 2,
      type: "result_published",
      title: "Results published",
      description: "Debate Competition results are now live",
      time: "4 hours ago",
      icon: Trophy,
    },
    {
      id: 3,
      type: "registration_closed",
      title: "Registration closed",
      description: "Poetry Recitation registration deadline reached",
      time: "1 day ago",
      icon: UserPlus,
    },
  ],
  "team-admin": [
    {
      id: 1,
      type: "participant_registered",
      title: "New participant registered",
      description: "Ahmed Ali registered for Classical Dance",
      time: "1 hour ago",
      icon: UserPlus,
    },
    {
      id: 2,
      type: "result_received",
      title: "Result received",
      description: "Your team won 2nd place in Debate Competition",
      time: "3 hours ago",
      icon: Award,
    },
    {
      id: 3,
      type: "programme_reminder",
      title: "Programme reminder",
      description: "Poetry Recitation starts tomorrow at 10 AM",
      time: "6 hours ago",
      icon: Calendar,
    },
  ],
}

export function RecentActivity({ role, team }: RecentActivityProps) {
  const activities = mockActivities[role]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Latest updates and notifications</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => {
            const Icon = activity.icon
            return (
              <div key={activity.id} className="flex items-start space-x-4">
                <Avatar className="h-9 w-9">
                  <AvatarFallback>
                    <Icon className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-1 flex-1">
                  <p className="text-sm font-medium leading-none">{activity.title}</p>
                  <p className="text-sm text-muted-foreground">{activity.description}</p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
