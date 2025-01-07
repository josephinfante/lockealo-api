import { DB_DIALECT, DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USERNAME } from './envd'

const sequelizeConfig = {
	development: {
		username: DB_USERNAME,
		password: DB_PASSWORD,
		database: DB_NAME,
		host: DB_HOST,
		port: DB_PORT,
		dialect: DB_DIALECT,
		seederStorage: 'sequelize',
	},
	test: {
		username: DB_USERNAME,
		password: DB_PASSWORD,
		database: DB_NAME,
		host: DB_HOST,
		port: DB_PORT,
		dialect: DB_DIALECT,
		seederStorage: 'sequelize',
	},
	production: {
		username: DB_USERNAME,
		password: DB_PASSWORD,
		database: DB_NAME,
		host: DB_HOST,
		port: DB_PORT,
		dialect: DB_DIALECT,
		seederStorage: 'sequelize',
	},
}
export default sequelizeConfig
module.exports = sequelizeConfig
