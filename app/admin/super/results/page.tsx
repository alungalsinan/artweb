"use client"

import { useState, useEffect } from "react"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { AdminHeader } from "@/components/admin/admin-header"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { ResultEntryForm } from "@/components/results/result-entry-form"
import { ResultCard } from "@/components/results/result-card"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trophy, Clock } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface Programme {
  id: string
  name: string
  category: string
  type: "arts" | "sports"
  date: string
  venue: string
}

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

interface ResultFormData {
  programmeId: string
  first: { participant: string; team: string; points: number }
  second: { participant: string; team: string; points: number }
  third: { participant: string; team: string; points: number }
}

export default function SuperAdminResultsPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("enter")
  const [programmes, setProgrammes] = useState<Programme[]>([])
  const [results, setResults] = useState<Result[]>([])
  const { toast } = useToast()

  useEffect(() => {
    fetchProgrammes()
    fetchResults()
  }, [])

  const fetchProgrammes = async () => {
    try {
      const res = await fetch("/api/programmes")
      const { data } = await res.json()
      setProgrammes(data)
    } catch (error) {
      console.error("Failed to fetch programmes", error)
      toast({
        title: "Error",
        description: "Failed to fetch programmes.",
        variant: "destructive",
      })
    }
  }

  const fetchResults = async () => {
    try {
      const res = await fetch("/api/results")
      const { data } = await res.json()
      setResults(data.arts) // Assuming we are only dealing with arts results for now
    } catch (error) {
      console.error("Failed to fetch results", error)
      toast({
        title: "Error",
        description: "Failed to fetch results.",
        variant: "destructive",
      })
    }
  }

  const handleResultSubmit = async (data: ResultFormData) => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/results", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const { error } = await response.json()
        throw new Error(error || "Failed to publish result")
      }

      const { data: newResult } = await response.json()
      setResults([...results, newResult])
      toast({
        title: "Success",
        description: "Result published successfully.",
      })
      setActiveTab("published")
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to publish result.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const pendingProgrammes = programmes.filter(
    (programme) => !results.some((result) => result.programmeId === programme.id),
  )

  const totalPointsAwarded = results.reduce(
    (sum, result) =>
      sum +
      result.positions.first.points +
      result.positions.second.points +
      result.positions.third.points,
    0,
  )

  return (
    <ProtectedRoute requiredRole="super-admin">
      <div className="min-h-screen bg-background">
        <AdminHeader />
        <div className="flex">
          <AdminSidebar />
          <main className="flex-1 p-6">
            <div className="space-y-6">
              {/* Header */}
              <div>
                <h1 className="text-3xl font-bold">Results Management</h1>
                <p className="text-muted-foreground">Enter and publish programme results, manage leaderboard updates</p>
              </div>

              {/* Stats */}
              <div className="grid gap-4 md:grid-cols-3">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Published Results</CardTitle>
                    <Trophy className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{results.length}</div>
                    <p className="text-xs text-muted-foreground">Results published</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Pending Results</CardTitle>
                    <Clock className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{pendingProgrammes.length}</div>
                    <p className="text-xs text-muted-foreground">Awaiting results</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Points Awarded</CardTitle>
                    <Badge className="h-4 w-4" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{totalPointsAwarded}</div>
                    <p className="text-xs text-muted-foreground">Points distributed</p>
                  </CardContent>
                </Card>
              </div>

              {/* Tabs */}
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList>
                  <TabsTrigger value="enter">Enter Results</TabsTrigger>
                  <TabsTrigger value="published">Published Results</TabsTrigger>
                  <TabsTrigger value="pending">Pending Programmes</TabsTrigger>
                </TabsList>

                <TabsContent value="enter" className="space-y-6">
                  {pendingProgrammes.length > 0 ? (
                    <ResultEntryForm
                      programmes={pendingProgrammes}
                      onSubmit={handleResultSubmit}
                      isLoading={isLoading}
                    />
                  ) : (
                    <Card>
                      <CardContent className="p-6 text-center">
                        <Trophy className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                        <h3 className="text-lg font-medium mb-2">All Results Published</h3>
                        <p className="text-muted-foreground">
                          There are no pending programmes that need results entry.
                        </p>
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>

                <TabsContent value="published" className="space-y-6">
                  {results.length > 0 ? (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                      {results.map((result) => (
                        <ResultCard key={result.id} result={result} showActions={true} />
                      ))}
                    </div>
                  ) : (
                    <Card>
                      <CardContent className="p-6 text-center">
                        <Clock className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                        <h3 className="text-lg font-medium mb-2">No Results Published</h3>
                        <p className="text-muted-foreground">Start by entering results for completed programmes.</p>
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>

                <TabsContent value="pending" className="space-y-6">
                  {pendingProgrammes.length > 0 ? (
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                      {pendingProgrammes.map((programme) => (
                        <Card key={programme.id}>
                          <CardHeader>
                            <CardTitle className="text-lg">{programme.name}</CardTitle>
                            <CardDescription>
                              {new Date(programme.date).toLocaleDateString()} • {programme.venue}
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="flex items-center justify-between">
                              <Badge variant="secondary">{programme.category}</Badge>
                              <Badge
                                variant="outline"
                                className={programme.type === "arts" ? "text-purple-600" : "text-blue-600"}
                              >
                                {programme.type === "arts" ? "Arts" : "Sports"}
                              </Badge>
                            </div>
                            <Button className="w-full mt-4" onClick={() => setActiveTab("enter")}>
                              Enter Results
                            </Button>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <Card>
                      <CardContent className="p-6 text-center">
                        <Trophy className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                        <h3 className="text-lg font-medium mb-2">No Pending Programmes</h3>
                        <p className="text-muted-foreground">All completed programmes have results published.</p>
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>
              </Tabs>
            </div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  )
}
