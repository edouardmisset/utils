/**
 * Benchmark for sortBy function
 */

import { sortBy } from './sort-by.ts'

// Test data
const smallData = [
  { id: 5, name: 'Eve', age: 35 },
  { id: 2, name: 'Bob', age: 25 },
  { id: 4, name: 'Dave', age: 30 },
  { id: 1, name: 'Alice', age: 20 },
  { id: 3, name: 'Carol', age: 28 },
]

const mediumData = Array.from({ length: 100 }, (_, i) => ({
  id: 100 - i,
  name: `User${i}`,
  age: 20 + (i % 50),
}))

const largeData = Array.from({ length: 1000 }, (_, i) => ({
  id: 1000 - i,
  name: `User${i}`,
  age: 20 + (i % 50),
}))

Deno.bench('sortBy - small dataset by number', () => {
  sortBy(smallData, 'id')
})

Deno.bench('sortBy - small dataset by string', () => {
  sortBy(smallData, 'name')
})

Deno.bench('sortBy - medium dataset (100 items)', () => {
  sortBy(mediumData, 'id')
})

Deno.bench('sortBy - large dataset (1000 items)', () => {
  sortBy(largeData, 'id')
})

Deno.bench('sortBy - with order desc', () => {
  sortBy(mediumData, 'id', 'desc')
})
