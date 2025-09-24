import type { Failure } from './try-catch.ts'

/** Creates a failed Result object containing the provided error. */
export function err<E = Error>(error: E): Failure<E> {
  return { data: undefined, error }
}
