"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Calendar, MapPin, Users, Trophy } from "lucide-react"

interface ParticipantData {
  name: string
  email: string
  phone: string
  studentId: string
  category: string
  experience: string
  notes: string
}

interface Programme {
  id: string
  name: string
  category: string
  type: "arts" | "sports"
  date: string
  time: string
  venue: string
  description: string
  maxParticipants?: number
  currentParticipants: number
}

interface ParticipantRegistrationFormProps {
  programme: Programme
  team: string
  onSubmit: (data: ParticipantData) => void
  isLoading?: boolean
}

const categories = ["Bidaya", "Uoola", "Thaniya", "Thanawiyya", "Aliya", "Kulliyya"]

export function ParticipantRegistrationForm({
  programme,
  team,
  onSubmit,
  isLoading = false,
}: ParticipantRegistrationFormProps) {
  const [formData, setFormData] = useState<ParticipantData>({
    name: "",
    email: "",
    phone: "",
    studentId: "",
    category: programme.category,
    experience: "",
    notes: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const isFull = programme.maxParticipants && programme.currentParticipants >= programme.maxParticipants

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Programme Info */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                {programme.name}
                <Badge variant="outline" className={programme.type === "arts" ? "text-purple-600" : "text-blue-600"}>
                  {programme.type === "arts" ? "Arts" : "Sports"}
                </Badge>
              </CardTitle>
              <CardDescription className="text-pretty">{programme.description}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>
                {programme.date} at {programme.time}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span>{programme.venue}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span>
                {programme.currentParticipants}
                {programme.maxParticipants && `/${programme.maxParticipants}`} participants
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Trophy className="h-4 w-4 text-muted-foreground" />
              <span>Team: {team.charAt(0).toUpperCase() + team.slice(1)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Registration Form */}
      <Card>
        <CardHeader>
          <CardTitle>Register Participant</CardTitle>
          <CardDescription>Fill in the participant details for {programme.name}</CardDescription>
        </CardHeader>
        <CardContent>
          {isFull && (
            <Alert className="mb-6">
              <AlertDescription>
                This programme has reached its maximum capacity. Registration is currently closed.
              </AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter participant's full name"
                  required
                  disabled={isFull}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="studentId">Student ID</Label>
                <Input
                  id="studentId"
                  value={formData.studentId}
                  onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                  placeholder="e.g., 2024001"
                  required
                  disabled={isFull}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="participant@college.edu"
                  required
                  disabled={isFull}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+971 50 123 4567"
                  required
                  disabled={isFull}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
                disabled={isFull}
              >
                <SelectTrigger>
                  <SelectValue />
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
              <Label htmlFor="experience">Experience Level</Label>
              <Select
                value={formData.experience}
                onValueChange={(value) => setFormData({ ...formData, experience: value })}
                disabled={isFull}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select experience level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                  <SelectItem value="professional">Professional</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Additional Notes</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Any special requirements, dietary restrictions, or additional information..."
                rows={3}
                disabled={isFull}
              />
            </div>

            <div className="flex gap-4 pt-4">
              <Button type="submit" disabled={isLoading || isFull} className="flex-1">
                {isLoading ? "Registering..." : "Register Participant"}
              </Button>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
