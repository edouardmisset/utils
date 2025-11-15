/**
 * Benchmark for capitalize function
 */

import { capitalize } from './capitalize.ts'

// Test data
const shortString = 'hello'
const longString =
  'hello world this is a much longer string to test performance'
const upperString = 'HELLO WORLD'
const mixedString = 'hElLo WoRlD'

Deno.bench('capitalize - short string', () => {
  capitalize(shortString)
})

Deno.bench('capitalize - long string', () => {
  capitalize(longString)
})

Deno.bench('capitalize - uppercase string', () => {
  capitalize(upperString)
})

Deno.bench('capitalize - mixed case string', () => {
  capitalize(mixedString)
})

Deno.bench('capitalize - with lowercase option false', () => {
  capitalize(mixedString, { lowercase: false })
})

Deno.bench('capitalize - empty string', () => {
  capitalize('')
})
