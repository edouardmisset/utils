import { assertEquals } from '@std/assert'
import { convertStringDate } from './convert-string-date.ts'

Deno.test('convertStringDate', async (t) => {
  await t.step(
    'should convert date string from "dd/mm/yyyy hh:mm" format to "yyyy-mm-ddThh:mm" format',
    () => {
      const result = convertStringDate('31/01/2022 12:00')
      assertEquals(result.error, undefined)
      assertEquals(result.data, '2022-01-31T12:00')
    },
  )

  await t.step('should return empty string for empty input', () => {
    const result = convertStringDate('')
    assertEquals(result.error, undefined)
    assertEquals(result.data, '')
  })

  await t.step('should return error for invalid date format', () => {
    const result = convertStringDate('invalid date string')
    assertEquals(result.data, undefined)
    assertEquals(result.error?.message.includes('Invalid date format'), true)
  })
})
