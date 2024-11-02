// This module is browser compatible.

/**
 * Utility functions for working with arrays.
 *
 * ```typescript
 * import { countBy } from 'jsr:@edouard/array'
 * import { assertEquals } from '@std/assert'
 *
 * const array_ = [1, 2, 3, 4, 5]
 * assertEquals(countBy(array_, (x) => x % 2 === 0), 2)
 * ```
 *
 * @module
 */

export * from './collection-key-by.ts'
export * from './count-by.ts'
export * from './create.ts'
export * from './filter-by-date.ts'
export * from './filter.ts'
export * from './find.ts'
export * from './get-n-first-or-last.ts'
export * from './group-by.ts'
export * from './max-by.ts'
export * from './min-by.ts'
export * from './random-item.ts'
export * from './random-sort.ts'
export * from './select-by.ts'
export * from './sets.ts'
export * from './sort-by.ts'
export * from './sort.ts'
export * from './update-array.ts'
