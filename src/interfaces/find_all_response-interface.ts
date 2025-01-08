export interface FindAllResponse<T> {
	items: T[]
	total_count: number
	page: number
	page_size: number
	total_pages: number
	has_next_page: boolean
	has_previous_page: boolean

	meta?: {
		[key: string]: any
	}

	links?: {
		self: string
		next?: string
		previous?: string
	}
}
