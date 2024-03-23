import express from 'express'
import { WebSocketServer } from 'ws'
import http from 'http'

const app = express()

const server = http.createServer(app)

const wss = new WebSocketServer({
  server: server,
  path: '/ws',
})

wss.on('connection', (socket) => {
  console.log('Clent Connected')

  socket.on('message', async (message) => {
    try {
      const jsonData = JSON.parse(message)
      console.log(jsonData)
      await handleDeviceInput(jsonData)
      socket.send('200')
    } catch (error) {
      socket.send('Error')
      console.log(error)
    }
  })
})

app.get('/', (req, res, next) => {
  return res.send('CarWatch')
})

server.listen(5000, () => {
  console.log('server is listning on port 5000')
})
