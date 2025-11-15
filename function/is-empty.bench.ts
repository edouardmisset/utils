/**
 * Benchmark for isEmpty function
 */

import { isEmpty } from './is-empty.ts'

// Test data
const emptyString = ''
const nonEmptyString = 'hello'
const emptyArray: unknown[] = []
const nonEmptyArray = [1, 2, 3]
const emptyObject = {}
const nonEmptyObject = { key: 'value' }
const nullValue = null
const undefinedValue = undefined
const zero = 0
const falsyValue = false

Deno.bench('isEmpty - empty string', () => {
  isEmpty(emptyString)
})

Deno.bench('isEmpty - non-empty string', () => {
  isEmpty(nonEmptyString)
})

Deno.bench('isEmpty - empty array', () => {
  isEmpty(emptyArray)
})

Deno.bench('isEmpty - non-empty array', () => {
  isEmpty(nonEmptyArray)
})

Deno.bench('isEmpty - empty object', () => {
  isEmpty(emptyObject)
})

Deno.bench('isEmpty - non-empty object', () => {
  isEmpty(nonEmptyObject)
})

Deno.bench('isEmpty - null', () => {
  isEmpty(nullValue)
})

Deno.bench('isEmpty - undefined', () => {
  isEmpty(undefinedValue)
})

Deno.bench('isEmpty - zero', () => {
  isEmpty(zero)
})

Deno.bench('isEmpty - false', () => {
  isEmpty(falsyValue)
})
