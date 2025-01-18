import { JWTVerifyResult } from 'jose'
import { MethodReponse } from '../../../interfaces/method_response-interface'
import { JWT } from '../../../utils/jwt'
import { AuthError } from '../../../errors/auth-error'
import { COMMON_MESSAGES } from '../../../data/common-messages'
import { HTTP_STATUS } from '../../../data/http-status'

export const verifyToken = async ({ token }: { token: string }): Promise<MethodReponse> => {
	const { payload } = (await JWT.validate(token)) as JWTVerifyResult

	if (payload.exp && typeof payload.exp === 'number' && payload.exp < Date.now() / 1000)
		throw new AuthError(COMMON_MESSAGES.EXPIRED_TOKEN)

	return { status: HTTP_STATUS.OK }
}
