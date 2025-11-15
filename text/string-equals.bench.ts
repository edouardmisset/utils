/**
 * Benchmark for stringEquals function
 */

import { stringEquals } from './string-equals.ts'

// Test data
const str1 = 'Hello World'
const str2 = 'hello world'
const str3 = 'HELLO WORLD'
const str4 = 'Different String'
const longStr1 =
  'This is a much longer string to test performance with case insensitive comparison'
const longStr2 =
  'THIS IS A MUCH LONGER STRING TO TEST PERFORMANCE WITH CASE INSENSITIVE COMPARISON'

Deno.bench('stringEquals - exact match', () => {
  stringEquals(str1, str1)
})

Deno.bench('stringEquals - case insensitive match', () => {
  stringEquals(str1, str2)
})

Deno.bench('stringEquals - uppercase match', () => {
  stringEquals(str1, str3)
})

Deno.bench('stringEquals - no match', () => {
  stringEquals(str1, str4)
})

Deno.bench('stringEquals - long strings match', () => {
  stringEquals(longStr1, longStr2)
})

Deno.bench('stringEquals - empty strings', () => {
  stringEquals('', '')
})
