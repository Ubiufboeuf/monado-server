import { Router } from 'express'

export const videosRouter = Router()

videosRouter.get('/', (req, res) => {
  res.send('videos router /')
})
