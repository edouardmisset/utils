/**
 * Benchmark for pipe function
 */

import { pipe } from './pipe.ts'

// Test functions
const add5 = (n: number): number => n + 5
const multiply2 = (n: number): number => n * 2
const subtract3 = (n: number): number => n - 3
const square = (n: number): number => n * n

Deno.bench('pipe - 2 functions', () => {
  const fn = pipe(add5, multiply2)
  fn(10)
})

Deno.bench('pipe - 3 functions', () => {
  const fn = pipe(add5, multiply2, subtract3)
  fn(10)
})

Deno.bench('pipe - 4 functions', () => {
  const fn = pipe(add5, multiply2, subtract3, square)
  fn(10)
})

Deno.bench('pipe - complex chain', () => {
  const fn = pipe(
    (n: number) => n + 1,
    (n: number) => n * 2,
    (n: number) => n - 5,
    (n: number) => n / 3,
    (n: number) => Math.floor(n),
  )
  fn(20)
})
