import { assertEquals } from '@std/assert'
import { takeStart, getFirstElements } from './take-start.ts'

Deno.test('takeStart', async (t) => {
  await t.step('should return the first n elements from the array', () => {
    const result = takeStart([1, 2, 3, 4, 5], 2)
    assertEquals(result, [1, 2])
  })

  await t.step('should return the first element if n is not provided', () => {
    const result = takeStart([1, 2, 3, 4, 5])
    assertEquals(result, [1])
  })

  await t.step(
    'should return the first n elements even if n is negative',
    () => {
      const result = takeStart([1, 2, 3, 4, 5], -2)
      assertEquals(result, [1, 2])
    },
  )
})

Deno.test('getFirstElements (alias)', async (t) => {
  await t.step('should work as alias for takeStart', () => {
    const result = getFirstElements([1, 2, 3, 4, 5], 2)
    assertEquals(result, [1, 2])
  })
})