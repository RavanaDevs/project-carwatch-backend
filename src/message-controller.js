import { setValue } from './cache_db.js'
import { decode } from './decoder.js'
import { io } from './websocket.js'

export const backendMsgController = (msg) => {
  if (!msg) return

  if (msg.data) {
    console.log(msg.data)
    const data = decode(msg.data)
    if(!data) return
    Object.entries(data).forEach(([key, value]) => {
      frontendMsgController(key, value)
    })
  }

  if (msg.gps) {
    // console.log(msg.gps)
    const coords = msg.gps.split(',')
    frontendMsgController('gps',coords)
  }
  // if (msg.data) {
  //   const data = decode(msg['data'])
  //   Object.entries(data).forEach(([key, value]) => {
  //     frontendMsgController(key, value)
  //   })
  // }
}

const frontendMsgController = (key, value) => {
  io.emit(key, value)
}

// const decodeMessage = (key, value) => {
//   const msg = {}
//   msg[key] = value

//   if (key === '010c') {
//     const a = Number('0x' + value.substring(6, 8))
//     const b = Number('0x' + value.substring(9))
//     const rpm = (256 * a + b) / 4
//     console.log('rpm', rpm)
//     msg[key] = rpm
//   }
//   io.emit('debug-msg', msg)
// }
