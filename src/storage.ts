/**
 * Static storage helper methods
 */
export class StorageUtil {
	/**
	 * Generate random UUID
	 * @return {string} - Random UUID
	 */
	public static generateRandomUUID(): string {
		return crypto.randomUUID();
	}
}
