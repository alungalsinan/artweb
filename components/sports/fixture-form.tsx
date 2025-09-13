"use client"

import { useEffect, useMemo, useState } from "react"
import { z } from "zod"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Fixture } from "@/lib/sports/types"
import { FixtureCreateSchema } from "@/lib/schemas/sports"

const categories = ["Bidaya", "Uoola", "Thaniya", "Thanawiyya", "Aliya", "Kulliyya"]
const sports = ["Football", "Basketball", "Cricket", "Volleyball", "Badminton", "Table Tennis", "Athletics"]

export type FixtureFormValues = z.infer<typeof FixtureCreateSchema>

interface TeamOption {
  id: string
  name: string
}

interface FixtureFormProps {
  initialValues?: Partial<Fixture>
  onSubmit: (values: FixtureFormValues) => Promise<void> | void
  submitLabel?: string
}

export function FixtureForm({ initialValues, onSubmit, submitLabel = "Create Fixture" }: FixtureFormProps) {
  const [teams, setTeams] = useState<TeamOption[]>([])
  const [values, setValues] = useState<FixtureFormValues>(() => ({
    id: initialValues?.id || `fx-${Math.random().toString(36).slice(2, 8)}`,
    sport: (initialValues?.sport as string) || "Football",
    category: initialValues?.category,
    team1Id: initialValues?.team1Id || "",
    team2Id: initialValues?.team2Id || "",
    scheduledAt: initialValues?.scheduledAt || new Date().toISOString(),
    venue: initialValues?.venue || "",
    status: (initialValues?.status as any) || "upcoming",
    score: initialValues?.score,
    notes: initialValues?.notes,
  }))
  const [error, setError] = useState<string>("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const fetchTeams = async () => {
      const res = await fetch("/api/teams")
      const json = await res.json()
      setTeams(json.data || [])
    }
    fetchTeams()
  }, [])

  const teamOptions = useMemo(() => teams.map((t) => ({ id: t.id, name: t.name })), [teams])

  const handleChange = (field: keyof FixtureFormValues, value: any) => {
    setValues((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    try {
      const parsed = FixtureCreateSchema.parse(values)
      setIsSubmitting(true)
      await onSubmit(parsed)
    } catch (err: any) {
      setError(err?.message || "Invalid form data")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <div className="text-sm text-red-600">{error}</div>}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Fixture ID</Label>
              <Input value={values.id} onChange={(e) => handleChange("id", e.target.value)} required />
            </div>
            <div>
              <Label>Sport</Label>
              <Select value={values.sport} onValueChange={(v) => handleChange("sport", v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select sport" />
                </SelectTrigger>
                <SelectContent>
                  {sports.map((s) => (
                    <SelectItem key={s} value={s}>{s}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Category</Label>
              <Select value={values.category || ""} onValueChange={(v) => handleChange("category", v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((c) => (
                    <SelectItem key={c} value={c}>{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Venue</Label>
              <Input value={values.venue} onChange={(e) => handleChange("venue", e.target.value)} required />
            </div>
            <div>
              <Label>Scheduled At (ISO)</Label>
              <Input value={values.scheduledAt} onChange={(e) => handleChange("scheduledAt", e.target.value)} required />
            </div>
            <div>
              <Label>Team 1</Label>
              <Select value={values.team1Id} onValueChange={(v) => handleChange("team1Id", v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select team 1" />
                </SelectTrigger>
                <SelectContent>
                  {teamOptions.map((t) => (
                    <SelectItem key={t.id} value={t.id}>{t.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Team 2</Label>
              <Select value={values.team2Id} onValueChange={(v) => handleChange("team2Id", v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select team 2" />
                </SelectTrigger>
                <SelectContent>
                  {teamOptions.map((t) => (
                    <SelectItem key={t.id} value={t.id}>{t.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button type="submit" disabled={isSubmitting}>{submitLabel}</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}


