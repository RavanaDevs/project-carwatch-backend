const input1 = '010c\r41 0C 00 00 \r\r'
const input2 = '0111\r41 11 29 \r\r'
const input3 = '0105\r41 05 68 \r\r'
const input4 = '010c\rNO DATA\r\r'

//RPM
const decodeRPM = (bytes) => {
  const A = Number('0x' + bytes[2])
  const B = Number('0x' + bytes[3])
  const rpm = (256 * A + B) / 4
  console.log('RPM: ', rpm)

  return { rpm: rpm }
}

//Throttle possition
const decodeTP = (bytes) => {
  const A = Number('0x' + bytes[2])
  const tp = (100 / 255) * A
  console.log('Throttle Position: ', tp)

  return { tp: tp }
}

//Engine coolant temperature
const decodeECT = (bytes) => {
  const A = parseInt(bytes[2])
  //   const A = Number('0x' + bytes[2])
  const temp = A - 40
  console.log('Engine coolant temperature: ', temp)

  return { ect: temp }
}

//Vehicle speed
const decodeVSPD = (bytes) => {
  const A = Number(bytes[2])
  const spd = A
  console.log('Speed: ', spd)

  return { spd: spd }
}

export const decode = (data) => {
  const elements = data.trim().split('\r')
  const bytes = elements[1].trim().split(' ')

  if (elements[1] == 'NO DATA') {
    console.log('NO DATA')
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
    default:
      console.log('no match')
      break
  }
}

// decode(input1)
// decode(input2)
// decode(input3)
// decode(input4)
