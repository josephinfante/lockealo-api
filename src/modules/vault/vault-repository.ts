import { ParsedQs } from 'qs'
import { MethodReponse } from '../../interfaces/method_response-interface'
import { IVault, IVaultCreate, IVaultUpdate } from '../../interfaces/vault-interface'
import { FindAllResponse } from '../../interfaces/find_all_response-interface'

export interface IVaultRepository {
	create({ data, user_id }: { data: IVaultCreate; user_id: string }): Promise<MethodReponse>
	update({ id, data, user_id }: { id: string; data: IVaultUpdate; user_id: string }): Promise<MethodReponse>
	delete({ id, user_id }: { id: string; user_id: string }): Promise<MethodReponse>
	findAll({
		query,
		user_id,
	}: {
		query: ParsedQs
		user_id: string
	}): Promise<MethodReponse<FindAllResponse<Partial<IVault>>>>
}
