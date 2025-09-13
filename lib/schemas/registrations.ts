import { z } from "zod"

export const RegistrationSchema = z.object({
  id: z.string().min(1),
  programmeId: z.string().min(1),
  participantName: z.string().min(1),
  teamId: z.string().min(1),
  createdAt: z.string().datetime(),
})

export const RegistrationCreateSchema = z.object({
  programmeId: z.string().min(1),
  participantName: z.string().min(1),
})

export type Registration = z.infer<typeof RegistrationSchema>


