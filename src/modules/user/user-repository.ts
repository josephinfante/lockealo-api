import { ParsedQs } from 'qs'
import { IUser, IUserCreate, IUserUpdate } from '../../interfaces/user-interface'
import { MethodReponse } from '../../interfaces/method_response-interface'
import { FindAllResponse } from '../../interfaces/find_all_response-interface'

export interface IUserRepository {
	create({ data }: { data: IUserCreate }): Promise<MethodReponse>
	update({ id, data }: { id: string; data: IUserUpdate }): Promise<MethodReponse>
	delete({ id }: { id: string }): Promise<MethodReponse>
	findById({ id }: { id: string }): Promise<MethodReponse<IUser>>
	findByEmail(email: string): Promise<MethodReponse<IUser>>
	findAll({ query }: { query: ParsedQs }): Promise<MethodReponse<FindAllResponse<Partial<IUser>>>>
}
