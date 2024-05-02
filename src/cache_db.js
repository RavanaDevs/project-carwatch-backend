import redis from 'redis'
import 'dotenv/config'

const client = redis.createClient({
  url: process.env.REDIS_SERVER,
})

client.on('error', (err) => console.log('Redis Client Error', err))

export const setValue = async (key, value) => {
  if (!client.isOpen) {
    await client.connect()
  }
  await client.lPush(key, JSON.stringify(value))
  await client.expire(key, 20)
}

export const getValue = async (key) => {
  if (!client.isOpen) {
    await client.connect()
  }
  const element = await client.rPop(key)
  return JSON.parse(element)
}
