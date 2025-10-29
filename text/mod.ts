// This module is browser compatible.

/**
 * Text processing utilities for string manipulation, formatting, and analysis.
 * Includes functions for capitalization, slug generation, accent removal, and
 * string comparison.
 * E.g. {@link capitalize}, {@link slugify}, {@link removeAccents},
 * {@link stringEquals}, {@link stringIncludes}
 *
 * @example
 * ```ts
 * import { capitalize, slugify, removeAccents, levenshteinDistance } from "@edouardmisset/text";
 * import { assertEquals } from "@std/assert";
 *
 * //  capitalize function
 * const title = capitalize('hello world');
 * assertEquals(title, 'Hello world');
 *
 * //  slugify function
 * const slug = slugify('Hello World! This is a Test');
 * assertEquals(slug, 'hello-world-this-is-a-test');
 *
 * //  removeAccents function
 * const clean = removeAccents('café naïve résumé');
 * assertEquals(clean, 'cafe naive resume');
 *
 * //  levenshteinDistance function
 * const distance = levenshteinDistance('kitten', 'sitting');
 * assertEquals(distance, 3);
 * ```
 *
 * @module
 */

export * from './capitalize.ts'
export * from './levenshtein-distance.ts'
export * from './remove-accents.ts'
export * from './slugify.ts'
export * from './string-equals.ts'
export * from './string-includes.ts'
export * from './string-to-boolean.ts'
export * from './wrap-in-parentheses.ts'
