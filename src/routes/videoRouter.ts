import { Router } from 'express'
import { videoThumbnailRouter } from './videoThumbnailRouter'
import { ERRORS, REQUEST_EXAMPLES, ROUTES } from '../lib/constants'
import { getMessage } from '../lib/displayMessages'
import { getVideoById } from '../services/videoService'

export const videoRouter = Router()

videoRouter.get('/', (_, res) => {
  res.status(400)
  res.json({
    success: false,
    message: getMessage(ERRORS.MISSING_VIDEO_ID),
    example: REQUEST_EXAMPLES.VIDEO
  })
})

videoRouter.get(ROUTES.VIDEO.ID, (req, res) => {
  const { params } = req
  const { id } = params
  
  if (!id) {
    res.status(500)
    res.json({
      success: false,
      message: getMessage(ERRORS.LOGICALLY_INNACCESIBLE_ROUTE)
    })
    return
  }

  const video = getVideoById(id)

  if (!video) {
    res.status(404)
    res.json({
      success: false,
      message: getMessage(ERRORS.VIDEO_NOT_FOUND, id)
    })

    return
  }

  res.json({
    success: true,
    video
  })
})

videoRouter.use(ROUTES.VIDEO.THUMBNAIL, videoThumbnailRouter)
