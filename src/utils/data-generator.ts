import { randomBytes } from 'crypto'

export class Generate {
	private static readonly TIMESTAMP_BYTES = 8
	private static readonly RANDOM_BYTES = 8
	private static readonly COUNTER_BYTES = 4

	static id(): string {
		const timestamp = Math.floor(Date.now() / 1000) // Unix timestamp in seconds
		const timestampBuffer = Buffer.alloc(Generate.TIMESTAMP_BYTES)
		timestampBuffer.writeUInt32BE(timestamp, 0)

		const randomBuffer = randomBytes(Generate.RANDOM_BYTES)
		const counterBuffer = randomBytes(Generate.COUNTER_BYTES)

		const objectIdBuffer = Buffer.concat([timestampBuffer, randomBuffer, counterBuffer])

		// Set version (4 bits) and variant (2 bits)
		objectIdBuffer[6] = (objectIdBuffer[6] & 0x0f) | 0x40 // Version 4
		objectIdBuffer[8] = (objectIdBuffer[8] & 0x3f) | 0x80 // Variant

		// Convert the buffer to a hexadecimal string
		const objectIdHex = objectIdBuffer.toString('hex')

		// Insert hyphens at the specified positions
		const ID =
			objectIdHex.substring(0, 8) +
			'-' +
			objectIdHex.substring(8, 12) +
			'-' +
			objectIdHex.substring(12, 16) +
			'-' +
			objectIdHex.substring(23)

		return ID
	}
	static code(length: number = 6): string {
		const chars = '0123456789'
		let code = ''
		for (let i = 0; i < length; i++) {
			code += chars.charAt(Math.floor(Math.random() * chars.length))
		}
		return code
	}
}
