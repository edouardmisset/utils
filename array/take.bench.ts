/**
 * Benchmark for take function
 */

import { take } from './take.ts'

// Test data
const smallArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const mediumArray = Array.from({ length: 100 }, (_, i) => i)
const largeArray = Array.from({ length: 1000 }, (_, i) => i)

Deno.bench('take - first 5 from small array', () => {
  take(smallArray, 5)
})

Deno.bench('take - first 10 from medium array', () => {
  take(mediumArray, 10)
})

Deno.bench('take - first 50 from large array', () => {
  take(largeArray, 50)
})

Deno.bench('take - more than available', () => {
  take(smallArray, 20)
})

Deno.bench('take - zero items', () => {
  take(smallArray, 0)
})
