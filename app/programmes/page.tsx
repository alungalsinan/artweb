"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { ProgrammeCard } from "@/components/programmes/programme-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, Calendar } from "lucide-react"

// Mock programmes data
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
  {
    id: "4",
    name: "Poetry Recitation",
    category: "Uoola",
    type: "arts" as const,
    date: "March 18, 2024",
    time: "11:00 AM",
    venue: "Library Hall",
    description:
      "Recite classical and contemporary poetry in Arabic or English. Time limit: 5 minutes per participant.",
    maxParticipants: 20,
    currentParticipants: 20,
    judges: ["Dr. Fatima Al-Zahra", "Prof. Michael Brown"],
    registrationOpen: false,
    language: "Arabic",
  },
  {
    id: "5",
    name: "Basketball Tournament",
    category: "Thaniya",
    type: "sports" as const,
    date: "March 28, 2024",
    time: "4:00 PM",
    venue: "Indoor Court",
    description: "3v3 basketball tournament with knockout format. Fast-paced games with 15-minute duration.",
    currentParticipants: 18,
    judges: ["Coach Hassan", "Referee Omar"],
    registrationOpen: true,
  },
]

const categories = ["All", "Bidaya", "Uoola", "Thaniya", "Thanawiyya", "Aliya", "Kulliyya"]
const types = ["All", "Arts", "Sports"]

export default function ProgrammesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedType, setSelectedType] = useState("All")

  const filteredProgrammes = mockProgrammes.filter((programme) => {
    const matchesSearch =
      programme.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      programme.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || programme.category === selectedCategory
    const matchesType =
      selectedType === "All" ||
      (selectedType === "Arts" && programme.type === "arts") ||
      (selectedType === "Sports" && programme.type === "sports")

    return matchesSearch && matchesCategory && matchesType
  })

  const stats = {
    total: mockProgrammes.length,
    arts: mockProgrammes.filter((p) => p.type === "arts").length,
    sports: mockProgrammes.filter((p) => p.type === "sports").length,
    open: mockProgrammes.filter((p) => p.registrationOpen).length,
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Fest Programmes</h1>
          <p className="text-xl text-muted-foreground mb-6 text-pretty">
            Explore all the exciting programmes in our Arts & Sports Fest
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Badge variant="secondary" className="px-4 py-2">
              {stats.total} Total Programmes
            </Badge>
            <Badge variant="outline" className="px-4 py-2 text-purple-600">
              {stats.arts} Arts Events
            </Badge>
            <Badge variant="outline" className="px-4 py-2 text-blue-600">
              {stats.sports} Sports Events
            </Badge>
            <Badge variant="default" className="px-4 py-2">
              {stats.open} Registration Open
            </Badge>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
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

          <Button variant="outline" className="flex items-center gap-2 bg-transparent">
            <Filter className="h-4 w-4" />
            More Filters
          </Button>
        </div>

        {/* Results */}
        <div className="mb-4">
          <p className="text-muted-foreground">
            Showing {filteredProgrammes.length} of {mockProgrammes.length} programmes
          </p>
        </div>

        {/* Programmes Grid */}
        {filteredProgrammes.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredProgrammes.map((programme) => (
              <ProgrammeCard key={programme.id} programme={programme} showActions={false} userRole="public" />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Calendar className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-medium mb-2">No programmes found</h3>
            <p className="text-muted-foreground">Try adjusting your search criteria or filters</p>
          </div>
        )}
      </main>
    </div>
  )
}
