import { setValue } from './cache_db.js'
import { decode } from './decoder.js'
import { io } from './websocket.js'

export const backendMsgController = (msg) => {
  console.log(msg)
  const data = decode(msg['data'])
  if(!data) return
  Object.entries(data).forEach(([key, value]) => {
    // setValue(key,value)
    frontendMsgController(key, value)
  })
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
