"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Trophy, Medal, Award } from "lucide-react"

interface Programme {
  id: string
  name: string
  category: string
  type: "arts" | "sports"
  date: string
  venue: string
}

interface ResultFormData {
  programmeId: string
  first: { participant: string; team: string; points: number }
  second: { participant: string; team: string; points: number }
  third: { participant: string; team: string; points: number }
}

interface ResultEntryFormProps {
  programmes: Programme[]
  onSubmit: (data: ResultFormData) => void
  isLoading?: boolean
}

const teams = ["fulful", "kafur", "zanjabeel"]
const pointsSystem = {
  first: 10,
  second: 7,
  third: 5,
}

export function ResultEntryForm({ programmes, onSubmit, isLoading = false }: ResultEntryFormProps) {
  const [selectedProgramme, setSelectedProgramme] = useState<Programme | null>(null)
  const [formData, setFormData] = useState<ResultFormData>({
    programmeId: "",
    first: { participant: "", team: "", points: pointsSystem.first },
    second: { participant: "", team: "", points: pointsSystem.second },
    third: { participant: "", team: "", points: pointsSystem.third },
  })

  const handleProgrammeSelect = (programmeId: string) => {
    const programme = programmes.find((p) => p.id === programmeId)
    setSelectedProgramme(programme || null)
    setFormData({
      ...formData,
      programmeId,
    })
  }

  const updatePosition = (position: "first" | "second" | "third", field: "participant" | "team", value: string) => {
    setFormData({
      ...formData,
      [position]: {
        ...formData[position],
        [field]: value,
      },
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const getPositionIcon = (position: "first" | "second" | "third") => {
    switch (position) {
      case "first":
        return <Trophy className="h-5 w-5 text-yellow-500" />
      case "second":
        return <Medal className="h-5 w-5 text-gray-400" />
      case "third":
        return <Award className="h-5 w-5 text-amber-600" />
    }
  }

  const isFormValid = () => {
    return (
      formData.programmeId &&
      formData.first.participant &&
      formData.first.team &&
      formData.second.participant &&
      formData.second.team &&
      formData.third.participant &&
      formData.third.team
    )
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Enter Programme Results</CardTitle>
        <CardDescription>Record the winners and assign points for completed programmes</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Programme Selection */}
          <div className="space-y-2">
            <Label htmlFor="programme">Select Programme</Label>
            <Select value={formData.programmeId} onValueChange={handleProgrammeSelect}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a programme to enter results for" />
              </SelectTrigger>
              <SelectContent>
                {programmes.map((programme) => (
                  <SelectItem key={programme.id} value={programme.id}>
                    <div className="flex items-center gap-2">
                      <span>{programme.name}</span>
                      <Badge variant="outline" className="text-xs">
                        {programme.category}
                      </Badge>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedProgramme && (
            <Card className="bg-muted/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">{selectedProgramme.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {selectedProgramme.date} • {selectedProgramme.venue}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant="secondary">{selectedProgramme.category}</Badge>
                    <Badge
                      variant="outline"
                      className={selectedProgramme.type === "arts" ? "text-purple-600" : "text-blue-600"}
                    >
                      {selectedProgramme.type === "arts" ? "Arts" : "Sports"}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Results Entry */}
          {selectedProgramme && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Enter Results</h3>

              {(["first", "second", "third"] as const).map((position) => (
                <Card key={position} className="p-4">
                  <div className="flex items-center gap-3 mb-4">
                    {getPositionIcon(position)}
                    <div>
                      <h4 className="font-medium capitalize">{position} Place</h4>
                      <p className="text-sm text-muted-foreground">{formData[position].points} points</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`${position}-participant`}>Participant Name</Label>
                      <Input
                        id={`${position}-participant`}
                        value={formData[position].participant}
                        onChange={(e) => updatePosition(position, "participant", e.target.value)}
                        placeholder="Enter participant name"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`${position}-team`}>Team</Label>
                      <Select
                        value={formData[position].team}
                        onValueChange={(value) => updatePosition(position, "team", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select team" />
                        </SelectTrigger>
                        <SelectContent>
                          {teams.map((team) => (
                            <SelectItem key={team} value={team}>
                              {team.charAt(0).toUpperCase() + team.slice(1)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}

          <div className="flex gap-4 pt-4">
            <Button type="submit" disabled={isLoading || !isFormValid()} className="flex-1">
              {isLoading ? "Publishing Results..." : "Publish Results"}
            </Button>
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
