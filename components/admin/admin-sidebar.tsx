"use client"

import { useAuth } from "@/components/auth/auth-provider"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { Calendar, Users, Trophy, BarChart3, Settings, UserPlus, FileText, Award, Home } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const teamAdminNavigation = [
  { name: "Dashboard", href: "/admin/team", icon: Home },
  { name: "Register Participants", href: "/admin/team/register", icon: UserPlus },
  { name: "My Team", href: "/admin/team/participants", icon: Users },
  { name: "Programmes", href: "/admin/team/programmes", icon: Calendar },
  { name: "Results", href: "/admin/team/results", icon: Trophy },
]

const superAdminNavigation = [
  { name: "Dashboard", href: "/admin/super", icon: Home },
  { name: "Programmes", href: "/admin/super/programmes", icon: Calendar },
  { name: "Categories", href: "/admin/super/categories", icon: FileText },
  { name: "Teams & Participants", href: "/admin/super/teams", icon: Users },
  { name: "Results Management", href: "/admin/super/results", icon: Award },
  { name: "Leaderboard", href: "/admin/super/leaderboard", icon: BarChart3 },
  { name: "System Settings", href: "/admin/super/settings", icon: Settings },
]

export function AdminSidebar() {
  const { user } = useAuth()
  const pathname = usePathname()

  const navigation = user?.role === "super-admin" ? superAdminNavigation : teamAdminNavigation

  return (
    <div className="flex h-full w-64 flex-col bg-card border-r">
      <div className="flex h-16 items-center border-b px-6">
        <div className="flex items-center gap-2">
          <Trophy className="h-6 w-6 text-primary" />
          <div>
            <p className="font-semibold">Admin Panel</p>
            <Badge variant={user?.role === "super-admin" ? "default" : "secondary"} className="text-xs">
              {user?.role === "super-admin" ? "Super Admin" : "Team Admin"}
            </Badge>
          </div>
        </div>
      </div>

      <nav className="flex-1 space-y-1 p-4">
        {navigation.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <Button
              key={item.name}
              asChild
              variant={isActive ? "secondary" : "ghost"}
              className={cn("w-full justify-start", isActive && "bg-secondary")}
            >
              <Link href={item.href}>
                <Icon className="mr-2 h-4 w-4" />
                {item.name}
              </Link>
            </Button>
          )
        })}
      </nav>

      {user?.team && (
        <div className="border-t p-4">
          <div className="text-center">
            <p className="text-sm font-medium">Team</p>
            <Badge variant="outline" className="mt-1">
              {user.team.charAt(0).toUpperCase() + user.team.slice(1)}
            </Badge>
          </div>
        </div>
      )}
    </div>
  )
}
