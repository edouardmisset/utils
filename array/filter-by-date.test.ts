import { assertEquals, assertThrows } from '@std/assert'
import { filterByDate, isValidDate } from './filter-by-date.ts'

Deno.test(
  'filterByDate',
  async (t) => {
    const dates = [
      { date: new Date(2020, 0, 1) },
      { date: new Date(2021, 0, 1) },
      { date: new Date(2022, 0, 1) },
    ]

    await t.step('should filter an array of objects by a year', () => {
      const filter = filterByDate<typeof dates[number]>('date', { year: 2020 })
      const result = dates.filter(filter)
      assertEquals(result, [{ date: new Date(2020, 0, 1) }])
    })

    await t.step('should filter an array of objects by a date range', () => {
      const filter1 = filterByDate<typeof dates[number]>('date', {
        startDate: new Date(2020, 6, 1),
        endDate: new Date(2020, 11, 31),
      })
      const result1 = dates.filter(filter1)
      assertEquals(result1, [])

      const filter2 = filterByDate<typeof dates[number]>('date', {
        startDate: new Date(2018, 6, 1),
        endDate: new Date(2024, 11, 31),
      })
      const result2 = dates.filter(filter2)
      assertEquals(result2, dates)
    })

    await t.step(
      'should filter an array of objects by a duration from a reference date',
      () => {
        const _180Days = 1000 * 60 * 60 * 24 * 180
        const result = dates.filter(filterByDate('date', {
          referenceDate: new Date(2020, 4, 1),
          durationInMS: _180Days,
        }))
        assertEquals(result, [{ date: new Date(2020, 0, 1) }])
      },
    )

    await t.step(
      'should return all objects if no valid options are provided',
      () => {
        const result = dates.filter(filterByDate('date'))
        assertEquals(result, dates)
      },
    )

    await t.step(
      'should return all objects if the date key does not exist in the objects',
      () => {
        const result = dates.filter(
          // @ts-expect-error: Testing a non-existent key. An error is expected.
          filterByDate('nonexistentKey', { year: 2020 }),
        )
        assertEquals(result, dates)
      },
    )

    await t.step(
      'should return all objects if the date key is not a valid date',
      () => {
        const invalidData = [{ date: null }, { date: undefined }]
        const filter = filterByDate('date', { year: 2020 })
        const result = invalidData.filter(filter)
        assertEquals(result, invalidData)
      },
    )

    await t.step('should throw an error for invalid date range', () => {
      const filter = filterByDate<typeof dates[number]>('date', {
        startDate: new Date('invalid date'),
        endDate: new Date(2020, 11, 31),
      })
      assertThrows(
        () => {
          dates.filter(filter)
        },
        Error,
        'Invalid date range',
      )
    })

    await t.step(
      'should return all objects if the date value is not compatible',
      () => {
        const incompatibleData = [{ date: 'not a date' }]
        const filter = filterByDate('date', { year: 2020 })
        const result = incompatibleData.filter(filter)
        assertEquals(result, incompatibleData)
      },
    )

    await t.step(
      'should return all objects if the date value is an invalid date',
      () => {
        const invalidData = [{ date: new Date('invalid date') }]
        const filter = filterByDate<typeof dates[number]>('date', {
          year: 2020,
        })
        const result = invalidData.filter(filter)
        assertEquals(result, invalidData)
      },
    )
  },
)

Deno.test('isValidDate function', async (t) => {
  await t.step(
    'should return true for a valid date',
    () => {
      const result = isValidDate(new Date(), new Date('2022-01-01'))
      assertEquals(result, true)
    },
  )

  await t.step(
    'should return false for an invalid date',
    () => {
      const result = isValidDate(new Date(), new Date('invalid date'))
      assertEquals(result, false)
    },
  )

  await t.step(
    'should return false for a non-date value',
    () => {
      const result = isValidDate(new Date(), 'not a date')
      assertEquals(result, false)
    },
  )

  await t.step('should return true when no arguments are provided', () => {
    const result = isValidDate()
    assertEquals(result, true)
  })
})
