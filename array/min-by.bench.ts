/**
 * Benchmark for minBy function
 */

import { minBy } from './min-by.ts'

// Test data
const smallData = [
  { id: 1, value: 10 },
  { id: 2, value: 50 },
  { id: 3, value: 30 },
  { id: 4, value: 90 },
  { id: 5, value: 20 },
]

const mediumData = Array.from({ length: 100 }, (_, i) => ({
  id: i,
  value: Math.random() * 100,
}))

const largeData = Array.from({ length: 1000 }, (_, i) => ({
  id: i,
  value: Math.random() * 100,
}))

Deno.bench('minBy - small dataset', () => {
  minBy(smallData, 'value')
})

Deno.bench('minBy - medium dataset (100 items)', () => {
  minBy(mediumData, 'value')
})

Deno.bench('minBy - large dataset (1000 items)', () => {
  minBy(largeData, 'value')
})
