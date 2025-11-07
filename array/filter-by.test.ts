import { assertEquals } from '@std/assert'
import { filterBy } from './filter-by.ts'

Deno.test('filterBy', async (t) => {
  const array = [
    { id: 1, category: 'a', name: 'First' },
    { id: 2, category: 'b', name: 'Second' },
    { id: 3, category: 'a', name: 'Third' },
    { id: 4, name: 'Fourth' }, // missing category (undefined)
    { id: 5, category: undefined, name: 'Fifth' }, // explicit undefined
  ]

  await t.step('filters by key/value returning all matches', () => {
    const result = filterBy({ array, keyOrFunction: 'category', value: 'a' })
    assertEquals(result, [
      { id: 1, category: 'a', name: 'First' },
      { id: 3, category: 'a', name: 'Third' },
    ])
  })

  await t.step(
    'returns empty array when no objects match the key/value',
    () => {
      const result = filterBy({
        array,
        keyOrFunction: 'category',
        value: 'z',
      })
      assertEquals(result, [])
    },
  )

  await t.step(
    'matches objects with missing key when value is undefined',
    () => {
      const result = filterBy({
        array,
        keyOrFunction: 'category',
        value: undefined,
      })
      assertEquals(result, [
        { id: 4, name: 'Fourth' },
        { id: 5, category: undefined, name: 'Fifth' },
      ])
    },
  )

  await t.step('filters using a mapping function', () => {
    const result = filterBy({
      array,
      keyOrFunction: (o) => o.name.length,
      value: 5, // names with length 5
    })
    assertEquals(result, [
      { id: 1, category: 'a', name: 'First' },
      { id: 3, category: 'a', name: 'Third' },
      { id: 5, category: undefined, name: 'Fifth' },
    ])
  })

  await t.step('empty input array yields empty result', () => {
    const result = filterBy<
      typeof array[number],
      'category',
      string
    >({
      array: [],
      keyOrFunction: 'category',
      value: 'a',
    })
    assertEquals(result, [])
  })

  await t.step('strict equality (no coercion)', () => {
    const mixed = [
      { v: 1 },
      { v: '1' },
      { v: true },
      { v: 'true' },
    ]
    const resultNumber = filterBy({
      array: mixed,
      keyOrFunction: 'v',
      value: 1,
    })
    const resultString = filterBy({
      array: mixed,
      keyOrFunction: 'v',
      value: '1',
    })
    assertEquals(resultNumber, [{ v: 1 }])
    assertEquals(resultString, [{ v: '1' }])
  })
})
