import { assertEquals } from '@std/assert'
import { invert } from './invert.ts'

Deno.test('invert', async (t) => {
  await t.step('should invert keys and values', () => {
    const result = invert({ a: '1', b: '2' })
    assertEquals(result, { '1': 'a', '2': 'b' })
  })

  await t.step('should override keys with duplicate values', () => {
    const result = invert({ a: '1', b: '1' })
    assertEquals(result, { '1': 'b' })
  })

  await t.step('should handle number values', () => {
    const result = invert({ a: 1, b: 2 })
    assertEquals(result, { '1': 'a', '2': 'b' })
  })

  await t.step('should handle null values', () => {
    const result = invert({ a: null, b: 2 })
    assertEquals(result, { '2': 'b' })
  })

  await t.step('should handle undefined values', () => {
    const result = invert({ a: undefined, b: 2 })
    assertEquals(result, { '2': 'b' })
  })

  await t.step('should handle object values', () => {
    const result = invert({ a: { c: 3 }, b: '2' })
    assertEquals(result, { '2': 'b' })
  })

  await t.step('should handle array values', () => {
    const result = invert({ a: [1, 2, 3], b: '2' })
    assertEquals(result, { '2': 'b' })
  })
})
