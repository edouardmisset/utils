import { assertEquals } from '@std/assert'
import { createBooleanFilter, createDateFilter } from './filter.ts'

Deno.test('createDateFilter', async (t) => {
  await t.step('should filter dates by a specific year', () => {
    const filter = createDateFilter({ year: 2020 })
    const result = filter(new Date(2020, 0, 1))
    assertEquals(result, true)
  })

  await t.step('should filter dates by a date range', () => {
    const filter = createDateFilter({
      endDate: new Date(2020, 11, 31),
      startDate: new Date(2020, 6, 1),
    })
    const result = filter(new Date(2020, 0, 1))
    assertEquals(result, false)
  })

  const days180 = 1000 * 60 * 60 * 24 * 180
  await t.step(
    'should filter dates by a duration from a reference date',
    () => {
      const filter = createDateFilter({
        durationInMS: days180,
        referenceDate: new Date(2020, 4, 1),
      })
      const result = filter(new Date(2020, 0, 1))
      assertEquals(result, true)
    },
  )

  await t.step(
    'should filter dates by a duration from a reference date with default values',
    () => {
      const filter = createDateFilter({})
      const result = filter(new Date())
      assertEquals(result, true)
    },
  )

  await t.step(
    'should filter dates by a duration from a reference date with only durationInMS',
    () => {
      const filter = createDateFilter({
        durationInMS: days180,
      })
      const result = filter(new Date())
      assertEquals(result, true)
    },
  )

  await t.step(
    'should filter dates by a duration from a reference date with only referenceDate',
    () => {
      const filter = createDateFilter({
        referenceDate: new Date(),
      })
      const result = filter(new Date())
      assertEquals(result, true)
    },
  )

  await t.step(
    'Date Range - should return true when date is exactly at start boundary',
    () => {
      const startDate = new Date(2023, 5, 15, 12, 30, 0) // June 15, 2023, 12:30:00
      const endDate = new Date(2023, 5, 20, 18, 45, 0) // June 20, 2023, 18:45:00
      const filter = createDateFilter({ startDate, endDate })
      const testDate = new Date(2023, 5, 15, 12, 30, 0) // Exactly at start
      assertEquals(filter(testDate), true)
    },
  )

  await t.step(
    'Date Range - should return false when date is 1ms after end',
    () => {
      const startDate = new Date(2023, 5, 15, 12, 30, 0)
      const endDate = new Date(2023, 5, 20, 18, 45, 0)
      const filter = createDateFilter({ startDate, endDate })
      const testDate = new Date(2023, 5, 20, 18, 45, 0, 1) // 1ms after end
      assertEquals(filter(testDate), false)
    },
  )

  await t.step(
    'Date Range - should handle same start and end date (single moment)',
    () => {
      const sameDate = new Date(2023, 5, 15, 12, 30, 0)
      const filter = createDateFilter({
        startDate: sameDate,
        endDate: sameDate,
      })
      assertEquals(filter(sameDate), true)
      assertEquals(filter(new Date(2023, 5, 15, 12, 30, 0, 1)), false) // 1ms after
      assertEquals(filter(new Date(2023, 5, 15, 12, 29, 59, 999)), false) // 1ms before
    },
  )

  await t.step('Date Range - should handle leap year date ranges', () => {
    const startDate = new Date(2020, 1, 28) // Feb 28, 2020 (leap year)
    const endDate = new Date(2020, 2, 1) // Mar 1, 2020
    const filter = createDateFilter({ startDate, endDate })
    assertEquals(filter(new Date(2020, 1, 29)), true) // Feb 29 (leap day)
    assertEquals(filter(new Date(2020, 1, 27)), false) // Feb 27
    assertEquals(filter(new Date(2020, 2, 2)), false) // Mar 2
  })

  await t.step('Date Range - should handle year boundary crossing', () => {
    const startDate = new Date(2022, 11, 30) // Dec 30, 2022
    const endDate = new Date(2023, 0, 2) // Jan 2, 2023
    const filter = createDateFilter({ startDate, endDate })
    assertEquals(filter(new Date(2022, 11, 31)), true) // Dec 31, 2022
    assertEquals(filter(new Date(2023, 0, 1)), true) // Jan 1, 2023
    assertEquals(filter(new Date(2022, 11, 29)), false) // Dec 29, 2022
    assertEquals(filter(new Date(2023, 0, 3)), false) // Jan 3, 2023
  })

  await t.step(
    'Date Range - should handle timezone differences (UTC times)',
    () => {
      const startDate = new Date('2023-06-15T00:00:00.000Z')
      const endDate = new Date('2023-06-15T23:59:59.999Z')
      const filter = createDateFilter({ startDate, endDate })
      assertEquals(filter(new Date('2023-06-15T12:00:00.000Z')), true) // Noon UTC
      assertEquals(filter(new Date('2023-06-14T23:59:59.999Z')), false) // 1ms before
      assertEquals(filter(new Date('2023-06-16T00:00:00.000Z')), false) // Next day
    },
  )

  await t.step(
    'Date Range - should handle reverse date range (end before start)',
    () => {
      const startDate = new Date(2023, 5, 20) // Later date
      const endDate = new Date(2023, 5, 15) // Earlier date
      const filter = createDateFilter({ startDate, endDate })
      // This should return false for any date since start > end
      assertEquals(filter(new Date(2023, 5, 17)), false) // Between the dates
      assertEquals(filter(new Date(2023, 5, 15)), false) // At "end" date
      assertEquals(filter(new Date(2023, 5, 20)), false) // At "start" date
    },
  )

  await t.step(
    'Date Range - should handle daylight saving time transitions',
    () => {
      // Testing around a typical DST transition (US Spring forward)
      const startDate = new Date('2023-03-12T01:00:00.000-05:00') // Before DST
      const endDate = new Date('2023-03-12T03:00:00.000-04:00') // After DST (skips 2 AM)
      const filter = createDateFilter({ startDate, endDate })

      // This tests the filter works correctly even during DST transitions
      assertEquals(filter(new Date('2023-03-12T01:30:00.000-05:00')), true)
      assertEquals(filter(new Date('2023-03-12T04:00:00.000-04:00')), false)
    },
  )
})

Deno.test('createBooleanFilter', async (t) => {
  await t.step('should filter objects by a boolean key', () => {
    const filterByBool = createBooleanFilter('bool')
    assertEquals(filterByBool({ bool: true }), true)
    assertEquals(filterByBool({ bool: false }), false)
    assertEquals(filterByBool({ bool: 'string' }), false)
  })
})
