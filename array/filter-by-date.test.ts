import { assertEquals } from '@std/assert'
import { filterByDate } from './filter-by-date.ts'

Deno.test(
  'filterByDate',
  async (t) => {
    const dates = [
      { date: new Date(2020, 0, 1) },
      { date: new Date(2021, 0, 1) },
      { date: new Date(2022, 0, 1) },
    ]

    await t.step('should filter an array of objects by a year', () => {
      const { data: filter, error } = filterByDate<typeof dates[number]>(
        'date',
        { year: 2020 },
      )
      assertEquals(error, undefined)
      assertEquals(filter !== undefined, true)
      if (filter) {
        const result = dates.filter(filter)
        assertEquals(result, [{ date: new Date(2020, 0, 1) }])
      }
    })

    await t.step('should filter an array of objects by a date range', () => {
      const { data: filter1, error: error1 } = filterByDate<
        typeof dates[number]
      >('date', {
        startDate: new Date(2020, 6, 1),
        endDate: new Date(2020, 11, 31),
      })
      assertEquals(error1, undefined)
      assertEquals(filter1 !== undefined, true)
      if (filter1) {
        const result1 = dates.filter(filter1)
        assertEquals(result1, [])
      }

      const { data: filter2, error: error2 } = filterByDate<
        typeof dates[number]
      >('date', {
        startDate: new Date(2018, 6, 1),
        endDate: new Date(2024, 11, 31),
      })
      assertEquals(error2, undefined)
      assertEquals(filter2 !== undefined, true)
      if (filter2) {
        const result2 = dates.filter(filter2)
        assertEquals(result2, dates)
      }
    })

    await t.step(
      'should filter an array of objects by a duration from a reference date',
      () => {
        const _180Days = 1000 * 60 * 60 * 24 * 180
        const { data: filter, error } = filterByDate('date', {
          durationInMS: _180Days,
          referenceDate: new Date(2020, 4, 1),
        })
        assertEquals(error, undefined)
        assertEquals(filter !== undefined, true)
        if (filter) {
          const result = dates.filter(filter)
          assertEquals(result, [{ date: new Date(2020, 0, 1) }])
        }
      },
    )

    await t.step(
      'should return all objects if no valid options are provided',
      () => {
        const { data: filter, error } = filterByDate('date')
        assertEquals(error, undefined)
        assertEquals(filter !== undefined, true)
        if (filter) {
          const result = dates.filter(filter)
          assertEquals(result, dates)
        }
      },
    )

    await t.step(
      'should return all objects if the date key does not exist in the objects',
      () => {
        const { data: filter, error } = filterByDate(
          'nonexistentKey',
          { year: 2020 },
        )
        assertEquals(error, undefined)
        assertEquals(filter !== undefined, true)
        if (filter) {
          const result = dates.filter(filter)
          assertEquals(result, dates)
        }
      },
    )

    await t.step(
      'should return all objects if the date key is not a valid date',
      () => {
        const invalidData = [{ date: null }, { date: undefined }]
        const { data: filter, error } = filterByDate('date', { year: 2020 })
        assertEquals(error, undefined)
        assertEquals(filter !== undefined, true)
        if (filter) {
          const result = invalidData.filter(filter)
          assertEquals(result, invalidData)
        }
      },
    )

    await t.step('should return an error for invalid date range', () => {
      const { data, error } = filterByDate<typeof dates[number]>('date', {
        startDate: new Date('invalid date'),
        endDate: new Date(2020, 11, 31),
      })
      assertEquals(data, undefined)
      assertEquals(error?.message, 'Invalid date range')
    })

    await t.step(
      'should return all objects if the date value is not compatible',
      () => {
        const incompatibleData = [{ date: 'not a date' }]
        const { data: filter, error } = filterByDate('date', { year: 2020 })
        assertEquals(error, undefined)
        assertEquals(filter !== undefined, true)
        if (filter) {
          const result = incompatibleData.filter(filter)
          assertEquals(result, incompatibleData)
        }
      },
    )

    await t.step(
      'should return all objects if the date value is an invalid date',
      () => {
        const invalidData = [{ date: new Date('invalid date') }]
        const { data: filter, error } = filterByDate<typeof dates[number]>(
          'date',
          {
            year: 2020,
          },
        )
        assertEquals(error, undefined)
        assertEquals(filter !== undefined, true)
        if (filter) {
          const result = invalidData.filter(filter)
          assertEquals(result, invalidData)
        }
      },
    )

    await t.step(
      'should return all objects if no filter options are provided (empty object)',
      () => {
        const { data: filter, error } = filterByDate<typeof dates[number]>(
          'date',
          {},
        )
        assertEquals(error, undefined)
        assertEquals(filter !== undefined, true)
        if (filter) {
          const result = dates.filter(filter)
          assertEquals(result, dates)
        }
      },
    )
  },
)
