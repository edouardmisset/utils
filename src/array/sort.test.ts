import { assertEquals } from '@std/assert'
import {
  createDateSorter,
  createNumberSorter,
  createStringSorter,
} from './sort.ts'

Deno.test('createStringSorter', async (t) => {
  await t.step('should sort array of strings in ascending order', () => {
    const result = ['John', 'Jane', 'Zane', 'Adam'].sort(createStringSorter())
    assertEquals(result, ['Adam', 'Jane', 'John', 'Zane'])
  })

  const sorter = createStringSorter('name')
  const array = [{ name: 'John' }, { name: 'Jane' }, { name: 'Adam' }, {
    name: 'Zane',
  }]

  await t.step('should sort objects by a string key in ascending order', () => {
    const result = array.sort(sorter)
    assertEquals(result, [
      { name: 'Adam' },
      { name: 'Jane' },
      { name: 'John' },
      { name: 'Zane' },
    ])
  })

  await t.step(
    'should sort objects by a string key in descending order',
    () => {
      const result = array.sort(createStringSorter('name', false))
      assertEquals(result, [{ name: 'Zane' }, { name: 'John' }, {
        name: 'Jane',
      }, { name: 'Adam' }])
    },
  )

  await t.step('should handle empty arrays', () => {
    const result = [].sort(sorter)
    assertEquals(result, [])
  })

  await t.step('should handle arrays with one element', () => {
    const result = [{ name: 'John' }].sort(sorter)
    assertEquals(result, [{ name: 'John' }])
  })

  await t.step('should handle arrays with identical elements', () => {
    const result = [{ name: 'John' }, { name: 'John' }].sort(sorter)
    assertEquals(result, [{ name: 'John' }, { name: 'John' }])
  })
})

Deno.test('createNumberSorter', async (t) => {
  const sorter = createNumberSorter('value')
  const array = [{ value: 10 }, { value: 5 }, { value: 20 }, { value: 0 }, {
    value: -10,
  }]

  await t.step('should sort objects by a number key in ascending order', () => {
    const result = array.sort(sorter)
    assertEquals(result, [{ value: -10 }, { value: 0 }, { value: 5 }, {
      value: 10,
    }, { value: 20 }])
  })

  await t.step(
    'should sort objects by a number key in descending order',
    () => {
      const result = array.sort(createNumberSorter('value', false))
      assertEquals(result, [{ value: 20 }, { value: 10 }, { value: 5 }, {
        value: 0,
      }, { value: -10 }])
    },
  )

  await t.step('should handle empty arrays', () => {
    const result = [].sort(sorter)
    assertEquals(result, [])
  })

  await t.step('should handle arrays with one element', () => {
    const result = [{ value: 10 }].sort(sorter)
    assertEquals(result, [{ value: 10 }])
  })

  await t.step('should handle arrays with identical elements', () => {
    const result = [{ value: 10 }, { value: 10 }].sort(sorter)
    assertEquals(result, [{ value: 10 }, { value: 10 }])
  })

  await t.step(
    'should sort an array of primitive values in ascending order',
    () => {
      const result = [10, 5, 20, 0, -10].sort(createNumberSorter())
      assertEquals(result, [-10, 0, 5, 10, 20])
    },
  )

  await t.step(
    'should sort an array of primitive values in descending order',
    () => {
      const result = [10, 5, 20, 0, -10].sort(
        createNumberSorter(undefined, false),
      )
      assertEquals(result, [20, 10, 5, 0, -10])
    },
  )

  await t.step('should handle NaN values in objects', () => {
    const sorter = createNumberSorter('value')
    const array = [{ value: 10 }, { value: NaN }, { value: 20 }]
    const result = array.sort(sorter)
    assertEquals(result, [{ value: 10 }, { value: 20 }, { value: NaN }])
  })

  await t.step('should handle NaN values in primitive arrays', () => {
    const sorter = createNumberSorter()
    const array = [10, NaN, 20]
    const result = array.sort(sorter)
    assertEquals(result, [10, 20, NaN])
  })
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

  await t.step('should handle empty arrays', () => {
    const result = [].sort(sorter)
    assertEquals(result, [])
  })

  await t.step('should handle arrays with one element', () => {
    const result = [{ date: new Date(2022, 0, 1) }].sort(sorter)
    assertEquals(result, [{ date: new Date(2022, 0, 1) }])
  })

  await t.step('should handle arrays with identical elements', () => {
    const result = [{ date: new Date(2022, 0, 1) }, {
      date: new Date(2022, 0, 1),
    }].sort(sorter)
    assertEquals(result, [{ date: new Date(2022, 0, 1) }, {
      date: new Date(2022, 0, 1),
    }])
  })

  await t.step('should sort an array of date values in ascending order', () => {
    const result = [
      new Date(2022, 0, 2),
      new Date(2022, 0, 1),
      new Date(2022, 0, 3),
    ].sort(createDateSorter())
    assertEquals(result, [
      new Date(2022, 0, 1),
      new Date(2022, 0, 2),
      new Date(2022, 0, 3),
    ])
  })

  await t.step(
    'should sort an array of date values in descending order',
    () => {
      const result = [
        new Date(2022, 0, 2),
        new Date(2022, 0, 1),
        new Date(2022, 0, 3),
      ].sort(createDateSorter(undefined, false))
      assertEquals(result, [
        new Date(2022, 0, 3),
        new Date(2022, 0, 2),
        new Date(2022, 0, 1),
      ])
    },
  )

  await t.step('should handle invalid dates in objects', () => {
    const sorter = createDateSorter('date')
    const array = [{ date: new Date('invalid') }, {
      date: new Date(2022, 0, 1),
    }, { date: new Date(2022, 0, 2) }]
    const result = array.sort(sorter)
    assertEquals(result, [{ date: new Date(2022, 0, 1) }, {
      date: new Date(2022, 0, 2),
    }, { date: new Date('invalid') }])
  })

  await t.step('should handle invalid dates in primitive arrays', () => {
    const sorter = createDateSorter()
    const array = [
      new Date('invalid'),
      new Date(2022, 0, 1),
      new Date(2022, 0, 2),
    ]
    const result = array.sort(sorter)
    assertEquals(result, [
      new Date(2022, 0, 1),
      new Date(2022, 0, 2),
      new Date('invalid'),
    ])
  })
})
