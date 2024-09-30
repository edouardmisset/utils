import { assertEquals, assertInstanceOf, assertThrows } from '@std/assert'
import {
  convertStringDate,
  datification,
  stringifyDate,
} from './convert-string-date.ts'

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
    const stringDate = '2022-01-01T12:00'
    assertEquals(
      datification(stringDate).getTime(),
      new Date(stringDate).getTime(),
    )
  })

  await t.step(
    'should convert string in international date format to Date object',
    () => {
      assertInstanceOf(datification('2022-01-31'), Date)
    },
  )

  await t.step('should return the same Date object for Date input', () => {
    const date = new Date()
    assertEquals(datification(date).getTime(), date.getTime())
  })
})

Deno.test('stringifyDate', async (t) => {
  await t.step(
    "should convert a Date object to a string in 'yyyy-mm-dd' format",
    () => {
      const date = new Date(2022, 0, 31) // January 31, 2022
      assertEquals(stringifyDate(date), '2022-01-31')
    },
  )

  await t.step('should throws TypeError for non-Date objects', () => {
    // @ts-expect-error - testing invalid input
    assertThrows(() => stringifyDate('2022-01-01'), TypeError)
    // @ts-expect-error - testing invalid input
    assertThrows(() => stringifyDate(1_641_100_800_000), TypeError)
  })
})
