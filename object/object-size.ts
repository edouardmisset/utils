/**
 * Returns the size of an object, which is the number of its own enumerable
 * properties.
 *
 * @param {Record<string, unknown>} obj - The object to query.
 * @returns {number} Returns the size of the `obj`.
 *
 * @example
 * ```typescript
 * objectSize({a: 1, b: 2, c: 3})
 * // returns 3
 * ```
 */
export function objectSize(obj: Record<string, unknown>): number {
  return Object.keys(obj).length
}

/**
 * Alias for the {@link objectSize} function.
 */
export const objectLength: typeof objectSize = objectSize
