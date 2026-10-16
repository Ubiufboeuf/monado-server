import { VideoRowSchema } from '@/schemas/dbSchemas'
import { VideoSchema } from '@/schemas/videoSchemas'
import type { Row } from '@libsql/client'
import type z from 'zod'

type Creator = z.infer<typeof VideoSchema>['creator']

export function validateVideoRow (row: Row, creator: Creator) {
  return VideoRowSchema
    .transform((data) => ({
      id: data.id,
      title: data.title,
      thumbnail: data.thumbnail,
      creator,
      duration: data.duration,
      views: data.views,
      upload_utc_date: data.upload_utc_date
    }))
    .pipe(VideoSchema)
    .safeParse(row)
}

export function validateVideo (row: Row) {
  return VideoSchema.safeParse(row)
}
