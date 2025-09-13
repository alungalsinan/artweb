"use client"

import { useEffect, useMemo, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FixtureCard } from "@/components/sports/fixture-card"
import { LiveScoreTracker } from "@/components/sports/live-score-tracker"
import { Search, Filter } from "lucide-react"

type ApiFixture = {
  id: string
  sport: string
  category?: string
  team1Id: string
  team2Id: string
  scheduledAt: string
  venue: string
  status: "upcoming" | "ongoing" | "completed" | "paused"
  score?: { team1: number; team2: number }
}

export default function FixturesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSport, setSelectedSport] = useState("all")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [fixtures, setFixtures] = useState<ApiFixture[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      const res = await fetch("/api/sports/fixtures")
      const json = await res.json()
      setFixtures(json.data || [])
      setLoading(false)
    }
    load()
  }, [])

  const filteredFixtures = useMemo(() => fixtures.filter((fixture) => {
    const matchesSearch =
      fixture.sport.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fixture.team1Id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fixture.team2Id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSport = selectedSport === "all" || fixture.sport === selectedSport
    const matchesCategory = selectedCategory === "all" || fixture.category === selectedCategory
    const matchesStatus = selectedStatus === "all" || fixture.status === selectedStatus

    return matchesSearch && matchesSport && matchesCategory && matchesStatus
  }), [fixtures, searchTerm, selectedSport, selectedCategory, selectedStatus])

  const upcomingFixtures = filteredFixtures.filter((f) => f.status === "upcoming")
  const ongoingFixtures = filteredFixtures.filter((f) => f.status === "ongoing")
  const completedFixtures = filteredFixtures.filter((f) => f.status === "completed")

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Sports Fixtures</h1>
        <p className="text-gray-600">View match schedules, live scores, and results</p>
      </div>

      {/* Live Matches Section */}
      {ongoingFixtures.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            Live Matches
          </h2>
          <div className="grid gap-6">
            {ongoingFixtures.map((m) => (
              <LiveScoreTracker key={m.id} match={{ id: m.id, sport: m.sport, team1: m.team1Id, team2: m.team2Id, score: m.score || { team1: 0, team2: 0 }, time: "00:00", status: "ongoing" }} />
            ))}
          </div>
        </div>
      )}

      {/* Filters */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search fixtures..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedSport} onValueChange={setSelectedSport}>
              <SelectTrigger>
                <SelectValue placeholder="Select Sport" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sports</SelectItem>
                <SelectItem value="Football">Football</SelectItem>
                <SelectItem value="Basketball">Basketball</SelectItem>
                <SelectItem value="Cricket">Cricket</SelectItem>
                <SelectItem value="Volleyball">Volleyball</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Bidaya">Bidaya</SelectItem>
                <SelectItem value="Uoola">Uoola</SelectItem>
                <SelectItem value="Thaniya">Thaniya</SelectItem>
                <SelectItem value="Thanawiyya">Thanawiyya</SelectItem>
                <SelectItem value="Aliya">Aliya</SelectItem>
                <SelectItem value="Kulliyya">Kulliyya</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="upcoming">Upcoming</SelectItem>
                <SelectItem value="ongoing">Ongoing</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Fixtures Tabs */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All Fixtures</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming ({upcomingFixtures.length})</TabsTrigger>
          <TabsTrigger value="ongoing">Ongoing ({ongoingFixtures.length})</TabsTrigger>
          <TabsTrigger value="completed">Completed ({completedFixtures.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFixtures.map((fixture) => (
              <FixtureCard key={fixture.id} fixture={{
                id: fixture.id,
                sport: fixture.sport,
                category: fixture.category || "",
                team1: fixture.team1Id,
                team2: fixture.team2Id,
                date: new Date(fixture.scheduledAt).toLocaleDateString(),
                time: new Date(fixture.scheduledAt).toLocaleTimeString(),
                venue: fixture.venue,
                status: fixture.status as any,
                score: fixture.score,
              }} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="upcoming" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingFixtures.map((fixture) => (
              <FixtureCard key={fixture.id} fixture={{
                id: fixture.id,
                sport: fixture.sport,
                category: fixture.category || "",
                team1: fixture.team1Id,
                team2: fixture.team2Id,
                date: new Date(fixture.scheduledAt).toLocaleDateString(),
                time: new Date(fixture.scheduledAt).toLocaleTimeString(),
                venue: fixture.venue,
                status: fixture.status as any,
                score: fixture.score,
              }} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="ongoing" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ongoingFixtures.map((fixture) => (
              <FixtureCard key={fixture.id} fixture={{
                id: fixture.id,
                sport: fixture.sport,
                category: fixture.category || "",
                team1: fixture.team1Id,
                team2: fixture.team2Id,
                date: new Date(fixture.scheduledAt).toLocaleDateString(),
                time: new Date(fixture.scheduledAt).toLocaleTimeString(),
                venue: fixture.venue,
                status: fixture.status as any,
                score: fixture.score,
              }} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="completed" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {completedFixtures.map((fixture) => (
              <FixtureCard key={fixture.id} fixture={{
                id: fixture.id,
                sport: fixture.sport,
                category: fixture.category || "",
                team1: fixture.team1Id,
                team2: fixture.team2Id,
                date: new Date(fixture.scheduledAt).toLocaleDateString(),
                time: new Date(fixture.scheduledAt).toLocaleTimeString(),
                venue: fixture.venue,
                status: fixture.status as any,
                score: fixture.score,
              }} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
