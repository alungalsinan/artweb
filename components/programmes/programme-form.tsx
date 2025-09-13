"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { X, Plus } from "lucide-react"

interface ProgrammeFormData {
  name: string
  category: string
  type: "arts" | "sports"
  date: string
  time: string
  venue: string
  description: string
  maxParticipants: string
  language: string
  judges: string[]
  registrationOpen: boolean
}

interface ProgrammeFormProps {
  initialData?: Partial<ProgrammeFormData>
  onSubmit: (data: ProgrammeFormData) => void
  isLoading?: boolean
  mode: "create" | "edit"
}

const categories = ["Bidaya", "Uoola", "Thaniya", "Thanawiyya", "Aliya", "Kulliyya"]

const languages = ["Arabic", "English", "Malayalam", "Any"]

export function ProgrammeForm({ initialData, onSubmit, isLoading = false, mode }: ProgrammeFormProps) {
  const [formData, setFormData] = useState<ProgrammeFormData>({
    name: initialData?.name || "",
    category: initialData?.category || "",
    type: initialData?.type || "arts",
    date: initialData?.date || "",
    time: initialData?.time || "",
    venue: initialData?.venue || "",
    description: initialData?.description || "",
    maxParticipants: initialData?.maxParticipants || "",
    language: initialData?.language || "",
    judges: initialData?.judges || [],
    registrationOpen: initialData?.registrationOpen ?? true,
  })

  const [newJudge, setNewJudge] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const addJudge = () => {
    if (newJudge.trim() && !formData.judges.includes(newJudge.trim())) {
      setFormData({
        ...formData,
        judges: [...formData.judges, newJudge.trim()],
      })
      setNewJudge("")
    }
  }

  const removeJudge = (judge: string) => {
    setFormData({
      ...formData,
      judges: formData.judges.filter((j) => j !== judge),
    })
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>{mode === "create" ? "Create New Programme" : "Edit Programme"}</CardTitle>
        <CardDescription>
          {mode === "create" ? "Add a new programme to the fest schedule" : "Update programme details and settings"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Programme Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., Classical Dance Competition"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="type">Type</Label>
              <Select
                value={formData.type}
                onValueChange={(value: "arts" | "sports") => setFormData({ ...formData, type: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="arts">Arts</SelectItem>
                  <SelectItem value="sports">Sports</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="language">Language</Label>
              <Select
                value={formData.language}
                onValueChange={(value) => setFormData({ ...formData, language: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((language) => (
                    <SelectItem key={language} value={language}>
                      {language}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe the programme, rules, and requirements..."
              rows={3}
              required
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="time">Time</Label>
              <Input
                id="time"
                type="time"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="maxParticipants">Max Participants</Label>
              <Input
                id="maxParticipants"
                type="number"
                value={formData.maxParticipants}
                onChange={(e) => setFormData({ ...formData, maxParticipants: e.target.value })}
                placeholder="Optional"
                min="1"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="venue">Venue</Label>
            <Input
              id="venue"
              value={formData.venue}
              onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
              placeholder="e.g., Main Auditorium, Sports Ground"
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Judges</Label>
            <div className="flex gap-2">
              <Input
                value={newJudge}
                onChange={(e) => setNewJudge(e.target.value)}
                placeholder="Enter judge name"
                onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addJudge())}
              />
              <Button type="button" onClick={addJudge} size="sm">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            {formData.judges.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.judges.map((judge) => (
                  <Badge key={judge} variant="secondary" className="flex items-center gap-1">
                    {judge}
                    <button type="button" onClick={() => removeJudge(judge)} className="ml-1 hover:text-destructive">
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="registrationOpen"
              checked={formData.registrationOpen}
              onCheckedChange={(checked) => setFormData({ ...formData, registrationOpen: checked })}
            />
            <Label htmlFor="registrationOpen">Registration Open</Label>
          </div>

          <div className="flex gap-4 pt-4">
            <Button type="submit" disabled={isLoading} className="flex-1">
              {isLoading ? "Saving..." : mode === "create" ? "Create Programme" : "Update Programme"}
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
