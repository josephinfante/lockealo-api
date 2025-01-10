import { QueryInterface, DataTypes } from 'sequelize'

module.exports = {
	up: async (queryInterface: QueryInterface): Promise<void> => {
		const transaction = await queryInterface.sequelize.transaction()

		try {
			let table_exists
			try {
				table_exists = await queryInterface.describeTable('vaults')
			} catch (error) {
				table_exists = false
			}

			if (!table_exists) {
				await queryInterface.createTable(
					'vaults',
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
						createdAt: {
							type: DataTypes.DATE,
							allowNull: false,
							field: 'created_at',
							defaultValue: () => new Date(),
						},
						updatedAt: {
							type: DataTypes.DATE,
							allowNull: true,
							field: 'updated_at',
							defaultValue: () => null,
						},
					},
					{ transaction },
				)
			}

			await transaction.commit()
		} catch (error) {
			await transaction.rollback()
			throw error
		}
	},
	down: async (queryInterface: QueryInterface): Promise<void> => {
		const transaction = await queryInterface.sequelize.transaction()

		try {
			await queryInterface.dropTable('vaults', { transaction })
			await transaction.commit()
		} catch (error) {
			await transaction.rollback()
			throw error
		}
	},
}
