import { AppError } from '../../../errors/app-error'
import { ISignUp } from '../../../interfaces/auth-interface'
import { MethodReponse } from '../../../interfaces/method_response-interface'
import { IUserCreate } from '../../../interfaces/user-interface'
import { JWT } from '../../../utils/jwt'
import { UserRepository } from '../../user/user-repository.impl'
import { UserService } from '../../user/user-service'

export const signUp = async ({ data }: { data: IUserCreate }): Promise<MethodReponse<ISignUp>> => {
	const userRepository = new UserRepository()
	const userService = new UserService(userRepository)
	const { status, data: user } = await userService.create({ data })

	const token = await JWT.sign({
		first_name: user?.first_name,
		last_name: user?.last_name,
		email: user?.email,
	})

	if (!token) throw new AppError('Internal server error while signing in.', 500)

	return {
		status: status,
		data: {
			user: {
				first_name: user?.first_name as string,
				last_name: user?.last_name as string,
				email: user?.email as string,
			},
			token,
		},
	}
}
