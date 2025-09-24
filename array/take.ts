import { takeStart } from './take-start.ts'
import { takeEnd } from './take-end.ts'

/** Returns first n if positive or last n if negative. */
export function take<T>(array: T[], n = 1): T[] {
  return n >= 0 ? takeStart(array, n) : takeEnd(array, n)
}
