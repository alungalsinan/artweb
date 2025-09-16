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
import { useToast } from "@/components/ui/use-toast"

interface ProgrammeFormData {
  name: string
  category: string
  type: "arts" | "sports"
  scheduledAt: string
  venue: string
  description: string
  maxParticipants: string
  judges: string
  registrationOpen: boolean
}

export default function CreateProgrammePage() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = async (data: ProgrammeFormData) => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/programmes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          judges: data.judges.split(",").map((j) => j.trim()),
          maxParticipants: data.maxParticipants ? parseInt(data.maxParticipants, 10) : undefined,
        }),
      })

      if (!response.ok) {
        const { error } = await response.json()
        throw new Error(error || "Failed to create programme")
      }

      toast({
        title: "Success",
        description: "Programme created successfully.",
      })
      router.push("/admin/super/programmes")
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to create programme.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
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
