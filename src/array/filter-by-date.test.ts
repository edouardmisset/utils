import { assertEquals } from 'asserts'
import { filterByDate } from './filter-by-date.ts'

Deno.test({
  name: 'filterByDate',
  fn: async (t) => {
    const data = [
      { date: new Date(2020, 0, 1) },
      { date: new Date(2021, 0, 1) },
      { date: new Date(2022, 0, 1) },
    ]

    await t.step({
      name: 'should filter an array of objects by a year',
      fn: () => {
        const filter = filterByDate('date', { year: 2020 })
        const result = data.filter(filter)
        assertEquals(result, [{ date: new Date(2020, 0, 1) }])
      },
    })

    await t.step({
      name: 'should filter an array of objects by a date range',
      fn: () => {
        const filter = filterByDate('date', {
          startDate: new Date(2020, 6, 1),
          endDate: new Date(2020, 11, 31),
        })
        const result = data.filter(filter)
        assertEquals(result, [])
      },
    })

    await t.step(
      {
        name:
          'should filter an array of objects by a duration from a reference date',
        ignore: false,
        fn: () => {
          const _180Days = 1000 * 60 * 60 * 24 * 180
          const result = data.filter(filterByDate('date', {
            referenceDate: new Date(2020, 4, 1),
            durationInMS: _180Days,
          }))
          assertEquals(result, [{ date: new Date(2020, 0, 1) }])
        },
      },
    )

    await t.step(
      {
        name: 'should return all objects if no valid options are provided',
        fn: () => {
          const filter = filterByDate('date')
          const result = data.filter(filter)
          assertEquals(result, data)
        },
      },
    )

    await t.step(
      {
        name:
          'should return all objects if the date key does not exist in the objects',
        fn: () => {
          const result = data.filter(
            // @ts-expect-error: Testing a non-existent key. An error is expected.
            filterByDate('nonexistentKey', { year: 2020 }),
          )
          assertEquals(result, data)
        },
      },
    )

    await t.step(
      {
        name: 'should return all objects if the date key is not a valid date',
        fn: () => {
          const invalidData = [{ date: null }, { date: undefined }]
          const filter = filterByDate('date', { year: 2020 })
          const result = invalidData.filter(filter)
          assertEquals(result, invalidData)
        },
      },
    )
  },
})
