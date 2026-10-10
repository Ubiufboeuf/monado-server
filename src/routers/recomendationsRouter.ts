import { getRecomendationsById } from '@/services/video/recomendations'
import { Router } from 'express'

export const recomendationsRouter = Router()

recomendationsRouter.get('/:id', async (req, res) => {
  const { id } = req.params
  const recomendations = await getRecomendationsById(id)
  res.json(recomendations)
})
