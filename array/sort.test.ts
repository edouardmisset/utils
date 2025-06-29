import { assertEquals } from '@std/assert'
import {
  createDateSorter,
  createNumberSorter,
  createStringSorter,
} from './sort.ts'

Deno.test('createStringSorter', async (t) => {
  await t.step('should sort array of strings in ascending order', () => {
    const result = ['John', 'Jane', 'Zane', 'Adam'].sort(
      createStringSorter({ descending: false }),
    )
    assertEquals(result, ['Adam', 'Jane', 'John', 'Zane'])
  })

  const nameSorter = createStringSorter({ key: 'name', descending: false })
  const array = [{ name: 'John' }, { name: 'Jane' }, { name: 'Adam' }, {
    name: 'Zane',
  }]

  await t.step('should sort objects by a string key in ascending order', () => {
    const result = array.sort(nameSorter)
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
      const result = array.sort(
        createStringSorter({ key: 'name', descending: true }),
      )
      assertEquals(result, [{ name: 'Zane' }, { name: 'John' }, {
        name: 'Jane',
      }, { name: 'Adam' }])
    },
  )

  await t.step('should handle empty arrays', () => {
    const result = [].sort(nameSorter)
    assertEquals(result, [])
  })

  await t.step('should handle arrays with one element', () => {
    const result = [{ name: 'John' }].sort(nameSorter)
    assertEquals(result, [{ name: 'John' }])
  })

  await t.step('should handle arrays with identical elements', () => {
    const result = [{ name: 'John' }, { name: 'John' }].sort(nameSorter)
    assertEquals(result, [{ name: 'John' }, { name: 'John' }])
  })

  await t.step(
    'should use default descending=false when options is undefined',
    () => {
      const sorter = createStringSorter()
      const result = ['a', 'b', 'c'].sort(sorter)
      assertEquals(result, ['a', 'b', 'c'])
    },
  )

  await t.step(
    'should use default descending=false when options is empty object',
    () => {
      const sorter = createStringSorter({})
      const result = ['a', 'b', 'c'].sort(sorter)
      assertEquals(result, ['a', 'b', 'c'])
    },
  )
})

Deno.test('createNumberSorter', async (t) => {
  const numberSorter = createNumberSorter({ key: 'value', descending: false })
  const array = [{ value: 10 }, { value: 5 }, { value: 20 }, { value: 0 }, {
    value: -10,
  }]

  await t.step('should sort objects by a number key in ascending order', () => {
    const result = array.sort(numberSorter)
    assertEquals(result, [{ value: -10 }, { value: 0 }, { value: 5 }, {
      value: 10,
    }, { value: 20 }])
  })

  await t.step(
    'should sort objects by a number key in descending order',
    () => {
      const result = array.sort(
        createNumberSorter({ key: 'value', descending: true }),
      )
      assertEquals(result, [{ value: 20 }, { value: 10 }, { value: 5 }, {
        value: 0,
      }, { value: -10 }])
    },
  )

  await t.step('should handle empty arrays', () => {
    const result = [].sort(numberSorter)
    assertEquals(result, [])
  })

  await t.step('should handle arrays with one element', () => {
    const result = [{ value: 10 }].sort(numberSorter)
    assertEquals(result, [{ value: 10 }])
  })

  await t.step('should handle arrays with identical elements', () => {
    const result = [{ value: 10 }, { value: 10 }].sort(numberSorter)
    assertEquals(result, [{ value: 10 }, { value: 10 }])
  })

  await t.step(
    'should sort an array of primitive values in ascending order',
    () => {
      const result = [10, 5, 20, 0, -10].sort(
        createNumberSorter({ descending: false }),
      )
      assertEquals(result, [-10, 0, 5, 10, 20])
    },
  )

  await t.step(
    'should sort an array of primitive values in descending order',
    () => {
      const result = [10, 5, 20, 0, -10].sort(
        createNumberSorter({ descending: true }),
      )
      assertEquals(result, [20, 10, 5, 0, -10])
    },
  )

  await t.step('should handle NaN values in objects', () => {
    const sorter = createNumberSorter({ key: 'value', descending: false })
    const array2 = [{ value: 10 }, { value: NaN }, { value: 20 }]
    const result = array2.sort(sorter)
    assertEquals(result, [{ value: 10 }, { value: 20 }, { value: NaN }])
  })

  await t.step('should handle NaN values in primitive arrays', () => {
    const sorter = createNumberSorter({ descending: false })
    const array2 = [10, NaN, 20]
    const result = array2.sort(sorter)
    assertEquals(result, [10, 20, NaN])
  })

  await t.step(
    'should use default descending=false when options is undefined or an empty object',
    () => {
      const sorter = createNumberSorter()
      const result = [1, 2, 3].sort(sorter)
      assertEquals(result, [1, 2, 3])

      const sorter2 = createNumberSorter({})
      const result2 = [1, 2, 3].sort(sorter2)
      assertEquals(result2, [1, 2, 3])
    },
  )
})

