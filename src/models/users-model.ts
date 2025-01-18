import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../connections/sequelize'

export class UsersModel extends Model {}

UsersModel.init(
	{
		id: {
			type: DataTypes.CHAR(36),
			allowNull: false,
			primaryKey: true,
		},
		first_name: {
			type: DataTypes.STRING(50),
			allowNull: false,
		},
		last_name: {
			type: DataTypes.STRING(50),
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING(255),
			allowNull: false,
			unique: true,
		},
		password: {
			type: DataTypes.STRING(255),
			allowNull: false,
		},
		is_verified: {
			type: DataTypes.BOOLEAN,
			allowNull: true,
			defaultValue: () => 0,
		},
		last_login_at: {
			type: DataTypes.DATE,
			allowNull: true,
			defaultValue: () => null,
		},
		hidden: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: () => 0,
		},
		deleted: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: () => 0,
		},
		created_at: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: () => new Date(),
		},
		updated_at: {
			type: DataTypes.DATE,
			allowNull: true,
			defaultValue: () => null,
		},
	},
	{
		sequelize: sequelize,
		modelName: 'users',
		createdAt: false,
		updatedAt: false,
	},
)
