import redis from '../../../connections/redis'
import { COMMON_MESSAGES } from '../../../data/common-messages'
import { HTTP_STATUS } from '../../../data/http-status'
import { AppError } from '../../../errors/app-error'
import { ValidationError } from '../../../errors/validation-error'
import { MethodReponse } from '../../../interfaces/method_response-interface'
import { UsersModel } from '../../../models/users-model'
import { Generate } from '../../../utils/data-generator'

export const verifyUser = async ({ id, code }: { id: string; code: string }): Promise<MethodReponse> => {
	if (!id) throw new ValidationError(COMMON_MESSAGES.NO_ID)
	if (!code) throw new ValidationError('No code provided.')

	const user = await UsersModel.findByPk(id)
	if (!user) throw new AppError(COMMON_MESSAGES.NOT_PROCESS, HTTP_STATUS.NOT_FOUND)

	if (user.dataValues.is_verified) throw new AppError('Your account is already verified.', HTTP_STATUS.FORBIDDEN)

	const otp = await redis.get(`otp:${id}`)
	if (!otp) {
		await redis.set(`otp:${id}`, Generate.code(), 'EX', 60)
		throw new AppError('Code has expired, we sent a new one.', HTTP_STATUS.BAD_REQUEST)
	}
	if (code !== otp) throw new AppError(COMMON_MESSAGES.NOT_PROCESS, HTTP_STATUS.BAD_REQUEST)

	await redis.del(`otp:${id}`)

	user.set({
		is_verified: true,
		updated_at: new Date(),
	})
	await user.save()

	return { status: HTTP_STATUS.OK, message: 'Your account has been verified.' }
}
