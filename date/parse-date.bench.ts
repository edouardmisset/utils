/**
 * Benchmark for parseDate function
 */

import { parseDate } from './parse-date.ts'

// Test data - various date formats
const isoDate = '2024-01-15T10:30:00.000Z'
const shortDate = '2024-01-15'
const timestamp = 1705318200000
const dateObject = new Date('2024-01-15')

Deno.bench('parseDate - ISO string', () => {
  parseDate(isoDate)
})

Deno.bench('parseDate - short date string', () => {
  parseDate(shortDate)
})

Deno.bench('parseDate - timestamp number', () => {
  parseDate(timestamp)
})

Deno.bench('parseDate - Date object', () => {
  parseDate(dateObject)
})

Deno.bench('parseDate - undefined', () => {
  parseDate(undefined)
})
