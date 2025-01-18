import { MethodReponse } from '../../../interfaces/method_response-interface'
import { UserRepository } from '../../user/user-repository.impl'
import { UserService } from '../../user/user-service'

export const verifyAccountStatus = async ({ id }: { id: string }): Promise<MethodReponse> => {
	const userRepository = new UserRepository()
	const userService = new UserService(userRepository)
	const { status, data } = await userService.verifyStatus({ id })

	return { status, data }
}
