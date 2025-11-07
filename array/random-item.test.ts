import { assert, assertEquals } from '@std/assert'
import { randomItem } from './random-item.ts'

Deno.test('randomItem function', async (t) => {
  await t.step('should return a random item from the array', () => {
    const array = [1, 2, 3, 4, 5]
    const result = randomItem(array)

    assertEquals(result.error, undefined)
    assert(result.data !== undefined)
    assert(array.includes(result.data))
  })

  await t.step('should return an error if the array is empty', () => {
    const array: number[] = []
    const result = randomItem(array)

    assertEquals(result.data, undefined)
    assertEquals(result.error?.message, 'Array is empty')
  })
})
