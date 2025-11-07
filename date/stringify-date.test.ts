import { assert, assertEquals } from '@std/assert'
import { stringifyDate } from './stringify-date.ts'

Deno.test('stringifyDate', async (t) => {
  await t.step(
    "should convert a Date object to a string in 'yyyy-mm-dd' format",
    () => {
      const date = new Date(2022, 0, 31) // January 31, 2022
      const result = stringifyDate(date)
      assertEquals(result.error, undefined)
      assertEquals(result.data, '2022-01-31')
    },
  )

  await t.step('should return TypeError for non-Date objects', () => {
    // @ts-expect-error - testing invalid input
    const result1 = stringifyDate('2022-01-01')
    assertEquals(result1.data, undefined)
    assert(result1.error instanceof Error)

    // @ts-expect-error - testing invalid input
    const result2 = stringifyDate(1_641_100_800_000)
    assertEquals(result2.data, undefined)
    assertEquals(result2.error instanceof TypeError, true)
  })
})
