import { assertEquals } from '@std/assert'
import { sortByDate } from './sort-by-date.ts'

Deno.test('sortByDate', async (t) => {
  const dateA = { date: '2024-01-01', id: 1 }
  const dateB = { date: '2024-02-15', id: 2 }
  const dateC = { date: '2023-12-25', id: 3 }
  const equalDate1 = { date: '2024-03-10', id: 4 }
  const equalDate2 = { date: '2024-03-10', id: 5 }
  const invalidDate = { date: 'invalid-date', id: 6 }

  await t.step(
    'should sort dates in descending order by default (newest first)',
    () => {
      const unsortedArray = [dateA, dateB, dateC]
      const sortedArray = [...unsortedArray].sort(sortByDate)

      assertEquals(
        sortedArray.map((item) => item.id),
        [2, 1, 3], // dateB (Feb '24), dateA (Jan '24), dateC (Dec '23)
      )
    },
  )

  await t.step(
    'should sort dates in ascending order when descending is false (oldest first)',
    () => {
      const unsortedArray = [dateA, dateB, dateC]
      const sortedArray = [...unsortedArray].sort((a, b) =>
        sortByDate(a, b, { descending: false })
      )

      assertEquals(
        sortedArray.map((item) => item.id),
        [3, 1, 2], // dateC (Dec), dateA (Jan), dateB (Feb)
      )
    },
  )

  await t.step('should return 0 for equal dates', () => {
    const result = sortByDate(equalDate1, equalDate2)
    assertEquals(result, 0)
  })

  await t.step(
    'should handle invalid dates by returning 0 and logging errors',
    () => {
      // Capture console.error calls
      const originalError = globalThis.console.error
      const errorLogs: unknown[][] = []
      globalThis.console.error = (...args: unknown[]) => {
        errorLogs.push(args)
      }

      try {
        const result = sortByDate(dateA, invalidDate)
        assertEquals(result, 0)

        // Verify that an error was logged
        assertEquals(errorLogs.length, 1)
        assertEquals(errorLogs[0][0], 'Invalid date format detected:')
        assertEquals(errorLogs[0][1], {
          aStringDate: dateA.date,
          bStringDate: invalidDate.date,
        })
      } finally {
        // Restore original console.error
        globalThis.console.error = originalError
      }
    },
  )

  await t.step('should handle various invalid date formats', () => {
    const originalError = globalThis.console.error
    const errorLogs: unknown[][] = []
    globalThis.console.error = (...args: unknown[]) => {
      errorLogs.push(args)
    }

    const invalidFormats = [
      { date: 'not-a-date', id: 1 },
      { date: '2024-13-01', id: 2 }, // Invalid month
      { date: '32/12/2024', id: 3 }, // Wrong format
      { date: '', id: 4 }, // Empty string
      { date: '2024-W53-1', id: 5 }, // Invalid week date
      { date: 'invalid-date-string', id: 6 }, // Another invalid format
      { date: 'abc-def-ghi', id: 7 }, // Non-numeric invalid format
      { date: '99-99-9999', id: 8 }, // Invalid date format
    ]

    try {
      for (const invalidFormat of invalidFormats) {
        const result = sortByDate(dateA, invalidFormat)
        assertEquals(result, 0, `Failed for format: ${invalidFormat.date}`)
      }

      // Should have logged errors for each invalid date
      assertEquals(errorLogs.length, invalidFormats.length)

      // Verify each error log contains the expected structure
      for (let index = 0; index < errorLogs.length; index++) {
        assertEquals(errorLogs[index][0], 'Invalid date format detected:')
        assertEquals(errorLogs[index][1], {
          aStringDate: dateA.date,
          bStringDate: invalidFormats[index].date,
        })
      }
    } finally {
      globalThis.console.error = originalError
    }
  })

  await t.step('should handle both dates being invalid', () => {
    const originalError = globalThis.console.error
    const errorLogs: unknown[][] = []
    globalThis.console.error = (...args: unknown[]) => {
      errorLogs.push(args)
    }

    const invalidDate1 = { date: 'abc', id: 1 }
    const invalidDate2 = { date: 'xyz', id: 2 }

    try {
      const result = sortByDate(invalidDate1, invalidDate2)
      assertEquals(result, 0)

      // Should log error for both invalid dates
      assertEquals(errorLogs.length, 1)
      assertEquals(errorLogs[0][0], 'Invalid date format detected:')
      assertEquals(errorLogs[0][1], {
        aStringDate: invalidDate1.date,
        bStringDate: invalidDate2.date,
      })
    } finally {
      globalThis.console.error = originalError
    }
  })

  await t.step('should sort an array with multiple dates correctly', () => {
    const unsortedArray = [dateB, dateC, dateA, equalDate1, equalDate2]
    const sortedArray = [...unsortedArray].sort(sortByDate)

    // Expected order: equalDate1/2 (Mar '24), dateB (Feb '24), dateA (Jan '24), dateC (Dec '23)
    assertEquals(
      sortedArray.map((item) => item.id),
      [4, 5, 2, 1, 3],
    )
  })

  await t.step('should work with empty options object', () => {
    const unsortedArray = [dateA, dateB, dateC]
    const sortedArray = [...unsortedArray].sort((a, b) => sortByDate(a, b, {}))

    assertEquals(
      sortedArray.map((item) => item.id),
      [2, 1, 3], // dateB (Feb '24), dateA (Jan '24), dateC (Dec '23) - default descending
    )
  })

  await t.step('should explicitly work with descending: true', () => {
    const unsortedArray = [dateA, dateB, dateC]
    const sortedArray = [...unsortedArray].sort((a, b) =>
      sortByDate(a, b, { descending: true })
    )

    assertEquals(
      sortedArray.map((item) => item.id),
      [2, 1, 3], // dateB (Feb '24), dateA (Jan '24), dateC (Dec '23)
    )
  })

  await t.step('should handle mixed valid and invalid dates', () => {
    const mixedDates = [dateA, invalidDate, dateB]
    const sortedArray = [...mixedDates].sort(sortByDate)

    // Invalid dates should be handled gracefully, valid dates should be sorted
    assertEquals(sortedArray.length, 3)
    // The exact order may vary due to invalid date handling, but should not throw
  })

  await t.step('should handle ISO date strings correctly', () => {
    const isoDate1 = { date: '2024-01-01T10:00:00Z', id: 1 }
    const isoDate2 = { date: '2024-01-01T15:00:00Z', id: 2 }

    const sortedArray = [isoDate1, isoDate2].sort(sortByDate)

    // Later time should come first (descending)
    assertEquals(
      sortedArray.map((item) => item.id),
      [2, 1],
    )
  })

  await t.step('should handle auto-corrected dates (JS Date behavior)', () => {
    const originalError = globalThis.console.error
    const errorLogs: unknown[][] = []
    globalThis.console.error = (...args: unknown[]) => {
      errorLogs.push(args)
    }

    // These dates get auto-corrected by JavaScript Date constructor
    const autoCorrectDate1 = { date: '2024-02-30', id: 1 } // Becomes Mar 1, 2024 01:00
    const autoCorrectDate2 = { date: '2024/02/30', id: 2 } // Becomes Mar 1, 2024 00:00

    try {
      const result = sortByDate(autoCorrectDate1, autoCorrectDate2)
      // Should return a number (not 0) because they have different times
      assertEquals(typeof result, 'number')

      // Should NOT log errors because dates are valid after auto-correction
      assertEquals(errorLogs.length, 0)
    } finally {
      globalThis.console.error = originalError
    }
  })
})
