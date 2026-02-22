import { Router, type Request } from 'express'
import { getMessage } from '../lib/displayMessages'
import { ERRORS, FS_ROUTES } from '../lib/constants'
import { readdir } from 'node:fs/promises'
import { vault } from '../models/Vault'

// El poster es la carátula con mayor resolución del video
export const videoPosterRouter = Router({ mergeParams: true })

interface PosterRequest {
  id: string
}

videoPosterRouter.get('/', async (req: Request<PosterRequest>, res) => {
  const { id } = req.params
  
  if (!vault.entries.has(id)) {
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
  
  const thumbnails: number[] = []
  for (const file of videoAssets) {
    const thumbnail = file.split('.')[0]
    if (!thumbnail) continue

    thumbnails.push(Number(thumbnail))
  }

  let maxResolutionThumbnail = thumbnails[0]

  for (const t of thumbnails) {
    if (maxResolutionThumbnail && t > maxResolutionThumbnail)
      maxResolutionThumbnail = t
  }

  const parts = thumbnailsParts.find((parts) => Number(parts[0]) === maxResolutionThumbnail)
  let poster
  
  if (parts) poster = parts?.join('.')

  if (!poster) {
    res.status(404).json({
      success: false,
      message: getMessage(ERRORS.POSTER_NOT_FOUND)
    })
    return
  }
  
  const posterFilePath = `${FS_ROUTES.ASSETS.fullPath}/${id}/${poster}`
  res.sendFile(posterFilePath)
})
