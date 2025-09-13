"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff, Shield, Users, Crown } from "lucide-react"

interface LoginFormProps {
  onLogin: (credentials: LoginCredentials) => void
  isLoading?: boolean
  error?: string
}

interface LoginCredentials {
  email: string
  password: string
  role: "team-admin" | "super-admin"
  team?: string
}

const teams = [
  { value: "fulful", label: "Fulful" },
  { value: "kafur", label: "Kafur" },
  { value: "zanjabeel", label: "Zanjabeel" },
]

export function LoginForm({ onLogin, isLoading = false, error }: LoginFormProps) {
  const [credentials, setCredentials] = useState<LoginCredentials>({
    email: "",
    password: "",
    role: "team-admin",
  })
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onLogin(credentials)
  }

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "team-admin":
        return <Users className="h-4 w-4" />
      case "super-admin":
        return <Crown className="h-4 w-4" />
      default:
        return <Shield className="h-4 w-4" />
    }
  }

  const getRoleDescription = (role: string) => {
    switch (role) {
      case "team-admin":
        return "Register participants for your team programmes"
      case "super-admin":
        return "Full access to manage programmes, results, and system settings"
      default:
        return "Select your role"
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">Admin Login</CardTitle>
        <CardDescription>Sign in to access the fest management system</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <Select
              value={credentials.role}
              onValueChange={(value: "team-admin" | "super-admin") =>
                setCredentials({
                  ...credentials,
                  role: value,
                  team: value === "super-admin" ? undefined : credentials.team,
                })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select your role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="team-admin">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Team Admin
                  </div>
                </SelectItem>
                <SelectItem value="super-admin">
                  <div className="flex items-center gap-2">
                    <Crown className="h-4 w-4" />
                    Super Admin
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
            <p className="text-sm text-muted-foreground">{getRoleDescription(credentials.role)}</p>
          </div>

          {credentials.role === "team-admin" && (
            <div className="space-y-2">
              <Label htmlFor="team">Team</Label>
              <Select
                value={credentials.team}
                onValueChange={(value) => setCredentials({ ...credentials, team: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select your team" />
                </SelectTrigger>
                <SelectContent>
                  {teams.map((team) => (
                    <SelectItem key={team.value} value={team.value}>
                      {team.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="admin@college.edu"
              value={credentials.email}
              onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
              </Button>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={
              isLoading ||
              !credentials.email ||
              !credentials.password ||
              (credentials.role === "team-admin" && !credentials.team)
            }
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </Button>
        </form>

        <div className="mt-6 pt-6 border-t">
          <div className="text-center text-sm text-muted-foreground">
            <p className="mb-2">Demo Credentials:</p>
            <div className="space-y-1 text-xs">
              <p>
                <strong>Team Admin:</strong> team@college.edu / password123
              </p>
              <p>
                <strong>Super Admin:</strong> admin@college.edu / admin123
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
