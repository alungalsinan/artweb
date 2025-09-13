"use client"

import { Navigation } from "@/components/navigation"
import { ProgrammeCard } from "@/components/programmes/programme-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Trophy, Users, Calendar, Target, Zap, Medal } from "lucide-react"
import Link from "next/link"

// Mock sports programmes
const sportsPrograms = [
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
  {
    id: "6",
    name: "Cricket Championship",
    category: "Aliya",
    type: "sports" as const,
    date: "March 30, 2024",
    time: "10:00 AM",
    venue: "Cricket Ground",
    description: "T20 format cricket matches between teams. Professional umpiring and live scoring.",
    maxParticipants: 33,
    currentParticipants: 24,
    judges: ["Umpire Khalil", "Coach Rashid"],
    registrationOpen: true,
  },
  {
    id: "7",
    name: "Table Tennis Singles",
    category: "Uoola",
    type: "sports" as const,
    date: "March 26, 2024",
    time: "2:00 PM",
    venue: "Sports Hall",
    description: "Individual table tennis competition with round-robin format followed by knockout rounds.",
    maxParticipants: 24,
    currentParticipants: 20,
    judges: ["Referee Saeed"],
    registrationOpen: true,
  },
  {
    id: "8",
    name: "Badminton Doubles",
    category: "Thanawiyya",
    type: "sports" as const,
    date: "March 27, 2024",
    time: "3:00 PM",
    venue: "Indoor Court 2",
    description: "Doubles badminton tournament. Teams of 2 players compete in elimination rounds.",
    maxParticipants: 32,
    currentParticipants: 28,
    judges: ["Coach Noor", "Referee Amina"],
    registrationOpen: true,
  },
  {
    id: "9",
    name: "Athletics Meet",
    category: "Bidaya",
    type: "sports" as const,
    date: "April 1, 2024",
    time: "8:00 AM",
    venue: "Athletic Track",
    description: "Track and field events including 100m, 200m, long jump, shot put, and relay races.",
    maxParticipants: 60,
    currentParticipants: 45,
    judges: ["Coach Ibrahim", "Official Mariam"],
    registrationOpen: true,
  },
]

const sportsStats = {
  totalEvents: sportsPrograms.length,
  totalParticipants: sportsPrograms.reduce((sum, prog) => sum + prog.currentParticipants, 0),
  openRegistrations: sportsPrograms.filter((prog) => prog.registrationOpen).length,
  venues: [...new Set(sportsPrograms.map((prog) => prog.venue))].length,
}

const upcomingHighlights = [
  {
    title: "Football Tournament Finals",
    date: "March 25",
    description: "The most anticipated event with all three teams competing for the championship trophy.",
  },
  {
    title: "Athletics Meet",
    date: "April 1",
    description: "Multi-event athletics competition featuring track and field events for all categories.",
  },
  {
    title: "Cricket Championship",
    date: "March 30",
    description: "T20 format cricket matches with professional umpiring and live commentary.",
  },
]

export default function SportsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main>
        {/* Hero Section */}
        <section className="relative py-20 px-4 text-center bg-gradient-to-br from-blue-50 via-background to-green-50">
          <div className="container mx-auto max-w-4xl">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Trophy className="h-8 w-8 text-blue-600" />
              <Zap className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">Sports Fest 2024</h1>
            <p className="text-xl text-muted-foreground mb-8 text-pretty max-w-2xl mx-auto">
              Experience the thrill of competition, showcase your athletic prowess, and compete for glory in our
              comprehensive sports championship.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-lg px-8">
                <Link href="/programmes?type=Sports">View Sports Events</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8 bg-transparent">
                <Link href="/results?type=Sports">Sports Results</Link>
              </Button>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-12">
          {/* Stats Overview */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-center">Sports Fest Overview</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="text-center">
                <CardContent className="p-6">
                  <Calendar className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                  <div className="text-2xl font-bold">{sportsStats.totalEvents}</div>
                  <div className="text-sm text-muted-foreground">Sports Events</div>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-6">
                  <Users className="h-8 w-8 mx-auto mb-2 text-green-600" />
                  <div className="text-2xl font-bold">{sportsStats.totalParticipants}</div>
                  <div className="text-sm text-muted-foreground">Athletes</div>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-6">
                  <Trophy className="h-8 w-8 mx-auto mb-2 text-yellow-600" />
                  <div className="text-2xl font-bold">{sportsStats.openRegistrations}</div>
                  <div className="text-sm text-muted-foreground">Open Events</div>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-6">
                  <Target className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                  <div className="text-2xl font-bold">{sportsStats.venues}</div>
                  <div className="text-sm text-muted-foreground">Venues</div>
                </CardContent>
              </Card>
            </div>
          </section>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Sports Events */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Sports Events</h2>
                <Button asChild variant="outline">
                  <Link href="/programmes?type=Sports">View All Sports</Link>
                </Button>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                {sportsPrograms.slice(0, 4).map((programme) => (
                  <ProgrammeCard key={programme.id} programme={programme} showActions={false} userRole="public" />
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Upcoming Highlights */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Medal className="h-5 w-5 text-primary" />
                    Upcoming Highlights
                  </CardTitle>
                  <CardDescription>Don't miss these exciting events</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {upcomingHighlights.map((highlight, index) => (
                    <div key={index} className="p-3 rounded-lg bg-muted/50">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-balance">{highlight.title}</h4>
                        <Badge variant="outline">{highlight.date}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground text-pretty">{highlight.description}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Sports Categories */}
              <Card>
                <CardHeader>
                  <CardTitle>Sports Categories</CardTitle>
                  <CardDescription>Events organized by academic levels</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { category: "Kulliyya", events: 2, color: "bg-blue-100 text-blue-800" },
                    { category: "Aliya", events: 1, color: "bg-green-100 text-green-800" },
                    { category: "Thanawiyya", events: 1, color: "bg-purple-100 text-purple-800" },
                    { category: "Thaniya", events: 1, color: "bg-orange-100 text-orange-800" },
                    { category: "Uoola", events: 1, color: "bg-red-100 text-red-800" },
                    { category: "Bidaya", events: 1, color: "bg-indigo-100 text-indigo-800" },
                  ].map((cat) => (
                    <div key={cat.category} className="flex items-center justify-between p-2 rounded">
                      <span className="font-medium">{cat.category}</span>
                      <Badge variant="secondary" className={cat.color}>
                        {cat.events} {cat.events === 1 ? "Event" : "Events"}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button asChild className="w-full bg-transparent" variant="outline">
                    <Link href="/programmes?type=Sports">Browse All Sports</Link>
                  </Button>
                  <Button asChild className="w-full bg-transparent" variant="outline">
                    <Link href="/results?type=Sports">Sports Results</Link>
                  </Button>
                  <Button asChild className="w-full bg-transparent" variant="outline">
                    <Link href="/leaderboard">Team Rankings</Link>
                  </Button>
                  <Button asChild className="w-full">
                    <Link href="/login">Register Athletes</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
