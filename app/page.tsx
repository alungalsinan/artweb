import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Navigation } from "@/components/navigation"
import { CountdownTimer } from "@/components/countdown-timer"
import { AnnouncementTicker } from "@/components/announcement-ticker"
import { Trophy, Calendar, Users, BarChart3, Palette, Zap, Camera } from "lucide-react"

const quickStats = [
  { label: "Total Programmes", value: "45", icon: Calendar },
  { label: "Registered Teams", value: "3", icon: Users },
  { label: "Active Participants", value: "250+", icon: Trophy },
  { label: "Events Completed", value: "12", icon: BarChart3 },
]

const featuredProgrammes = [
  {
    id: 1,
    name: "Classical Dance",
    category: "Aliya",
    type: "Arts",
    date: "March 20, 2024",
    venue: "Main Auditorium",
    status: "Registration Open",
  },
  {
    id: 2,
    name: "Debate Competition",
    category: "Thanawiyya",
    type: "Arts",
    date: "March 22, 2024",
    venue: "Conference Hall",
    status: "Registration Open",
  },
  {
    id: 3,
    name: "Football Tournament",
    category: "Kulliyya",
    type: "Sports",
    date: "March 25, 2024",
    venue: "Sports Ground",
    status: "Coming Soon",
  },
]

export default function HomePage() {
  // Set fest start date (example: March 20, 2024)
  const festStartDate = new Date("2024-03-20T09:00:00")

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main>
        {/* Hero Section */}
        <section className="relative py-20 px-4 text-center bg-gradient-to-br from-primary/5 via-background to-secondary/5">
          <div className="container mx-auto max-w-4xl">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Palette className="h-8 w-8 text-primary" />
              <Zap className="h-8 w-8 text-secondary" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">Arts & Sports Fest 2024</h1>
            <p className="text-xl text-muted-foreground mb-8 text-pretty max-w-2xl mx-auto">
              Join us for the most spectacular celebration of talent, creativity, and sportsmanship. Compete, create,
              and celebrate with your college community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-lg px-8">
                <Link href="/programmes">View Programmes</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8 bg-transparent">
                <Link href="/results">Latest Results</Link>
              </Button>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-12">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Quick Stats */}
              <section>
                <h2 className="text-2xl font-bold mb-6">Fest Overview</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {quickStats.map((stat) => {
                    const Icon = stat.icon
                    return (
                      <Card key={stat.label} className="text-center">
                        <CardContent className="p-6">
                          <Icon className="h-8 w-8 mx-auto mb-2 text-primary" />
                          <div className="text-2xl font-bold">{stat.value}</div>
                          <div className="text-sm text-muted-foreground">{stat.label}</div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </section>

              {/* Featured Programmes */}
              <section>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">Featured Programmes</h2>
                  <Button asChild variant="outline">
                    <Link href="/programmes">View All</Link>
                  </Button>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  {featuredProgrammes.map((programme) => (
                    <Card key={programme.id} className="hover:shadow-md transition-shadow">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">{programme.name}</CardTitle>
                          <div className="flex gap-2">
                            <Badge
                              variant="outline"
                              className={programme.type === "Arts" ? "text-purple-600" : "text-blue-600"}
                            >
                              {programme.type}
                            </Badge>
                            <Badge variant="secondary">{programme.category}</Badge>
                          </div>
                        </div>
                        <CardDescription>
                          {programme.date} • {programme.venue}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <Badge variant={programme.status === "Registration Open" ? "default" : "outline"}>
                            {programme.status}
                          </Badge>
                          <Button variant="ghost" size="sm" asChild>
                            <Link href={`/programmes/${programme.id}`}>View Details</Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>

              {/* Team Standings Preview */}
              <section>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">Current Standings</h2>
                  <Button asChild variant="outline">
                    <Link href="/leaderboard">Full Leaderboard</Link>
                  </Button>
                </div>
                <Card>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {[
                        { team: "Fulful", points: 245, position: 1, color: "bg-blue-500" },
                        { team: "Kafur", points: 230, position: 2, color: "bg-green-500" },
                        { team: "Zanjabeel", points: 215, position: 3, color: "bg-purple-500" },
                      ].map((team) => (
                        <div key={team.team} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                              {team.position}
                            </div>
                            <div className="flex items-center gap-2">
                              <div className={`w-3 h-3 rounded-full ${team.color}`} />
                              <span className="font-medium">{team.team}</span>
                            </div>
                          </div>
                          <div className="text-lg font-bold">{team.points} pts</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* Explore Sections */}
              <section>
                <h2 className="text-2xl font-bold mb-6">Explore Fest</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <Palette className="h-8 w-8 text-purple-600" />
                        <h3 className="text-xl font-bold">Arts Fest</h3>
                      </div>
                      <p className="text-muted-foreground mb-4 text-pretty">
                        Showcase your creativity through dance, debate, poetry, and cultural performances.
                      </p>
                      <Button asChild className="w-full">
                        <Link href="/programmes?type=Arts">Explore Arts Events</Link>
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-blue-50 to-green-50 border-blue-200">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <Trophy className="h-8 w-8 text-blue-600" />
                        <h3 className="text-xl font-bold">Sports Fest</h3>
                      </div>
                      <p className="text-muted-foreground mb-4 text-pretty">
                        Compete in football, basketball, cricket, and various athletic events.
                      </p>
                      <Button asChild className="w-full">
                        <Link href="/sports">Explore Sports Events</Link>
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Countdown Timer */}
              <Card>
                <CardContent className="p-6">
                  <CountdownTimer targetDate={festStartDate} title="Fest Begins In" />
                </CardContent>
              </Card>

              {/* Announcements */}
              <Card>
                <CardContent className="p-6">
                  <AnnouncementTicker />
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button asChild className="w-full bg-transparent" variant="outline">
                    <Link href="/programmes">Browse Programmes</Link>
                  </Button>
                  <Button asChild className="w-full bg-transparent" variant="outline">
                    <Link href="/results">Check Results</Link>
                  </Button>
                  <Button asChild className="w-full bg-transparent" variant="outline">
                    <Link href="/teams">View Teams</Link>
                  </Button>
                  <Button asChild className="w-full bg-transparent" variant="outline">
                    <Link href="/gallery">
                      <Camera className="h-4 w-4 mr-2" />
                      Photo Gallery
                    </Link>
                  </Button>
                  <Button asChild className="w-full">
                    <Link href="/login">Admin Login</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-muted/50 py-12 px-4 mt-16">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="flex items-center gap-1">
              <Palette className="h-5 w-5 text-purple-600" />
              <Trophy className="h-6 w-6 text-primary" />
            </div>
            <span className="font-bold text-xl">College Fest 2024</span>
          </div>
          <p className="text-muted-foreground mb-4">
            Celebrating talent, creativity, and sportsmanship in our college community.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <Link href="/programmes" className="hover:text-primary transition-colors">
              Programmes
            </Link>
            <Link href="/sports" className="hover:text-primary transition-colors">
              Sports
            </Link>
            <Link href="/results" className="hover:text-primary transition-colors">
              Results
            </Link>
            <Link href="/leaderboard" className="hover:text-primary transition-colors">
              Leaderboard
            </Link>
            <Link href="/teams" className="hover:text-primary transition-colors">
              Teams
            </Link>
            <Link href="/gallery" className="hover:text-primary transition-colors">
              Gallery
            </Link>
            <Link href="/admin" className="hover:text-primary transition-colors">
              Admin
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
