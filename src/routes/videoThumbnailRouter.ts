import { Router } from 'express'

export const videoThumbnailRouter = Router()

videoThumbnailRouter.get('/', (req, res) => {
  res.send('video thumbnail router /')
})
