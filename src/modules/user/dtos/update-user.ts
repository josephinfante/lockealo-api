import { COMMON_MESSAGES } from '../../../data/common-messages'
import { HTTP_STATUS } from '../../../data/http-status'
import { AppError } from '../../../errors/app-error'
import { ValidationError } from '../../../errors/validation-error'
import { MethodReponse } from '../../../interfaces/method_response-interface'
import { IUserUpdate } from '../../../interfaces/user-interface'
import { UsersModel } from '../../../models/users-model'

export const updateUser = async ({ id, data }: { id: string; data: IUserUpdate }): Promise<MethodReponse> => {
	if (!id) throw new ValidationError(COMMON_MESSAGES.NO_ID)

	const user = await UsersModel.findByPk(id)
	if (!user) throw new AppError(COMMON_MESSAGES.NOT_PROCESS, HTTP_STATUS.NOT_FOUND)

	const allowed_keys = Object.keys(data).filter(
		(key) =>
			data[key] !== undefined &&
			key !== 'id' &&
			key !== 'email' &&
			key !== 'password' &&
			key !== 'deleted' &&
			key !== 'last_login_at' &&
			key !== 'created_at' &&
			key !== 'updated_at',
	)

	if (allowed_keys.length === 0) throw new ValidationError(COMMON_MESSAGES.NO_CHANGES)

	let data_changed = false

	if (data?.first_name && data?.first_name != user.dataValues.first_name) {
		user.set('first_name', data.first_name)
		data_changed = true
	}

	if (data?.last_name && data?.last_name != user.dataValues.last_name) {
		user.set('last_name', data.last_name)
		data_changed = true
	}

	if (data?.hidden !== undefined && data?.hidden !== user.dataValues.hidden) {
		user.set('hidden', data.hidden)
		data_changed = true
	}

	if (!data_changed) throw new ValidationError(COMMON_MESSAGES.NO_CHANGES)

	user.set('updated_at', new Date())
	await user.save()

	return { status: HTTP_STATUS.OK, message: 'User updated successfully.' }
}
