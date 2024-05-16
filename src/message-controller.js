import { setValue } from './cache_db.js'
import { decode } from './decoder.js'
import { io } from './websocket.js'

export const backendMsgController = (msg) => {
  if (!msg) return

  if (msg.data) {
    const data = decode(msg.data)
    if(!data) return
    Object.entries(data).forEach(([key, value]) => {
      frontendMsgController(key, value)
    })
  }

  if (msg.gps) {
    const coords = msg.gps.split(',')
    frontendMsgController('gps',coords)
    console.log(coords)
  }

  if(msg.hzd){
    frontendMsgController('hzd',msg.hzd)
  }
}

const frontendMsgController = (key, value) => {
  io.emit(key, value)
}


