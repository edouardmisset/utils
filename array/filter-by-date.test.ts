import { assert, assertEquals } from '@std/assert'
import { filterByDate } from './filter-by-date.ts'

Deno.test(
  'filterByDate',
  async (t) => {
    const date1 = { date: new Date(2020, 6, 1) } // July 1, 2020
    const date2 = { date: new Date(2021, 6, 1) } // July 1, 2021
    const date3 = { date: new Date(2022, 6, 1) } // July 1, 2022
    const dates = [date1, date2, date3]

    await t.step('should filter an array of objects by a year', () => {
      const { data: filtered, error } = filterByDate(
        {
          array: dates,
          keyOrFunction: 'date',
          options: { year: 2020 },
        },
      )

      assertEquals(error, undefined)
      assertEquals(filtered, [date1])
    })

    await t.step(
      'should filter an array of objects using a callback to extract the date',
      () => {
        const { data: filtered, error } = filterByDate({
          array: dates,
          keyOrFunction: (item) => item.date,
          options: { year: 2020 },
        })
        assertEquals(error, undefined)
        assertEquals(filtered, [date1])
      },
    )

    await t.step('should filter an array of objects by a date range', () => {
      const { data: filtered, error } = filterByDate(
        {
          array: dates,
          keyOrFunction: 'date',
          options: {
            startDate: new Date(2020, 6, 30),
            endDate: new Date(2020, 11, 31),
          },
        },
      )
      assertEquals(error, undefined)
      assertEquals(filtered, [])

      const { data: filtered2, error: error2 } = filterByDate({
        array: dates,
        keyOrFunction: (o) => o.date,
        options: {
          startDate: new Date(2018, 6, 1),
          endDate: new Date(2024, 11, 31),
        },
      })

      assertEquals(error2, undefined)
      assertEquals(filtered2, dates)
    })

    await t.step(
      'should filter an array of objects by a duration from a reference date',
      () => {
        const _180Days = 1000 * 60 * 60 * 24 * 180
        const { data, error } = filterByDate({
          array: dates,
          options: {
            durationInMS: _180Days,
            referenceDate: new Date(2020, 4, 1),
          },
          keyOrFunction: 'date',
        })
        assertEquals(error, undefined)
        assertEquals(data, [date1])
      },
    )

    await t.step('should return an error for invalid date range', () => {
      const { data, error } = filterByDate({
        array: dates,
        keyOrFunction: 'date',
        options: {
          startDate: new Date('invalid date'),
          endDate: new Date(2020, 11, 31),
        },
      })
      assertEquals(data, undefined)
      assert(error?.message.includes('Invalid date range'))
    })

    await t.step(
      'should return an empty list if the date value is an invalid date',
      () => {
        const invalidData = [{ date: new Date('invalid date') }, {
          date: undefined,
        }]
        const { data, error } = filterByDate({
          array: invalidData,
          keyOrFunction: 'date',
          options: { year: 2020 },
        })
        assertEquals(error, undefined)
        assertEquals(data, [])
      },
    )
  },
)
