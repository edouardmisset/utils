/**
 * Checks if the given key exists in the object. This function is useful when
 * you want to check if a key exists in an object before accessing it in
 * Typescript. For example when iterating over the keys of an object.
 *
 * @template T - The type of the object.
 * @param {T} obj - The object to check.
 * @param {PropertyKey} key - The key to check for.
 * @returns {boolean} - True if the key exists in the object, false otherwise.
 *
 * @example
 * ```typescript
 * const obj = { a: 1, b: 'hello', c: true }
 * isKey(obj, 'b')
 * // returns true
 *
 * const obj = { a: 1, b: 'hello', c: true }
 * isKey(obj, 'd')
 * // returns false
 * ```
 */
export function isKey<T extends object>(
  obj: T,
  key: PropertyKey,
): key is keyof T {
  return key in obj
}
