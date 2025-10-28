import { assertEquals } from '@std/assert'
import { isDateInDuration } from './is-date-in-duration.ts'

Deno.test('isDateInDuration function', async (t) => {
  const referenceDate = new Date('2025-04-11T12:00:00Z')
  const oneHourInMilliseconds = 3_600_000

  const testCases = [
    {
      name:
        'should return true when the date is within the positive duration (future)',
      date: new Date('2025-04-11T12:30:00Z'),
      expected: true,
    },
    {
      name:
        'should return false when the date is before the reference with positive duration',
      date: new Date('2025-04-11T11:30:00Z'),
      expected: false,
    },
    {
      name: 'should return false when the date is after the positive duration',
      date: new Date('2025-04-11T13:30:01Z'),
      expected: false,
    },
    {
      name:
        'should handle edge case where the date is exactly at the reference date (start of positive duration)',
      date: new Date('2025-04-11T12:00:00Z'),
      expected: true,
    },
    {
      name:
        'should handle edge case where the date is exactly at the end of the positive duration',
      date: new Date('2025-04-11T13:00:00Z'),
      expected: true,
    },
    {
      name:
        'should handle negative duration (looking backward from reference date)',
      date: new Date('2025-04-11T11:30:00Z'),
      expected: true,
      durationInMS: -oneHourInMilliseconds,
    },
    {
      name: 'should return false for date outside negative duration range',
      date: new Date('2025-04-11T10:30:00Z'),
      expected: false,
      durationInMS: -oneHourInMilliseconds,
    },
    {
      name:
        'should return false when date is after reference with negative duration',
      date: new Date('2025-04-11T12:30:00Z'),
      expected: false,
      durationInMS: -oneHourInMilliseconds,
    },
    {
      name:
        'should handle edge case where the date is exactly at the start of negative duration',
      date: new Date('2025-04-11T11:00:00Z'),
      expected: true,
      durationInMS: -oneHourInMilliseconds,
    },
    {
      name:
        'should handle edge case where the date is exactly at the reference (end of negative duration)',
      date: new Date('2025-04-11T12:00:00Z'),
      expected: true,
      durationInMS: -oneHourInMilliseconds,
    },
  ]

  for (const { name, date, expected, durationInMS } of testCases) {
    await t.step(name, () => {
      const result = isDateInDuration(date, {
        referenceDate,
        durationInMS: durationInMS ?? oneHourInMilliseconds,
      })
      assertEquals(result, expected)
    })
  }
})
