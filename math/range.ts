import type { ValueAndRange } from '@edouardmisset/type'

/**
 * Checks if the provided value is strictly outside the specified limits.
 *
 * @param {IsOutsideLimitsOptions} options - An object containing the maximum,
 * minimum, and value to be checked.
 * @param {number} options.maximum - The maximum value of the limit.
 * @param {number} options.minimum - The minimum value of the limit.
 * @param {number} options.value - The value to be checked against the limits.
 * @returns {boolean} - A boolean value indicating whether the provided value is
 * outside the specified limits.
 *
 * @example
 * ```typescript
 * import { assertEquals } from '@std/assert'
 *
 * assertEquals(isStrictlyOutsideRange({ maximum: 10, minimum: 0, value: 15 }), true)
 * ```
 */
export function isStrictlyOutsideRange({
  maximum,
  minimum,
  value,
}: ValueAndRange): boolean {
  return value < minimum || maximum < value
}

/**
 * Checks if the provided value is outside the specified limits.
 *
 * @remarks **Note**: This function is inclusive, meaning that if the value is equal to
 * the minimum or maximum, it will be considered outside the range.
 *
 * @param {IsOutsideLimitsOptions} options - An object containing the maximum,
 * minimum, and value to be checked.
 * @param {number} options.maximum - The maximum value of the limit.
 * @param {number} options.minimum - The minimum value of the limit.
 * @param {number} options.value - The value to be checked against the limits.
 * @returns {boolean} - A boolean value indicating whether the provided value is
 * outside the specified limits.
 *
 * @example
 * ```typescript
 * import { assertEquals } from '@std/assert'
 *
 * assertEquals(isOutsideRangeInclusive({ maximum: 10, minimum: 0, value: 10 }), true)
 * ```
 */
export function isOutsideRangeInclusive({
  maximum,
  minimum,
  value,
}: ValueAndRange): boolean {
  return value <= minimum || maximum <= value
}

/**
 * Checks if the provided value is within the specified range (including the min
 * and the max).
 *
 * @param {ValueAndRange} options - An object containing the maximum, minimum,
 * and value to be checked.
 * @param {number} options.maximum - The maximum value of the range.
 * @param {number} options.minimum - The minimum value of the range.
 * @param {number} options.value - The value to be checked within the range.
 * @returns {boolean} - A boolean value indicating whether the provided value is
 * within the specified range.
 * @see {@link isInRange}
 *
 * @example
 * ```typescript
 * import { assertEquals } from '@std/assert'
 *
 * assertEquals(isInRangeInclusive({ maximum: 10, minimum: 0, value: 5 }), true)
 * ```
 */
export function isInRangeInclusive({
  maximum,
  minimum,
  value,
}: ValueAndRange): boolean {
  return minimum <= value && value <= maximum
}

/**
 * Checks if the provided value is within the specified range (excluding the min
 * and the max).
 *
 * @param {ValueAndRange} options - An object containing the maximum, minimum,
 * and value to be checked.
 * @param {number} options.maximum - The maximum value of the range.
 * @param {number} options.minimum - The minimum value of the range.
 * @param {number} options.value - The value to be checked against the range.
 * @returns {boolean} - A boolean value indicating whether the provided value is
 * within the specified range.
 * @see {@link isInRange}
 *
 * @example
 * ```typescript
 * import { assertEquals } from '@std/assert'
 *
 * assertEquals(isStrictlyInRange({ maximum: 10, minimum: 0, value: 10 }), false)
 * ```
 */
export function isStrictlyInRange({
  maximum,
  minimum,
  value,
}: ValueAndRange): boolean {
  return minimum < value && value < maximum
}

/**
 * Checks if the provided value is within the specified range (inclusive).
 *
 * @default inclusive - true
 * @param {IsInRangeOptions} options - An object containing the maximum,
 * minimum, and value to be checked.
 * @param {number} options.maximum - The maximum value of the range.
 * @param {number} options.minimum - The minimum value of the range.
 * @param {number} options.value - The value to be checked within the range.
 * @param {boolean} [options.inclusive=true] - A boolean value indicating
 * whether the range is inclusive.
 * @returns {boolean} - A boolean value indicating whether the provided value is
 * within the specified range.
 *
 * @example
 * ```typescript
 * import { assertEquals } from '@std/assert'
 *
 * assertEquals(isInRange({ maximum: 10, minimum: 0, value: 10 }), true)
 * ```
 */
export function isInRange({
  maximum,
  minimum,
  value,
  inclusive = true,
}: ValueRangeAndBoundaryType): boolean {
  return inclusive
    ? isInRangeInclusive({ maximum, minimum, value })
    : isStrictlyInRange({ maximum, minimum, value })
}

/**
 * An object containing the minimum, maximum, and the value to be considered and
 * optionally its inclusiveness.
 */
export type ValueRangeAndBoundaryType = ValueAndRange & {
  /** Wether or not the bounds (min & max) are included or not */
  inclusive?: boolean
}
