import type { ObjectOfType } from '@edouardmisset/type'

/**
 * Filter objects that pass a boolean test by key or predicate.
 *
 * @param {Object_[]} array - array of objects to filter
 * @param {Key|((object: Object_) => boolean)} keyOrFunction
 *  - a key to check or a predicate returning boolean
 * @returns {Object_[]} filtered array of objects passing the test
 * @remarks Non-boolean property values are treated as false.
 *
 * @example
 * ```typescript
 * import { assertEquals } from '@std/assert'
 *
 * assertEquals(filterByBoolean([{ a: true }, { a: false }], 'a'), [{ a: true }])
 * ```
 * @example
 * ```typescript
 * import { assertEquals } from '@std/assert'
 *
 * assertEquals(filterByBoolean([{ b: true }, { c: 1 }], o => !!o.b), [{ b: true }])
 * ```
 */
export function filterByBoolean<
  Object_ extends ObjectOfType,
  Key extends keyof Object_,
>(
  array: Object_[],
  keyOrFunction:
    | Key
    | ((object: Object_, index: number, arr: Object_[]) => boolean),
): Object_[] {
  if (typeof keyOrFunction === 'function') return array.filter(keyOrFunction)

  return array.filter((object) =>
    typeof object[keyOrFunction] === 'boolean'
      ? object[keyOrFunction] === true
      : false
  )
}
