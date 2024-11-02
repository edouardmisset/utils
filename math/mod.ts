// This module is browser compatible.

/**
 * Utility functions for doing general math calculations.
 * 
 * ```typescript
 * import { sum } from 'jsr:@edouard/math'
 * import { assertEquals } from '@std/assert'
 * 
 * const array_ = [1, 2, 3, 4, 5]
 * assertEquals(sum(array_), 15)
 * ```
 *
 * @module
 */

export * from './average.ts'
export * from './divmod.ts'
export * from './is-valid.ts'
export * from './product.ts'
export * from './random.ts'
export * from './range.ts'
export * from './round-to-precision.ts'
export * from './scale.ts'
export * from './standard-deviation.ts'
export * from './sum.ts'
export * from './to-fixed-without-zero.ts'
export * from './validate-number.ts'

