/**
 * Removes nullish (`null` and `undefined`) values from the given object.
 *
 * @template T - The type of the object.
 * @param {T} obj - The object from which to remove nullish values.
 * @returns {T} - The object without nullish values.
 *
 * @example
 * ```typescript
 * const obj = { a: 1, b: null, c: undefined, d: 'hello' }
 * removeNullishValues(obj)
 * // returns { a: 1, d: 'hello' }
 *
 * const obj = { a: 0, b: false, c: '', d: NaN }
 * removeNullishValues(obj)
 * // returns { a: 0, b: false, c: '', d: NaN }
 * ```
 */
export function removeNullishObjectValues<
  U extends string | number | object | boolean | undefined | null,
  T extends Record<string, U>,
>(obj: T): Partial<T> {
  return Object.fromEntries(
    // deno-lint-ignore eqeqeq
    Object.entries(obj).filter(([, v]) => v != null),
  ) as Partial<T>
}
