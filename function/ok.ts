/** Result type for successful operations. */
export type Success<T> = { data: T; error: undefined }

/**
 * Creates a successful Result object containing the provided data.
 *
 * @template T - The type of the data.
 * @param {T} data - The data to wrap in a Result.
 * @returns {Result<T>} A Result object with the data and no error.
 */
export function ok<T>(data: T): Success<T> {
  return { data, error: undefined }
}