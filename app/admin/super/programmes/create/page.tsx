"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { AdminHeader } from "@/components/admin/admin-header"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { ProgrammeForm } from "@/components/programmes/programme-form"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

interface ProgrammeFormData {
  name: string
  category: string
  type: "arts" | "sports"
  date: string
  time: string
  venue: string
  description: string
  maxParticipants: string
  language: string
  judges: string[]
  registrationOpen: boolean
}

export default function CreateProgrammePage() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (data: ProgrammeFormData) => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    console.log("Creating programme:", data)

    // Redirect back to programmes list
    router.push("/admin/super/programmes")
  }

  return (
    <ProtectedRoute requiredRole="super-admin">
      <div className="min-h-screen bg-background">
        <AdminHeader />
        <div className="flex">
          <AdminSidebar />
          <main className="flex-1 p-6">
            <div className="space-y-6">
              {/* Header */}
              <div className="flex items-center gap-4">
                <Button asChild variant="ghost" size="sm">
                  <Link href="/admin/super/programmes">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Programmes
                  </Link>
                </Button>
                <div>
                  <h1 className="text-3xl font-bold">Create New Programme</h1>
                  <p className="text-muted-foreground">Add a new programme to the fest schedule</p>
                </div>
              </div>

              {/* Form */}
              <ProgrammeForm mode="create" onSubmit={handleSubmit} isLoading={isLoading} />
            </div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  )
}
