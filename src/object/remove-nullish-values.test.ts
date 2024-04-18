import { assertEquals } from '@std/assert'
import { removeNullishObjectValues } from './remove-nullish-values.ts'

Deno.test('removeNullishObjectValues function - removes null and undefined values', async (t) => {
  await t.step('removes null values', () => {
    const obj = { a: 1, b: null, c: undefined, d: 'hello' }
    const result = removeNullishObjectValues(obj)
    assertEquals(result, { a: 1, d: 'hello' })
  })

  await t.step('removes undefined values', () => {
    const obj = { a: 1, b: null, c: undefined, d: 'hello' }
    const result = removeNullishObjectValues(obj)
    assertEquals(result, { a: 1, d: 'hello' })
  })

  await t.step('leaves non-nullish values', () => {
    const obj = { a: 0, b: false, c: '', d: NaN }
    const result = removeNullishObjectValues(obj)
    assertEquals(result, { a: 0, b: false, c: '', d: NaN })
  })

  await t.step('removes "extended" nullish values if not strict', () => {
    const obj = { a: 0, b: false, c: '', d: NaN }
    const result = removeNullishObjectValues(obj, false)
    assertEquals(result, { a: 0, b: false, d: NaN })
  })

  await t.step('returns empty object for all nullish values', () => {
    const obj = { a: null, b: undefined }
    const result = removeNullishObjectValues(obj)
    assertEquals(result, {})
  })
})
