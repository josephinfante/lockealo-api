import bycript from 'bcrypt'
import { SALT_ROUNDS } from '../config/envd'

export class Bcrypt {
	static async hash(password: string): Promise<string> {
		return await bycript.hash(password, SALT_ROUNDS)
	}

	static async compare(password: string, encryptedPassword: string): Promise<boolean> {
		return await bycript.compare(password, encryptedPassword)
	}
}
