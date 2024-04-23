/**
 * Removes nullish (`null` and `undefined`) values from the given object.
 *
 * **Note**: If the strict flag is set to `false`, the function will also remove
 * empty strings (`''`). By default, the function will not.
 *
 * @template T - The type of the object.
 * @param {T} obj - The object from which to remove nullish values.
 * @returns {T} - The object without nullish values.
 *
 * @example
 * ```typescript
 * const obj1 = { a: 1, b: null, c: undefined, d: 'hello' }
 * removeNullishValues(obj1)
 * // returns { a: 1, d: 'hello' }
 *
 * const obj2 = { a: 0, b: false, c: '', d: NaN }
 * removeNullishValues(obj2)
 * // returns { a: 0, b: false, c: '', d: NaN }
 * ```
 */
export function removeNullishObjectValues<
  U extends string | number | object | boolean | undefined | null,
  T extends Record<string, U>,
>(obj: T, strict = true): Partial<T> {
  return Object.fromEntries(
    Object.entries(obj).filter(([, value]) =>
      // deno-lint-ignore eqeqeq
      value != null && (strict ? true : value !== '')
    ),
  ) as Partial<T>
}
