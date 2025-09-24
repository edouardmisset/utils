import { assertEquals } from '@std/assert'
import { lastDateOfMonth } from './last-date-of-month.ts'

Deno.test('lastDateOfMonth', async (t) => {
  await t.step(
    'should return the last date of the current month when no argument is passed',
    () => {
      const result = lastDateOfMonth()
      const expected = new Date()
      expected.setMonth(expected.getMonth() + 1, 0)
      assertEquals(result.getDate(), expected.getDate())
      assertEquals(result.getMonth(), expected.getMonth())
      assertEquals(result.getFullYear(), expected.getFullYear())
    },
  )

  await t.step('should return the last date of the specified month', () => {
    const date = new Date(2022, 11, 25) // December 25, 2022
    const result = lastDateOfMonth(date)
    const expected = new Date(2022, 12, 0) // December 31, 2022
    assertEquals(result, expected)
  })
})