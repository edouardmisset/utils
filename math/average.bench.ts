/**
 * Benchmark for average function
 */

import { average } from './average.ts'

// Test data
const smallArray = [1, 2, 3, 4, 5]
const mediumArray = Array.from({ length: 100 }, (_, i) => i)
const largeArray = Array.from({ length: 1000 }, (_, i) => i)
const decimalsArray = [1.5, 2.7, 3.2, 4.8, 5.1]
const negativeArray = [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5]

Deno.bench('average - small array (5 elements)', () => {
  average(smallArray)
})

Deno.bench('average - medium array (100 elements)', () => {
  average(mediumArray)
})

Deno.bench('average - large array (1000 elements)', () => {
  average(largeArray)
})

Deno.bench('average - decimal numbers', () => {
  average(decimalsArray)
})

Deno.bench('average - negative numbers', () => {
  average(negativeArray)
})

Deno.bench('average - single element', () => {
  average([42])
})
