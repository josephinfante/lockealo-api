import { COMMON_MESSAGES } from '../../../data/common-messages'
import { HTTP_STATUS } from '../../../data/http-status'
import { AppError } from '../../../errors/app-error'
import { ValidationError } from '../../../errors/validation-error'
import { UsersModel } from '../../../models/users-model'

export const updateUserLastLogin = async ({ id }: { id: string }): Promise<void> => {
	if (!id) throw new ValidationError(COMMON_MESSAGES.NO_ID)

	const user = await UsersModel.findByPk(id)
	if (!user) throw new AppError(COMMON_MESSAGES.NOT_PROCESS, HTTP_STATUS.NOT_FOUND)

	user.set({
		last_login_at: new Date(),
		updated_at: new Date(),
	})
	await user.save()
}
