import { db } from '@/config/db'
import type { DatabaseStatement } from '@/types/dbTypes'
import type { GetResult } from '@/types/serviceTypes'
import type { Video } from '@/types/videoTypes'
import { validateVideo } from '@/validations/videoValidations'

function getVideoStatement (id: string) {
  const stmt: DatabaseStatement = {
    sql: 'SELECT * FROM videos WHERE id = ?',
    args: [id]
  }
  
  return stmt
}

export async function getVideoInfo (id: string): Promise<GetResult<Video | undefined>> {
  const stmt = getVideoStatement(id)
  const result = await db.execute(stmt)
  const videoRow = result.rows[0]

  if (!videoRow.length) {
    return {
      success: false,
      error: 'No se encontró el video'
    }
  }

  console.log(result)
  console.log(videoRow)

  const videoValidation = validateVideo(videoRow)
  if (!videoValidation.success) {
    return {
      success: false,
      error: 'Video inválido'
    }
  }

  const video = videoValidation.data
  
  return {
    success: true,
    data: video
  }
}
