import { assertEquals } from '@std/assert'
import { removeNullishObjectValues } from './remove-nullish-values.ts'

Deno.test('removeNullishObjectValues function - removes null and undefined values', async (t) => {
  await t.step('removes null and undefined values', () => {
    const object = { a: 1, b: null, c: undefined, d: 'hello' }
    const result = removeNullishObjectValues(object)
    assertEquals(result, { a: 1, d: 'hello' })
  })

  await t.step('leaves non-nullish values', () => {
    const object = { a: 0, b: false, c: '', d: NaN }
    const result = removeNullishObjectValues(object)
    assertEquals(result, { a: 0, b: false, c: '', d: NaN })
  })

  await t.step('removes "extended" nullish values if not strict', () => {
    const object = { a: 0, b: false, c: '', d: NaN }
    const result = removeNullishObjectValues(object, false)
    assertEquals(result, { a: 0, b: false, d: NaN })
  })

  await t.step('returns empty object for all nullish values', () => {
    const object = { a: null, b: undefined }
    const result = removeNullishObjectValues(object)
    assertEquals(result, {})
  })
})
