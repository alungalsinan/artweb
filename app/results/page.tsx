"use client"

import { useState, useEffect } from "react"
import { Navigation } from "@/components/navigation"
import { ResultCard } from "@/components/results/result-card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Search, Trophy } from "lucide-react"

interface Result {
  id: string
  programmeName: string
  programmeId: string
  category: string
  type: "arts" | "sports"
  date: string
  venue: string
  positions: {
    first: { participant: string; team: string; points: number }
    second: { participant: string; team: string; points: number }
    third: { participant: string; team: string; points: number }
  }
  publishedAt: string
}

const categories = ["All", "Bidaya", "Uoola", "Thaniya", "Thanawiyya", "Aliya", "Kulliyya"]
const types = ["All", "Arts", "Sports"]
const teams = ["All", "Fulful", "Kafur", "Zanjabeel"]

export default function ResultsPage() {
  const [results, setResults] = useState<Result[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedType, setSelectedType] = useState("All")
  const [selectedTeam, setSelectedTeam] = useState("All")

  useEffect(() => {
    fetchResults()
  }, [])

  const fetchResults = async () => {
    try {
      const res = await fetch("/api/results")
      const { data } = await res.json()
      // For now, we only display arts results as the result card is not compatible with sports results.
      const formattedResults = data.arts.map((r: any) => ({
        ...r,
        date: new Date(r.date).toLocaleDateString(),
      }))
      setResults(formattedResults)
    } catch (error) {
      console.error("Failed to fetch results", error)
    }
  }

  const filteredResults = results.filter((result) => {
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
    total: results.length,
    arts: results.filter((r) => r.type === "arts").length,
    sports: results.filter((r) => r.type === "sports").length,
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
            Showing {filteredResults.length} of {results.length} results
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
