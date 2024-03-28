import { wss } from '../websocket.js'
import { WebSocket } from 'ws'

export const debug = (req, res, next) => {
  const msg = req.query.msg
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send('bt-unlock')
      client.send(msg)
    }
  })

  return res.send('CarWatch')
}
