/**
 * Removes nullish (`null` and `undefined`) values from the given object.
 *
 * **Note**: If the strict flag is set to `false`, the function will also remove
 * empty strings (`''`). By default, the function will not.
 *
 * @template T - The type of the object.
 * @param {T} object - The object from which to remove nullish values.
 * @returns {T} - The object without nullish values.
 *
 * @example
 * ```typescript
 * const object1 = { a: 1, b: null, c: undefined, d: 'hello' }
 * removeNullishObjectValues(object1)
 * // returns { a: 1, d: 'hello' }
 *
 * const object2 = { a: 0, b: false, c: '', d: NaN }
 * removeNullishObjectValues(object2)
 * // returns { a: 0, b: false, c: '', d: NaN }
 * ```
 */
export function removeNullishObjectValues<
  U extends string | number | object | boolean | undefined | null,
  T extends Record<string, U>,
>(object: T, strict = true): Partial<T> {
  return Object.fromEntries(
    Object.entries(object).filter(([, value]) =>
      // deno-lint-ignore eqeqeq
      value != null && (strict ? true : value !== '')
    ),
  ) as Partial<T>
}
