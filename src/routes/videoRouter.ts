import { Router } from 'express'
import { videoThumbnailRouter } from './videoThumbnailRouter'
import { ROUTER_ERRORS, REQUEST_EXAMPLES } from '../lib/constants'
import { getMessage } from '../lib/displayMessages'

export const videoRouter = Router()

videoRouter.get('/', (_, res) => {
  res.status(400)
  res.json({
    success: false,
    message: getMessage(ROUTER_ERRORS.MISSING_VIDEO_ID),
    example: REQUEST_EXAMPLES.VIDEO
  })
})

videoRouter.use('/thumbnail', videoThumbnailRouter)
