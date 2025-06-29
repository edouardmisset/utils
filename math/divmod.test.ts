import { assertEquals } from '@std/assert'
import { divmod } from './divmod.ts'

Deno.test('divmod function', async (t) => {
  await t.step('divmod with positive numbers', () => {
    const result1 = divmod(10, 3)
    assertEquals(result1.error, undefined)
    assertEquals(result1.data, [3, 1])

    const result2 = divmod(12, 3)
    assertEquals(result2.error, undefined)
    assertEquals(result2.data, [4, 0])

    const result3 = divmod(15, 5)
    assertEquals(result3.error, undefined)
    assertEquals(result3.data, [3, 0])
  })

  await t.step('divmod with negative numbers', () => {
    const result1 = divmod(-10, 3)
    assertEquals(result1.error, undefined)
    assertEquals(result1.data, [-3, -1])

    const result2 = divmod(10, -3)
    assertEquals(result2.error, undefined)
    assertEquals(result2.data, [-3, -1])

    const result3 = divmod(-10, -3)
    assertEquals(result3.error, undefined)
    assertEquals(result3.data, [3, 1])

    const result4 = divmod(-10, 5)
    assertEquals(result4.error, undefined)
    assertEquals(result4.data, [-2, 0])

    const result5 = divmod(1, -10)
    assertEquals(result5.error, undefined)
    assertEquals(result5.data, [0, -1])
  })

  await t.step('divmod with zero dividend', () => {
    const result = divmod(0, 3)
    assertEquals(result.error, undefined)
    assertEquals(result.data, [0, 0])
  })

  await t.step('divmod with zero divisor', () => {
    const result = divmod(2, 0)
    assertEquals(result.data, undefined)
    assertEquals(result.error?.message, 'Cannot divide by zero (divisor: 0)')
  })
})
