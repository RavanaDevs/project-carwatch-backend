import { WebSocketServer } from 'ws'
import { Server } from 'socket.io'
import http from 'http'
import app from './app.js'

const server = http.createServer(app)

export const wss = new WebSocketServer({
  server: server,
  path: '/ws',
})

const io = new Server(server, {
  path: '/socket.io',
  cors: { origin: '*' },
})

wss.on('connection', (socket) => {
  console.log('Clent Connected')
  socket.on('message', (message) => {
    const jsonMessage = JSON.parse(message.toString())
    Object.entries(jsonMessage).forEach(([key, value]) => {
      decodeMessage(key, value.trim())
    })
  })
})

io.on('connection', async (socket) => {
  console.log('Client Connected', socket.id)
})

const decodeMessage = (key, value) => {
  const msg = {}
  msg[key] = value

  if (key === '010c') {
    const a = Number('0x' + value.substring(6, 8))
    const b = Number('0x' + value.substring(9))
    const rpm = (256 * a + b) / 4
    console.log('rpm', rpm)
    msg[key] = rpm
  }
  io.emit('debug-msg', msg)
}

export default server
