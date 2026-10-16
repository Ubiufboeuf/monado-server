import z from 'zod'

export const VideoRowSchema = z.object({
  id: z.string(),
  title: z.string(),
  thumbnail: z.string(),
  creator_id: z.string(),
  duration: z.number(),
  views: z.number(),
  upload_utc_date: z.iso.datetime()
})

export const CreatorRowSchema = z.object({
  id: z.string(),
  name: z.string(),
  channelUrl: z.string()
})
