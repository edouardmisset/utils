/**
 * Type of a function that takes a single argument and returns a value of the
 * same type.
 */
export type UnaryFunction<T> = (argument: T) => T

/**
 * Composes any number of unary functions into a single unary function.
 * Functions are applied in right-to-left order.
 *
 * @param {...UnaryFunction<T>[]} functions - The unary functions to compose.
 * @returns {UnaryFunction<T>} A function that, when called with an argument,
 * applies the composed functions to the argument.
 *
 * @template T The type of the argument and return value.
 *
 * @example
 * ```typescript
 * import { assertEquals } from '@std/assert'
 *
 * const addOne = (x: number) => x + 1
 * const double = (x: number) => x * 2
 * const addOneThenDouble = compose(double, addOne)
 * assertEquals(addOneThenDouble(5), 12)
 * ```
 */
export function compose<T>(...functions: UnaryFunction<T>[]): UnaryFunction<T> {
  return (data) =>
    functions.reduceRight((value, function_) => function_(value), data)
}

/**
 * Alias for the {@link compose} function.
 */
export const combine: typeof compose = compose

/**
 * Pipes any number of unary functions into a single unary function.
 * Functions are applied in left-to-right order.
 *
 * @param {...UnaryFunction<T>[]} functions - The unary functions to pipe.
 * @returns {UnaryFunction<T>} A function that, when called with an argument,
 * applies the piped functions to the argument.
 *
 * @template T The type of the argument and return value.
 *
 * @example
 * ```typescript
 * import { assertEquals } from '@std/assert'
 *
 * const addOne = (x: number) => x + 1
 * const double = (x: number) => x * 2
 * const addOneThenDouble = pipe(addOne, double)
 * assertEquals(addOneThenDouble(5), 12)
 * ```
 */
export function pipe<T>(...functions: UnaryFunction<T>[]): UnaryFunction<T> {
  return (data) =>
    functions.reduce((value, function_) => function_(value), data)
}

/**
 * Alias for the {@link pipe} function.
 */
export const chain: typeof pipe = pipe
