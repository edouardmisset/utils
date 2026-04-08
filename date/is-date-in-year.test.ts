import { assertEquals } from '@std/assert'
import { isDateInYear } from './is-date-in-year.ts'

Deno.test('isDateInYear function', async (t) => {
  await t.step(
    'should return true when the date string matches the target year',
    () => {
      const dateString = '2023-04-01'
      const result = isDateInYear(dateString, 2023)
      assertEquals(result, true)
    },
  )

  await t.step(
    'should return false when the date string does not match the target year',
    () => {
      const dateString = '2023-04-01'
      const result = isDateInYear(dateString, 2022)
      assertEquals(result, false)
    },
  )

  await t.step('should return false for an invalid date string', () => {
    const invalidDateString = 'invalid-date'
    const result = isDateInYear(invalidDateString, 2023)
    assertEquals(result, false)
  })
})
