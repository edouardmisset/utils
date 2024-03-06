import { assertEquals } from 'asserts'
import {
  createDateSorter,
  createNumberSorter,
  createStringSorter,
} from './sort.ts'

Deno.test('createStringSorter', async (t) => {
  const sorter = createStringSorter('name')
  const array = [{ name: 'John' }, { name: 'Jane' }]

  await t.step('should sort objects by a string key in ascending order', () => {
    const result = array.sort(sorter)
    assertEquals(result, [{ name: 'Jane' }, { name: 'John' }])
  })

  await t.step(
    'should sort objects by a string key in descending order',
    () => {
      const result = array.sort(createStringSorter('name', false))
      assertEquals(result, [{ name: 'John' }, { name: 'Jane' }])
    },
  )
})

Deno.test('createNumberSorter', async (t) => {
  const sorter = createNumberSorter('value')
  const array = [{ value: 10 }, { value: 5 }, { value: 20 }]

  await t.step('should sort objects by a number key in ascending order', () => {
    const result = array.sort(sorter)
    assertEquals(result, [{ value: 5 }, { value: 10 }, { value: 20 }])
  })

  await t.step(
    'should sort objects by a number key in descending order',
    () => {
      const result = array.sort(createNumberSorter('value', false))
      assertEquals(result, [{ value: 20 }, { value: 10 }, { value: 5 }])
    },
  )
})

Deno.test('createDateSorter', async (t) => {
  const sorter = createDateSorter('date')
  const array = [
    { date: new Date(2022, 0, 2) },
    { date: new Date(2022, 0, 1) },
    { date: new Date(2022, 0, 3) },
  ]

  await t.step('should sort objects by a date key in ascending order', () => {
    const result = array.sort(sorter)
    assertEquals(result, [{ date: new Date(2022, 0, 1) }, {
      date: new Date(2022, 0, 2),
    }, { date: new Date(2022, 0, 3) }])
  })

  await t.step('should sort objects by a date key in descending order', () => {
    const result = array.sort(createDateSorter('date', false))
    assertEquals(result, [{ date: new Date(2022, 0, 3) }, {
      date: new Date(2022, 0, 2),
    }, { date: new Date(2022, 0, 1) }])
  })
})
