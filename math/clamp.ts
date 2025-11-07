import type { ValueAndRange } from '@edouardmisset/type'

/**
 * Clamps the provided value within the specified range.
 *
 * @param {ValueAndRange} options - An object containing the maximum, minimum,
 * and value to be clamped.
 * @param {number} options.maximum - The maximum value of the range.
 * @param {number} options.minimum - The minimum value of the range.
 * @param {number} options.value - The value to be clamped within the range.
 * @returns {number} - The clamped value within the specified range.
 *
 * @example
 * ```typescript
 * import { assertEquals } from '@std/assert'
 *
 * // Clamp value to range
 * assertEquals(clampValueInRange({ maximum: 10, minimum: 0, value: 15 }), 10)
 * assertEquals(clampValueInRange({ maximum: 10, minimum: 0, value: -5 }), 0)
 * assertEquals(clampValueInRange({ maximum: 10, minimum: 0, value: 5 }), 5)
 * ```
 */

export function clampValueInRange({
  maximum,
  minimum,
  value,
}: ValueAndRange): number {
  return Math.max(Math.min(value, maximum), minimum)
}

/** Alias for {@link clampValueInRange} */
export const clamp: typeof clampValueInRange = clampValueInRange
