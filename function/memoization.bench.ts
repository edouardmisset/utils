/**
 * Benchmark for memoization function
 */

import { memoization } from './memoization.ts'

// Test functions to memoize
const fibonacci = (n: number): number => {
  if (n <= 1) return n
  return fibonacci(n - 1) + fibonacci(n - 2)
}

const add = (a: number, b: number): number => a + b
const multiply = (a: number, b: number): number => a * b

// Memoized versions
const memoizedAdd = memoization(add)
const memoizedMultiply = memoization(multiply)

Deno.bench('memoization - first call (cache miss)', () => {
  const memoAdd = memoization(add)
  memoAdd(5, 3)
})

Deno.bench('memoization - repeated call (cache hit)', () => {
  memoizedAdd(10, 20)
})

Deno.bench('memoization - different arguments', () => {
  memoizedAdd(Math.random(), Math.random())
})

Deno.bench('memoization - multiply operation', () => {
  memoizedMultiply(7, 8)
})

Deno.bench('memoization - string arguments', () => {
  const memoConcat = memoization((a: string, b: string) => a + b)
  memoConcat('hello', 'world')
})
