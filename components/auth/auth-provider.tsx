"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface User {
  id: string
  email: string
  role: "team-admin" | "super-admin"
  team?: string
  name: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string, role: "team-admin" | "super-admin", team?: string) => Promise<boolean>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Mock user database
const mockUsers: Record<string, User & { password: string }> = {
  "team@college.edu": {
    id: "1",
    email: "team@college.edu",
    password: "password123",
    role: "team-admin",
    team: "fulful",
    name: "Team Admin",
  },
  "admin@college.edu": {
    id: "2",
    email: "admin@college.edu",
    password: "admin123",
    role: "super-admin",
    name: "Super Admin",
  },
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for stored session
    const storedUser = localStorage.getItem("fest-user")
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        localStorage.removeItem("fest-user")
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (
    email: string,
    password: string,
    role: "team-admin" | "super-admin",
    team?: string,
  ): Promise<boolean> => {
    setIsLoading(true)

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const mockUser = mockUsers[email]

    if (mockUser && mockUser.password === password && mockUser.role === role) {
      const userData: User = {
        id: mockUser.id,
        email: mockUser.email,
        role: mockUser.role,
        team: role === "team-admin" ? team : undefined,
        name: mockUser.name,
      }

      setUser(userData)
      localStorage.setItem("fest-user", JSON.stringify(userData))
      setIsLoading(false)
      return true
    }

    setIsLoading(false)
    return false
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("fest-user")
  }

  return <AuthContext.Provider value={{ user, login, logout, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
