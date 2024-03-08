type UnaryFunction<T> = (arg: T) => T

/**
 * Composes any number of unary functions into a single unary function.
 * Functions are applied in right-to-left order.
 *
 * @param {...UnaryFunction<T>[]} functions - The unary functions to compose.
 * @returns {UnaryFunction<T>} A function that, when called with an argument, applies the composed functions to the argument.
 *
 * @template T The type of the argument and return value.
 *
 * @example
 * ```typescript
 * const addOne = (x) => x + 1
 * const double = (x) => x * 2
 * const addOneThenDouble = compose(double, addOne)
 * const result = addOneThenDouble(5) // 12
 * ```
 */
export function compose<T>(...functions: UnaryFunction<T>[]): UnaryFunction<T> {
  return (data) => functions.reduceRight((value, func) => func(value), data)
}

/**
 * Alias for the {@link compose} function.
 */
export const combine = compose

/**
 * Pipes any number of unary functions into a single unary function.
 * Functions are applied in left-to-right order.
 *
 * @param {...UnaryFunction<T>[]} functions - The unary functions to pipe.
 * @returns {UnaryFunction<T>} A function that, when called with an argument, applies the piped functions to the argument.
 *
 * @template T The type of the argument and return value.
 *
 * @example
 * ```typescript
 * const addOne = (x) => x + 1
 * const double = (x) => x * 2
 * const addOneThenDouble = pipe(addOne, double)
 * const result = addOneThenDouble(5) // 12
 * ```
 */
export function pipe<T>(...functions: UnaryFunction<T>[]): UnaryFunction<T> {
  return (data) => functions.reduce((value, func) => func(value), data)
}

/**
 * Alias for the {@link pipe} function.
 */
export const chain = pipe