Deno.test('createDateSorter', async (t) => {
  const dateSorter = createDateSorter({ key: 'date', descending: false })
  const array = [
    { date: new Date(2022, 0, 2) },
    { date: new Date(2022, 0, 1) },
    { date: new Date(2022, 0, 3) },
  ]

  await t.step('should sort objects by a date key in ascending order', () => {
    const result = array.sort(dateSorter)
    assertEquals(result, [{ date: new Date(2022, 0, 1) }, {
      date: new Date(2022, 0, 2),
    }, { date: new Date(2022, 0, 3) }])
  })

  await t.step('should sort objects by a date key in descending order', () => {
    const result = array.sort(
      createDateSorter({ key: 'date', descending: true }),
    )
    assertEquals(result, [{ date: new Date(2022, 0, 3) }, {
      date: new Date(2022, 0, 2),
    }, { date: new Date(2022, 0, 1) }])
  })

  await t.step('should handle empty arrays', () => {
    const result = [].sort(dateSorter)
    assertEquals(result, [])
  })

  await t.step('should handle arrays with one element', () => {
    const result = [{ date: new Date(2022, 0, 1) }].sort(dateSorter)
    assertEquals(result, [{ date: new Date(2022, 0, 1) }])
  })

  await t.step('should handle arrays with identical elements', () => {
    const result = [{ date: new Date(2022, 0, 1) }, {
      date: new Date(2022, 0, 1),
    }].sort(dateSorter)
    assertEquals(result, [{ date: new Date(2022, 0, 1) }, {
      date: new Date(2022, 0, 1),
    }])
  })

  await t.step('should sort an array of date values in ascending order', () => {
    const result = [
      new Date(2022, 0, 2),
      new Date(2022, 0, 1),
      new Date(2022, 0, 3),
    ].sort(createDateSorter({ descending: false }))
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
      ].sort(createDateSorter({ descending: true }))
      assertEquals(result, [
        new Date(2022, 0, 3),
        new Date(2022, 0, 2),
        new Date(2022, 0, 1),
      ])
    },
  )

  await t.step('should handle invalid dates in objects', () => {
    const dateArray = [{ date: new Date('invalid') }, {
      date: new Date(2022, 0, 1),
    }, { date: new Date(2022, 0, 2) }]
    const result = dateArray.sort(dateSorter)
    assertEquals(result, [{ date: new Date(2022, 0, 1) }, {
      date: new Date(2022, 0, 2),
    }, { date: new Date('invalid') }])
  })

  await t.step('should handle invalid dates in primitive arrays', () => {
    const dateArray = [
      new Date('invalid'),
      new Date(2022, 0, 1),
      new Date(2022, 0, 2),
    ]
    const result = dateArray.sort(dateSorter)
    assertEquals(result, [
      new Date(2022, 0, 1),
      new Date(2022, 0, 2),
      new Date('invalid'),
    ])
  })

  await t.step('should handle invalid right date', () => {
    const sorter = createDateSorter({ descending: false })
    const validDate = new Date(2022, 0, 1)
    const invalidDate = new Date('invalid')

    // When right date is invalid, it should return -1, placing valid date first
    const result = [invalidDate, validDate].sort(sorter)
    assertEquals(result, [validDate, invalidDate])
  })

  await t.step('should properly apply descending multiplier', () => {
    const ascending = createDateSorter({ descending: false })
    const descending = createDateSorter({ descending: true })

    const date1 = new Date(2022, 0, 1)
    const date2 = new Date(2022, 0, 2)

    // Test ascending order
    const ascResult = [date2, date1].sort(ascending)
    assertEquals(ascResult, [date1, date2])

    // Test descending order
    const descResult = [date1, date2].sort(descending)
    assertEquals(descResult, [date2, date1])
  })

  await t.step(
    'should use default descending=false when options is undefined',
    () => {
      const sorter = createDateSorter()
      const date1 = new Date(2022, 0, 1)
      const date2 = new Date(2022, 0, 2)
      const result = [date1, date2].sort(sorter)
      assertEquals(result, [date1, date2]) // ascending by default
    },
  )

  await t.step(
    'should use default descending=false when options is empty object',
    () => {
      const sorter = createDateSorter({})
      const date1 = new Date(2022, 0, 1)
      const date2 = new Date(2022, 0, 2)
      const result = [date1, date2].sort(sorter)
      assertEquals(result, [date1, date2]) // ascending by default
    },
  )

  await t.step(
    'should handle both invalid dates in comparison (both NaN)',
    () => {
      const sorter = createDateSorter({ descending: false })
      const invalidDate1 = new Date('invalid-1')
      const invalidDate2 = new Date('invalid-2')
      const result = [invalidDate1, invalidDate2].sort(sorter)
      // When both dates are invalid, order should remain stable
      assertEquals(result, [invalidDate1, invalidDate2])
    },
  )

  await t.step(
    'should handle mix of valid and invalid dates (left valid, right invalid)',
    () => {
      const sorter = createDateSorter({ descending: false })
      const validDate = new Date(2022, 0, 1)
      const invalidDate = new Date('invalid')
      const result = [validDate, invalidDate].sort(sorter)
      // Valid date should come before invalid date
      assertEquals(result, [validDate, invalidDate])
    },
  )

  await t.step(
    'should handle mix of valid and invalid dates (left invalid, right valid)',
    () => {
      const sorter = createDateSorter({ descending: false })
      const validDate = new Date(2022, 0, 1)
      const invalidDate = new Date('invalid')
      const result = [invalidDate, validDate].sort(sorter)
      // Valid date should come before invalid date
      assertEquals(result, [validDate, invalidDate])
    },
  )
})
