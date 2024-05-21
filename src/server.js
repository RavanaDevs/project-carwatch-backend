import 'dotenv/config.js'
import server from './websocket.js'
import mongoose from 'mongoose'
import { testLoop } from './message-controller.js'

const CONN_STR = process.env.MONGODB_CONN_STRING
const PORT = process.env.PORT



mongoose.connect(CONN_STR).then(() => {
  console.log('Database Connected')
  server.listen(PORT, () => {
    testLoop()
    console.log('server is listning on port', PORT)
  })
})
