/**
 * Static storage helper methods
 *
 */


/** TODO: Take out of types as it is not a type */
// eslint-disable-next-line @tseslint/no-extraneous-class
export class StorageUtil {
  /**
   * Generate random UUID
   * @return {string} - Random UUID
   */
  public static generateRandomUUID (): string {
    return crypto.randomUUID();
  }
}
