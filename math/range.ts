/**
 * An object containing the maximum, minimum, and value to be checked.
 */
export interface ValueAndRange {
  maximum: number
  minimum: number
  value: number
  inclusive?: boolean
}

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
 * clampValueInRange({ maximum: 10, minimum: 0, value: 15 })
 * // returns 10
 * ```
 */
export function clampValueInRange({
  maximum,
  minimum,
  value,
}: Omit<ValueAndRange, 'inclusive'>): number {
  return Math.max(Math.min(value, maximum), minimum)
}

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
 * isOutsideRange({ maximum: 10, minimum: 0, value: 15 })
 * // returns true
 * ```
 */
export function isOutsideRange({
  maximum,
  minimum,
  value,
}: Omit<ValueAndRange, 'inclusive'>): boolean {
  return value < minimum || maximum < value
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
 * isInclusiveInRange({ maximum: 10, minimum: 0, value: 5 })
 * // returns true
 * ```
 */
export function isInclusiveInRange({
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
 * isExclusiveInRange({ maximum: 10, minimum: 0, value: 10 })
 * // returns false
 * ```
 */
export function isExclusiveInRange({
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
 * isInRange({ maximum: 10, minimum: 0, value: 10 })
 * // returns true
 * ```
 */
export function isInRange({
  maximum,
  minimum,
  value,
  inclusive = true,
}: ValueAndRange): boolean {
  return inclusive
    ? isInclusiveInRange({ maximum, minimum, value })
    : isExclusiveInRange({ maximum, minimum, value })
}
