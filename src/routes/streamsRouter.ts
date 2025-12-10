import { Router } from 'express'

export const streamsRouter = Router()

streamsRouter.get('/', (req, res) => {
  res.send('streams router /')
})
