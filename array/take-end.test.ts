import { assertEquals } from '@std/assert'
import { takeEnd, getLastElements } from './take-end.ts'

Deno.test('takeEnd', async (t) => {
  await t.step('should return the last n elements from the array', () => {
    const result = takeEnd([1, 2, 3, 4, 5], 2)
    assertEquals(result, [4, 5])
  })

  await t.step('should return the last element if n is not provided', () => {
    const result = takeEnd([1, 2, 3, 4, 5])
    assertEquals(result, [5])
  })

  await t.step(
    'should return the last n elements even if n is negative',
    () => {
      const result = takeEnd([1, 2, 3, 4, 5], -2)
      assertEquals(result, [4, 5])
    },
  )
})

Deno.test('getLastElements (alias)', async (t) => {
  await t.step('should work as alias for takeEnd', () => {
    const result = getLastElements([1, 2, 3, 4, 5], 2)
    assertEquals(result, [4, 5])
  })
})