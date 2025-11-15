/**
 * Benchmark for isObject function
 */

import { isObject } from './is-object.ts'

// Test data
const plainObject = { key: 'value' }
const array = [1, 2, 3]
const nullValue = null
const undefinedValue = undefined
const number = 42
const string = 'hello'
const date = new Date()
const emptyObject = {}
const nestedObject = { a: { b: { c: 'value' } } }

Deno.bench('isObject - plain object', () => {
  isObject(plainObject)
})

Deno.bench('isObject - array', () => {
  isObject(array)
})

Deno.bench('isObject - null', () => {
  isObject(nullValue)
})

Deno.bench('isObject - undefined', () => {
  isObject(undefinedValue)
})

Deno.bench('isObject - number', () => {
  isObject(number)
})

Deno.bench('isObject - string', () => {
  isObject(string)
})

Deno.bench('isObject - Date', () => {
  isObject(date)
})

Deno.bench('isObject - empty object', () => {
  isObject(emptyObject)
})

Deno.bench('isObject - nested object', () => {
  isObject(nestedObject)
})
