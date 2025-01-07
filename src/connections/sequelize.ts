import { Sequelize } from 'sequelize'
import {
	DB_DIALECT,
	DB_HOST,
	DB_NAME,
	DB_PASSWORD,
	DB_POOL_ACQUIRE,
	DB_POOL_IDLE,
	DB_POOL_LOGGING,
	DB_POOL_SIZE_MAX,
	DB_POOL_SIZE_MIN,
	DB_PORT,
	DB_USERNAME,
} from '../config/envd'

export const sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
	dialect: DB_DIALECT,
	host: DB_HOST,
	port: DB_PORT,
	pool: {
		min: DB_POOL_SIZE_MIN,
		max: DB_POOL_SIZE_MAX,
		acquire: DB_POOL_ACQUIRE,
		idle: DB_POOL_IDLE,
	},
	logging: DB_POOL_LOGGING,
})
