import Redis from 'ioredis'
import { REDIS_HOST, REDIS_PASSWORD, REDIS_PORT, REDIS_USERNAME } from '../config/envd'

const redis = new Redis({
	port: REDIS_PORT,
	host: REDIS_HOST,
	password: REDIS_PASSWORD,
	username: REDIS_USERNAME,
})

export default redis
