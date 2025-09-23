/**
 * 🚀 Powerful TypeScript utility toolkit for modern web development
 *
 * This library provides a comprehensive collection of utility functions organized into modules:
 * - **array**: Functions for working with arrays (e.g. {@link groupBy}, {@link countBy})
 * - **date**: Date manipulation and conversion utilities (e.g. {@link parseDate}, {@link isValidDate})
 * - **function**: Common function utilities (e.g. {@link debounce}, {@link throttle}, {@link memoize})
 * - **math**: Mathematical calculations and validations (e.g. {@link random},
 *   {@link average}, {@link range}) 
 * - **object**: Object manipulation utilities (e.g. {@link invert}, {@link size},
 *   {@link objectKeys})
 * - **text**: String processing and text utilities (e.g. {@link slugify}, {@link stringEquals},
 *   {@link stringIncludes}, {@link removeAccents})
 * - **type**: TypeScript type helpers and utilities (e.g. {@link Primitive}, {@link Override}, {@link LooseAutoComplete})
 *
 * @example
 * ```ts
 * import { groupBy } from "jsr:@edouardmisset/array";
 * import { assertEquals } from "@std/assert";
 *
 * const users = [
 *   { name: 'Alice', type: 'even' },
 *   { name: 'Bob', type: 'odd' },
 *   { name: 'Carol', type: 'even' }
 * ];
 * const grouped = groupBy(users, 'type');
 * assertEquals(grouped.even.length, 2);
 * assertEquals(grouped.odd, { name: 'Bob', type: 'odd' });
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

