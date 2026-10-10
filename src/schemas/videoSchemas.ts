import z from 'zod'

export const VideoSchema = z.object({
  id: z.string(),
  title: z.string()
})
