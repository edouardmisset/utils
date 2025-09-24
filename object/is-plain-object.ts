import { type ObjectOfType } from '@edouardmisset/type'

/**
 * Checks if a given value is a plain object.
 * A plain object is one whose prototype is exactly Object.prototype.
 */
export function isPlainObject(
  value: unknown,
): value is ObjectOfType<unknown> {
  return !!value &&
    typeof value === 'object' &&
    Object.getPrototypeOf(value) === Object.prototype
}
