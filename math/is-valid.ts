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

// Note: validNumberWithFallback has been moved to `valid-number-with-fallback.ts`
