import { Router } from 'express'
import { videoThumbnailRouter } from './videoThumbnailRouter'

export const videoRouter = Router()

videoRouter.get('/', (req, res) => {
  res.send('video router /')
})

videoRouter.use('/thumbnail', videoThumbnailRouter)
