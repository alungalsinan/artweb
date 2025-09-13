"use client"

import { useState } from "react"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { AdminHeader } from "@/components/admin/admin-header"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { ProgrammeCard } from "@/components/programmes/programme-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Search, Plus } from "lucide-react"
import Link from "next/link"

// Mock programmes data (same as public page)
const mockProgrammes = [
  {
    id: "1",
    name: "Classical Dance Competition",
    category: "Aliya",
    type: "arts" as const,
    date: "March 20, 2024",
    time: "10:00 AM",
    venue: "Main Auditorium",
    description: "Showcase traditional dance forms including Bharatanatyam, Kathak, and regional folk dances.",
    maxParticipants: 15,
    currentParticipants: 8,
    judges: ["Dr. Priya Nair", "Prof. Ahmed Al-Rashid"],
    registrationOpen: true,
    language: "Any",
  },
  {
    id: "2",
    name: "Debate Competition",
    category: "Thanawiyya",
    type: "arts" as const,
    date: "March 22, 2024",
    time: "2:00 PM",
    venue: "Conference Hall",
    description: "Oxford-style debate on contemporary issues. Teams will be given topics 30 minutes before the debate.",
    maxParticipants: 12,
    currentParticipants: 10,
    judges: ["Dr. Sarah Johnson", "Prof. Omar Hassan"],
    registrationOpen: true,
    language: "English",
  },
  {
    id: "3",
    name: "Football Tournament",
    category: "Kulliyya",
    type: "sports" as const,
    date: "March 25, 2024",
    time: "9:00 AM",
    venue: "Sports Ground",
    description: "Inter-team football championship. Each team can register up to 15 players including substitutes.",
    maxParticipants: 45,
    currentParticipants: 33,
    judges: ["Coach Ahmed", "Referee Ali"],
    registrationOpen: true,
  },
]

const categories = ["All", "Bidaya", "Uoola", "Thaniya", "Thanawiyya", "Aliya", "Kulliyya"]
const types = ["All", "Arts", "Sports"]

export default function SuperAdminProgrammesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedType, setSelectedType] = useState("All")

  const filteredProgrammes = mockProgrammes.filter((programme) => {
    const matchesSearch = programme.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || programme.category === selectedCategory
    const matchesType =
      selectedType === "All" ||
      (selectedType === "Arts" && programme.type === "arts") ||
      (selectedType === "Sports" && programme.type === "sports")

    return matchesSearch && matchesCategory && matchesType
  })

  return (
    <ProtectedRoute requiredRole="super-admin">
      <div className="min-h-screen bg-background">
        <AdminHeader />
        <div className="flex">
          <AdminSidebar />
          <main className="flex-1 p-6">
            <div className="space-y-6">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold">Programme Management</h1>
                  <p className="text-muted-foreground">Create and manage fest programmes</p>
                </div>
                <Button asChild>
                  <Link href="/admin/super/programmes/create">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Programme
                  </Link>
                </Button>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap gap-4">
                <Badge variant="secondary" className="px-4 py-2">
                  {mockProgrammes.length} Total Programmes
                </Badge>
                <Badge variant="outline" className="px-4 py-2 text-purple-600">
                  {mockProgrammes.filter((p) => p.type === "arts").length} Arts Events
                </Badge>
                <Badge variant="outline" className="px-4 py-2 text-blue-600">
                  {mockProgrammes.filter((p) => p.type === "sports").length} Sports Events
                </Badge>
                <Badge variant="default" className="px-4 py-2">
                  {mockProgrammes.filter((p) => p.registrationOpen).length} Registration Open
                </Badge>
              </div>

              {/* Filters */}
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search programmes..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    {types.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Programmes Grid */}
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredProgrammes.map((programme) => (
                  <ProgrammeCard key={programme.id} programme={programme} showActions={true} userRole="super-admin" />
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  )
}
