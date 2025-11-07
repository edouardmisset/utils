/**
 * Checks if a value is a valid number.
 *
 * **Note**: `NaN` and `Infinity` are not valid.
 *
 * @param maybeNumber - The value to check.
 * @returns A boolean indicating if the value is a valid number.
 *
 * @example
 * ```typescript
 * import { assertEquals } from '@std/assert'
 *
 * assertEquals(isValidNumber(1), true)
 * ```
 *
 * @example
 * ```typescript
 * import { assertEquals } from '@std/assert'
 *
 * assertEquals(isValidNumber('1'), false)
 * ```
 */
export function isValidNumber(maybeNumber: unknown): maybeNumber is number {
  return typeof maybeNumber === 'number' && Number.isFinite(maybeNumber)
}
