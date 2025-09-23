// This module is browser compatible.

/**
 * Utility functions for common tasks such as `sleep`, `debounce`, `throttle`, `memoization`, and error handling.
 *
 * @example
 * ```ts
 * import { sleep, tryCatch, isFunction, isEmpty } from "jsr:@edouardmisset/function";
 * import { assertEquals } from "@std/assert";
 *
 * //  sleep function (using a shorter duration for testing)
 * const start = Date.now();
 * await sleep(10);
 * const elapsed = Date.now() - start;
 * assertEquals(elapsed >= 10, true);
 *
 * //  tryCatch function with valid JSON
 * const validResult = tryCatch(() => JSON.parse('{"valid": true}'));
 * assertEquals(validResult.error, undefined);
 * assertEquals(validResult.data?.valid, true);
 *
 * //  tryCatch function with invalid JSON
 * const invalidResult = tryCatch(() => JSON.parse('invalid json'));
 * assertEquals(invalidResult.data, undefined);
 * assertEquals(invalidResult.error instanceof SyntaxError, true);
 *
 * //  isFunction
 * assertEquals(isFunction(() => {}), true);
 * assertEquals(isFunction("not a function"), false);
 *
 * //  isEmpty
 * assertEquals(isEmpty(""), true);
 * assertEquals(isEmpty("hello"), false);
 * ```
 *
 * @module
 */

export * from './debounce.ts'
export * from './equals.ts'
export * from './get-env.ts'
export * from './is-empty.ts'
export * from './is-function.ts'
export * from './is-valid-json.ts'
export * from './memoization.ts'
export * from './pipe.ts'
export * from './sleep.ts'
export * from './throttle.ts'
export * from './time-it.ts'
export * from './try-catch.ts'
