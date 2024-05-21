import { setValue } from './cache_db.js'
import { decode } from './decoder.js'
import { io } from './websocket.js'

export const backendMsgController = (msg) => {
  if (!msg) return

  if (msg.data) {
    const data = decode(msg.data)
    if (!data) return
    Object.entries(data).forEach(([key, value]) => {
      frontendMsgController(key, value)
    })
  }

  if (msg.gps) {
    const coords = msg.gps.split(',')
    frontendMsgController('gps', coords)
    console.log(coords)
  }

  if (msg.hzd) {
    frontendMsgController('hzd', msg.hzd)
  }
}

const frontendMsgController = (key, value) => {
  io.emit(key, value)
}

const rpmData = [
  850, 860, 855, 865, 875, 890, 920, 940, 950, 970, 990, 1010, 1050, 1085, 1120,
  1150, 1190, 1230, 1265, 1300, 1340, 1385, 1430, 1475, 1520, 1570, 1620, 1670,
  1725, 1770, 1830, 1890, 1950, 2020, 2100, 2180, 2260, 2340, 2425, 2510, 2600,
  2700, 2780, 2880, 2980, 3080, 3180, 3280, 3380, 3490, 3600, 3710, 3820, 3930,
  4000, 4050, 4000, 4005, 4000, 4100, 4000, 4000, 4050, 4000, 3900, 3880, 3785,
  3680, 3580, 3485, 3390, 3300, 3205, 3110, 3020, 2950, 2830, 2735, 2700, 2640,
  2550, 2460, 2370, 2280, 2190, 2110, 2030, 1950, 2000, 1895, 1830, 1770, 1710,
  1650, 1600, 1545, 1490, 1440, 1390, 1340, 1290, 1245, 1200, 1160, 1120, 1080,
  1040, 1010, 980, 950, 920, 890, 870, 860, 850,
]

const speedData = [
  0, 2, 3, 4, 5, 6, 9, 12, 13, 15, 17, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38,
  40, 43, 46, 48, 52, 54, 57, 60, 62, 64, 68, 71, 74, 78, 82, 85, 88, 91, 95,
  99, 103, 107, 108, 108, 109, 111, 111, 108, 104, 103, 105, 106, 104, 100, 90,
  85, 85, 84, 85, 85, 85, 85, 85, 83, 82, 79, 77, 74, 72, 70, 67, 65, 63, 60,
  58, 56, 53, 52, 50, 48, 46, 43, 41, 39, 37, 35, 33, 34, 32, 30, 28, 26, 24,
  23, 22, 20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1,
]

export const testLoop = () => {
  let rpm = rpmData
  let speed = speedData

  const rpmLoop = () => {
    let val = rpm.pop()
    // console.log("RPM",val)
    frontendMsgController('rpm', val)
    rpm = [val, ...rpm]
  }

  const speedLoop = () => {
    let val = speed.pop()
    // console.log("Speed",val)
    frontendMsgController('spd',val)
    speed = [val, ...speed]
  }

  setInterval(rpmLoop, 1000)
  setInterval(speedLoop, 1000)
}
