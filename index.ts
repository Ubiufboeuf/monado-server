import express from 'express'
import { DEFAULT_PORT } from './src/constants'
import { createServer } from 'node:https'
import { createServerOptions } from './src/serverConfig/createOptions'
import { corsMiddleware } from './src/middlewares/cors'

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

app.use(corsMiddleware({ acceptedOrigins }))

app.get('/', (req, res) => {
  res.send('Chrome, no des problemas... porfa')
})
