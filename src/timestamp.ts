/**
 * Static timestamp helper functions
 */
/* eslint-disable-next-line @tseslint/no-extraneous-class */
export class TimestampUtil {
  /**
   * Validate timestamp by its value against current timestamp
   * @param {number} timestamp - Timestamp, that'll be checked
   * @return {boolean} - Returns true if Timestamp is greater than current Timestamp, otherwise false
   */
  public static isValidAgainstNow (timestamp: number): boolean {
    return timestamp > Date.now();
  }
}
