import { assert, assertThrows } from '@std/assert'
import { randomItem } from './random-item.ts'

Deno.test('randomItem function', async (t) => {
  await t.step('should return a random item from the array', () => {
    const array = [1, 2, 3, 4, 5]
    const result = randomItem(array)
    assert(array.includes(result))
  })

  await t.step('should throw an error if the array is empty', () => {
    const array: number[] = []
    assertThrows(() => randomItem(array), Error, 'Array is empty')
  })
})
