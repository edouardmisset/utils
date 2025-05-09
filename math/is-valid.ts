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
 * isValidNumber(1)
 * // returns true
 * ```
 *
 * @example
 * ```typescript
 * isValidNumber('1')
 * // returns false
 * ```
 */
export function isValidNumber(maybeNumber: unknown): maybeNumber is number {
  return typeof maybeNumber === 'number' && Number.isFinite(maybeNumber)
}

/**
 * Converts a value to a valid number or returns a fallback value.
 *
 * @param maybeNumber - The value to convert.
 * @param fallbackValue - The fallback value to return if the conversion fails.
 * @returns The converted value if it is a valid number, otherwise the fallback value.
 *
 * @example
 * ```typescript
 * validNumberWithFallback(1, 5)
 * // returns 1
 * ```
 *
 * @example
 * ```typescript
 * validNumberWithFallback('1', 5)
 * // returns 1
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
