// SERVER VARIABLES
export const NODE_ENV = process.env.NODE_ENV || 'development'
export const PORT = Number(process.env.PORT) || 3000
export const ACCEPTED_ORIGINS = process.env.ACCEPTED_ORIGINS?.split(',') || ['http://localhost:3000']
