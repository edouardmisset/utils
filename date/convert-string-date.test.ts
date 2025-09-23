import { assert, assertEquals, assertInstanceOf } from '@std/assert'
import {
  convertStringDate,
  datification,
  stringifyDate,
} from './convert-string-date.ts'

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

Deno.test('datification', async (t) => {
  await t.step('should convert string to Date object', () => {
    const stringDate = '2022-01-01T12:00'
    const result = datification(stringDate)
    assertEquals(result.error, undefined)
    if (result.data) {
      assertEquals(
        result.data.getTime(),
        new Date(stringDate).getTime(),
      )
    }
  })

  await t.step(
    'should convert string in international date format to Date object',
    () => {
      const result = datification('2022-01-31')
      assertEquals(result.error, undefined)
      if (result.data) {
        assertInstanceOf(result.data, Date)
      }
    },
  )

  await t.step('should return the same Date object for Date input', () => {
    const date = new Date()
    const result = datification(date)
    assertEquals(result.error, undefined)
    if (result.data) {
      assertEquals(result.data.getTime(), date.getTime())
    }
  })

  await t.step(
    'should return an error if the date is not formatted as an ISO8601 date',
    () => {
      const result = datification('01012000')
      assertEquals(result.data, undefined)
      assertEquals(result.error?.message.includes('Invalid date format'), true)
    },
  )

  await t.step('returns error for invalid Date object', () => {
    // Invalid Date object
    const invalidDate = new Date('invalid')
    const result = datification(invalidDate)
    assertEquals(result.error instanceof TypeError, true)
    assertEquals(result.error?.message.includes('Invalid date format'), true)
  })
})

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
