/**
 * Returns the size of an object, which is the number of its own enumerable
 * properties.
 *
 * @param {Record<string, unknown>} object - The object to query.
 * @returns {number} Returns the size of the `object`.
 *
 * @example
 * ```typescript
 * objectSize({a: 1, b: 2, c: 3})
 * // returns 3
 * ```
 */
export function objectSize(object: Record<string, unknown>): number {
  return Object.keys(object).length
}

/**
 * Alias for the {@link objectSize} function.
 */
export const objectLength: typeof objectSize = objectSize
