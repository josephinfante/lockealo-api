import { ParsedQs } from 'qs'
import { FindAllResponse } from '../../interfaces/find_all_response-interface'
import { MethodReponse } from '../../interfaces/method_response-interface'
import { IUserCreate, IUserUpdate, IUser } from '../../interfaces/user-interface'
import { IUserRepository } from './user-repository'
import { createUser } from './dtos/create-user'
import { updateUser } from './dtos/update-user'
import { deleteUser } from './dtos/delete-user'
import { findUser } from './dtos/find-user'
import { findUserByEmail } from './dtos/find-user-by-email'
import { findAllUsers } from './dtos/find-all-users'
import { updateUserLastLogin } from './dtos/update-user-last-login'

export class UserRepository implements IUserRepository {
	async create({ data }: { data: IUserCreate }): Promise<MethodReponse<IUser>> {
		return await createUser({ data })
	}
	async update({ id, data }: { id: string; data: IUserUpdate }): Promise<MethodReponse> {
		return await updateUser({ id, data })
	}
	async delete({ id }: { id: string }): Promise<MethodReponse> {
		return await deleteUser({ id })
	}
	async findById({ id }: { id: string }): Promise<MethodReponse<IUser>> {
		return await findUser({ id })
	}
	async findByEmail(email: string): Promise<MethodReponse<IUser>> {
		return await findUserByEmail(email)
	}
	async findAll({ query }: { query: ParsedQs }): Promise<MethodReponse<FindAllResponse<Partial<IUser>>>> {
		return await findAllUsers({ query })
	}
	async updateLastLogin({ id }: { id: string }): Promise<void> {
		return await updateUserLastLogin({ id })
	}
}
