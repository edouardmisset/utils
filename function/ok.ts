import type { Success } from './try-catch.ts'

/** Creates a successful Result object containing the provided data. */
export function ok<T>(data: T): Success<T> {
  return { data, error: undefined }
}
