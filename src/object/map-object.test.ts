import { assertEquals } from '@std/assert'
import { mapObject } from './map-object.ts'

Deno.test('mapObject', async (t) => {
  await t.step('should return a new object with mapped values', () => {
    const result = mapObject({ a: 1, b: 2 }, (value) => value * 2)
    assertEquals(result, { a: 2, b: 4 })
  })

  await t.step('should handle string values', () => {
    const result = mapObject({ a: '1', b: '2' }, (value) => value + value)
    assertEquals(result, { a: '11', b: '22' })
  })

  await t.step('should handle boolean values', () => {
    const result = mapObject({ a: true, b: false }, (value) => !value)
    assertEquals(result, { a: false, b: true })
  })

  await t.step('should handle null values', () => {
    const result = mapObject(
      { a: null, b: '2' },
      (value) => value === null ? 'null' : value,
    )
    assertEquals(result, { a: 'null', b: '2' })
  })

  await t.step('should handle undefined values', () => {
    const result = mapObject(
      { a: undefined, b: '2' },
      (value) => value === undefined ? -1 : value,
    )
    assertEquals(result, { a: -1, b: '2' })
  })
})
