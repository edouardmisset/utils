/**
 * Benchmark for maxBy function
 */

import { maxBy } from './max-by.ts'

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

Deno.bench('maxBy - small dataset', () => {
  maxBy(smallData, 'value')
})

Deno.bench('maxBy - medium dataset (100 items)', () => {
  maxBy(mediumData, 'value')
})

Deno.bench('maxBy - large dataset (1000 items)', () => {
  maxBy(largeData, 'value')
})
