export type UnaryFunction<T> = (argument: T) => T

/** Compose unary functions right-to-left. */
export function compose<T>(...functions: UnaryFunction<T>[]): UnaryFunction<T> {
  return (data) =>
    functions.reduceRight((value, function_) => function_(value), data)
}

/** Alias for {@link compose}. */
export const combine: typeof compose = compose
export type UnaryFunction<T> = (argument: T) => T

/**
 * Composes any number of unary functions into a single unary function.
 * Functions are applied in right-to-left order.
 */
export function compose<T>(...functions: UnaryFunction<T>[]): UnaryFunction<T> {
  return (data) =>
    functions.reduceRight((value, function_) => function_(value), data)
}

/** Alias for the {@link compose} function. */
export const combine: typeof compose = compose
