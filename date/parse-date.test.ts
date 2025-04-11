import { assertEquals, assertThrows } from '@std/assert'
import { parseDate, parseFrenchDate } from './parse-date.ts'

Deno.test('parseDate function', async (t) => {
  await t.step('should parse a valid date string', () => {
    const date = parseDate('04-11-2025')
    assertEquals(date.getFullYear(), 2025)
    assertEquals(date.getMonth(), 3) // Months are zero-based in JavaScript Date
    assertEquals(date.getDate(), 11)
  })

  await t.step('should throw an error for an invalid date string', () => {
    assertThrows(() => parseDate('invalid-date'), Error, 'Invalid date format')
  })

  await t.step(
    'should throw an error for a date string with incorrect format',
    () => {
      assertThrows(() => parseDate('2025-04-11'), Error, 'Invalid date format')
    },
  )
})

Deno.test('parseFrenchDate function', async (t) => {
  await t.step('should parse a valid date string', () => {
    const date = parseFrenchDate('11-04-2025')
    assertEquals(date.getFullYear(), 2025)
    assertEquals(date.getMonth(), 3) // Months are zero-based in JavaScript Date
    assertEquals(date.getDate(), 11)
  })

  await t.step('should throw an error for an invalid date string', () => {
    assertThrows(
      () => parseFrenchDate('invalid-date'),
      Error,
      'Invalid date format',
    )
  })

  await t.step(
    'should throw an error for a date string with incorrect format',
    () => {
      assertThrows(
        () => parseFrenchDate('2025-11-04'),
        Error,
        'Invalid date format',
      )
    },
  )
})
