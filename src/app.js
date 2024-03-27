import express from 'express'
import cors from 'cors'
import { WebSocket } from 'ws'
import { wss } from './websocket.js'

import mainRouter from './routes/main-routes.js'

const app = express()

app.use(express.json())
app.use(cors())

app.use('/api', mainRouter)

app.get('/', (req, res, next) => {
  const msg = req.query.msg
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(msg)
    }
  })
  res.send('CarWatch')
})

export default app
