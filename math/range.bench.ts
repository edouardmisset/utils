/**
 * Benchmark for range function
 */

import { range } from './range.ts'

Deno.bench('range - small range (0-10)', () => {
  range(0, 10)
})

Deno.bench('range - medium range (0-100)', () => {
  range(0, 100)
})

Deno.bench('range - large range (0-1000)', () => {
  range(0, 1000)
})

Deno.bench('range - with step of 2', () => {
  range(0, 100, 2)
})

Deno.bench('range - with step of 10', () => {
  range(0, 1000, 10)
})

Deno.bench('range - negative range', () => {
  range(-50, 50)
})

Deno.bench('range - reverse range (10-0)', () => {
  range(10, 0, -1)
})
