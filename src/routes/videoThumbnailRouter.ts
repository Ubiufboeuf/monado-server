import { Router, type Request } from 'express'
import { getMessage } from '../lib/displayMessages'
import { ERRORS, FS_ROUTES } from '../lib/constants'
import { serverContext } from '../context'
import { readdir } from 'node:fs/promises'

export const videoThumbnailRouter = Router({ mergeParams: true })

interface ThumbnailRequest {
  id: string
}

interface ThumbnailIDRequest extends ThumbnailRequest {
  tid: string
}

videoThumbnailRouter.get('/', async (req: Request<ThumbnailIDRequest>, res) => {
  const { id } = req.params

  if (!serverContext.assetsFolder.has(id)) {
    res.status(404)
    res.json({
      success: false,
      message: getMessage(`${ERRORS.THUMBNAILS_NOT_FOUND}`, id)
    })
    return
  }

  let videoAssets: string[] = []
  try {
    videoAssets = await readdir(`${FS_ROUTES.ASSETS}/${id}`)
  } catch {
    console.error('[500] Error consiguiendo las carátulas del video:', id)
    res.status(500).json({
      success: false,
      message: getMessage(`${ERRORS.INTERNAL_FETCHING_THUMBNAILS}`, id)
    })
    return
  }

  const thumbnails: string[] = []
  for (const file of videoAssets) {
    const thumbnail = file.split('.')[0]
    if (!thumbnail) continue

    thumbnails.push(`${thumbnail}p`)
  }
  
  res.json({
    success: true,
    id,
    thumbnails
  })
})

videoThumbnailRouter.get('/:tid', async (req: Request<ThumbnailIDRequest>, res) => {
  const { id, tid } = req.params
  
  if (!serverContext.assetsFolder.has(id)) {
    res.status(404)
    res.json({
      success: false,
      message: getMessage(`${ERRORS.THUMBNAILS_NOT_FOUND}`, id)
    })
    return
  }
  
  let videoAssets: string[] = []
  try {
    videoAssets = await readdir(`${FS_ROUTES.ASSETS}/${id}`)
  } catch {
    console.error('[500] Error consiguiendo las carátulas del video:', id)
    res.status(500).json({
      success: false,
      message: getMessage(`${ERRORS.INTERNAL_FETCHING_THUMBNAILS}`, id)
    })
    return
  }

  const thumbnailsParts: string[][] = []
  for (const file of videoAssets) {
    const thumbnailParts = file.split('.')
    if (!thumbnailParts) continue

    thumbnailsParts.push(thumbnailParts)
  }

  const thumbnail = thumbnailsParts.find((parts) => `${parts[0]}p` === tid)
  if (!thumbnail) {
    res.status(404).json({
      success: false,
      message: getMessage(ERRORS.THUMBNAIL_NOT_FOUND, tid)
    })
    return
  }

  const thumbnailPath = `${FS_ROUTES.ASSETS.fullPath}/${id}/${thumbnail.join('.')}`
  res.sendFile(thumbnailPath)
})
