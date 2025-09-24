// This module is browser compatible.

/**
 * Object manipulation utilities for transformation, validation, and key
 * operations. 
 * Includes functions for object inversion, key checking, type validation, and
 * mapping. 
 * E.g. {@link invert}, {@link size}, {@link objectKeys}, {@link mapObject}
 *
 * @example
 * ```ts
 * import { isObject, invert, isKey, mapObject } from "jsr:@edouardmisset/object";
 * import { assertEquals } from "@std/assert";
 *
 * const obj = { a: 1, b: 2 };
 *
 * // isObject function
 * assertEquals(isObject(obj), true);
 * assertEquals(isObject("not an object"), false);
 * assertEquals(isObject(null), false);
 *
 * // invert function
 * const inverted = invert(obj);
 * assertEquals(inverted["1"], "a");
 * assertEquals(inverted["2"], "b");
 *
 * // isKey function
 * assertEquals(isKey(obj, 'a'), true);
 * assertEquals(isKey(obj, 'c'), false);
 *
 * // mapObject function
 * const doubled = mapObject(obj, value => value * 2);
 * assertEquals(doubled.a, 2);
 * assertEquals(doubled.b, 4);
 * ```
 *
 * @module
 */

export * from './invert.ts'
export * from './is-key.ts'
export * from './is-not-nested-object.ts'
export * from './is-object.ts'
export * from './is-plain-object.ts'
export * from './map-object.ts'
export * from './object-keys.ts'
export * from './omit.ts'
export * from './pick.ts'
export * from './remove-nullish-values.ts'
export * from './shallow-equal.ts'
export * from './size.ts'

