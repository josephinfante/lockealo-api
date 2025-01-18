import { QueryInterface, DataTypes } from 'sequelize'

module.exports = {
	up: async (queryInterface: QueryInterface): Promise<void> => {
		const transaction = await queryInterface.sequelize.transaction()

		try {
			let table_exists
			try {
				table_exists = await queryInterface.describeTable('users')
			} catch (error) {
				table_exists = null
			}

			if (table_exists && !table_exists?.is_verified) {
				await queryInterface.addColumn(
					'users',
					'is_verified',
					{
						type: DataTypes.BOOLEAN,
						allowNull: true,
						defaultValue: () => 0,
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
			await queryInterface.removeColumn('users', 'is_verified', { transaction })
			await transaction.commit()
		} catch (error) {
			await transaction.rollback()
			throw error
		}
	},
}
