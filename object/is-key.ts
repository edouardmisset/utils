/**
 * Checks if the given key exists in the object. This function is useful when
 * you want to check if a key exists in an object before accessing it in
 * Typescript. For example when iterating over the keys of an object.
 *
 * @template T - The type of the object.
 * @param {T} object - The object to check.
 * @param {PropertyKey} key - The key to check for.
 * @returns {boolean} - True if the key exists in the object, false otherwise.
 *
 * @example
 * ```typescript
 * const obj1 = { a: 1, b: 'hello', c: true }
 * isKey(obj1, 'b')
 * // returns true
 *
 * const obj2 = { a: 1, b: 'hello', c: true }
 * isKey(obj2, 'd')
 * // returns false
 * ```
 */
export function isKey<T extends object>(
  object: T,
  key: PropertyKey,
): key is keyof T {
  return key in object
}
