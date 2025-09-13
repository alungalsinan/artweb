"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { ResultCard } from "@/components/results/result-card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Search, Trophy } from "lucide-react"

// Mock results data
const mockResults = [
  {
    id: "1",
    programmeName: "Classical Dance Competition",
    programmeId: "1",
    category: "Aliya",
    type: "arts" as const,
    date: "March 20, 2024",
    venue: "Main Auditorium",
    positions: {
      first: { participant: "Aisha Ahmed", team: "fulful", points: 10 },
      second: { participant: "Sara Ali", team: "kafur", points: 7 },
      third: { participant: "Fatima Hassan", team: "zanjabeel", points: 5 },
    },
    publishedAt: "2024-03-20T15:30:00Z",
  },
  {
    id: "2",
    programmeName: "Debate Competition",
    programmeId: "2",
    category: "Thanawiyya",
    type: "arts" as const,
    date: "March 22, 2024",
    venue: "Conference Hall",
    positions: {
      first: { participant: "Omar Khalil", team: "kafur", points: 10 },
      second: { participant: "Ahmed Rashid", team: "fulful", points: 7 },
      third: { participant: "Yusuf Ibrahim", team: "zanjabeel", points: 5 },
    },
    publishedAt: "2024-03-22T16:45:00Z",
  },
  {
    id: "3",
    programmeName: "Poetry Recitation",
    programmeId: "4",
    category: "Uoola",
    type: "arts" as const,
    date: "March 18, 2024",
    venue: "Library Hall",
    positions: {
      first: { participant: "Mariam Noor", team: "zanjabeel", points: 10 },
      second: { participant: "Layla Saeed", team: "fulful", points: 7 },
      third: { participant: "Nadia Farouk", team: "kafur", points: 5 },
    },
    publishedAt: "2024-03-18T14:20:00Z",
  },
]

const categories = ["All", "Bidaya", "Uoola", "Thaniya", "Thanawiyya", "Aliya", "Kulliyya"]
const types = ["All", "Arts", "Sports"]
const teams = ["All", "Fulful", "Kafur", "Zanjabeel"]

export default function ResultsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedType, setSelectedType] = useState("All")
  const [selectedTeam, setSelectedTeam] = useState("All")

  const filteredResults = mockResults.filter((result) => {
    const matchesSearch = result.programmeName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || result.category === selectedCategory
    const matchesType =
      selectedType === "All" ||
      (selectedType === "Arts" && result.type === "arts") ||
      (selectedType === "Sports" && result.type === "sports")
    const matchesTeam =
      selectedTeam === "All" ||
      Object.values(result.positions).some((pos) => pos.team.toLowerCase() === selectedTeam.toLowerCase())

    return matchesSearch && matchesCategory && matchesType && matchesTeam
  })

  const stats = {
    total: mockResults.length,
    arts: mockResults.filter((r) => r.type === "arts").length,
    sports: mockResults.filter((r) => r.type === "sports").length,
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Fest Results</h1>
          <p className="text-xl text-muted-foreground mb-6 text-pretty">
            View all published results and winners from our Arts & Sports Fest
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Badge variant="secondary" className="px-4 py-2">
              <Trophy className="h-4 w-4 mr-2" />
              {stats.total} Results Published
            </Badge>
            <Badge variant="outline" className="px-4 py-2 text-purple-600">
              {stats.arts} Arts Results
            </Badge>
            <Badge variant="outline" className="px-4 py-2 text-blue-600">
              {stats.sports} Sports Results
            </Badge>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search results..."
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

          <Select value={selectedTeam} onValueChange={setSelectedTeam}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Team" />
            </SelectTrigger>
            <SelectContent>
              {teams.map((team) => (
                <SelectItem key={team} value={team}>
                  {team}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Results */}
        <div className="mb-4">
          <p className="text-muted-foreground">
            Showing {filteredResults.length} of {mockResults.length} results
          </p>
        </div>

        {/* Results Grid */}
        {filteredResults.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredResults.map((result) => (
              <ResultCard key={result.id} result={result} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Trophy className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-medium mb-2">No results found</h3>
            <p className="text-muted-foreground">Try adjusting your search criteria or filters</p>
          </div>
        )}
      </main>
    </div>
  )
}
