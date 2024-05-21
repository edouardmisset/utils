import { assertEquals } from '@std/assert'
import { countBy, frequency } from './count-by.ts'

Deno.test('countBy', async (t) => {
  const isEven = (number_: number): boolean => number_ % 2 === 0

  await t.step(
    'should count the number of elements that satisfy a condition',
    () => {
      const array = [1, 2, 3, 4, 5]
      assertEquals(countBy(array, isEven), 2)
    },
  )

  await t.step('should return 0 for an empty array', () => {
    const array: number[] = []
    assertEquals(countBy(array, isEven), 0)
  })
})

Deno.test('frequency', async (t) => {
  await t.step(
    'should calculate the frequency of each unique element in an array',
    () => {
      const array = ['apple', 'banana', 'apple', 'cherry']
      assertEquals(frequency(array), { 'apple': 2, 'banana': 1, 'cherry': 1 })
    },
  )

  await t.step('should return an empty object for an empty array', () => {
    const array: string[] = []
    assertEquals(frequency(array), {})
  })
})
