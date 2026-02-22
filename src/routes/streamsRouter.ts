import { Router, type Handler } from 'express'
import { getMessage } from '../lib/displayMessages'
import { ERRORS, FS_ROUTES, REQUEST_EXAMPLES } from '../lib/constants'
import { readdir } from 'node:fs/promises'
import express from 'express'
import { vault } from '../models/Vault'

export const streamsRouter = Router()

streamsRouter.get('/', (_, res) => {
  res.status(400).json({
    success: false,
    message: getMessage(ERRORS.BAD_STREAMS_REQUEST),
    example: REQUEST_EXAMPLES.VIDEO_STREAM
  })
})

const validateStream: Handler = async (req, res, next) => {
  const { id } = req.params
  if (!id) {
    next(ERRORS.MISSING_VIDEO_ID)
    return
  }
    
  if (!vault.entries.has(id)) {
    res.status(404)
    res.json({
      success: false,
      message: getMessage(ERRORS.STREAM_NOT_FOUND, id)
    })
    return
  }
  
  let streamsFolder: string[] = []
  try {
    streamsFolder = await readdir(`${FS_ROUTES.STREAMS}/${id}`)
  } catch {
    console.error('[500] Error consiguiendo las carátulas del video:', id)
    res.status(500).json({
      success: false,
      message: getMessage(`${ERRORS.INTERNAL_FETCHING_THUMBNAILS}`, id)
    })
    return
  }

  if (!streamsFolder.includes('manifest.mpd')) {
    res.status(500).json({
      success: false,
      message: getMessage(ERRORS.INTERNAL_BAD_STREAM)
    })
    return
  }

  next()
}

streamsRouter.use('/:id', validateStream, (req, res, next) => {
  const { id } = req.params
  const streamPath = `${FS_ROUTES.STREAMS.fullPath}/${id}`
  
  express.static(streamPath)(req, res, next)
})
