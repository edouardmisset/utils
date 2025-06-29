// This module is browser compatible.

/**
 * Utility functions for working with objects.
 *
 * ```typescript
 * import { isObject } from 'jsr:@edouardmisset/object'
 * import { assertEquals } from '@std/assert'
 *
 * const object_ = { a: 1, b: 2 }
 * assertEquals(isObject(object_), true)
 * ```
 *
 * @module
 */

export * from './invert.ts'
export * from './is-key.ts'
export * from './is-object.ts'
export * from './map-object.ts'
export * from './object-keys.ts'
export * from './size.ts'
export * from './omit.ts'
export * from './pick.ts'
export * from './remove-nullish-values.ts'
export * from './shallow-equal.ts'
