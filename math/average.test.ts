import { assertEquals } from '@std/assert'
import { average } from './average.ts'

Deno.test('average function', async (t) => {
  await t.step('with multiple arguments', () => {
    const result1 = average(1, 2, 3, 4, 5)
    assertEquals(result1.error, undefined)
    assertEquals(result1.data, 3)

    const result2 = average(2, 4, 6, 8, 10)
    assertEquals(result2.error, undefined)
    assertEquals(result2.data, 6)

    const result3 = average(0, 0, 0, 0, 0)
    assertEquals(result3.error, undefined)
    assertEquals(result3.data, 0)
  })

  await t.step('with single array argument', () => {
    const result1 = average([1, 2, 3, 4, 5])
    assertEquals(result1.error, undefined)
    assertEquals(result1.data, 3)

    const result2 = average([2, 4, 6, 8, 10])
    assertEquals(result2.error, undefined)
    assertEquals(result2.data, 6)

    const result3 = average([0, 0, 0, 0, 0])
    assertEquals(result3.error, undefined)
    assertEquals(result3.data, 0)
  })

  await t.step('with no arguments', () => {
    const result = average()
    assertEquals(result.data, undefined)
    assertEquals(
      result.error?.message.includes(
        'Cannot calculate average if no values are passed in',
      ),
      true,
    )
  })
})
