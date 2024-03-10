import { assert, assertThrows } from 'asserts'
import { randomItem } from './random-item.ts'

Deno.test({
  name: 'should return a random item from the array',
  fn: () => {
    const array = [1, 2, 3, 4, 5]
    const result = randomItem(array)
    assert(array.includes(result))
  },
})

Deno.test({
  name: 'should throw an error if the array is empty',
  fn: () => {
    const array: number[] = []
    assertThrows(() => randomItem(array), Error, 'Array is empty')
  },
})
