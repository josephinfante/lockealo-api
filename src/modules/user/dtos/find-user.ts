import { COMMON_MESSAGES } from '../../../data/common-messages'
import { HTTP_STATUS } from '../../../data/http-status'
import { AppError } from '../../../errors/app-error'
import { ValidationError } from '../../../errors/validation-error'
import { MethodReponse } from '../../../interfaces/method_response-interface'
import { IUser } from '../../../interfaces/user-interface'
import { UsersModel } from '../../../models/users-model'

export const findUser = async ({ id }: { id: string }): Promise<MethodReponse<IUser>> => {
	if (!id) throw new ValidationError(COMMON_MESSAGES.NO_ID)

	const user = await UsersModel.findByPk(id)
	if (!user) throw new AppError(COMMON_MESSAGES.NOT_PROCESS, HTTP_STATUS.NOT_FOUND)

	delete user.dataValues.password
	return { status: HTTP_STATUS.OK, data: user.dataValues }
}
