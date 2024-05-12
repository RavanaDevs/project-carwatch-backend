import Rpm from './models/Rpm.js'

//RPM
const decodeRPM = async (bytes) => {
  const A = Number('0x' + bytes[2])
  const B = Number('0x' + bytes[3])
  const rpm = (256 * A + B) / 4
  // console.log('RPM: ', rpm)

  // const record = new Rpm({ rpm: rpm })
  // await record.save()

  return { rpm: rpm }
}

//Throttle possition
const decodeTP = (bytes) => {
  const A = Number('0x' + bytes[2])
  const tp = (100 / 255) * A
  // console.log('Throttle Position: ', tp)

  return { tp: tp }
}

//Engine coolant temperature
const decodeECT = (bytes) => {
  const A = parseInt(bytes[2])
  //   const A = Number('0x' + bytes[2])
  const temp = A - 40
  // console.log('Engine coolant temperature: ', temp)

  return { ect: temp }
}

//Vehicle speed
const decodeVSPD = (bytes) => {
  const A = parseInt(bytes[2])
  const spd = A
  // console.log('Speed: ', spd)

  return { spd: spd }
}

//Fuel Status
const decodeFuelStatus = (bytes) => {
  const A = parseInt(bytes[2])
  let status = 'waiting'
  if (A == 0) {
    status = 'The motor is off'
  } else if (A == 1) {
    status = 'Open loop due to insufficient engine temperature'
  } else if (A == 2) {
    status = 'Closed loop, using oxygen sensor feedback to determine fuel mix'
  }
  // console.log('Fuel Status: ', bytes)

  return { fuelStatus: status }
}

//Calculated engine load
const decodeEngineLoad = (bytes) => {
  const A = parseInt(bytes[2])
  const load = (100 / 255) * A
  // console.log('Load: ', load)

  return { engineLoad: load }
}

export const decode = (data) => {
  const elements = data.trim().split('\r')
  const bytes = elements[1].trim().split(' ')

  if (elements[1] == 'NO DATA') {
    console.log(elements[0], 'NO DATA')
    return
  }

  switch (elements[0]) {
    case '010c':
      return decodeRPM(bytes)
    case '0111':
      return decodeTP(bytes)
    case '0105':
      return decodeECT(bytes)
    case '010d':
      return decodeVSPD(bytes)
    case '0103':
      return decodeFuelStatus(bytes)
    case '0104':
      return decodeEngineLoad(bytes)
    default:
      console.log('no match')
      break
  }
}
