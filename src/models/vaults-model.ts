import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../connections/sequelize'
import { UsersModel } from './users-model'

export class VaultsModel extends Model {}

VaultsModel.init(
	{
		id: {
			type: DataTypes.CHAR(36),
			allowNull: false,
			primaryKey: true,
		},
		data: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		salt: {
			type: DataTypes.STRING(32),
			allowNull: false,
		},
		iv: {
			type: DataTypes.STRING(32),
			allowNull: false,
		},
		user_id: {
			type: DataTypes.CHAR(36),
			allowNull: false,
			references: {
				model: 'users',
				key: 'id',
			},
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
		modelName: 'vaults',
		createdAt: false,
		updatedAt: false,
	},
)

VaultsModel.belongsTo(UsersModel, { foreignKey: 'user_id', targetKey: 'id' })
UsersModel.hasMany(VaultsModel, { foreignKey: 'user_id', sourceKey: 'id' })
