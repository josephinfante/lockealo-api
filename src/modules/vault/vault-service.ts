import { ParsedQs } from 'qs'
import { MethodReponse } from '../../interfaces/method_response-interface'
import { IVault, IVaultCreate, IVaultUpdate } from '../../interfaces/vault-interface'
import { VaultRepository } from './vault-repository.impl'
import { FindAllResponse } from '../../interfaces/find_all_response-interface'

export class VaultService {
	constructor(private readonly repository: VaultRepository) {}

	async create({ data, user_id }: { data: IVaultCreate; user_id: string }): Promise<MethodReponse> {
		return await this.repository.create({ data, user_id })
	}
	async update({ id, data, user_id }: { id: string; data: IVaultUpdate; user_id: string }): Promise<MethodReponse> {
		return await this.repository.update({ id, data, user_id })
	}
	async delete({ id, user_id }: { id: string; user_id: string }): Promise<MethodReponse> {
		return await this.repository.delete({ id, user_id })
	}
	async findAll({
		query,
		user_id,
	}: {
		query: ParsedQs
		user_id: string
	}): Promise<MethodReponse<FindAllResponse<Partial<IVault>>>> {
		return await this.repository.findAll({ query, user_id })
	}
}
