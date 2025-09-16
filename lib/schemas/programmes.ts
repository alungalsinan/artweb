import { z } from "zod"

export const ProgrammeSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  category: z.string().min(1),
  type: z.enum(["arts", "sports", "general"]).default("arts"),
  venue: z.string().min(1),
  scheduledAt: z.string().datetime(),
  description: z.string().optional(),
  maxParticipants: z.number().int().min(1).optional(),
  judges: z.array(z.string()).optional(),
  registrationOpen: z.boolean().default(true),
})

export const ProgrammeCreateSchema = ProgrammeSchema.omit({ id: true })
export const ProgrammeUpdateSchema = ProgrammeSchema.partial()

export type Programme = z.infer<typeof ProgrammeSchema>


