import { assertEquals } from '@std/assert'
import { isDateInRange } from './is-date-in-range.ts'

Deno.test('isDateInRange function', async (t) => {
  const testCases = [
    {
      name: 'should return true when the date is within the range',
      date: new Date('2025-04-11T12:00:00Z'),
      options: {
        startDate: new Date('2025-04-11T00:00:00Z'),
        endDate: new Date('2025-04-11T23:59:59Z'),
      },
      expected: true,
    },
    {
      name: 'should return false when the date is before the range',
      date: new Date('2025-04-10T23:59:59Z'),
      options: {
        startDate: new Date('2025-04-11T00:00:00Z'),
        endDate: new Date('2025-04-11T23:59:59Z'),
      },
      expected: false,
    },
    {
      name: 'should return false when the date is after the range',
      date: new Date('2025-04-12T00:00:00Z'),
      options: {
        startDate: new Date('2025-04-11T00:00:00Z'),
        endDate: new Date('2025-04-11T23:59:59Z'),
      },
      expected: false,
    },
    {
      name:
        'should handle edge case where the date is exactly at the start of the range',
      date: new Date('2025-04-11T00:00:00Z'),
      options: {
        startDate: new Date('2025-04-11T00:00:00Z'),
        endDate: new Date('2025-04-11T23:59:59Z'),
      },
      expected: true,
    },
    {
      name:
        'should handle edge case where the date is exactly at the end of the range',
      date: new Date('2025-04-11T23:59:59Z'),
      options: {
        startDate: new Date('2025-04-11T00:00:00Z'),
        endDate: new Date('2025-04-11T23:59:59Z'),
      },
      expected: true,
    },
  ]

  for (const { name, date, options, expected } of testCases) {
    await t.step(name, () => {
      const result = isDateInRange(date, options)
      assertEquals(result, expected)
    })
  }
})
