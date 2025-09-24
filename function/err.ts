/** Result type for failed operations. */
export type Failure<E> = { data: undefined; error: E }

/**
 * Creates a failed Result object containing the provided error.
 *
 * @template E - The type of the error.
 * @param {E} error - The error to wrap in a Result.
 * @returns {Result<undefined, E>} A Result object with the error and no data.
 */
export function err<E = Error>(error: E): Failure<E> {
  return { data: undefined, error }
}