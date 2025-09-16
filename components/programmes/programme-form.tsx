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
  scheduledAt: string
  venue: string
  description: string
  maxParticipants: string
  judges: string
  registrationOpen: boolean
}

interface ProgrammeFormProps {
  initialData?: Partial<ProgrammeFormData>
  onSubmit: (data: ProgrammeFormData) => void
  isLoading?: boolean
  mode: "create" | "edit"
}

const categories = ["Bidaya", "Uoola", "Thaniya", "Thanawiyya", "Aliya", "Kulliyya"]

export function ProgrammeForm({ initialData, onSubmit, isLoading = false, mode }: ProgrammeFormProps) {
  const [formData, setFormData] = useState<ProgrammeFormData>({
    name: initialData?.name || "",
    category: initialData?.category || "",
    type: initialData?.type || "arts",
    scheduledAt: initialData?.scheduledAt || "",
    venue: initialData?.venue || "",
    description: initialData?.description || "",
    maxParticipants: initialData?.maxParticipants || "",
    judges: initialData?.judges || "",
    registrationOpen: initialData?.registrationOpen ?? true,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
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

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="scheduledAt">Date & Time</Label>
              <Input
                id="scheduledAt"
                type="datetime-local"
                value={formData.scheduledAt}
                onChange={(e) => setFormData({ ...formData, scheduledAt: e.target.value })}
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
            <Label htmlFor="judges">Judges</Label>
            <Textarea
              id="judges"
              value={formData.judges}
              onChange={(e) => setFormData({ ...formData, judges: e.target.value })}
              placeholder="Enter judge names, separated by commas"
              rows={2}
            />
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
