import type { ObjectOfType } from '@edouardmisset/type'

/**
 * Returns an array of the keys of an object.
 *
 * This code snippet defines a function called `objectKeys` that takes an object
 * as input and returns an array of its keys. It ensures that the TypeScript
 * compiler knows the keys are of type `keyof T`, not just `string`.
 *
 * This function uses the `Object.keys` method from JavaScript, and then casts
 * the result to `(keyof T)[]`.
 * This ensures that the TypeScript compiler knows that the keys are of type
 * `keyof T`, not just `string`.
 *
 * @template Object_ The type of the object. It extends `ObjectOfType<unknown`>.
 *
 * @param {Object_} object The object to get the keys from.
 *
 * @returns {(keyof Object_)[]} An array of the keys of the object.
 *
 * @example
 * ```typescript
 * import { assertEquals } from '@std/assert'
 *
 * const person = { name: 'Alice', age: 25 }
 * assertEquals(objectKeys(person), ['name', 'age'])
 * ```
 */
export function objectKeys<Object_ extends ObjectOfType<unknown>>(
  object: Object_,
): (keyof Object_)[] {
  return Object.keys(object) as (keyof Object_)[]
}
