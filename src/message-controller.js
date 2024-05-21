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

const throttlePosition = [
  16.73, 16.758, 16.744, 16.772, 16.801, 16.845, 16.934, 16.989, 17.017, 17.072,
  17.127, 17.181, 17.292, 17.388, 17.483, 17.568, 17.679, 17.79, 17.886, 17.981,
  18.092, 18.214, 18.336, 18.458, 18.58, 18.717, 18.855, 18.993, 19.147, 19.269,
  19.432, 19.595, 19.758, 19.944, 20.153, 20.362, 20.571, 20.779, 21.002,
  21.226, 21.462, 21.721, 21.93, 22.188, 22.446, 22.704, 22.962, 23.221, 23.479,
  23.75, 24.02, 24.29, 24.56, 25.014, 25.7, 25.014, 25.026, 25.014, 25.267,
  25.014, 25.014, 25.7, 25.014, 24.76, 24.706, 24.453, 24.174, 23.914, 23.661,
  23.408, 23.17, 22.917, 22.664, 22.426, 22.24, 21.927, 21.674, 21.579, 21.416,
  21.179, 20.942, 20.705, 20.468, 20.231, 20.02, 19.809, 19.598, 19.729, 19.436,
  19.27, 19.108, 18.945, 18.783, 18.652, 18.51, 18.368, 18.236, 18.105, 17.974,
  17.843, 17.721, 17.599,
]

export const testLoop = () => {
  let rpm = rpmData
  let speed = speedData
  let throttle = throttlePosition
  let temp = [
    32, 33, 35, 35, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36,
    37, 37, 37, 37, 37, 37, 37, 37, 36, 36, 36, 36, 36, 36, 36, 32, 32,
  ]
  let load = [15.83,16.45,17.12,18.36,19.04,19.89,20.72,21.35,22.18,23.23]

  frontendMsgController(
    'fuelStatus',
    'Closed loop, using oxygen sensor feedback to determine fuel mix'
  )

  const rpmLoop = () => {
    let val = rpm.pop()
    frontendMsgController('rpm', val)
    rpm = [val, ...rpm]
  }

  const speedLoop = () => {
    let val = speed.pop()
    frontendMsgController('spd', val)
    speed = [val, ...speed]
  }

  const throttleLoop = () => {
    let val = throttle.pop()
    frontendMsgController('tp', val)
    throttle = [val, ...throttle]
  }

  const tempLoop = () => {
    let val = temp.pop()
    frontendMsgController('etc', val)
    temp = [val, ...temp]
  }

  const loadLoop = () => {
    let val = load.pop()
    frontendMsgController('engineLoad', val)
    load = [val, ...load]
  }

  setInterval(rpmLoop, 1000)
  setInterval(speedLoop, 1000)
  setInterval(throttleLoop, 1000)
  setInterval(tempLoop, 10000)
  setInterval(loadLoop, 10000)
}
