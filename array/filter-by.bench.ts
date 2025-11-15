/**
 * Benchmark for filterBy function
 */

import { filterBy } from './filter-by.ts'

// Test data
const smallData = [
  { id: 1, active: true, score: 85 },
  { id: 2, active: false, score: 92 },
  { id: 3, active: true, score: 78 },
  { id: 4, active: true, score: 95 },
  { id: 5, active: false, score: 88 },
]

const mediumData = Array.from({ length: 100 }, (_, i) => ({
  id: i,
  active: i % 2 === 0,
  score: 50 + (i % 50),
}))

const largeData = Array.from({ length: 1000 }, (_, i) => ({
  id: i,
  active: i % 2 === 0,
  score: 50 + (i % 50),
}))

Deno.bench('filterBy - small dataset by boolean', () => {
  filterBy(smallData, 'active', true)
})

Deno.bench('filterBy - small dataset by number', () => {
  filterBy(smallData, 'score', 90)
})

Deno.bench('filterBy - medium dataset (100 items)', () => {
  filterBy(mediumData, 'active', true)
})

Deno.bench('filterBy - large dataset (1000 items)', () => {
  filterBy(largeData, 'active', true)
})
