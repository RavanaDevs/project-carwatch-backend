import { WebSocketServer } from 'ws'
import { Server } from 'socket.io'
import http from 'http'
import app from './app.js'
import { backendMsgController } from './message-controller.js'

const server = http.createServer(app)

export const wss = new WebSocketServer({
  server: server,
  path: '/ws',
})

export const io = new Server(server, {
  path: '/socket.io',
  cors: { origin: '*' },
})

wss.on('connection', (socket) => {
  console.log('Clent Connected')
  socket.on('message', (message) => {
    const jsonMessage = JSON.parse(message.toString())
    backendMsgController(jsonMessage)
  })
})

io.on('connection', async (socket) => {
  console.log('Client Connected', socket.id)
})


export default server
