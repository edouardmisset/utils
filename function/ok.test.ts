import { assertEquals } from '@std/assert'
import { ok } from './ok.ts'

Deno.test('ok', async (t) => {
  await t.step('should create successful result with data', () => {
    const data = { name: 'test', value: 123 }
    const result = ok(data)

    assertEquals(result.data, data)
    assertEquals(result.error, undefined)
  })

  await t.step('should work with different data types', () => {
    // String
    const stringResult = ok('hello')
    assertEquals(stringResult.data, 'hello')
    assertEquals(stringResult.error, undefined)

    // Number
    const numberResult = ok(42)
    assertEquals(numberResult.data, 42)
    assertEquals(numberResult.error, undefined)

    // Boolean
    const boolResult = ok(true)
    assertEquals(boolResult.data, true)
    assertEquals(boolResult.error, undefined)

    // Array
    const arrayResult = ok([1, 2, 3])
    assertEquals(arrayResult.data, [1, 2, 3])
    assertEquals(arrayResult.error, undefined)
  })
})
