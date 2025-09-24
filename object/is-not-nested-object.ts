import { type ObjectOfType, type Primitive } from '@edouardmisset/type'
import { isObject } from './is-object.ts'

/**
 * Checks if a given object is not nested (i.e., none of its values are objects).
 */
export function isNotNestedObject(
  object: ObjectOfType<unknown>,
): object is ObjectOfType<Primitive> {
  return Object.values(object).every((value) => !isObject(value))
}
