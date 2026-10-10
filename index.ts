import { corsMiddleware } from '@/config/cors'
import { PORT } from '@/constants/api'
import { videoRouter } from '@/routers/videoRouter'
import { recomendationsRouter } from '@/routers/recomendationsRouter'
import express from 'express'
import { getErrorsDetails } from '@/errors'
import { connectToDB } from '@/config/db'

async function main () {
  try {
    await connectToDB()
  } catch (err) {
    const error = getErrorsDetails(err)
    console.error(`${error.message} ${error.cause ? `(${error.cause})` : ''}`)
    return
  }
  
  const app = express()
  app.disable('x-powered-by')
  app.use(corsMiddleware())
  
  app.use('/video', videoRouter)
  app.use('/recomendations', recomendationsRouter)

  app.use((_, res) => res.status(404).end())
  
  app.listen(PORT, () => console.log(`Escuchando en el puerto: ${PORT}`))
}

await main()
