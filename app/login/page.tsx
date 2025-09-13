"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { LoginForm } from "@/components/auth/login-form"
import { useAuth } from "@/components/auth/auth-provider"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Trophy } from "lucide-react"

interface LoginCredentials {
  email: string
  password: string
  role: "team-admin" | "super-admin"
  team?: string
}

export default function LoginPage() {
  const [error, setError] = useState<string>("")
  const { login, isLoading } = useAuth()
  const router = useRouter()

  const handleLogin = async (credentials: LoginCredentials) => {
    setError("")

    const success = await login(credentials.email, credentials.password, credentials.role, credentials.team)

    if (success) {
      // Redirect based on role
      if (credentials.role === "super-admin") {
        router.push("/admin/super")
      } else {
        router.push("/admin/team")
      }
    } else {
      setError("Invalid credentials. Please check your email, password, and role.")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button asChild variant="ghost">
            <Link href="/" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </Button>
          <div className="flex items-center gap-2">
            <Trophy className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl">College Fest</span>
          </div>
        </div>

        {/* Login Form */}
        <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
          <LoginForm onLogin={handleLogin} isLoading={isLoading} error={error} />
        </div>
      </div>
    </div>
  )
}
