import z from 'zod'

export const CreatorSchema = z.object({
  id: z.string(),
  name: z.string(),
  channelUrl: z.string()
})
