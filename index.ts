import { corsMiddleware } from '@/config/cors'
import { PORT } from '@/constants/api'
import { videoRouter } from '@/routers/videoRouter'
import { recomendationsRouter } from '@/routers/recomendationsRouter'
import express from 'express'

async function main () {
  const app = express()
  app.disable('x-powered-by')
  app.use(corsMiddleware())
  
  app.use('/video', videoRouter)
  app.use('/recomendations', recomendationsRouter)

  app.use((_, res) => res.status(404).end())
  
  app.listen(PORT, () => console.log(`Escuchando en el puerto: ${PORT}`))
}

await main()
