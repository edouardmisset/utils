// This module is browser compatible.

/**
 * Utility functions for working with text.
 * 
 * ```typescript
 * import { capitalize } from 'jsr:@edouard/text'
 * import { assertEquals } from '@std/assert'
 * 
 * assertEquals(capitalize('hello'), 'Hello')
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
