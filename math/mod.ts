// This module is browser compatible.

/**
 * Mathematical utility functions for calculations, statistics, and number
 * validation.
 * Includes arithmetic operations, averages, products, and mathematical
 * validations.
 * E.g. {@link sum}, {@link average}, {@link range}, {@link random}
 *
 * @example
 * ```ts
 * import { sum, average, product, divmod } from "jsr:@edouardmisset/math";
 * import { assertEquals } from "@std/assert";
 *
 * const numbers = [1, 2, 3, 4, 5];
 *
 * //  sum function
 * const totalResult = sum(numbers);
 * assertEquals(totalResult, 15);
 *
 * //  average function
 * const avgResult = average(numbers);
 * assertEquals(avgResult.error, undefined);
 * assertEquals(avgResult.data, 3);
 *
 * //  product function
 * const prodResult = product(numbers);
 * assertEquals(prodResult, 120);
 *
 * //  divmod function
 * const divmodResult = divmod(17, 5);
 * assertEquals(divmodResult.error, undefined);
 * if (divmodResult.data) {
 *   const [quotient, remainder] = divmodResult.data;
 *   assertEquals(quotient, 3);
 *   assertEquals(remainder, 2);
 * }
 * ```
 *
 * @module
 */

export * from './average-time.ts'
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
