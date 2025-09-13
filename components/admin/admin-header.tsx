"use client"

import { useAuth } from "@/components/auth/auth-provider"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Trophy, User, LogOut, Home } from "lucide-react"
import Link from "next/link"

export function AdminHeader() {
  const { user, logout } = useAuth()

  const getRoleBadgeVariant = (role: string) => {
    return role === "super-admin" ? "default" : "secondary"
  }

  const getRoleLabel = (role: string) => {
    return role === "super-admin" ? "Super Admin" : "Team Admin"
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <Trophy className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl">College Fest</span>
          </Link>
          <Badge variant="outline">Admin Panel</Badge>
        </div>

        <div className="flex items-center gap-4">
          <Button asChild variant="ghost" size="sm">
            <Link href="/" className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              Public Site
            </Link>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span className="hidden sm:inline">{user?.name}</span>
                <Badge variant={getRoleBadgeVariant(user?.role || "")}>{getRoleLabel(user?.role || "")}</Badge>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="px-2 py-1.5">
                <p className="text-sm font-medium">{user?.name}</p>
                <p className="text-xs text-muted-foreground">{user?.email}</p>
                {user?.team && <p className="text-xs text-muted-foreground">Team: {user.team}</p>}
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout} className="text-destructive">
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
