import { otpTemplate } from '../../../../email-template/otp-template'
import redis from '../../../connections/redis'
import sendEmail from '../../../connections/resend'
import { COMMON_MESSAGES } from '../../../data/common-messages'
import { HTTP_STATUS } from '../../../data/http-status'
import { AppError } from '../../../errors/app-error'
import { ValidationError } from '../../../errors/validation-error'
import { MethodReponse } from '../../../interfaces/method_response-interface'
import { Generate } from '../../../utils/data-generator'

export const sendOtpCode = async ({
	id,
	first_name,
	email,
}: {
	id: string
	first_name: string
	email: string
}): Promise<MethodReponse> => {
	if (!id) throw new ValidationError(COMMON_MESSAGES.NO_ID)

	const code = Generate.code()

	const response = await sendEmail({
		to: [email],
		subject: 'Lockealo - verify your account.',
		html: otpTemplate({ first_name: first_name, otp: code }),
	})
	if (response.data?.error) throw new AppError(COMMON_MESSAGES.INTERNAL_SERVER_ERROR, HTTP_STATUS.INTERNAL_SERVER_ERROR)

	await redis.set(`otp:${id}`, code, 'EX', 300)

	return { status: HTTP_STATUS.OK, message: 'The code has been sent to your email.' }
}
