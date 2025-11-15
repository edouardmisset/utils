/**
 * Benchmark for isValidDate function
 */

import { isValidDate } from './is-valid-date.ts'

// Test data
const validDate = new Date('2024-01-15')
const invalidDate = new Date('invalid')
const validString = '2024-01-15'
const invalidString = 'not-a-date'
const timestamp = 1705318200000

Deno.bench('isValidDate - valid Date object', () => {
  isValidDate(validDate)
})

Deno.bench('isValidDate - invalid Date object', () => {
  isValidDate(invalidDate)
})

Deno.bench('isValidDate - valid date string', () => {
  isValidDate(validString)
})

Deno.bench('isValidDate - invalid string', () => {
  isValidDate(invalidString)
})

Deno.bench('isValidDate - timestamp', () => {
  isValidDate(timestamp)
})

Deno.bench('isValidDate - undefined', () => {
  isValidDate(undefined)
})

Deno.bench('isValidDate - null', () => {
  isValidDate(null)
})
