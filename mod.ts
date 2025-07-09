/**
 * 🚀 Powerful TypeScript utility toolkit for modern web development
 *
 * This library provides a comprehensive collection of utility functions organized into modules:
 * - **array**: Functions for working with arrays (groupBy, countBy, filterBy, etc.)
 * - **date**: Date manipulation and conversion utilities
 * - **function**: Common function utilities (debounce, throttle, memoization, etc.)
 * - **math**: Mathematical calculations and validations
 * - **object**: Object manipulation utilities
 * - **text**: String processing and text utilities
 * - **type**: TypeScript type helpers and utilities
 *
 * @example
 * ```ts
 * import { groupBy } from "jsr:@edouardmisset/array";
 * import { assertEquals } from "@std/assert";
 *
 * // Test array utilities with objects
 * const users = [
 *   { name: 'Alice', type: 'even' },
 *   { name: 'Bob', type: 'odd' },
 *   { name: 'Carol', type: 'even' }
 * ];
 * const grouped = groupBy(users, 'type');
 * assertEquals(grouped.even.length, 2);
 * assertEquals(grouped.odd.length, 1);
 * ```
 *
 * @example
 * ```ts
 * import { slugify } from "jsr:@edouardmisset/text";
 * import { assertEquals } from "@std/assert";
 *
 * // Test text utilities
 * const slug = slugify('Hello World!');
 * assertEquals(slug, 'hello-world');
 * ```
 *
 * @module utils
 */

export * from './array/mod.ts'
export * from './date/mod.ts'
export * from './function/mod.ts'
export * from './math/mod.ts'
export * from './object/mod.ts'
export * from './text/mod.ts'
export * from './type/mod.ts'
