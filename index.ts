import express from 'express'
import { DEFAULT_PORT, ROUTES } from './src/lib/constants'
import { createServer } from 'node:https'
import { createServerOptions } from './src/serverConfig/createOptions'
import { corsMiddleware } from './src/middlewares/cors'
import { streamsRouter } from './src/routes/streamsRouter'
import { videoRouter } from './src/routes/videoRouter'
import { videosRouter } from './src/routes/videosRouter'
import { watchPublicFolder } from './src/services/watchFileSystem'
import { loadVideos } from './src/services/videoService'
import { requestLogs } from './src/middlewares/requestLogs'

const app = express()
const port = process.env.PORT ?? DEFAULT_PORT
const options = createServerOptions()

createServer(options, app)
  .listen(port, () => {
    console.log(`Servidor escuchando en el puerto [:${port}]`)
  })

const acceptedOrigins = [
  'https://192.168.1.100:4321',
  'https://192.168.1.100:5173',
  'https://monado.dev.local',
  'https://monado.net'
]

app.use(requestLogs())
app.use(corsMiddleware({ acceptedOrigins }))

app.use(ROUTES.STREAMS, streamsRouter)
app.use(ROUTES.VIDEOS, videosRouter)
app.use(ROUTES.VIDEO.BASE, videoRouter)

app.get(ROUTES.BASE, (_, res) => {
  res.json({ success: true })
})

loadVideos()
watchPublicFolder()
