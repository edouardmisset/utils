import { assertEquals } from '@std/assert'
import { parseDate } from './parse-date.ts'

Deno.test('parseDate function', async (t) => {
  await t.step(
    'should parse a valid date string with default format (YYYY-MM-DD)',
    () => {
      const result = parseDate('2025-04-11')
      assertEquals(result.error, undefined)
      if (result.data) {
        const date = result.data
        assertEquals(date.getFullYear(), 2025)
        assertEquals(date.getMonth(), 3) // Months are zero-based in JavaScript Date
        assertEquals(date.getDate(), 11)
      }
    },
  )

  await t.step(
    'should parse a valid date string with MM-DD-YYYY format',
    () => {
      const result = parseDate('04-11-2025', 'MM-DD-YYYY')
      assertEquals(result.error, undefined)
      if (result.data) {
        const date = result.data
        assertEquals(date.getFullYear(), 2025)
        assertEquals(date.getMonth(), 3) // Months are zero-based in JavaScript Date
        assertEquals(date.getDate(), 11)
      }
    },
  )

  await t.step(
    'should parse a valid date string with DD-MM-YYYY format',
    () => {
      const result = parseDate('11-04-2025', 'DD-MM-YYYY')
      assertEquals(result.error, undefined)
      if (result.data) {
        const date = result.data
        assertEquals(date.getFullYear(), 2025)
        assertEquals(date.getMonth(), 3) // Months are zero-based in JavaScript Date
        assertEquals(date.getDate(), 11)
      }
    },
  )

  await t.step('should parse historical dates (year 0001-0999)', () => {
    const result = parseDate('0476-09-04')
    assertEquals(result.error, undefined)
    if (result.data) {
      const date = result.data
      assertEquals(date.getFullYear(), 476)
      assertEquals(date.getMonth(), 8)
      assertEquals(date.getDate(), 4)
    }
  })

  await t.step('should return an error for an invalid date string', () => {
    const result = parseDate('invalid-date')
    assertEquals(result.data, undefined)
    assertEquals(
      result.error?.message.includes('Invalid date format'),
      true,
    )
  })

  await t.step(
    'should return an error for a date string with incorrect format',
    () => {
      const result = parseDate('04-11-2025') // This is MM-DD-YYYY but default is YYYY-MM-DD
      assertEquals(result.data, undefined)
      assertEquals(
        result.error?.message.includes('Invalid date format'),
        true,
      )
    },
  )

  await t.step(
    'should return an error when format does not match the date string',
    () => {
      const result = parseDate('2025-04-11', 'MM-DD-YYYY')
      assertEquals(result.data, undefined)
      assertEquals(
        result.error?.message.includes('Invalid date format'),
        true,
      )
    },
  )

  await t.step('should reject invalid month (13)', () => {
    const result = parseDate('2025-13-01')
    assertEquals(result.data, undefined)
    assertEquals(
      result.error?.message.includes('Invalid date format'),
      true,
    )
  })

  await t.step('should reject invalid month (00)', () => {
    const result = parseDate('2025-00-15')
    assertEquals(result.data, undefined)
    assertEquals(
      result.error?.message.includes('Invalid date format'),
      true,
    )
  })

  await t.step('should reject invalid day (32)', () => {
    const result = parseDate('2025-04-32')
    assertEquals(result.data, undefined)
    assertEquals(
      result.error?.message.includes('Invalid date format'),
      true,
    )
  })

  await t.step('should reject invalid day (00)', () => {
    const result = parseDate('2025-04-00')
    assertEquals(result.data, undefined)
    assertEquals(
      result.error?.message.includes('Invalid date format'),
      true,
    )
  })

  await t.step('should accept valid edge case dates', () => {
    const result1 = parseDate('2025-01-31') // January 31
    assertEquals(result1.error, undefined)

    const result2 = parseDate('2025-12-31') // December 31
    assertEquals(result2.error, undefined)

    const result3 = parseDate('2025-06-30') // June 30
    assertEquals(result3.error, undefined)
  })
})
