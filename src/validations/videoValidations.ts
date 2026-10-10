import { VideoSchema } from '@/schemas/videoSchemas'
import type { Row } from '@libsql/client'

export function validateVideo (row: Row) {
  return VideoSchema.safeParse(row)
}
