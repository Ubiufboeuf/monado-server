import { CreatorSchema } from '@/schemas/creatorSchemas'
import { CreatorRowSchema } from '@/schemas/dbSchemas'
import type { Row } from '@libsql/client'

export function validateCreatorRow (row: Row) {
  return CreatorRowSchema
    .transform((data) => ({
      id: data.id,
      name: data.name,
      channelUrl: data.channelUrl
    }))
    .pipe(CreatorSchema)
    .safeParse(row)
}

export function validateCreator (row: Row) {
  return CreatorSchema.safeParse(row)
}
