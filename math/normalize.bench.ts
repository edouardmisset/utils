/**
 * Benchmark for normalize function
 */

import { normalize } from './normalize.ts'

// Test data
const smallArray = [1, 2, 3, 4, 5]
const mediumArray = Array.from({ length: 100 }, (_, i) => i)
const largeArray = Array.from({ length: 1000 }, (_, i) => i)
const negativeArray = [-5, -3, -1, 1, 3, 5]

Deno.bench('normalize - small array', () => {
  normalize(smallArray)
})

Deno.bench('normalize - medium array (100 elements)', () => {
  normalize(mediumArray)
})

Deno.bench('normalize - large array (1000 elements)', () => {
  normalize(largeArray)
})

Deno.bench('normalize - negative values', () => {
  normalize(negativeArray)
})

Deno.bench('normalize - single element', () => {
  normalize([42])
})
