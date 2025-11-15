/**
 * Benchmark for findBy function
 */

import { findBy } from './find-by.ts'

// Test data
const smallData = [
  { id: 1, name: 'Alice', active: true },
  { id: 2, name: 'Bob', active: false },
  { id: 3, name: 'Carol', active: true },
  { id: 4, name: 'Dave', active: true },
  { id: 5, name: 'Eve', active: false },
]

const mediumData = Array.from({ length: 100 }, (_, i) => ({
  id: i,
  name: `User${i}`,
  active: i % 2 === 0,
}))

const largeData = Array.from({ length: 1000 }, (_, i) => ({
  id: i,
  name: `User${i}`,
  active: i % 2 === 0,
}))

Deno.bench('findBy - small dataset, first item', () => {
  findBy(smallData, 'id', 1)
})

Deno.bench('findBy - small dataset, last item', () => {
  findBy(smallData, 'id', 5)
})

Deno.bench('findBy - medium dataset (100 items)', () => {
  findBy(mediumData, 'id', 50)
})

Deno.bench('findBy - large dataset (1000 items)', () => {
  findBy(largeData, 'id', 500)
})

Deno.bench('findBy - not found', () => {
  findBy(smallData, 'id', 999)
})
