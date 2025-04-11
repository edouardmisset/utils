import { assertEquals } from '@std/assert'
import { isDateInYear } from './is-date-in-year.ts'

Deno.test('isDateInYear function', async (t) => {
  await t.step(
    'should return true when the date string matches the target year',
    () => {
      const dateStr = '2023-04-01'
      const result = isDateInYear(dateStr, 2023)
      assertEquals(result, true)
    },
  )

  await t.step(
    'should return false when the date string does not match the target year',
    () => {
      const dateStr = '2023-04-01'
      const result = isDateInYear(dateStr, 2022)
      assertEquals(result, false)
    },
  )

  await t.step('should return false for an invalid date string', () => {
    const invalidDateStr = 'invalid-date'
    const result = isDateInYear(invalidDateStr, 2023)
    assertEquals(result, false)
  })
})
