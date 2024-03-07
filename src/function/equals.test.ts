import { assert } from 'asserts'
import { deepEquals } from './equals.ts'

Deno.test("deepEquals", async t => {
  await t.step('should return true for equal primitive values', () => {
    const result = deepEquals(1, 1)
    assert(result)
  })

  await t.step('should return false for unequal primitive values', () => {
    const result = deepEquals(1, 2)
    assert(!result)
  })

  await t.step('should return true for equal objects', () => {
    const result = deepEquals({ a: 1, b: 2 }, { a: 1, b: 2 })
    assert(result)
  })

  await t.step('should return false for unequal objects', () => {
    const result = deepEquals({ a: 1, b: 2 }, { a: 1, b: 3 })
    assert(!result)
  })

  await t.step('should return true for equal dates', () => {
    const result = deepEquals(new Date('2021-01-01'), new Date('2021-01-01'))
    assert(result)
  })

  await t.step('should return false for unequal dates', () => {
    const result = deepEquals(new Date('2021-01-01'), new Date('2022-01-01'))
    assert(!result)
  })

  await t.step('should return true for equal arrays', () => {
    const result = deepEquals([1, 2, 3], [1, 2, 3])
    assert(result)
  })

  await t.step('should return false for unequal arrays', () => {
    const result = deepEquals([1, 2, 3], [1, 2, 4])
    assert(!result)
  })
})