import { ParsedQs } from 'qs'
import { MethodReponse } from '../../interfaces/method_response-interface'
import { IUser, IUserCreate, IUserUpdate } from '../../interfaces/user-interface'
import { UserRepository } from './user-repository.impl'
import { FindAllResponse } from '../../interfaces/find_all_response-interface'

export class UserService {
	constructor(private readonly repository: UserRepository) {}

	async create({ data }: { data: IUserCreate }): Promise<MethodReponse> {
		return await this.repository.create({ data })
	}
	async update({ id, data }: { id: string; data: IUserUpdate }): Promise<MethodReponse> {
		return await this.repository.update({ id, data })
	}
	async delete({ id }: { id: string }): Promise<MethodReponse> {
		return await this.repository.delete({ id })
	}
	async findById({ id }: { id: string }): Promise<MethodReponse<IUser>> {
		return await this.repository.findById({ id })
	}
	async findByEmail(email: string): Promise<MethodReponse<IUser>> {
		return await this.repository.findByEmail(email)
	}
	async findAll({ query }: { query: ParsedQs }): Promise<MethodReponse<FindAllResponse<Partial<IUser>>>> {
		return await this.repository.findAll({ query })
	}
}
