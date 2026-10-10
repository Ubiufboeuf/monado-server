import type z from 'zod'
import type { VideoSchema } from '@/schemas/videoSchemas'

export type Video = z.infer<typeof VideoSchema>
