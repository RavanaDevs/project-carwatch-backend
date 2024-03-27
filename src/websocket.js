import { WebSocketServer } from 'ws'
import http from 'http'
import app from './app.js'

const server = http.createServer(app)

export const wss = new WebSocketServer({
  server: server,
  path: '/ws',
})

wss.on('connection', (socket) => {
  console.log('Clent Connected')

  socket.on('message', async (message) => {
    try {
      const msg = message.toString()
      console.log(msg)
      socket.send('200')
    } catch (error) {
      socket.send('Error')
      console.log(error)
    }
  })
})

export default server
