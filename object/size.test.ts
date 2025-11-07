import { assertEquals } from '@std/assert'
import { length, size } from './size.ts'

Deno.test('size', async (t) => {
  await t.step('should return size for an object', () => {
    const result = size({ a: 1, b: 2, c: 3 })
    assertEquals(result, 3)
  })

  await t.step('should return 0 for an empty object', () => {
    const result = size({})
    assertEquals(result, 0)
  })

  await t.step('should return size for an object with nested objects', () => {
    const result = size({ a: 1, b: { c: 2 } })
    assertEquals(result, 2)
  })

  await t.step('should return length for an array', () => {
    const result = size([1, 2, 3, 4, 5])
    assertEquals(result, 5)
  })

  await t.step('should return 0 for an empty array', () => {
    const result = size([])
    assertEquals(result, 0)
  })

  await t.step('should return length for a string', () => {
    const result = size('hello world')
    assertEquals(result, 11)
  })

  await t.step('should return 0 for an empty string', () => {
    const result = size('')
    assertEquals(result, 0)
  })

  await t.step('should return size for a Map', () => {
    const map = new Map([['a', 1], ['b', 2], ['c', 3]])
    const result = size(map)
    assertEquals(result, 3)
  })

  await t.step('should return 0 for an empty Map', () => {
    const map = new Map()
    const result = size(map)
    assertEquals(result, 0)
  })

  await t.step('should return size for a Set', () => {
    const set = new Set([1, 2, 3, 4])
    const result = size(set)
    assertEquals(result, 4)
  })

  await t.step('should return 0 for an empty Set', () => {
    const set = new Set()
    const result = size(set)
    assertEquals(result, 0)
  })

  await t.step('should handle Set with duplicate values', () => {
    const set = new Set([1, 2, 2, 3, 3, 3])
    const result = size(set)
    assertEquals(result, 3) // Sets only store unique values
  })
})

Deno.test('aliases', async (t) => {
  await t.step('length alias should work the same as size', () => {
    const testObject = { a: 1, b: 2 }
    const numberArray = [1, 2, 3]
    const someString = 'test'

    assertEquals(length(testObject), size(testObject))
    assertEquals(length(numberArray), size(numberArray))
    assertEquals(length(someString), size(someString))
  })
})
