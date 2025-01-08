import crypto from 'crypto'

export class PasswordEncryption {
	private static readonly ALGORITHM = 'aes-256-cbc'
	private static readonly KEY_LENGTH = 32
	private static readonly IV_LENGTH = 16
	private static readonly ITERATIONS = 1000

	static deriveKey(masterPassword: string, salt: string): Buffer {
		return crypto.pbkdf2Sync(
			masterPassword,
			salt,
			PasswordEncryption.ITERATIONS,
			PasswordEncryption.KEY_LENGTH,
			'sha512',
		)
	}

	static encrypt(password: string, masterPassword: string): { encrypted: string; iv: string; salt: string } {
		const salt = crypto.randomBytes(16).toString('hex')
		const key = PasswordEncryption.deriveKey(masterPassword, salt)

		const iv = crypto.randomBytes(PasswordEncryption.IV_LENGTH)
		const cipher = crypto.createCipheriv(PasswordEncryption.ALGORITHM, key, iv)

		let encrypted = cipher.update(password, 'utf8', 'hex')
		encrypted += cipher.final('hex')

		return {
			encrypted,
			iv: iv.toString('hex'),
			salt,
		}
	}

	static decrypt(encryptedPassword: string, masterPassword: string, iv: string, salt: string): string {
		const key = PasswordEncryption.deriveKey(masterPassword, salt)
		const decipher = crypto.createDecipheriv(PasswordEncryption.ALGORITHM, key, Buffer.from(iv, 'hex'))

		let decrypted = decipher.update(encryptedPassword, 'hex', 'utf8')
		decrypted += decipher.final('utf8')

		return decrypted
	}
}
