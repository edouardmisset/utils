import { isValidNumber } from '@edouardmisset/math'

/**
 * Converts a value to a valid number or returns a fallback value.
 *
 * @param maybeNumber - The value to convert.
 * @param fallbackValue - The fallback value to return if the conversion fails.
 * @returns The converted value if it is a valid number, otherwise the fallback value.
 *
 * @example
 * ```typescript
 * import { assertEquals } from '@std/assert'
 *
 * assertEquals(validNumberWithFallback(1, 5), 1)
 * ```
 *
 * @example
 * ```typescript
 * import { assertEquals } from '@std/assert'
 *
 * assertEquals(validNumberWithFallback('1', 5), 1)
 * ```
 */
export function validNumberWithFallback<T = number>(
  maybeNumber: unknown,
  fallbackValue: T,
): T | number {
  if (isValidNumber(maybeNumber)) return maybeNumber

  if (typeof maybeNumber === 'string' && isValidNumber(Number(maybeNumber))) {
    return Number(maybeNumber)
  }

  return fallbackValue
}
