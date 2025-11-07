import { assertEquals } from '@std/assert'
import { frequency } from './frequency.ts'

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
