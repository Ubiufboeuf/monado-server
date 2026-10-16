import z from 'zod'

export const VideoSchema = z.object({
  id: z.string(),
  title: z.string(),
  thumbnail: z.string(),
  creator: z.object({
    id: z.string(),
    name: z.string(),
    channelUrl: z.string()
  }),
  duration: z.number(),
  views: z.number(),
  upload_utc_date: z.string()
})
