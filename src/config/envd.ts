// SERVER VARIABLES
export const NODE_ENV = process.env.NODE_ENV || 'development'
export const PORT = Number(process.env.PORT) || 3000
export const ACCEPTED_ORIGINS = process.env.ACCEPTED_ORIGINS?.split(',') || ['http://localhost:3000']
export const JWT_SECRET = process.env.JWT_SECRET || 'secret'

// DATABASE VARIABLES
export const DB_NAME = process.env.DB_NAME || ''
export const DB_USERNAME = process.env.DB_USERNAME || ''
export const DB_PASSWORD = process.env.DB_PASSWORD || ''
export const DB_DIALECT =
	(process.env.DB_DIALECT as 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql') || 'postgres'
export const DB_HOST = process.env.DB_HOST || ''
export const DB_PORT = Number(process.env.DB_PORT) || 0
export const DB_POOL_SIZE_MIN = Number(process.env.DB_POOL_SIZE_MIN) || 0
export const DB_POOL_SIZE_MAX = Number(process.env.DB_POOL_SIZE_MAX) || 5
export const DB_POOL_ACQUIRE = Number(process.env.DB_POOL_ACQUIRE) || 30000
export const DB_POOL_IDLE = Number(process.env.DB_POOL_IDLE) || 10000
export const DB_POOL_LOGGING = process.env.DB_POOL_LOGGING == 'true'
