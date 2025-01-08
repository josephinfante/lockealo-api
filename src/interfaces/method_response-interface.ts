export interface MethodReponse<T = any> {
	status: number
	message?: string
	data?: T | null
}
