import { z } from "zod"

export const TeamSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  slug: z.string().min(1),
  logoUrl: z.string().url().optional(),
  bio: z.string().optional(),
  achievements: z.array(z.string()).optional(),
})

export const ScoreSchema = z.object({
  team1: z.number().int().min(0),
  team2: z.number().int().min(0),
})

export const FixtureBaseSchema = z.object({
  id: z.string().min(1),
  sport: z.string().min(1),
  category: z.string().optional(),
  team1Id: z.string().min(1),
  team2Id: z.string().min(1),
  scheduledAt: z.string().datetime(),
  venue: z.string().min(1),
  status: z.enum(["upcoming", "ongoing", "paused", "completed"]),
  score: ScoreSchema.optional(),
  startedAt: z.string().datetime().optional(),
  completedAt: z.string().datetime().optional(),
  notes: z.string().optional(),
})

export const FixtureCreateSchema = FixtureBaseSchema.pick({
  id: true,
  sport: true,
  category: true,
  team1Id: true,
  team2Id: true,
  scheduledAt: true,
  venue: true,
}).extend({
  status: z.enum(["upcoming", "ongoing", "paused", "completed"]).optional(),
  score: ScoreSchema.optional(),
  notes: z.string().optional(),
})

export const FixtureUpdateSchema = z.object({
  sport: z.string().min(1).optional(),
  category: z.string().optional(),
  team1Id: z.string().min(1).optional(),
  team2Id: z.string().min(1).optional(),
  scheduledAt: z.string().datetime().optional(),
  venue: z.string().min(1).optional(),
  status: z.enum(["upcoming", "ongoing", "paused", "completed"]).optional(),
  score: ScoreSchema.optional(),
  startedAt: z.string().datetime().optional(),
  completedAt: z.string().datetime().optional(),
  notes: z.string().optional(),
})

export const MatchStatusUpdateSchema = z.object({
  status: z.enum(["ongoing", "paused", "completed"]),
})

export const ScoreUpdateSchema = ScoreSchema

export type FixtureCreate = z.infer<typeof FixtureCreateSchema>
export type FixtureUpdate = z.infer<typeof FixtureUpdateSchema>
export type ScoreUpdate = z.infer<typeof ScoreUpdateSchema>


