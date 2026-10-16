import { db } from '@/config/db'
import type { DatabaseStatements } from '@/types/dbTypes'
import type { Video } from '@/types/videoTypes'
import { validateCreatorRow } from '@/validations/creatorValidations'
import { validateVideoRow } from '@/validations/videoValidations'

function getRecomendationsStatements (id: string): DatabaseStatements {
  const videosQuery = 'SELECT * FROM videos WHERE id != ?'
  const videosArgs = [id]

  const creatorQuery = 'SELECT * FROM creators WHERE id = (SELECT creator_id FROM videos WHERE id = ?)'
  const creatorArgs = [id]
  
  const stmts = [{ sql: videosQuery, args: videosArgs }, { sql: creatorQuery, args: creatorArgs }]
  
  return stmts
}

export async function getRecomendationsById (id: string): Promise<Video[]> {
  const stmts = getRecomendationsStatements(id)
  const [videosResult, creatorResult] = await db.batch(stmts)
  const recomendations: Video[] = []

  const creatorValidation = validateCreatorRow(creatorResult.rows[0])
  if (!creatorValidation.success) {
    console.error(creatorValidation.error)
    throw new Error('Datos del creador del video inválidos')
  }
  
  for (const row of videosResult.rows) {
    const videoValidation = validateVideoRow(row, creatorValidation.data)
    if (!videoValidation.success) {
      console.log(videoValidation.error)
      continue
    }

    recomendations.push(videoValidation.data)
  }
  
  return recomendations
}
