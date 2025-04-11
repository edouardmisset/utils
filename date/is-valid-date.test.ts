import { assertEquals } from '@std/assert'
import { isValidDate } from './is-valid-date.ts'

Deno.test('isValidDate function', async (t) => {
  await t.step(
    'should return true for a valid date',
    () => {
      const result = isValidDate(new Date(), new Date('2022-01-01'))
      assertEquals(result, true)
    },
  )

  await t.step(
    'should return false for an invalid date',
    () => {
      const result = isValidDate(new Date(), new Date('invalid date'))
      assertEquals(result, false)
    },
  )

  await t.step(
    'should return false for a non-date value',
    () => {
      const result = isValidDate(new Date(), 'not a date')
      assertEquals(result, false)
    },
  )

  await t.step('should return true when no arguments are provided', () => {
    const result = isValidDate()
    assertEquals(result, true)
  })
})
