import { Router } from 'express'
import { getAllVideos } from '../services/videoService'
import { getMessage } from '../lib/displayMessages'
import { ERRORS } from '../lib/constants'
import type { Video } from '../types/videoTypes'

export const searchRouter = Router()

searchRouter.get('/:query', async (req, res) => {
  const { query } = req.params

  const videos = await getAllVideos()
  
  if (!videos) {
    res.status(500).json({
      success: false,
      message: getMessage(ERRORS.INTERNAL_COULD_NOT_LOAD_VIDEOS)
    })
    
    return
  }

  const results: Video[] = []
  
  for (const [, v] of videos) {
    const t = v.title?.toLowerCase() ?? ''

    if (t.includes(query)) {
      results.push(v)
    }
  }

  const sorted = results.sort((a, b) => {
    return a.title?.localeCompare(b.title ?? '') ?? 0
  })
  
  res.json({
    success: true,
    results: sorted
  })
})
