import { assertEquals } from '@std/assert'
import { isDateInLast12Months } from './is-date-in-last-12-months.ts'

Deno.test('isDateInLast12Months function', async (t) => {
  await t.step(
    'should return true for the current date',
    () => {
      const now = new Date()
      const result = isDateInLast12Months(now)
      assertEquals(result.error, undefined)
      assertEquals(result.data, true)
    },
  )

  await t.step(
    'should return true for a date 6 months ago',
    () => {
      const pastDate = new Date()
      pastDate.setMonth(pastDate.getMonth() - 6)
      const result = isDateInLast12Months(pastDate)
      assertEquals(result.error, undefined)
      assertEquals(result.data, true)
    },
  )

  await t.step(
    'should return true for a date exactly 1 year ago at midnight',
    () => {
      const now = new Date()
      const lastYear = new Date(now)
      lastYear.setFullYear(now.getFullYear() - 1)
      lastYear.setHours(0, 0, 0, 0)
      const result = isDateInLast12Months(lastYear)
      assertEquals(result.error, undefined)
      assertEquals(result.data, true)
    },
  )

  await t.step(
    'should return false for a date older than 1 year',
    () => {
      const now = new Date()
      const lastYear = new Date(now)
      lastYear.setFullYear(now.getFullYear() - 1)
      lastYear.setHours(0, 0, 0, 0)
      const olderDate = new Date(lastYear)
      olderDate.setDate(olderDate.getDate() - 1)
      const result = isDateInLast12Months(olderDate)
      assertEquals(result.error, undefined)
      assertEquals(result.data, false)
    },
  )

  await t.step(
    'should return false for a future date',
    () => {
      const futureDate = new Date()
      futureDate.setDate(futureDate.getDate() + 1)
      const result = isDateInLast12Months(futureDate)
      assertEquals(result.error, undefined)
      assertEquals(result.data, false)
    },
  )

  await t.step(
    'should return an error for an invalid date string',
    () => {
      const result = isDateInLast12Months('not a date')
      assertEquals(result.data, undefined)
      assertEquals(result.error?.message, 'Invalid date format.')
    },
  )
})
