import { Router } from 'express'
import { createCursor, cursorFromB64, cursorToB64 } from '../services/cursorService'
import { getVideos } from '../services/videoService'

export const videosRouter = Router()

videosRouter.get('/', (req, res) => {
  const { query } = req
  const { limit: limitStr, cursor: cursorStr } = query
  const limit = Number(limitStr ?? 1)

  const cursor = cursorStr
    ? cursorFromB64(JSON.stringify(cursorStr))
    : createCursor({ lastId: null })

  if (!cursor) {
    res.status(500)
    return
  }

  const { list: videos, nextCursor } = getVideos(cursor, limit)

  res.json({
    success: true,
    videos,
    nextCursor: nextCursor ? cursorToB64(nextCursor) : nextCursor
  })
})
