import express from 'express'
import { DEFAULT_PORT, ROUTES } from './src/lib/constants'
import { createServer } from 'node:https'
import { createServerOptions } from './src/serverConfig/createOptions'
import { corsMiddleware } from './src/middlewares/cors'
import { streamsRouter } from './src/routes/streamsRouter'
import { videoRouter } from './src/routes/videoRouter'
import { videosRouter } from './src/routes/videosRouter'
import { requestLogs } from './src/middlewares/requestLogs'
import { searchRouter } from './src/routes/searchRouter'
import { syncVault, trackVault } from './src/services/vaultService'

const app = express()
const port = process.env.PORT ?? DEFAULT_PORT
const options = createServerOptions()

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
app.use(ROUTES.SEARCH, searchRouter)

app.get(ROUTES.BASE, (_, res) => {
  res.json({ success: true })
})

console.log('\nSincronizando vaúl')
await syncVault()
console.log('Sincronización del vaúl terminada')

console.log('\nEscuchando cambios en el vaúl para actualizaciones')
trackVault()

createServer(options, app)
  .listen(port, () => {
    console.log(`\n=== Servidor escuchando en el puerto [:${port}] ===`)
  })
