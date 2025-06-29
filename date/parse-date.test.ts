import { assertEquals } from '@std/assert'
import { parseDate, parseFrenchDate } from './parse-date.ts'

Deno.test('parseDate function', async (t) => {
  await t.step('should parse a valid date string', () => {
    const result = parseDate('04-11-2025')
    assertEquals(result.error, undefined)
    if (result.data) {
      const date = result.data
      assertEquals(date.getFullYear(), 2025)
      assertEquals(date.getMonth(), 3) // Months are zero-based in JavaScript Date
      assertEquals(date.getDate(), 11)
    }
  })

  await t.step('should return an error for an invalid date string', () => {
    const result = parseDate('invalid-date')
    assertEquals(result.data, undefined)
    assertEquals(result.error?.message, 'Invalid date format')
  })

  await t.step(
    'should return an error for a date string with incorrect format',
    () => {
      const result = parseDate('2025-04-11')
      assertEquals(result.data, undefined)
      assertEquals(result.error?.message, 'Invalid date format')
    },
  )
})

Deno.test('parseFrenchDate function', async (t) => {
  await t.step('should parse a valid date string', () => {
    const result = parseFrenchDate('11-04-2025')
    assertEquals(result.error, undefined)
    if (result.data) {
      const date = result.data
      assertEquals(date.getFullYear(), 2025)
      assertEquals(date.getMonth(), 3) // Months are zero-based in JavaScript Date
      assertEquals(date.getDate(), 11)
    }
  })

  await t.step('should return an error for an invalid date string', () => {
    const result = parseFrenchDate('invalid-date')
    assertEquals(result.data, undefined)
    assertEquals(result.error?.message, 'Invalid date format')
  })

  await t.step(
    'should return an error for a date string with incorrect format',
    () => {
      const result = parseFrenchDate('2025-11-04')
      assertEquals(result.data, undefined)
      assertEquals(result.error?.message, 'Invalid date format')
    },
  )
})
