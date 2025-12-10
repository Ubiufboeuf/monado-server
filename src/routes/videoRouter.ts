import { Router } from 'express'
import { videoThumbnailRouter } from './videoThumbnailRouter'
import { ROUTER_ERRORS, REQUEST_EXAMPLES, VIDEO_ERRORS } from '../lib/constants'
import { getMessage } from '../lib/displayMessages'
import { getVideoById } from '../services/videoService'

export const videoRouter = Router()

videoRouter.get('/', (_, res) => {
  res.status(400)
  res.json({
    success: false,
    message: getMessage(ROUTER_ERRORS.MISSING_VIDEO_ID),
    example: REQUEST_EXAMPLES.VIDEO
  })
})

videoRouter.get('/:id', (req, res) => {
  const { params } = req
  const { id } = params
  
  if (!id) {
    res.status(500)
    res.json({
      success: false,
      message: getMessage(ROUTER_ERRORS.LOGICALLY_INNACCESIBLE_ROUTE)
    })
    return
  }

  const video = getVideoById(id)

  if (!video) {
    res.status(404)
    res.json({
      success: false,
      message: getMessage(VIDEO_ERRORS.NOT_FOUND, id)
    })

    return
  }

  res.json({
    ...params
  })
})

videoRouter.use('/thumbnail', videoThumbnailRouter)
