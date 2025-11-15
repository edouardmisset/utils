/**
 * Benchmark for groupBy function
 */

import { groupBy } from './group-by.ts'

// Test data
const smallData = [
  { id: 1, name: 'Object 1', category: 'A' },
  { id: 2, name: 'Object 2', category: 'B' },
  { id: 3, name: 'Object 3', category: 'A' },
  { id: 4, name: 'Object 4', category: 'C' },
  { id: 5, name: 'Object 5', category: 'B' },
]

const mediumData = Array.from({ length: 100 }, (_, i) => ({
  id: i,
  name: `Object ${i}`,
  category: ['A', 'B', 'C', 'D', 'E'][i % 5],
}))

const largeData = Array.from({ length: 1000 }, (_, i) => ({
  id: i,
  name: `Object ${i}`,
  category: ['A', 'B', 'C', 'D', 'E'][i % 5],
}))

Deno.bench('groupBy - small dataset (5 items)', () => {
  groupBy(smallData, 'category')
})

Deno.bench('groupBy - medium dataset (100 items)', () => {
  groupBy(mediumData, 'category')
})

Deno.bench('groupBy - large dataset (1000 items)', () => {
  groupBy(largeData, 'category')
})

Deno.bench('groupBy - group by id (unique values)', () => {
  groupBy(mediumData, 'id')
})
