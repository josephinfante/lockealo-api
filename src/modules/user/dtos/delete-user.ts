import { COMMON_MESSAGES } from '../../../data/common-messages'
import { HTTP_STATUS } from '../../../data/http-status'
import { AppError } from '../../../errors/app-error'
import { MethodReponse } from '../../../interfaces/method_response-interface'
import { UsersModel } from '../../../models/users-model'

export const deleteUser = async ({ id }: { id: string }): Promise<MethodReponse> => {
	if (!id) throw new AppError(COMMON_MESSAGES.NO_ID, HTTP_STATUS.NOT_FOUND)

	const user = await UsersModel.findByPk(id)
	if (!user || user.dataValues.deleted) throw new AppError(COMMON_MESSAGES.NOT_PROCESS, HTTP_STATUS.NOT_FOUND)

	user.set({
		deleted: true,
		updated_at: new Date(),
	})
	await user.save()

	return { status: HTTP_STATUS.NO_CONTENT }
}
