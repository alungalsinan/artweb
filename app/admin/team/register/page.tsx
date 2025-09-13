"use client"

import { useState } from "react"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { AdminHeader } from "@/components/admin/admin-header"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function TeamRegisterPage() {
  const [programmeId, setProgrammeId] = useState("")
  const [participantName, setParticipantName] = useState("")
  const [message, setMessage] = useState("")

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage("")
    const res = await fetch("/api/registrations", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-role": "team-admin", "x-team": "fulful" },
      body: JSON.stringify({ programmeId, participantName }),
    })
    const json = await res.json()
    setMessage(res.ok ? "Registered" : json?.error || "Failed")
  }

  return (
    <ProtectedRoute requiredRole="team-admin">
      <div className="min-h-screen bg-background">
        <AdminHeader />
        <div className="flex">
          <AdminSidebar />
          <main className="flex-1 p-6 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Register Participant</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={submit} className="space-y-4">
                  <Input placeholder="Programme ID" value={programmeId} onChange={(e) => setProgrammeId(e.target.value)} required />
                  <Input placeholder="Participant Name" value={participantName} onChange={(e) => setParticipantName(e.target.value)} required />
                  <Button type="submit">Register</Button>
                </form>
                {message && <p className="text-sm mt-3">{message}</p>}
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  )
}


