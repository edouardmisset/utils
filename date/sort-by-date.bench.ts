/**
 * Benchmark for sortByDate function
 */

import { sortByDate } from './sort-by-date.ts'

// Test data
const smallDates = [
  { date: new Date('2024-03-15') },
  { date: new Date('2024-01-10') },
  { date: new Date('2024-05-20') },
  { date: new Date('2024-02-14') },
  { date: new Date('2024-04-01') },
]

const mediumDates = Array.from({ length: 100 }, (_, i) => ({
  date: new Date(2024, 0, 1 + i),
}))

const largeDates = Array.from({ length: 1000 }, (_, i) => ({
  date: new Date(2024, 0, 1 + (i % 365)),
}))

Deno.bench('sortByDate - small dataset', () => {
  sortByDate(smallDates, 'date')
})

Deno.bench('sortByDate - medium dataset (100 items)', () => {
  sortByDate(mediumDates, 'date')
})

Deno.bench('sortByDate - large dataset (1000 items)', () => {
  sortByDate(largeDates, 'date')
})

Deno.bench('sortByDate - descending order', () => {
  sortByDate(smallDates, 'date', 'desc')
})
