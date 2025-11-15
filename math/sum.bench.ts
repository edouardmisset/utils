/**
 * Benchmark for sum function
 */

import { sum } from './sum.ts'

// Test data
const smallArray = [1, 2, 3, 4, 5]
const mediumArray = Array.from({ length: 100 }, (_, i) => i)
const largeArray = Array.from({ length: 1000 }, (_, i) => i)
const multipleArrays = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]

Deno.bench('sum - multiple arguments', () => {
  sum(1, 2, 3, 4, 5)
})

Deno.bench('sum - small array', () => {
  sum(smallArray)
})

Deno.bench('sum - medium array (100 elements)', () => {
  sum(mediumArray)
})

Deno.bench('sum - large array (1000 elements)', () => {
  sum(largeArray)
})

Deno.bench('sum - multiple arrays', () => {
  sum(...multipleArrays)
})

Deno.bench('sum - empty array', () => {
  sum([])
})
