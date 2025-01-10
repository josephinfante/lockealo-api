import { ParsedQs } from 'qs'
import { MethodReponse } from '../../../interfaces/method_response-interface'
import { FindAllResponse } from '../../../interfaces/find_all_response-interface'
import { IUser } from '../../../interfaces/user-interface'
import { Op } from 'sequelize'
import { HTTP_STATUS } from '../../../data/http-status'
import { UsersModel } from '../../../models/users-model'
import { ValidationError } from '../../../errors/validation-error'

export const findAllUsers = async ({
	query,
}: {
	query: ParsedQs
}): Promise<MethodReponse<FindAllResponse<Partial<IUser>>>> => {
	const size = Math.max(1, query?.size ? Number(query.size) : 100)
	const page = Math.max(1, query?.page ? Number(query.page) : 1)
	const offset = (page - 1) * size

	const allowed_sort_fields = ['first_name', 'last_name', 'email', 'created_at', 'updated_at']
	const default_sort_field = 'created_at'
	const default_sort_order = 'DESC'

	const sort_by =
		query?.sort_by && allowed_sort_fields.includes(query?.sort_by as string)
			? (query?.sort_by as string)
			: default_sort_field
	const sort_order =
		query?.sort_order === 'ASC' || query?.sort_order === 'DESC' ? query?.sort_order : default_sort_order

	let errors: any = {}
	const where: any = []
	let filters: any = {}

	if (query?.first_name) {
		where.push({
			first_name: {
				[Op.iLike]: `%${query.first_name}%`,
			},
		})
		filters.first_name = query.first_name
	}

	if (query?.last_name) {
		where.push({
			last_name: {
				[Op.iLike]: `%${query.last_name}%`,
			},
		})
		filters.last_name = query.last_name
	}

	if (query?.email) {
		where.push({
			email: {
				[Op.iLike]: `%${query.email}%`,
			},
		})
		filters.email = query.email
	}

	if (query?.hidden) {
		where.push({ hidden: query?.hidden == 'true' })
		filters.hidden = query?.hidden
	}

	if (query?.deleted) {
		where.push({ deleted: query?.deleted == 'true' })
		filters.deleted = query?.deleted
	}

	if (query?.created_after || query?.created_before) {
		if (query?.created_after) {
			const created_after = new Date(query.created_after as string)
			if (isNaN(created_after.getTime())) {
				errors.created_after = query.created_after
			}
			where.push({ created_at: { [Op.gte]: created_after } })
			filters.created_after = query.created_after
		}
		if (query?.created_before) {
			const created_before = new Date(query.created_before as string)
			if (isNaN(created_before.getTime())) {
				errors.created_before = query.created_before
			}
			where.push({ created_at: { [Op.lte]: created_before } })
			filters.created_before = query.created_before
		}
	}

	if (query?.updated_after || query?.updated_before) {
		if (query.updated_after) {
			const updated_after = new Date(query.updated_after as string)
			if (isNaN(updated_after.getTime())) {
				errors.updated_after = query.updated_after
			}
			where.push({ updated_at: { [Op.gte]: updated_after } })
			filters.updated_after = query.updated_after
		}
		if (query.updated_before) {
			const updated_before = new Date(query.updated_before as string)
			if (isNaN(updated_before.getTime())) {
				errors.updated_before = query.updated_before
			}
			where.push({ updated_at: { [Op.lte]: updated_before } })
			filters.updated_before = query.updated_before
		}
	}

	if (Object.keys(errors).length > 0) throw new ValidationError('Invalid query parameters.', { ...errors })

	const filterCondition = where.length ? { [Op.and]: where } : {}

	const { count, rows } = await UsersModel.findAndCountAll({
		where: filterCondition,
		order: [[sort_by, sort_order]],
		limit: size,
		offset,
	})

	const items = rows.map((user) => {
		return {
			id: user.dataValues.id,
			first_name: user.dataValues.first_name,
			last_name: user.dataValues.last_name,
			email: user.dataValues.email,
			hidden: user.dataValues.hidden,
			deleted: user.dataValues.deleted,
			created_at: user.dataValues.created_at,
			updated_at: user.dataValues.updated_at,
		}
	})

	const baseUrl = '/api/users'
	const links = {
		self: `${baseUrl}?page=${page}&size=${size}`,
		...(page < Math.ceil(count / size) && { next: `${baseUrl}?page=${page + 1}&size=${size}` }),
		...(page > 1 && { previous: `${baseUrl}?page=${page - 1}&size=${size}` }),
	}

	const meta = {
		...(filters && { filters }),
		sort: {
			field: sort_by,
			order: sort_order,
		},
		current_timestamp: Date.now(),
	}

	return {
		status: HTTP_STATUS.OK,
		data: {
			items,
			total_count: count,
			page: page,
			page_size: size,
			total_pages: Math.ceil(count / size),
			has_next_page: page < Math.ceil(count / size),
			has_previous_page: page > 1,
			meta,
			links,
		},
	}
}
