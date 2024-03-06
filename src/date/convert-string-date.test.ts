import { assertEquals, assertThrows } from 'asserts'
import { convertStringDate, datification } from './convert-string-date.ts'

Deno.test('convertStringDate', async (t) => {
  await t.step(
    'should convert date string from "dd/mm/yyyy hh:mm" format to "yyyy-mm-ddThh:mm" format',
    () => {
      assertEquals(convertStringDate('31/01/2022 12:00'), '2022-01-31T12:00')
    },
  )

  await t.step('should return empty string for empty input', () => {
    assertEquals(convertStringDate(''), '')
  })

  await t.step('should throw error for invalid date format', () => {
    assertThrows(() => convertStringDate('invalid date string'))
  })
})

Deno.test('datification', async (t) => {
  await t.step('should convert string to Date object', () => {
    assertEquals(
      datification('2022-01-01T12:00').getTime(),
      new Date('2022-01-01T12:00').getTime(),
    )
  })

  await t.step('should return the same Date object for Date input', () => {
    const date = new Date()
    assertEquals(datification(date).getTime(), date.getTime())
  })
})
