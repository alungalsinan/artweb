import { z } from "zod"

export const ProgrammeSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  category: z.string().min(1),
  type: z.enum(["arts", "sports", "general"]).default("arts"),
  venue: z.string().min(1),
  scheduledAt: z.string().datetime(),
  capacity: z.number().int().min(1),
  description: z.string().optional(),
  published: z.boolean().default(true),
})

export const ProgrammeCreateSchema = ProgrammeSchema
export const ProgrammeUpdateSchema = ProgrammeSchema.partial()

export type Programme = z.infer<typeof ProgrammeSchema>


